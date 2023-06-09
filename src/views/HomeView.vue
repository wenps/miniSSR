<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div @click="jump()">xxx{{ data }}</div>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld.vue";

export default {
  async asyncData(store, router) {
    return store.dispatch("text", router.currentRoute.path);
  },
  name: "HomeView",
  components: {
    HelloWorld,
  },
  methods: {
    jump() {
      console.log(123);
      this.$router.push({ path: "/egg" });
    },
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    data() {
      return this.$store.state.data;
    },
  },
};
</script>
