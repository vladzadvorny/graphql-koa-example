import Koa from 'koa';
import Router from 'koa-router';
import koaBody from 'koa-bodyparser';
import cors from 'kcors';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
import { makeExecutableSchema } from 'graphql-tools';
import depthLimit from 'graphql-depth-limit';

import { isDevelopment, endpointURL } from './config';
import typeDefs from './schema.gql';
import resolvers from './resolvers';

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const app = new Koa();
const router = new Router();

app.use(koaBody());

router.all(
  endpointURL,
  graphqlKoa(req => {
    const user = 'hi';

    return {
      schema,
      context: { user },
      validationRules: [depthLimit(2)]
    };
  })
);

if (isDevelopment) {
  router.get(
    '/graphiql',
    graphiqlKoa({
      endpointURL
    })
  );
}

app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

export default app;
