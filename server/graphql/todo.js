export const typeDef = `
  type Todo {
    id: ID!,
    text: String!,
    user: User
  }

  extend type Query {
    todos: [Todo]!
  }

  extend type Mutation {
    addTodo(text: String!): Todo,
    deleteTodo(id: Int!): Message,
  }
`;

let todos = [
  {id: 1, text: 'whattt'},
  {id: 2, text: 'whattt'}
];

export const resolvers = {
  Query: {
    todos: (parent, args, context, info) => {
      return todos.map((todo, i) => {
        todo.user = {id: i + 1, name: 'added', another: '!!!'};
        return todo;
      });
    },
  },
  Mutation: {
    addTodo: async (_, args) => {
      const todo = {id: todos.length + 1, text: args.text};
      todos.push(todo);
      return todo;
    },
    deleteTodo: async (_, args) => {
      const index = todos.findIndex(todo => todo.id === args.id);
      todos.splice(index, 1);
      return {
        success: true,
        message: `Todo ${args.id} has been deleted.`
      };
    }
  }
};
