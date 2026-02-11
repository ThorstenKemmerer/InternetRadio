<template>
  <div id="app" class="mx-auto max-w-6xl px-5">
    <div class="scanline-overlay"></div>
    <header class="text-center mb-10 py-8">
      <img src="/src/assets/neon-logo.svg" alt="Neon Logo" class="mx-auto w-40 mb-4" />
      <h1 class="text-5xl font-extrabold neon-heading neon-text mb-2">🎵 Internet Radio</h1>
      <p class="text-neon-cyan opacity-90 text-lg">Listen to radio streams from around the world</p>
    </header>

    <main class="mb-10">
      <RadioPlayer 
        :currentStation="currentStation"
      />
      
      <StationList 
        :stations="stations"
        :currentStation="currentStation"
        :loading="loading"
        @select-station="handleSelectStation"
      />
    </main>

    <footer class="text-center py-5 text-gray-500 border-t border-gray-200 mt-10">
      <p class="text-sm">Internet Radio App • Built with MEVN Stack (MongoDB, Express, Vue, Node.js)</p>
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
      currentStation: null,
      loading: true
    }
  },
  methods: {
    async loadStations() {
      try {
        this.loading = true;
        this.stations = await stationService.getAllStations();
        
        // Auto-select first station if available
        if (this.stations.length > 0 && !this.currentStation) {
          this.currentStation = this.stations[0];
        }
      } catch (error) {
        console.error('Failed to load stations:', error);
        alert('Failed to load radio stations. Please make sure the backend server is running.');
      } finally {
        this.loading = false;
      }
    },
    handleSelectStation(station) {
      this.currentStation = station;
    }
  },
  mounted() {
    this.loadStations();
  }
}
</script>

<!-- Styles migrated to src/index.css (Tailwind + small custom rules) -->
