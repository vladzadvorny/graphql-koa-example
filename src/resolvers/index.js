import { find, filter } from 'lodash';

import User from '../models/user';
import Post from '../models/post';

export default {
  Query: {
    posts: async (obj, args, context, info) => {
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
        const post = Post.find({ author: user._id }).sort({ createdAt: -1 });
        return post;
      } catch (error) {
        throw error;
      }
    }
  },
  Post: {
    author: async post => {
      try {
        const user = User.findById(post.author);
        return user;
      } catch (error) {
        throw error;
      }
    }
  }
};
