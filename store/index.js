import get from 'lodash.get';
import gql from 'graphql-tag';

export const state = () => ({
  user: null
});

export const mutations = {

  SET_USER(state, user) {
    state.user = user;
  }
};

export const actions = {

  nuxtServerInit({commit}, {req, res}) {

    const sessionUser = get(req, 'session.user');

    if (sessionUser) {
      commit('SET_USER', sessionUser);
    }
  },

  async login({commit}, {username, password}) {
    const client = this.app.apolloProvider.defaultClient;
    const res = await client.mutate({
      mutation: gql`mutation ($username: String!, $password: String!) {
        login (username: $username, password: $password) {
          id
          name
        }
      }`,
      variables: {username, password}
    });
    commit('SET_USER', res.data.login);
  },

  async logout({commit}) {
    const client = this.app.apolloProvider.defaultClient;
    const res = await client.mutate({
      mutation: gql`mutation {
        logout {
          success
        }
      }`,
    });
    if (res.data.logout.success) {
      commit('SET_USER', null);
    }
  },
};
