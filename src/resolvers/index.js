import User from '../models/user';
import Post from '../models/post';

export default {
  Query: {
    posts: async (obj, args, context) => {
      // console.log(obj, args, context, info);
      try {
        const post = await Post.find({}).sort({ createdAt: -1 });
        return post;
      } catch (error) {
        throw error;
      }
    },
    user: async (_, { _id }) => {
      try {
        // const user = await getUsers.load(_id);
        const user = await User.findById(_id);

        return user;
      } catch (error) {
        throw error;
      }
    }
  },
  // Mutation: {},
  User: {
    posts: async user => {
      try {
        const posts = Post.find({ author: user._id }).sort({ createdAt: -1 });
        return posts;
      } catch (error) {
        throw error;
      }
    }
  },
  Post: {
    author: async (post, args, { loaders: { getUser } }) => {
      try {
        const user = await getUser.load(post.author);
        return user;
      } catch (error) {
        throw error;
      }
    }
  }
};
