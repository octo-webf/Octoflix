<template>
  <div id="app">
    <header>
      <router-link to="/"><span class="logo">Octoflix</span></router-link>
      <nav-bar />
    </header>
    <div class="headline">Votre catégorie</div>
    <router-view/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
export default {
  name: 'app',
  components: {
    NavBar
  }
}
</script>

<style>
#app {
  padding: 1em 0 1em 1em;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.headline {
  padding-top: 12%;
  color: #fff;
  font-size: 3.5vw;
  text-align: center;
  line-height: 2em;
}
.logo {
  color: #e50914;
  text-transform: capitalize;
  font-size: 2em;
  font-weight: bolder;
  float: left;
}
header {
  display: block;
  height: 50px;
  position: fixed;
  padding: 0 1em;
  top: 0;
  left: 0;
  right: 0;
  background:rgba(1, 1, 1, 0.2); ;
}
html{
  background-color: #111;
}
</style>
