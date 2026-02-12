<template>
  <div class="radio-player neon-card p-4 rounded-lg">
    <div
      v-if="currentStation"
      class="player-info flex items-start gap-3"
    >
      <div class="w-32 h-32 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
        <img
          v-if="currentStation.url_favicon"
          :src="currentStation.url_favicon"
          :alt="currentStation.name"
          class="w-full h-full object-contain"
        >
        <div
          v-else
          class="text-2xl font-semibold text-gray-700"
        >
          {{ getStationInitial(currentStation) }}
        </div>
      </div>
      <div class="station-details flex flex-col gap-2">
        <h2 class="text-2xl font-semibold neon-text">
          {{ currentStation.name }}
        </h2>
        <div class="station-tags flex gap-2 flex-wrap">
          <span
            v-for="tag in getStationTagsLimited(currentStation)"
            :key="tag"
            class="genre-badge neon-badge px-2 py-0.5 rounded-full text-xs font-bold"
          >
            {{ tag }}
          </span>
          <span
            v-if="getStationTags(currentStation).length === 0"
            class="genre-badge neon-badge px-2 py-0.5 rounded-full text-xs font-bold"
          >
            Uncategorized
          </span>
        </div>
        <div class="text-sm text-gray-600">
          {{ currentStation?.iso_3166_1 || 'N/A' }}
        </div>
        <div class="text-sm">
          <a
            v-if="currentStation.url_homepage"
            :href="currentStation.url_homepage"
            class="text-gray-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Homepage
          </a>
          <span v-else class="text-gray-500">No homepage</span>
        </div>
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
    getStationInitial(station) {
      const name = station?.name ? station.name.trim() : '';
      return name ? name[0].toUpperCase() : '?';
    },
    getStationTags(station) {
      if (!station?.tags) {
        return [];
      }
      return station.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    },
    getStationTagsLimited(station) {
      return this.getStationTags(station).slice(0, 5);
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
