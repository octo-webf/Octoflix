<template>
  <div id="app">
    <header>
      <router-link to="/"><span class="logo">Octo+</span></router-link>
      <nav-bar :categoryName="this.getCategoryName" />
    </header>
    <div class="headline">{{this.getCategoryName}}</div>
    <router-view/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import octotvServices from './services/octotv'

export default {
  name: 'app',
  components: {
    NavBar
  },
  computed: {
    categoryId () {
      return this.$route.params && this.$route.params.categoryId
    },
    getCategoryName () {
      const category = octotvServices.getCategoryInformations(this.categoryId)
      return category && category.name
    }
  },
  beforeMount () {
    if (!localStorage.videos) {
      localStorage.videos = JSON.stringify({})
    }
  }
}
</script>

<style>
html{
  background-color: #0A193D;
  color: white;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
header {
  z-index: 100;
  line-height: 50px;
  display: block;
  height: 50px;
  overflow: hidden;
  position: fixed;
  padding: 0 1em;
  top: 0;
  left: 0;
  right: 0;
  background:rgba(1,1,1, 0.5);
}
.headline {
  padding-top: 50px;
  font-size: 3.5vw;
  text-align: center;
}
.logo {
  color: #D4D5D6;
  text-transform: capitalize;
  font-size: 2em;
  font-weight: bolder;
  float: left;
}
</style>
