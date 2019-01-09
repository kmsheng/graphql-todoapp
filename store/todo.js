import gql from 'graphql-tag';

export const state = () => ({
  todos: []
});

export const mutations = {

  GET_TODOS(state, todos) {
    state.todos = todos;
  },

  ADD_TODO(state, todo) {
    state.todos.push(todo);
  },

  DELETE_TODO(state, id) {
    const index = state.todos.findIndex(todo => todo.id === id);
    state.todos.splice(index, 1);
  }
};

export const actions = {

  async getTodos({commit}, text) {
    const client = this.app.apolloProvider.defaultClient;
    const res = await client.query({query: gql`
      {
        todos {
          id
          text
          user {
            name
          }
        }
      }
    `});
    commit('GET_TODOS', res.data.todos);
  },

  async addTodo({commit}, text) {
    if (text.length === 0) {
      return;
    }
    const client = this.app.apolloProvider.defaultClient;
    const res = await client.mutate({
      mutation: gql`mutation ($text: String!) {
        addTodo (text: $text) {
          id
          text
        }
      }`,
      variables: {text}
    });
    commit('ADD_TODO', res.data.addTodo);
  },

  async deleteTodo({commit}, id) {
    const client = this.app.apolloProvider.defaultClient;
    const res = await client.mutate({
      mutation: gql`mutation ($id: Int!) {
        deleteTodo (id: $id) {
          success message
        }
      }`,
      variables: {id}
    });
    if (res.data.deleteTodo.success) {
      commit('DELETE_TODO', id);
    }
  }
};
