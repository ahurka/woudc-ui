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
    <v-select
      :value="selectedCountry"
      :items="countryOptions"
      :label="$t('data.explore.country.placeholder')"
      menu-props="auto"
      item-text="text"
      solo
      @input="changeCountry"
    />
    <div id="orderSwitchContainer">
      <span class="mt-1 mr-4 float-left">{{ $t('common.sort-by') }}</span>
      <v-switch
        v-model="orderCountryByID"
        :label="countrySwitchText"
      />
    </div>
    <h3>{{ $t('data.explore.station.title') }}</h3>
    <v-select
      :value="selectedStation"
      :items="stationOptions"
      :label="$t('data.explore.station.placeholder')"
      menu-props="auto"
      item-text="text"
      solo
      @input="changeStation"
    />
    <div id="orderSwitchContainer">
      <span class="mt-1 mr-4 float-left">{{ $t('common.sort-by') }}</span>
      <v-switch
        v-model="orderStationByID"
        :label="stationSwitchText"
      />
    </div>
    <h3>{{ $t('data.explore.instrument.title') }}</h3>
    <v-select
      :value="selectedInstrument"
      :items="instrumentOptions"
      :label="$t('data.explore.instrument.placeholder')"
      menu-props="auto"
      item-text="text"
      solo
    />
    <v-range-slider
      v-model="selectedYearRange"
      :min="minSelectableYear"
      :max="maxSelectableYear"
    />
    <v-text-field
      v-model="selectedYearRange[0]"
      :label="$t('data.explore.start')"
    >
      <template v-slot:append>
        <div class="mt-2">
          <v-btn icon small @click="addToStartYear(1)">
            <v-icon>mdi-plus-circle-outline</v-icon>
          </v-btn>
          <v-btn icon small @click="addToStartYear(-1)">
            <v-icon>mdi-minus-circle-outline</v-icon>
          </v-btn>
        </div>
      </template>
    </v-text-field>
    <v-text-field
      v-model="selectedYearRange[1]"
      :label="$t('data.explore.end')"
    >
      <template v-slot:append>
        <div class="mt-2">
          <v-btn icon small @click="addToEndYear(1)">
            <v-icon>mdi-plus-circle-outline</v-icon>
          </v-btn>
          <v-btn icon small @click="addToEndYear(-1)">
            <v-icon>mdi-minus-circle-outline</v-icon>
          </v-btn>
        </div>
      </template>
    </v-text-field>
  </v-layout>
</template>

<script>
import axios from '~/plugins/axios'
import { unpackageBareStation } from '~/plugins/unpackage'

