<template>
  <div id="app">
    <header>
      <span class="logo">Octoflix</span>
      <nav id="nav">
        <router-link to="/">Parcourir</router-link>
      </nav>
    </header>
    <div class="headline">Votre catégorie</div>
    <router-view/>
  </div>
</template>

<style>
#app {
  padding: 1em 0 1em 1em;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 0 0 0 5%;
  float: left;
}
#nav a {
  font-weight: bold;
  font-size: 1.2em;
  text-decoration: none;
  color: white;
}
#nav a.router-link-exact-active {
  color: #e50914;
}
.headline {
  padding-top: 12%;
  color: #fff;
  font-size: 1.9em;
  text-align: center;
  line-height: 2em;
}
.logo {
  color: #e50914;
  text-transform: capitalize;
  font-size: 2em;
  font-weight: bolder;
  float: left;
  line-height: 2em;
}
header {
  display: block;
  height: 50px;
}
html{
  background-color: black;
}
</style>
