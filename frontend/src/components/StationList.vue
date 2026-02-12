<template>
  <div class="station-list">
    <div class="filters flex gap-4 mb-4 flex-wrap">
      <div class="filter-group flex flex-col gap-2 flex-1 min-w-[200px]">
        <label class="font-semibold text-gray-700">Filter by Tag:</label>
        <select
          v-model="selectedTag"
          class="p-2 border rounded-md"
        >
          <option value="">
            All Tags
          </option>
          <option
            v-for="tag in tags"
            :key="tag"
            :value="tag"
          >
            {{ tag }}
          </option>
        </select>
      </div>

      <div class="filter-group flex flex-col gap-2 flex-1 min-w-[200px]">
        <label class="font-semibold text-gray-700">Filter by Country:</label>
        <select
          v-model="selectedCountry"
          class="p-2 border rounded-md"
        >
          <option value="">
            All Countries
          </option>
          <option
            v-for="country in countries"
            :key="country"
            :value="country"
          >
            {{ formatIsoCode(country) }}
          </option>
        </select>
      </div>
    </div>

    <div
      v-if="!loading && pagination"
      class="flex items-center justify-between mt-6 mb-6"
    >
      <button
        type="button"
        class="px-4 py-2 rounded-md border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!canGoPrev"
        @click="changePage(pagination.page - 1)"
      >
        Prev
      </button>
      <div class="text-sm text-gray-600">
        Page {{ pagination.totalPages === 0 ? 0 : pagination.page }} of {{ pagination.totalPages }}
      </div>
      <button
        type="button"
        class="px-4 py-2 rounded-md border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!canGoNext"
        @click="changePage(pagination.page + 1)"
      >
        Next
      </button>
    </div>

    <div
      v-if="loading"
      class="text-center p-10 text-lg text-gray-600"
    >
      Loading stations...
    </div>

    <div
      v-else
      class="stations-grid grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    >
      <div
        v-for="station in stations"
        :key="station.stationuuid"
        class="station-card neon-card p-4 cursor-pointer transition transform hover:-translate-y-1 hover:shadow-lg border border-transparent"
        :class="{ '!border-neon-magenta bg-[rgba(255,45,149,0.04)]': currentStation?.stationuuid === station.stationuuid }"
        @click="selectStation(station)"
      >
        <div class="flex items-start gap-3">
          <div class="station-card-image w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
            <img
              v-if="station.url_favicon"
              :src="station.url_favicon"
              :alt="station.name"
              class="w-full h-full object-contain"
            >
            <div
              v-else
              class="no-image text-lg font-semibold text-gray-700"
            >
              {{ getStationInitial(station) }}
            </div>
          </div>
          <div class="station-card-content flex flex-col gap-2">
            <h3 class="text-lg font-semibold text-gray-800">
              {{ station.name }}
            </h3>
            <div class="station-tags flex gap-2 flex-wrap">
              <span
                v-for="tag in getStationTagsLimited(station)"
                :key="tag"
                class="genre-badge neon-badge px-2 py-0.5 rounded-full text-xs font-bold"
              >
                {{ tag }}
              </span>
              <span
                v-if="getStationTags(station).length === 0"
                class="genre-badge neon-badge px-2 py-0.5 rounded-full text-xs font-bold"
              >Uncategorized</span>
            </div>
            <div class="country-flag text-gray-600 text-sm">
              {{ formatIsoCode(station?.iso_3166_1) }}
            </div>
            <div class="station-homepage text-sm">
              <a
                v-if="station.url_homepage"
                :href="station.url_homepage"
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
      </div>
    </div>

    <div
      v-if="!loading && stations.length === 0"
      class="text-center p-10 text-gray-500"
    >
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
    tags: {
      type: Array,
      default: () => []
    },
    countries: {
      type: Array,
      default: () => []
    },
    pagination: {
      type: Object,
      default: null
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
  emits: ['select-station', 'filters-changed', 'page-changed'],
  data() {
    return {
      selectedTag: '',
      selectedCountry: ''
    }
  },
  computed: {
    canGoPrev() {
      return this.pagination?.page > 1;
    },
    canGoNext() {
      return this.pagination && this.pagination.page < this.pagination.totalPages;
    }
  },
  watch: {
    selectedTag() {
      this.emitFilters();
    },
    selectedCountry() {
      this.emitFilters();
    }
  },
  methods: {
    emitFilters() {
      this.$emit('filters-changed', {
        tag: this.selectedTag,
        country: this.selectedCountry
      });
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
    formatIsoCode(value) {
      return value ? String(value).toUpperCase() : 'N/A';
    },
    getStationInitial(station) {
      const name = station?.name ? station.name.trim() : '';
      return name ? name[0].toUpperCase() : '?';
    },
    selectStation(station) {
      this.$emit('select-station', station);
    },
    changePage(page) {
      if (!this.pagination || page < 1 || page > this.pagination.totalPages) {
        return;
      }
      this.$emit('page-changed', page);
    }
  }
}
</script>

<!-- Styles moved to global index.css; components use Tailwind utilities -->
