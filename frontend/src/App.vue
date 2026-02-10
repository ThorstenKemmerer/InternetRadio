<template>
  <div id="app">
    <header class="app-header">
      <h1>🎵 Internet Radio</h1>
      <p>Listen to radio streams from around the world</p>
    </header>

    <main class="app-main">
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

    <footer class="app-footer">
      <p>Internet Radio App • Built with MEVN Stack (MongoDB, Express, Vue, Node.js)</p>
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

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: linear-gradient(to bottom, #f7f8fc 0%, #e9ecef 100%);
  min-height: 100vh;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.app-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 0;
}

.app-header h1 {
  font-size: 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 10px;
}

.app-header p {
  color: #666;
  font-size: 18px;
}

.app-main {
  margin-bottom: 40px;
}

.app-footer {
  text-align: center;
  padding: 20px;
  color: #999;
  border-top: 1px solid #ddd;
  margin-top: 40px;
}

.app-footer p {
  font-size: 14px;
}
</style>
