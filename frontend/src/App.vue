<template>
  <div
    id="app"
    class="mx-auto max-w-6xl px-5"
  >
    <div class="scanline-overlay" />
    <header class="text-center mb-10 py-8">
      <img
        src="/src/assets/neon-logo.svg"
        alt="Neon Logo"
        class="mx-auto w-40 mb-4"
      >
      <h1 class="text-5xl font-extrabold neon-heading neon-text mb-2">
        🎵 Internet Radio
      </h1>
      <p class="text-neon-cyan opacity-90 text-lg">
        Listen to radio streams from around the world
      </p>
    </header>

    <main class="mb-10">
      <RadioPlayer 
        :current-station="currentStation"
      />
      
      <StationList 
        :stations="stations"
        :tags="tags"
        :countries="countries"
        :pagination="pagination"
        :current-station="currentStation"
        :loading="loading"
        @select-station="handleSelectStation"
        @filters-changed="handleFiltersChanged"
        @page-changed="handlePageChanged"
      />
    </main>

    <footer class="text-center py-5 text-gray-500 border-t border-gray-200 mt-10">
      <p class="text-sm">
        Internet Radio App • Built with MEVN Stack (MongoDB, Express, Vue, Node.js)
      </p>
    </footer>
  </div>
</template>

<script>
import RadioPlayer from './components/RadioPlayer.vue'
import StationList from './components/StationList.vue'
import { stationService } from './services/api'

export default {
  name: 'App',
  components: {
    RadioPlayer,
    StationList
  },
  data() {
    return {
      stations: [],
      tags: [],
      countries: [],
      pagination: {
        page: 1,
        limit: 50,
        total: 0,
        totalPages: 0
      },
      selectedTag: '',
      selectedCountry: '',
      currentStation: null,
      loading: true
    }
  },
  mounted() {
    this.loadFilters();
    this.loadStations({ resetSelection: true });
  },
  methods: {
    async loadFilters() {
      try {
        const [countries, tags] = await Promise.all([
          stationService.getCountries(),
          stationService.getTags()
        ]);
        this.countries = countries.map(country => country.code);
        this.tags = tags;
      } catch (error) {
        console.error('Failed to load filters:', error);
      }
    },
    async loadStations({ resetSelection = false } = {}) {
      try {
        this.loading = true;
        const response = await stationService.getStations({
          page: this.pagination.page,
          limit: this.pagination.limit,
          tag: this.selectedTag,
          country: this.selectedCountry
        });
        this.stations = response.stations;
        this.pagination = response.pagination;
        
        if (resetSelection) {
          this.currentStation = this.stations[0] || null;
        } else if (!this.currentStation && this.stations.length > 0) {
          this.currentStation = this.stations[0];
        }
      } catch (error) {
        console.error('Failed to load stations:', error);
        alert('Failed to load radio stations. Please make sure the backend server is running.');
      } finally {
        this.loading = false;
      }
    },
    handleFiltersChanged({ tag, country }) {
      this.selectedTag = tag;
      this.selectedCountry = country;
      this.pagination.page = 1;
      this.loadStations({ resetSelection: true });
    },
    handlePageChanged(page) {
      this.pagination.page = page;
      this.loadStations();
    },
    handleSelectStation(station) {
      this.currentStation = station;
    }
  }
}
</script>

<!-- Styles migrated to src/index.css (Tailwind + small custom rules) -->
