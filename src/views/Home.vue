<template>
  <div class="home">
    <span v-for="category in categories" :key="category.oid">
      <router-link :to="{ name: 'category', params: { categoryId: category.oid } }">
        <div>{{ category.title }}</div>
        <img :src="category.thumb" :alt="category.title">
      </router-link>
    </span>
  </div>
</template>

<script>
import octotvServices from '../services/octotv'

export default {
  name: 'home',
  data() {
    return {
      categories: undefined
    }
  },
  async created() {
    this.categories = await octotvServices.getCategories()
  }
}
</script>
