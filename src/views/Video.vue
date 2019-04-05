<template>
  <div>
    <video v-if="!error && !loading" controls :src="video[video.names[0]].html5"></video>
    <div v-else> Video non disponible</div>
  </div>
</template>

<script>
import octotvServices from '../services/octotv'

export default {
  name: 'Video',
  data() {
    return {
      video: {},
      error: false,
      loading: true
    }
  },
  async created () {
    try {
      this.video = await octotvServices.getVideoInformations(this.$route.params.videoId)
    } catch (e) {
      this.error = true
    } finally {
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>
