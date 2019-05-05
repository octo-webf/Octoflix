<template>
  <nav>
    <router-link to="/">Parcourir</router-link>
    <router-link v-if="categoryId" :to="{ name: 'category', params: { categoryId: categoryId } }" class="category-link">{{categoryName}}</router-link>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  computed: {
    categoryId () {
      return this.$route.params && this.$route.params.categoryId
    }
  },
  props: ['categoryName']
}
</script>

<style scoped>
nav {
  padding: 0 0 0 5%;
  float: left;
  line-height: 3em;
}
nav a {
  font-weight: bold;
  font-size: 1.2em;
  color: #e50914;
  text-decoration: none;
  margin-right: 15px;
}
nav a.router-link-exact-active {
  color: white;
}
</style>
