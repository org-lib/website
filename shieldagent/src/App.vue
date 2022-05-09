<template>
  <div id="nav">
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
    <HomeShieldAgent></HomeShieldAgent>
  </div>
  <!-- <router-view/> -->
</template>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
:root {
  /* background: no-repeat #8bb1e2 ; */
  background: no-repeat white ;
  background-size:100%;
  width: 100%;
  height: 100%;
}
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */
</style>
<script lang="ts">
import { defineComponent } from 'vue'

import HomeShieldAgent from '@/views/HomeShieldAgent.vue'

export default defineComponent({
  name: 'Home',
  components: {
    HomeShieldAgent
  }
})
</script>
