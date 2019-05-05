<template>
  <div>
    <article v-for="video in videos" :key="video.oid">
      <router-link :to="{ name: 'video', params: { videoId: video.oid } }">
        <figure>
          <img :src="video.thumb" :alt="video.title">
          <figcaption>{{ video.title }}</figcaption>
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
      videos: undefined
    }
  },
  async created () {
    this.videos = await octotvServices.getVideos(this.$route.params.categoryId)
  }
}
</script>

<style scoped>
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
