<template>
  <div>
    <article v-for="video in videos" :key="video.oid">
      <router-link :to="{ name: 'video', params: { videoId: video.oid } }">
        <figure>
          <img :src="video.thumb" :alt="video.title">
          <figcaption>{{ video.title }}</figcaption>
          <progress :max="convertVideoTime(video.duration)" :value="localVideos && localVideos[video.oid] && Math.abs(localVideos[video.oid].time)"></progress>
        </figure>
      </router-link>
    </article>
  </div>
</template>

<script>
import octotvServices from '../services/octotv'

export default {
  name: 'Category',
  data() {
    return {
      videos: undefined,
      localVideos: undefined
    }
  },
  methods: {
    convertVideoTime(time){
      return octotvServices.getVideoTime(time)
    }
  },
  async created () {
    this.videos = await octotvServices.getVideos(this.$route.params.categoryId)
  },
  beforeMount () {
    this.localVideos = JSON.parse(localStorage.videos)
  }
}
</script>

<style scoped>
  progress {
    display: block;
    width: 100%;
    height:2px;
    background: #444;
    border-radius: 14px;
  }
  article {
    display: inline-block;
    position: relative;
    margin: 30px;
  }
  figure {
    display: inline-block;
    margin: 0;
  }
  img {
    width: 240px;
  }
  figcaption {
    overflow: hidden;
    position: absolute;
    top: 15%;
    padding: 5px 30px;
    color: white;
    background-color: rgba(1,1,1,0.8);
    width: 180px;
    text-align: center;
  }
</style>
