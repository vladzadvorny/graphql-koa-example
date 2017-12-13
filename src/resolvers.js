import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from './models/user';
import Post from './models/post';
import { jwtSecret } from './config';

export default {
  Query: {
    posts: async (obj, args, context) => {
      // console.log(obj, args, context, info);
      throw new Error('Unauthorized!');
      // try {
      //   const post = await Post.find({})
      //     .sort({ createdAt: -1 })
      //     .limit(3);
      //   return post;
      // } catch (error) {
      //   throw error;
      // }
    },
    user: async (_, { id }, { user }) => {
      try {
        console.log(user);
        // const user = await getUsers.load(_id);
        const _user = await User.findById(id);

        return _user;
      } catch (error) {
        throw error;
      }
    },
    me: async (_, { id }, { user }) => {
      try {
        if (!user || !user.id) {
          throw new Error('Unauthorized!');
        }

        const me = await User.findById(user.id);
        if (!me) {
          throw new Error('Unauthorized!');
        }
        return me;
      } catch (error) {
        throw error;
      }
    }
  },
  Mutation: {
    signup: async (_, { username, password }) => {
      try {
        const hashPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
          username,
          password: hashPassword
        });
        return user;
      } catch (error) {
        throw error;
      }
    },
    signin: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('Not user with that username');
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Incorrect Password');
      }

      const token = jwt.sign(
        {
          user: {
            id: user._id,
            username: user.username
          }
        },
        jwtSecret,
        {
          expiresIn: '1y'
        }
      );
      return token;
    }
  },
  User: {
    id: root => root._id || root.id,
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
    id: root => root._id || root.id,
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
