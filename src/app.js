import Koa from 'koa';
import Router from 'koa-router';
import koaBody from 'koa-bodyparser';
import cors from 'kcors';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
import { makeExecutableSchema } from 'graphql-tools';
import depthLimit from 'graphql-depth-limit';
import jwt from 'jsonwebtoken';

import { isDevelopment, endpointURL, jwtSecret } from './config';
import typeDefs from './schema.gql';
import resolvers from './resolvers';
import loaders from './loaders';

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const app = new Koa();
const router = new Router();

app.use(koaBody());

router.all(
  endpointURL,
  graphqlKoa(ctx => ({
    schema,
    context: {
      user: ctx.user,
      loaders: loaders()
    },
    validationRules: [depthLimit(2)]
  }))
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
app.use(async (ctx, next) => {
  const token = ctx.headers.authorization;
  try {
    const { user } = await jwt.verify(token, jwtSecret);
    ctx.user = user;
  } catch (err) {
    ctx.user = null;
  }
  await next();
});
app.use(router.routes()).use(router.allowedMethods());

export default app;
