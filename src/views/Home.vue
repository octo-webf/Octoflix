<template>
  <div class="home">
    <span v-for="category in categories" :key="category.oid">
      <router-link :to="{ name: 'category', params: { categoryId: category.oid } }" class="category-link">
        <div class="img-wrapper">
          <img :src="category.thumb" :alt="category.title" class="image-category">
        </div>
        <div class="category-title">{{ category.title }}</div>
      </router-link>
    </span>
  </div>
</template>

<script>
import octotvServices from '../services/octotv'

export default {
  name: 'home',
  data () {
    return {
      categories: undefined
    }
  },
  async created () {
    this.categories = await octotvServices.getCategories()
  }
}
</script>

<style scoped>
.image-category {
  max-height: 84px;
  max-width: 84px;
}
.category-title {
  text-overflow: ellipsis;
  color: grey;
  width: 84px;
  font-size: 0.8em;
  padding-top: 1em;
}
.img-wrapper {
  height: 84px;
  width: 84px;
  text-align: center;
  background-color: #e50914;
  position: relative;
  border: 3px solid #222;
}
.img-wrapper:hover {
  border: 3px solid #ccc;
}
img {
  filter: invert(1);
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}
.category-link {
  vertical-align: top;
  display: inline-block;
  margin: 1em;
  text-decoration: none;
}
@media only screen and (min-width: 1024px) {

  .image-category {
    max-height: 120px;
    max-width: 120px;
  }
  .category-title {
    width: 120px;
  }
  .img-wrapper {
    height: 120px;
    width: 120px;
  }
}
</style>
