<template>
  <div id="app">
    <div @click="jump">小山12231</div>
    <router-view />
  </div>
</template>
<script>
export default {
  methods: {
    jump() {
      console.log(123);
      this.$router.push({ path: "/egg" });
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
