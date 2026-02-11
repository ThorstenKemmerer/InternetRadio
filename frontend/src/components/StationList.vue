<template>
  <div class="station-list">
    <div class="filters flex gap-4 mb-4 flex-wrap">
      <div class="filter-group flex flex-col gap-2 flex-1 min-w-[200px]">
        <label class="font-semibold text-gray-700">Filter by Genre:</label>
        <select v-model="selectedGenre" class="p-2 border rounded-md">
          <option value="">All Genres</option>
          <option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</option>
        </select>
      </div>

      <div class="filter-group flex flex-col gap-2 flex-1 min-w-[200px]">
        <label class="font-semibold text-gray-700">Filter by Country:</label>
        <select v-model="selectedCountry" class="p-2 border rounded-md">
          <option value="">All Countries</option>
          <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
        </select>
      </div>
    </div>

    <div v-if="loading" class="text-center p-10 text-lg text-gray-600">Loading stations...</div>

    <div v-else class="stations-grid grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="station in filteredStations"
        :key="station._id"
        class="station-card neon-card p-4 cursor-pointer transition transform hover:-translate-y-1 hover:shadow-lg border border-transparent"
        :class="{ '!border-neon-magenta bg-[rgba(255,45,149,0.04)]': currentStation?._id === station._id }"
        @click="selectStation(station)">
        <div class="station-card-image w-full h-36 mb-3 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
          <img v-if="station.imageUrl" :src="station.imageUrl" :alt="station.name" class="w-full h-full object-cover" />
          <div v-else class="no-image text-4xl">📻</div>
        </div>
        <div class="station-card-content">
          <h3 class="text-lg font-semibold text-gray-800">{{ station.name }}</h3>
          <p class="station-meta flex gap-2 mt-2 flex-wrap">
            <span class="genre-badge neon-badge px-2 py-0.5 rounded-full text-xs font-bold">{{ station.genre }}</span>
            <span class="country-flag text-gray-600 text-sm">{{ station.country }}</span>
          </p>
          <p class="station-language text-sm text-gray-500 mt-2">{{ station.language }} • {{ station.bitrate }}</p>
        </div>
      </div>
    </div>

    <div v-if="!loading && filteredStations.length === 0" class="text-center p-10 text-gray-500">No stations found for the selected filters.</div>
  </div>
</template>

<script>
export default {
  name: 'StationList',
  props: {
    stations: {
      type: Array,
      required: true
    },
    currentStation: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedGenre: '',
      selectedCountry: ''
    }
  },
  computed: {
    genres() {
      return [...new Set(this.stations.map(s => s.genre))].sort();
    },
    countries() {
      return [...new Set(this.stations.map(s => s.country))].sort();
    },
    filteredStations() {
      let filtered = this.stations;

      if (this.selectedGenre) {
        filtered = filtered.filter(s => s.genre === this.selectedGenre);
      }

      if (this.selectedCountry) {
        filtered = filtered.filter(s => s.country === this.selectedCountry);
      }

      return filtered;
    }
  },
  methods: {
    selectStation(station) {
      this.$emit('select-station', station);
    }
  }
}
</script>

<!-- Styles moved to global index.css; components use Tailwind utilities -->
