<template>
  <div>
    <div v-for="video in videos" :key="video.oid">
      <router-link :to="{ name: 'video', params: { videoId: video.oid } }">
        <div>{{ video.title }}</div>
        <img :src="video.thumb" :alt="video.title">
      </router-link>
    </div>
  </div>
</template>

<script>
import octotvServices from '../services/octotv'

export default {
  name: 'Category',
  data() {
    return {
      videos: undefined
    }
  },
  async created () {
    this.videos = await octotvServices.getVideos(this.$route.params.categoryId)
  }
}
</script>

<style scoped>

</style>
