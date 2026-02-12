<template>
  <div class="radio-player neon-card p-4 rounded-lg">
    <div
      v-if="currentStation"
      class="player-info"
    >
      <img
        v-if="currentStation.url_favicon"
        :src="currentStation.url_favicon"
        :alt="currentStation.name"
        class="w-32 h-32 object-cover rounded-md shadow-md neon-glow"
      >
      <div class="station-details ml-4">
        <h2 class="text-2xl font-semibold neon-text">
          {{ currentStation.name }}
        </h2>
        <p class="text-sm uppercase tracking-wide opacity-90 text-neon-magenta">
          {{ tagLine }} • {{ locationLabel }}
        </p>
        <p
          v-if="currentStation.url_homepage"
          class="mt-2 text-sm opacity-90"
        >
          <a
            :href="currentStation.url_homepage"
            class="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit station homepage
          </a>
        </p>
      </div>
    </div>
    
    <div class="player-controls flex items-center gap-4 flex-wrap mt-4">
      <audio
        ref="audioPlayer"
        :src="currentStation?.url_stream"
        @error="handleError"
      />
      
      <button
        class="neon-btn font-bold hover:neon-glow transition transform"
        @click="togglePlay"
      >
        {{ isPlaying ? '⏸ Pause' : '▶ Play' }}
      </button>
      
      <div class="volume-control flex items-center gap-3 flex-1 min-w-[180px]">
        <span>🔊</span>
        <input 
          v-model="volume" 
          type="range" 
          min="0" 
          max="100" 
          class="volume-slider"
          @input="updateVolume"
        >
        <span class="text-white">{{ volume }}%</span>
      </div>
    </div>

    <div
      v-if="error"
      class="error-message text-sm"
    >
      {{ error }}
    </div>
  </div>
</template>

<script>
import { getCountryName, getSubdivisionName } from '../utils/countryLookup';

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
  computed: {
    tagLine() {
      if (!this.currentStation?.tags) {
        return 'Uncategorized';
      }

      const tags = this.currentStation.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean);

      return tags.length > 0 ? tags.join(' / ') : 'Uncategorized';
    }
    ,
    locationLabel() {
      const station = this.currentStation;
      if (!station) return 'Unknown location';

      const sub = getSubdivisionName(station.iso_3166_2);
      if (sub) return sub;

      return this.getCountryLabel(station.iso_3166_1) || 'Unknown country';
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
  mounted() {
    this.updateVolume();
  },
  methods: {
    getCountryLabel(code) {
      return getCountryName(code) || code || 'Unknown country';
    },
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
    handleError() {
      this.error = 'Stream error. This station may be unavailable.';
      this.isPlaying = false;
    }
  }
}
</script>

<!-- Styles moved to global index.css; components use Tailwind utilities -->
