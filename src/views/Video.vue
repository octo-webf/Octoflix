<template>
  <div ref="mainContainer">
    <div v-if="!status.apiLoaded">
      loading
    </div>
    <div v-else-if="status.apiError">
      Video non disponible
      {{errorMessage}}
    </div>
    <div v-else>
      <div class="overlay">
        <div id="top_overlay" class="clickable" v-show="displayOverlay" @click="goBack()">➔</div>
        <div id="playing_overlay" v-show="!status.launched" @click="playOrPauseVideo()" class="clickable">►</div>
        <nav id="bottom_overlay" v-show="displayOverlay">
          <input class="progress" ref="playerSlider" v-if="$refs.video" type="range" @mousedown="mouseStatus(true)" @mouseup="mouseStatus(false)" @keydown.prevent="" @change="manualTimeChanged()" v-model="currentTime" step="1" min="0" :max="$refs.video.duration" />
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
        <video @loadstart="retrieveCurrentTime()" @timeupdate="updateCurrentTime()" @click="changeOverlayVisibility()" class="full-screen" ref="video" poster="../assets/background.png" :src="getVideoURL()"></video>
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
        shown: false,
        fullScreened: false,
        launched: false,
        apiLoaded: false,
        apiError: false,
        mouseDown: false,
        errorMessage: null
      },
      video: null,
      displayOverlay: true,
      currentTime: 0,
      localVideos: []
    }
  },
  async created () {
    try {
      window.addEventListener('keydown', this.onkey)
      this.video = await octotvServices.getVideoInformations(this.videoId)
    } catch (e) {
      this.status.apiError = true
      this.status.errorMessage = e
    } finally {
      this.status.apiLoaded = true
    }
  },
  beforeMount () {
    const videoId = this.videoId
    this.localVideos = JSON.parse(localStorage.videos)
    this.localVideos[videoId] = this.localVideos[videoId] || {}
    if (this.localVideos[videoId].time) {
      this.currentTime = this.localVideos[videoId].time
    }
  },
  computed: {
    videoId () {
      return this.$route.params.videoId
    }
  },
  methods: {
    retrieveCurrentTime(){
      this.$refs.video.currentTime = this.localVideos[this.videoId].time
    },
    mouseStatus(mouseDown){
      this.status.mouseDown = mouseDown
    },
    manualTimeChanged() {
      this.$refs.video.currentTime = this.currentTime
    },
    changeOverlayVisibility() {
      this.displayOverlay = !this.displayOverlay
    },
    getVideoURL(){
      return octotvServices.getVideoURL(this.video)
    },
    updateCurrentTime(){
      if (!this.status.mouseDown) {
        this.currentTime = this.$refs.video.currentTime
      }
    },
    goBack() {
      this.$router.go(-1)
    },
    goToFullScreen() {
      this.$refs.mainContainer.requestFullscreen()
      this.status.fullScreened = true
    },
    exitFullScreen() {
      document.exitFullscreen()
      this.status.fullScreened = false
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
  },
  watch: {
    currentTime: function (time) {
      this.localVideos[this.videoId].time = time
      localStorage.videos = JSON.stringify(this.localVideos)
    }
  }
}
</script>

<style scoped>
  .progress {
    display: block;
    width: 90%;
    margin: auto;
    height:10px;
  }
  input[type=range].progress {
    -webkit-appearance: none;
      background: transparent;
  }
  input[type=range]::-webkit-slider-thumb.progress {
    -webkit-appearance: none;
  }
  input[type=range].progress:focus {
    outline: none;
  }
  input[type=range].progress::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: 1px solid #FF4338;
    height: 25px;
    width: 25px;
    border-radius: 100%;
    background: #FF4338;
    cursor: pointer;
    margin-top: -10px;
    box-shadow: 2px 2px 0 #000, -2px -2px 0 #000;
  }
  input[type=range].progress::-webkit-slider-runnable-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    background: #3071a9;
    border-radius: 3px;
    border: 0.2px solid #010101;
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
