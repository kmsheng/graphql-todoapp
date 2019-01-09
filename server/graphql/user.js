export const typeDef = `

  type User {
    id: Int!,
    name: String!
  }

  extend type Query {
    users: [User]!,
  }

  extend type Mutation {
    login(username: String!, password: String!): User,
    logout: Message
  }
`;

const user = {
  id: 1,
  username: 'test',
  password: 'test'
};

const users = [
  {id: 2, username: 'user 2'},
  {id: 3, username: 'user 3'},
  {id: 4, username: 'user 4'}
];

export const resolvers = {
  User: {
    name: (user, args, context) => {
      return context.dataloaders.names.load(user.id);
    }
  },
  Query: {
    users: (parent, args, context) => {
      return users;
    }
  },
  Mutation: {
    login: async (_, args, context) => {
      const {username, password} = args;
      if ((username === user.username) && (password === user.password)) {
        context.session.user = {id: user.id, name: user.username};
        return {id: user.id, name: user.username};
      }
      throw new Error('User not found.');
    },
    logout: async (_, args, context) => {
      context.session.user = null;
      return {success: true, message: 'success'};
    }
  }
};
