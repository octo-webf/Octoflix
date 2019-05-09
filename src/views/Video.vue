<template>
  <div ref="mainContainer">
    <div v-if="!status.apiLoaded">
      loading
    </div>
    <div v-else-if="status.apiError">Video non disponible</div>
    <div v-else>
      <div class="overlay">
        <div id="top_overlay" class="clickable" v-show="displayOverlay" @click="goBack()">➔</div>
        <div id="playing_overlay" v-show="!status.launched" @click="playOrPauseVideo()" class="clickable">►</div>
        <nav id="bottom_overlay" v-show="displayOverlay">
          <progress v-if="$refs.video" :max="$refs.video.duration" :value="currentTime"></progress>
          <input class="progress" v-if="$refs.video" type="range" v-model="$refs.video.currentTime" step="10" min="0" :max="$refs.video.duration" />
          <ul>
            <li class="clickable" @click="playOrPauseVideo()"><span v-if="!status.launched">►</span><span v-else>▌▌</span></li>
            <li class="clickable" @click="moveTimeFromVideo(-10)">⟲</li>
            <li class="clickable" @click="moveTimeFromVideo(10)">⟳</li>
            <li class="title-container"><span class="title">titre</span></li>
            <li class="clickable" @click="download()">⇩</li>
            <li>🔊<input v-if="$refs.video" type="range" v-model="$refs.video.volume" step="0.01" min="0" max="1" /></li>
            <li v-if="!status.fullScreened" class="clickable" @click="goToFullScreen()">⇱</li>
            <li v-else class="clickable" @click="exitFullScreen()">⇲</li>
          </ul>
        </nav>
      </div>
      <div class="video--container full-screen">
        <video @timeupdate="updateVideoBar() & updateCurrentTimeSaved()" @click="playOrPauseVideo" class="full-screen" ref="video" poster="../assets/background.png" :src="getVideoURL()"></video>
      </div>
    </div>
  </div>
</template>

<script>
import octotvServices from '../services/octotv'

export default {
  name: 'Video',
  data() {
    return {
      status: {
        fullScreened: false,
        launched: false,
        apiLoaded: false,
        apiError: false
      },
      video: null,
      displayOverlay: true,
      currentTime: 0,
      localVideos: []
    }
  },
  async created () {
    console.log('created')
    try {
      window.addEventListener('keydown', this.onkey)
      this.video = await octotvServices.getVideoInformations(this.videoId)
    } catch (e) {
      this.status.apiError = true
    } finally {
      console.log('finaly')
      this.status.apiLoaded = true
    }
  },
  beforeMount () {
    console.log('beforeMount')
    const videoId = this.videoId
    this.localVideos = JSON.parse(localStorage.videos)
    this.localVideos[videoId] = this.localVideos[videoId] || {}
    if (this.localVideos[videoId].time) {
      this.currentTime = this.localVideos[videoId].time
      //    this.$refs.video.currentTime = this.currentTime
    }
  },
  computed: {
    videoId () {
      return this.$route.params.videoId
    }
  },
  methods: {
    updateVideoBar(){
      this.currentTime = this.$refs.video.currentTime
    },
    getVideoURL(){
      return octotvServices.getVideoURL(this.video)
    },
    updateCurrentTimeSaved(){
      this.localVideos[this.videoId].time = this.$refs.video.currentTime
      localStorage.videos = JSON.stringify(this.localVideos)
    },
    goBack() {
      this.$router.go(-1)
    },
    goToFullScreen() {
      try {
        this.$refs.mainContainer.requestFullscreen()
        this.status.fullScreened = true
      } catch (e) {
        //do nothing
      }
    },
    exitFullScreen() {
      try {
        document.exitFullscreen()
        this.status.fullScreened = false
      } catch (e) {
        //do nothing
      }
    },
    playOrPauseVideo() {
      if (!this.status.launched) {
        this.$refs.video.play()
      } else {
        this.$refs.video.pause()
      }
      this.status.launched = !this.status.launched
    },
    download() {
      window.open(this.video[this.video.names[0]].html5)
    },
    moveTimeFromVideo(seconds) {
      const currentTime = this.$refs.video.currentTime
      this.$refs.video.currentTime = currentTime+seconds
    },
    moveVolume(step) {
      const newVolume = Math.max(Math.min(this.$refs.video.volume*100+step, 100)/100, 0)
      this.setVolume(newVolume)
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
        this.moveVolume(5)
      }
      if (event.code ==='ArrowDown') {
        this.moveVolume(-5)
      }
    }
  },
  beforeDestroy: function () {
    window.removeEventListener('keydown', this.onkey)
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
  .progress {
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
