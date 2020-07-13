<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('data.explore.title') }}</h1>
    <p>{{ $t('data.explore.blurb.body-datasets') }}</p>
    <p>{{ $t('data.explore.blurb.body-search') }}</p>
    <i18n path="data.explore.blurb.body-howto" tag="p">
      <template v-slot:how-to>
        <nuxt-link :to="localePath('about-dataaccess')">
          {{ $t('data.explore.how-to') }}
        </nuxt-link>
      </template>
    </i18n>
    <h3>{{ $t('data.explore.dataset.title') }}</h3>
    <v-select
      :value="selectedDataset"
      :items="datasetOptions"
      :label="$t('data.explore.dataset.placeholder')"
      item-text="text"
      solo
      @input="changeDataset"
    />
    <h3>{{ $t('data.explore.country.title') }}</h3>
    <v-autocomplete
      :value="selectedCountry"
      :items="countryOptions"
      :label="$t('data.explore.country.placeholder')"
      item-text="text"
      solo
      @input="changeCountry"
    />
    <h3>{{ $t('data.explore.station.title') }}</h3>
    <v-autocomplete
      :value="selectedStation"
      :items="stationOptions"
      :label="$t('data.explore.station.placeholder')"
      item-text="text"
      solo
      @input="changeStation"
    />
    <h3>{{ $t('data.explore.instrument.title') }}</h3>
    <v-select
      :value="selectedInstrument"
      :items="instrumentOptions"
      :label="$t('data.explore.instrument.placeholder')"
      item-text="text"
      solo
    />
    <v-range-slider
      v-model="selectedYearRange"
      :min="minSelectableYear"
      :max="maxSelectableYear"
    />
    <div id="start-year">
      <h4>{{ $t('data.explore.start') }}</h4>
      <input v-model="selectedYearRange[0]" type="text">
    </div>
    <div id="end-year">
      <h4>{{ $t('data.explore.end') }}</h4>
      <input v-model="selectedYearRange[1]" type="text">
    </div>
  </v-layout>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  async asyncData() {
    const dropdownsURL = '/processes/woudc-data-registry-dropdowns/jobs'
    const queryParams = { inputs: [] }

    const response = await axios.post(dropdownsURL, queryParams)

    return {
      countries: response.data.outputs.countries,
      stations: response.data.outputs.stations.map((station) => {
        station.geometry = {
          type: station.geometry.type,
          coordinates: [
            station.geometry.coordinates[1],
            station.geometry.coordinates[0]
          ]
        }
        station.identifier = station.properties.station_id
        return station
      }),
      instruments: response.data.outputs.instruments
    }
  },
  data() {
    return {
      countries: [],
      instruments: [],
      minSelectableYear: 1924,
      selectedCountry: null,
      selectedDataset: null,
      selectedInstrument: null,
      selectedStation: null,
      selectedYearRange: [null, null],
      stations: []
    }
  },
  computed: {
    countryOptions() {
      const nullOption = {
        text: 'All',
        value: null
      }

      const countryOptions = this.countries.map(this.countryToSelectOption)
      return [ nullOption ].concat(countryOptions)
    },
    datasetOptions() {
      const datasetSections = {
        totalozone: {
          daily: 'TotalOzone',
          hourly: 'TotalOzoneObs'
        },
        'vertical-ozone': {
          lidar: 'Lidar',
          ozonesonde: 'OzoneSonde',
          umkehr1: 'UmkehrN14_1.0',
          umkehr2: 'UmkehrN14_2.0',
          rocketsonde: 'RocketSonde'
        },
        'uv-irradiance': {
          broadband: 'Broad-band',
          multiband: 'Multi-band',
          spectral: 'Spectral',
          'uv-index': 'uv_index_hourly'
        },
        'data-centers': {
          totalozone: 'ndacc-total',
          'vertical-ozone': 'ndacc-vertical',
          'uv-irradiance': 'ndacc-uv'
        }
      }

      const datasetOptions = []
      datasetOptions.push({
        text: this.$t('data.explore.dataset.all'),
        value: null
      })

      for (const [section, children] of Object.entries(datasetSections)) {
        datasetOptions.push({
          header: this.$t('data.explore.dataset.' + section + '.label')
        })
        for (const [subsection, id] of Object.entries(children)) {
          datasetOptions.push({
            text: this.$t('data.explore.dataset.' + section + '.' + subsection),
            value: id
          })
        }
      }

      return datasetOptions
    },
    instrumentOptions() {
      const nullOption = {
        text: 'All',
        value: null
      }

      const instrumentOptions = this.instruments.map(this.instrumentToSelectOption)
      return [ nullOption ].concat(instrumentOptions)
    },
    maxSelectableYear() {
      return (new Date()).getFullYear()
    },
    stationOptions() {
      const nullOption = {
        text: 'All',
        value: null
      }

      const stationOptions = this.stations.map(this.stationToSelectOption)
      return [ nullOption ].concat(stationOptions)
    }
  },
  mounted() {
    this.selectedYearRange = [
      this.minSelectableYear, this.maxSelectableYear
    ]
  },
  methods: {
    changeDataset(dataset) {
      this.selectedDataset = dataset
      this.selectedCountry = null
      this.selectedStation = null
      this.selectedInstrument = null

      this.refreshDropdowns()
    },
    changeCountry(country) {
      this.selectedCountry = country
      this.selectedStation = null
      this.selectedInstrument = null

      this.refreshDropdowns()
    },
    changeStation(station) {
      this.selectedStation = station
      this.selectedInstrument = null

      this.refreshDropdowns()
    },
    countryToSelectOption(country) {
      const countryCode = country.properties.country_code
      const countryName = country.properties.country_name_en

      return {
        text: countryName + ' (' + countryCode + ')',
        value: countryCode
      }
    },
    instrumentToSelectOption(instrument) {
      const instrumentName = instrument.properties.instrument_name

      return {
        text: instrumentName,
        value: instrumentName
      }
    },
    stationToSelectOption(station) {
      const stationID = station.properties.station_id
      const stationName = station.properties.station_name

      return {
        text: stationName + ' (' + stationID + ')',
        value: stationID
      }
    },
    async refreshDropdowns() {
      const { countries, stations, instruments } = await this.sendDropdownRequest(
        this.selectedDataset, this.selectedCountry, this.selectedStation
      )

      this.countries = countries
      this.stations = stations.map((station) => {
        station.geometry = {
          type: station.geometry.type,
          coordinates: [
            station.geometry.coordinates[1],
            station.geometry.coordinates[0]
          ]
        }
        station.identifier = station.properties.station_id
        return station
      })
      this.instruments = instruments
    },
    async sendDropdownRequest(dataset, country, station) {
      const dropdownsURL = '/processes/woudc-data-registry-dropdowns/jobs'
      const inputs = []

      const selections = { dataset, country, station }
      for (const [domain, selected] of Object.entries(selections)) {
        if (selected !== null) {
          inputs.push({
            id: domain,
            type: 'text/plain',
            value: selected
          })
        }
      }

      const queryParams = { inputs }
      const response = await axios.post(dropdownsURL, queryParams)

      const countries = response.data.outputs.countries
      const stations = response.data.outputs.stations
      const instruments = response.data.outputs.instruments

      return { countries, stations, instruments }
    }
  },
  nuxtI18n: {
    paths: {
      en: '/data/explore',
      fr: '/donnees/rechercher'
    }
  }
}
</script>

<style scoped>
.v-select-list >>> .v-list {
  padding: 0px;
}

.v-select-list >>> .v-subheader {
  font-weight: bold;
  background-color: #e4e4e4;
  max-height: 40px;
  padding-left: 12px;
  margin-left: 0px;
}

.v-select >>> .v-input__slot {
  max-width: 60%;
}

.v-select-list >>> .v-list-item {
  padding-left: 24px;
}

.v-select-list >>> .v-list-item,
.v-select-list >>> .v-list-item__content {
  padding-top: 0px;
  padding-bottom: 0px;
  min-height: 32px;
}
</style>
