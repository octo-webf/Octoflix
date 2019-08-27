<script>
export default {
  name: 'VideoLayout',
  props: {
    title: String,
    video: Object,
    playing: Boolean,
    fullScreened: Boolean,
    infos: Object
  },
  data () {
    return {
      currentTime: this.infos && this.infos.currentTime,
      currentVolume: this.infos && this.infos.volume
    }
  },
  methods: {
    updateTime () {
      this.currentTime = this.infos && this.infos.currentTime
    },
    updateVolume () {
      this.currentVolume = this.infos && this.infos.volume
    }
  }
}
</script>

<template>
    <div class="overlay">
        <div
            id="top_overlay"
            class="clickable"
            @click="$emit('preview')"
            data-test="preview-button"
            >
            ➔
        </div>
        <div
            id="playing_overlay"
            @click="$emit('playOrPause')"
            class="clickable"
            data-test="playable-main-button"
            v-if="!playing"
            >
            ►
        </div>
        <nav id="bottom_overlay">
            <span class="timer">{{infos && Math.round(infos.currentTime)}}/{{infos && Math.round(this.video.duration)}}</span>
            <input
                @keydown.prevent=""
                class="clickable progress"
                ref="playerSlider"
                v-if="video"
                type="range"
                @change="$emit('timeChange', currentTime)"
                v-model="currentTime"
                step="1"
                min="0"
                @select.prevent=""
                :max="video.duration"
                data-test="player-slider-input"
            />
            <ul>
                <li
                    class="clickable"
                    @click="$emit('playOrPause')"
                    data-test="playable-button"
                >
                    <span v-if="!playing">►</span>
                    <span v-else>▌▌</span>
                </li>
                <li
                class="clickable"
                @click="$emit('moveTime', -10)"
                data-test="back-time-button"
                >
                    ⟲
                </li>
                <li
                    class="clickable"
                    @click="$emit('moveTime', 10)"
                    data-test="next-time-button"
                >
                    ⟳
                </li>
                <li class="title-container">
                    <span class="title" data-test="title-display">{{title}}</span>
                </li>
                <li
                    class="clickable"
                    @click="$emit('download')"
                    data-test="download-button"
                    >
                    ⇩
                </li>
                <li>🔊<input
                @keydown.prevent=""
                type="range"
                @change="$emit('volumeChange', currentVolume)"
                v-model="currentVolume"
                step="0.01"
                min="0"
                max="1"
                data-test="audio-slider-input"
                /></li>
                <li
                    class="clickable"
                    @click="$emit('changeScreenSize')"
                    data-test="screen-change-button"
                >
                    <span v-if="fullScreened">⇱</span>
                    <span v-else>⇲</span>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
ul {
  margin: 0;
}
li {
  display: inline-block;
  margin-right: 1em;
}
.clickable {
  cursor: pointer;
}
.timer {
  margin-top: -50px;
  color: white;
  font-size: 0.5em;
  float: left;
  margin-left: 5%;
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
  z-index: 300000;
}
#top_overlay {
  transform: rotate(180deg);
  color: white;
  position: absolute;
  top: 0;
  left: 15px;
  font-size: 3em;
  z-index: 1000;
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
  background-color: #000;
  z-index: 300000;
  border: 5px solid white;
  border-radius: 15%;
}
@media only screen and (min-width: 1024px) {
  #playing_overlay {
    font-size: 10em;
    min-width: 200px;
    min-height: 200px;
    max-width: 300px;
  }
}
.progress {
  display: block;
  width: 90%;
  margin: auto;
  height: 10px;
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
</style>
