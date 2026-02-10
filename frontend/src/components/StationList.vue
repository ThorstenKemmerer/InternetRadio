<template>
  <div class="station-list">
    <div class="filters">
      <div class="filter-group">
        <label>Filter by Genre:</label>
        <select v-model="selectedGenre" @change="filterStations">
          <option value="">All Genres</option>
          <option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label>Filter by Country:</label>
        <select v-model="selectedCountry" @change="filterStations">
          <option value="">All Countries</option>
          <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
        </select>
      </div>
    </div>

    <div v-if="loading" class="loading">Loading stations...</div>
    
    <div v-else class="stations-grid">
      <div 
        v-for="station in filteredStations" 
        :key="station._id"
        class="station-card"
        :class="{ active: currentStation?._id === station._id }"
        @click="selectStation(station)"
      >
        <div class="station-card-image">
          <img v-if="station.imageUrl" :src="station.imageUrl" :alt="station.name" />
          <div v-else class="no-image">📻</div>
        </div>
        <div class="station-card-content">
          <h3>{{ station.name }}</h3>
          <p class="station-meta">
            <span class="genre-badge">{{ station.genre }}</span>
            <span class="country-flag">{{ station.country }}</span>
          </p>
          <p class="station-language">{{ station.language }} • {{ station.bitrate }}</p>
        </div>
      </div>
    </div>

    <div v-if="!loading && filteredStations.length === 0" class="no-results">
      No stations found for the selected filters.
    </div>
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
    },
    filterStations() {
      // Filters are computed, so this just triggers reactivity if needed
    }
  }
}
</script>

<style scoped>
.station-list {
  margin-top: 20px;
}

.filters {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
  min-width: 200px;
}

.filter-group label {
  font-weight: bold;
  color: #333;
  font-size: 14px;
}

.filter-group select {
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s;
}

.filter-group select:hover {
  border-color: #667eea;
}

.filter-group select:focus {
  outline: none;
  border-color: #667eea;
}

.loading {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
}

.no-results {
  text-align: center;
  padding: 40px;
  font-size: 16px;
  color: #999;
}

.stations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.station-card {
  background: white;
  border-radius: 12px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid #eee;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.station-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  border-color: #667eea;
}

.station-card.active {
  border-color: #667eea;
  background: linear-gradient(135deg, #667eea10 0%, #764ba210 100%);
}

.station-card-image {
  width: 100%;
  height: 150px;
  margin-bottom: 15px;
  border-radius: 8px;
  overflow: hidden;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.station-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-image {
  font-size: 60px;
}

.station-card-content h3 {
  margin: 0 0 10px 0;
  font-size: 18px;
  color: #333;
}

.station-meta {
  display: flex;
  gap: 10px;
  margin: 10px 0;
  flex-wrap: wrap;
}

.genre-badge {
  background: #667eea;
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.country-flag {
  color: #666;
  font-size: 14px;
}

.station-language {
  margin: 5px 0 0 0;
  font-size: 12px;
  color: #999;
}
</style>
