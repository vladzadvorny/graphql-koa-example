import faker from 'faker';

import User from './models/user';
import Post from './models/post';

export default async () => {
  const users = 7;
  const posts = 3;

  // await User.remove();
  await Array.from({ length: users }).forEach(async (_, i) => {
    const user = await User.create({
      username: faker.internet.userName()
    });

    // await Post.remove();
    await Array.from({ length: posts }).forEach(async () => {
      await Post.create({ title: faker.lorem.sentence(), author: user._id });
    });
  });
};