export default {
  async asyncData() {
    const dropdownsURL = '/processes/woudc-data-registry-dropdowns/jobs'
    const queryParams = { inputs: [] }

    const response = await axios.post(dropdownsURL, queryParams)

    return {
      countries: {
        byID: response.data.outputs.countries.sortby_country_code,
        byName: response.data.outputs.countries.sortby_country_name_en
      },
      stations: {
        byID: response.data.outputs.stations.sortby_station_id.map(unpackageBareStation),
        byName: response.data.outputs.stations.sortby_station_name.map(unpackageBareStation)
      },
      instruments: response.data.outputs.instruments.sortby_instrument_name
    }
  },
  data() {
    return {
      countries: { byID: [], byName: [] },
      instruments: [],
      orderCountryByID: false,
      orderStationByID: false,
      minSelectableYear: 1924,
      selectedCountry: null,
      selectedDataset: null,
      selectedInstrument: null,
      selectedStation: null,
      selectedYearRange: [ null, null ],
      stations: { byID: [], byName: [] }
    }
  },
  computed: {
    countryOptions() {
      const nullOption = {
        text: 'All',
        value: null
      }

      let orderedCountries
      if (this.orderCountryByID) {
        orderedCountries = this.countries.byID
      } else {
        orderedCountries = this.countries.byName
      }

      const countryOptions = orderedCountries.map(this.countryToSelectOption)
      return [ nullOption ].concat(countryOptions)
    },
    countrySwitchText() {
      if (this.orderCountryByID) {
        return this.$t('data.explore.country.id-text')
      } else {
        return this.$t('data.explore.country.name-text')
      }
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

      let orderedStations
      if (this.orderStationByID) {
        orderedStations = this.stations.byID
      } else {
        orderedStations = this.stations.byName
      }

      const stationOptions = orderedStations.map(this.stationToSelectOption)
      return [ nullOption ].concat(stationOptions)
    },
    stationSwitchText() {
      if (this.orderStationByID) {
        return this.$t('common.station-id')
      } else {
        return this.$t('common.station-name')
      }
    }
  },
  mounted() {
    this.selectedYearRange = [
      this.minSelectableYear, this.maxSelectableYear
    ]
  },
  methods: {
    addToStartYear(amount) {
      const oldEndYear = this.selectedYearRange[1]
      let newStartYear = this.selectedYearRange[0] + amount

      if (newStartYear < this.minSelectableYear) {
        newStartYear = this.minSelectableYear
      } else if (newStartYear > oldEndYear) {
        newStartYear = oldEndYear
      }

      this.selectedYearRange = [ newStartYear, oldEndYear ]
    },
    addToEndYear(amount) {
      const oldStartYear = this.selectedYearRange[0]
      let newEndYear = this.selectedYearRange[1] + amount

      if (newEndYear < oldStartYear) {
        newEndYear = oldStartYear
      } else if (newEndYear > this.maxSelectableYear) {
        newEndYear = this.maxSelectableYear
      }

      this.selectedYearRange = [ oldStartYear, newEndYear ]
    },
    async changeDataset(dataset) {
      const { countries, stations, instruments } =
        await this.sendDropdownRequest(dataset, null, null)

      const countryRetained = countries.sortby_country_code.some((country) => {
        return country.properties.country_code === this.selectedCountry
      })
      const stationRetained = stations.sortby_station_id.some((station) => {
        return station.properties.station_id === this.selectedStation
      })
      const instrumentRetained = instruments.sortby_instrument_name.some((instrument) => {
        return instrument.properties.instrument_name === this.selectedInstrument
      })

      if (!countryRetained) {
        this.selectedCountry = null
      }
      if (!stationRetained) {
        this.selectedStation = null
      }
      if (!instrumentRetained) {
        this.selectedInstrument = null
      }

      this.selectedDataset = dataset
      this.refreshDropdowns()
    },
    async changeCountry(country) {
      const { stations, instruments } =
        await this.sendDropdownRequest(this.selectedDataset, country, null)

      const stationRetained = stations.sortby_station_id.some((station) => {
        return station.properties.station_id === this.selectedStation
      })
      const instrumentRetained = instruments.sortby_instrument_name.some((instrument) => {
        return instrument.properties.instrument_name === this.selectedInstrument
      })

      if (!stationRetained) {
        this.selectedStation = null
      }
      if (!instrumentRetained) {
        this.selectedInstrument = null
      }

      this.selectedCountry = country
      this.refreshDropdowns()
    },
    async changeStation(station) {
      const { instruments } = await this.sendDropdownRequest(
        this.selectedDataset, this.selectedCountry, station)

      const instrumentRetained = instruments.sortby_instrument_name.some((instrument) => {
        return instrument.properties.instrument_name === this.selectedInstrument
      })
      if (!instrumentRetained) {
        this.selectedInstrument = null
      }

      this.selectedStation = station
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
      const stationID = station.station_id
      const stationName = station.station_name

      return {
        text: stationName + ' (' + stationID + ')',
        value: stationID
      }
    },
    async refreshDropdowns() {
      const { countries, stations, instruments } = await this.sendDropdownRequest(
        this.selectedDataset, this.selectedCountry, this.selectedStation
      )

      this.countries = {
        byID: countries.sortby_country_code,
        byName: countries.sortby_country_name_en
      }
      this.stations = {
        byID: stations.sortby_station_id.map(unpackageBareStation),
        byName: stations.sortby_station_name.map(unpackageBareStation)
      }
      this.instruments = instruments.sortby_instrument_name
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
