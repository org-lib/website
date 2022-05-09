<template>
  <div id="nav">
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
    <Homepie></Homepie>
  </div>
  <!-- <router-view/> -->
  <div class="beian"><a href="https://beian.miit.gov.cn" title="">黔ICP备：2021009490号</a></div>

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
.beian{
  width: 100%;
  background: #555353 !important;
  height: inherit;
  text-align: center;
}
a{
  margin-top: 100px;
  color: rgb(211, 206, 206);
  text-decoration: none;
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

import Homepie from '@/views/Home1024pie.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Homepie
  }
})
</script>
