<template>
  <div class="radio-player neon-card p-4 rounded-lg">
    <div class="player-info" v-if="currentStation">
      <img v-if="currentStation.imageUrl" :src="currentStation.imageUrl" :alt="currentStation.name" class="w-32 h-32 object-cover rounded-md shadow-md neon-glow" />
      <div class="station-details ml-4">
        <h2 class="text-2xl font-semibold neon-text">{{ currentStation.name }}</h2>
        <p class="text-sm uppercase tracking-wide opacity-90 text-neon-magenta">{{ currentStation.genre }} • {{ currentStation.country }}</p>
        <p class="mt-2 text-sm opacity-80">{{ currentStation.description }}</p>
      </div>
    </div>
    
    <div class="player-controls flex items-center gap-4 flex-wrap mt-4">
      <audio ref="audioPlayer" :src="currentStation?.streamUrl" @error="handleError"></audio>
      
      <button @click="togglePlay" class="neon-btn font-bold hover:neon-glow transition transform">
        {{ isPlaying ? '⏸ Pause' : '▶ Play' }}
      </button>
      
      <div class="volume-control flex items-center gap-3 flex-1 min-w-[180px]">
        <span>🔊</span>
        <input 
          type="range" 
          min="0" 
          max="100" 
          v-model="volume" 
          @input="updateVolume"
          class="volume-slider"
        />
        <span class="text-white">{{ volume }}%</span>
      </div>
    </div>

    <div v-if="error" class="error-message text-sm">
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

<!-- Styles moved to global index.css; components use Tailwind utilities -->
