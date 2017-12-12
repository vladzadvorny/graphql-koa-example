import app from './app';
import connectDatabase from './database';
import { port } from './config';
// import mocks from './mocks';

(async () => {
  try {
    const info = await connectDatabase();
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
    if (info) {
      // await mocks();
    }
  } catch (error) {
    console.error('Unable to connect to database');
    process.exit(1);
  }

  await app.listen(port);
  console.log(`Server started on port ${port}`);
})();
