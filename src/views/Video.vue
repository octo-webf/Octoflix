<template>
  <div>
    <div v-if="!error && !loading" >
      <div id="video_overlays"></div>
      <div>
        <video controls :src="video[video.names[0]].html5"></video>
      </div>
    </div>
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
  video {
    max-width: 100%;
    max-height: 100%;
  }
  #video_overlays {
    float:right;
    width:200px;
    height:200px;
    opacity: 0.6;
    background-color:#000;
    z-index:300000;
  }
</style>
