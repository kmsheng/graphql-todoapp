<template>
  <div class="page-test">
    {{ message }}
    <button @click="handleClick()">click me</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'testing!!!'
    };
  },
  methods: {
    handleClick() {
      this.message = 'blahhh';
    }
  }
}
</script>

<style>
  .page-test {
    text-align: center;
  }
</style>
