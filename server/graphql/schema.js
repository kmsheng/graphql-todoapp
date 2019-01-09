import DataLoader from 'dataloader';
import {typeDef as User, resolvers as userResolvers} from './user';
import {typeDef as Todo, resolvers as todoResolvers} from './todo';

const Default = `
  type Message {
    success: Boolean,
    message: String
  }
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

const resolvers = {};

export default {
  typeDefs: [Default, User, Todo],
  resolvers: [resolvers, userResolvers, todoResolvers],
  context: ({req}) => {
    return {
      session: req.session,
      dataloaders: {
        // prevent N + 1 query here
        names: new DataLoader(async (ids) => {
          return ids.map(id => 'test');
        })
      }
    };
  }
};
