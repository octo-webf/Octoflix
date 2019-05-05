<template>
  <div>
    <div v-if="!error && !loading" >
      <div id="top_overlay" class="clickable" v-show="displayOverlay" @click="goBack()">➔</div>
      <div id="playing_overlay" v-show="!isVideoLaunched" @click="playOrPauseVideo()" class="clickable">►</div>
      <nav id="bottom_overlay" v-show="displayOverlay">
        <ul>
        <progress v-if="$refs.video" :max="$refs.video.duration" :value="videoTime"></progress>
        <li class="clickable" @click="playOrPauseVideo()"><span v-if="!isVideoLaunched">►</span><span v-else>▌▌</span></li>
        <li class="clickable" @click="moveTimeFromVideo(-10)">⟲</li>
        <li class="clickable" @click="moveTimeFromVideo(10)">⟳</li>
        <li class="title-container"><span class="title">titre</span></li>
        <li class="clickable" @click="download()">⇩</li>
        <li>🔊<input v-if="$refs.video" type="range" v-model="$refs.video.volume" step="0.01" min="0" max="1" /></li>
        <li class="clickable" @click="fullScreenVideo()">⇲</li>
        </ul>
      </nav>
      <div class="video--container full-screen">
        <video @timeupdate="updateVideoBar()" @click="playOrPauseVideo" class="full-screen" ref="video" poster="../assets/background.png" :src="video[video.names[0]].html5"></video>
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
      loading: true,
      displayOverlay: true,
      isVideoLaunched: false,
      videoTime: 0
    }
  },
  async created () {
    try {
      this.video = await octotvServices.getVideoInformations(this.$route.params.videoId)
      window.addEventListener('keydown', this.onkey)
    } catch (e) {
      this.error = true
    } finally {
      this.loading = false
    }
  },
  methods: {
    updateVideoBar(){
      this.videoTime = this.$refs.video.currentTime
    },
    goBack() {
      this.$router.go(-1)
    },
    pauseVideo() {
      this.$refs.video.pause()
      this.isVideoLaunched = false
    },
    fullScreenVideo() {
      this.$refs.video.requestFullscreen()
    },
    playOrPauseVideo() {
      if (!this.isVideoPlaying()) {
        this.playVideo()
      } else {
        this.pauseVideo()
      }
    },
    download() {
      window.open(this.video[this.video.names[0]].html5)
    },
    playVideo() {
      this.$refs.video.play()
      this.isVideoLaunched = true
    },
    isVideoPlaying() {
      return !this.$refs.video.paused
    },
    moveTimeFromVideo(seconds) {
      const currentTime = this.$refs.video.currentTime
      this.$refs.video.currentTime = currentTime+seconds
    },
    downVolume(step) {
      this.setVolume(Math.max(this.$refs.video.volume*100-step, 0)/100)
    },
    upVolume(step){
      this.setVolume(Math.min(this.$refs.video.volume*100+step, 100)/100)
    },
    setVolume(volume){
      this.$refs.video.volume = volume
    },
    onkey (event) {
      if (event.code ==='Space') {
        this.playOrPauseVideo()
      }
      if (event.code ==='Backspace') {
        this.goBack()
      }
      if (event.code ==='ArrowRight') {
        this.moveTimeFromVideo(10)
      }
      if (event.code ==='ArrowLeft') {
        this.moveTimeFromVideo(-10)
      }
      if (event.code ==='ArrowUp') {
        this.upVolume(10)
      }
      if (event.code ==='ArrowDown') {
        this.downVolume(10)
      }
    }
  },
  beforeDestroy: function () {
    window.removeEventListener('keydown', this.onkey)
  },
}
</script>

<style scoped>
  progress {
    background-color: white;
    display: block;
    width: 100%;
    height:2px;
    background: #444;
    border-radius: 14px;
  }
  progress::-webkit-progress-value {
    border-radius: 12px;
    background: red;
  }
  .video--container .full-screen {
    height: 100%;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    transform: none;
    background-color: black;
  }
  #playing_overlay {
    font-size: 5em;
    text-align: center;
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 25%;
    min-width: 100px;
    max-width: 150px;
    opacity: 0.6;
    background-color:#000;
    z-index:300000;
    border: 5px solid white;
    border-radius: 15%;
  }
  #bottom_overlay {
    font-size: 2em;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    padding: 10px;
    line-height: 50px;
    color: white;
    background-color: transparent;
    z-index:300000;
  }
  #top_overlay {
    transform: rotate(180deg);
    color: white;
    position: absolute;
    top: 0;
    left: 15px;
    font-size: 3em;
    z-index:1000;
  }
  @media only screen and (min-width: 1024px) {
    #playing_overlay {
      font-size: 10em;
      min-width: 200px;
      min-height: 200px;
      max-width: 300px;
    }
  }
  ul {
    margin: 0;
  }
  li {
    display: inline-block;
    margin-right: 1em;
  }
  .clickable{
    cursor: pointer;
  }
</style>
