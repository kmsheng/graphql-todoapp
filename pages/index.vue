<template>
  <div class="page-todo">
    <div v-if="user">
      <p>{{ user.name }}</p>
      <button @click="logout()">Logout</button>
    </div>
    <form v-else @submit.prevent="handleSubmit">
      <label>
        <span>name</span>
        <input v-model="username" type="text" >
      </label>
      <label>
        <span>password</span>
        <input v-model="password" type="password">
      </label>
      <button type="submit">login</button>
      <p>user / password = test / test</p>
    </form>
    <h1>Todo List</h1>
    <input v-model="newTodo" type="text" autofocus autocomplete="off" @keyup.enter="addTodo">
    <div v-if="isEmpty()">Todo list is empty.</div>
    <ul v-else>
      <li v-for="todo in todos" :key="todo.id">
        <span>{{ todo.text }}</span>
        <button @click="deleteTodo(todo.id)">x</button>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  data() {
    return {
      username: 'test',
      password: 'test',
      newTodo: ''
    };
  },
  async fetch({store}) {
    await store.dispatch('todo/getTodos');
  },
  computed: {
    ...mapState({
      user: state => state.user,
      todos: state => state.todo.todos
    })
  },
  methods: {
    async addTodo() {
      await this.$store.dispatch('todo/addTodo', this.newTodo);
      this.newTodo = '';
    },
    async deleteTodo(id) {
      await this.$store.dispatch('todo/deleteTodo', parseInt(id, 10));
    },
    isEmpty() {
      return (this.todos.length === 0);
    },
    async handleSubmit() {
      await this.$store.dispatch('login', {
        username: this.username,
        password: this.password
      });
    },
    async logout() {
      await this.$store.dispatch('logout');
    }
  }
}
</script>

<style>
  .page-todo {
    text-align: center;
  }
</style>
