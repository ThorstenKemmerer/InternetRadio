<template>
  <div class="radio-player">
    <div class="player-info" v-if="currentStation">
      <img v-if="currentStation.imageUrl" :src="currentStation.imageUrl" :alt="currentStation.name" class="station-image" />
      <div class="station-details">
        <h2>{{ currentStation.name }}</h2>
        <p class="genre">{{ currentStation.genre }} • {{ currentStation.country }}</p>
        <p class="description">{{ currentStation.description }}</p>
      </div>
    </div>
    
    <div class="player-controls">
      <audio ref="audioPlayer" :src="currentStation?.streamUrl" @error="handleError"></audio>
      
      <button @click="togglePlay" class="play-button">
        {{ isPlaying ? '⏸ Pause' : '▶ Play' }}
      </button>
      
      <div class="volume-control">
        <span>🔊</span>
        <input 
          type="range" 
          min="0" 
          max="100" 
          v-model="volume" 
          @input="updateVolume"
          class="volume-slider"
        />
        <span>{{ volume }}%</span>
      </div>
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'RadioPlayer',
  props: {
    currentStation: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      isPlaying: false,
      volume: 75,
      error: null
    }
  },
  watch: {
    currentStation(newStation) {
      if (newStation && this.isPlaying) {
        this.$nextTick(() => {
          this.play();
        });
      }
    }
  },
  methods: {
    togglePlay() {
      if (!this.currentStation) {
        this.error = 'Please select a radio station first';
        return;
      }
      
      if (this.isPlaying) {
        this.pause();
      } else {
        this.play();
      }
    },
    play() {
      this.error = null;
      const audio = this.$refs.audioPlayer;
      audio.play()
        .then(() => {
          this.isPlaying = true;
        })
        .catch(err => {
          this.error = 'Failed to play stream: ' + err.message;
          this.isPlaying = false;
        });
    },
    pause() {
      const audio = this.$refs.audioPlayer;
      audio.pause();
      this.isPlaying = false;
    },
    updateVolume() {
      const audio = this.$refs.audioPlayer;
      audio.volume = this.volume / 100;
    },
    handleError(e) {
      this.error = 'Stream error. This station may be unavailable.';
      this.isPlaying = false;
    }
  },
  mounted() {
    this.updateVolume();
  }
}
</script>

<style scoped>
.radio-player {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
}

.player-info {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  align-items: flex-start;
}

.station-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.station-details h2 {
  margin: 0 0 10px 0;
  font-size: 28px;
}

.genre {
  margin: 5px 0;
  opacity: 0.9;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.description {
  margin: 10px 0 0 0;
  opacity: 0.8;
  line-height: 1.5;
}

.player-controls {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.play-button {
  background: white;
  color: #667eea;
  border: none;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.play-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.play-button:active {
  transform: translateY(0);
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 200px;
}

.volume-slider {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.3);
  outline: none;
  -webkit-appearance: none;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.volume-slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.error-message {
  margin-top: 15px;
  padding: 10px;
  background: rgba(255, 0, 0, 0.2);
  border-radius: 5px;
  border-left: 4px solid #ff4444;
}
</style>
