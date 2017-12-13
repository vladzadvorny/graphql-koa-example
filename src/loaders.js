import DataLoader from 'dataloader';
import { dataLoaderMongoose } from 'dataloader-mongoose';

import User from './models/user';

export default () => ({
  getUser: new DataLoader(ids => dataLoaderMongoose(User, ids))
});
