<script>
import octotvServices from '../services/octotv'
import VideoLayout from '../components/VideoLayout/index.vue'
// import EndVideoLayout from '../components/EndVideoLayout/index.vue'
export default {
  name: 'Video',
  components: {
    VideoLayout
  },
  data () {
    return {
      status: {
        fullScreened: false,
        launched: false,
        apiLoaded: false,
        apiError: false,
        errorMessage: null
      },
      timeToRetrieve: null,
      video: null,
      displayOverlay: true,
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
      this.timeToRetrieve = this.localVideos[videoId].time
    }
  },
  computed: {
    videoId () {
      return this.$route.params.videoId
    },
    infos () {
      return {
        currentTime: (this.localVideos[this.videoId] && this.localVideos[this.videoId].time) || (this.$refs.video && this.$refs.video.currentTime),
        volume: this.$refs.video && this.$refs.video.volume
      }
    }
  },
  methods: {
    retrieveCurrentStorredTime (videoId = this.videoId) {
      if (this.$refs.video) {
        this.$refs.video.currentTime = this.timeToRetrieve
        this.timeToRetrieve = null
      }
    },
    manualTimeChanged (time) {
      this.$refs.video.currentTime = time
    },
    changeOverlayVisibility () {
      this.displayOverlay = !this.displayOverlay
    },
    getVideoURL () {
      return octotvServices.getVideoURL(this.video)
    },
    updateCurrentTime (event) {
      if (this.timeToRetrieve) {
        return this.retrieveCurrentStorredTime()
      }
      if (!this.infos || !this.$refs.videoLayout) {
        return false
      }
      const time = event.target.currentTime
      this.localVideos[this.videoId].time = time
      localStorage.videos = JSON.stringify(this.localVideos)
      this.infos.currentTime = time
      this.$refs.videoLayout.updateTime()
    },
    goBack () {
      this.$router.go(-1)
    },
    changeFullScreenStatus () {
      if (this.status.fullScreened) {
        document.exitFullscreen()
      } else {
        this.$refs.mainContainer.requestFullscreen()
      }
      this.status.fullScreened = !this.status.fullScreened
    },
    playOrPauseVideo () {
      if (!this.status.launched) {
        this.$refs.video.play()
      } else {
        this.$refs.video.pause()
      }
      this.status.launched = !this.status.launched
    },
    download () {
      window.open(this.video[this.video.names[0]].html5)
    },
    moveTimeFromVideo (seconds) {
      const currentTime = this.$refs.video.currentTime
      this.$refs.video.currentTime = currentTime + seconds
    },
    moveVolume (step) {
      const newVolume = Math.max(Math.min(this.$refs.video.volume * 100 + step, 100) / 100, 0)
      this.setVolume(newVolume)
    },
    setVolume (volume) {
      this.$refs.video.volume = volume
      this.infos.volume = volume
      this.$refs.videoLayout.updateVolume()
    },
    onkey (event) {
      if (event.code === 'Space') {
        this.playOrPauseVideo()
      }
      if (event.code === 'Backspace') {
        this.goBack()
      }
      if (event.code === 'ArrowRight') {
        this.moveTimeFromVideo(10)
      }
      if (event.code === 'ArrowLeft') {
        this.moveTimeFromVideo(-10)
      }
      if (event.code === 'ArrowUp') {
        this.moveVolume(5)
      }
      if (event.code === 'ArrowDown') {
        this.moveVolume(-5)
      }
    }
  },
  beforeDestroy: function () {
    window.removeEventListener('keydown', this.onkey)
  }
}
</script>

<template>
  <div ref="mainContainer">
    <div v-if="!status.apiLoaded">
      loading
    </div>
    <div v-else-if="status.apiError">
      Video non disponible<br>
      {{status.errorMessage}}
    </div>
    <div v-else>
     <video-layout
     ref="videoLayout"
     :playing="status.launched"
     :video="video"
     :fullScreened="status.fullScreened"
     title="titre"
     :infos="infos"
     @preview="goBack()"
     @playOrPause="playOrPauseVideo()"
     @timeChange="manualTimeChanged"
     @volumeChange="setVolume"
     @moveTime="moveTimeFromVideo"
     @download="download()"
     @changeScreenSize="changeFullScreenStatus()"
     ></video-layout>
      <div class="video--container full-screen">
        <video
        @loadstart="retrieveCurrentStorredTime()"
        @timeupdate="updateCurrentTime"
        @click="changeOverlayVisibility()"
        class="full-screen"
        ref="video"
        poster="../assets/chargement.gif"
        :src="getVideoURL()"
        ></video>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
</style>
