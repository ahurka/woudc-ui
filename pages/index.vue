<template>
  <v-layout justify-center column align-content-center>
    <h2>{{ $t('welcome') }}</h2>

    <v-card itemscope itemtype="http://schema.org/GovernmentOrganization">
      <v-card-title itemprop="name">
        WOUDC
      </v-card-title>
      <v-card-subtitle itemprop="description">
        {{ $t('adTitle') }}
      </v-card-subtitle>
      <v-container class="d-flex justify-start">
        <v-card
          max-width="400"
          class="ma-2"
          itemprop="memberOf"
          itemscope
          itemtype="http://schema.org/GovernmentOrganization"
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline">
                <a target="_blank" href="http://www.wmo.int" itemprop="name">
                  {{ $t('wmo') }}
                </a>
              </v-card-title>
              <v-card-subtitle>{{ $t('wmoFull') }}</v-card-subtitle>
            </div>
            <v-avatar class="ma-3" size="150" tile>
              <a target="_blank" href="http://www.wmo.int" itemprop="url">
                <v-img
                  :src="require('~/assets/wmo_acronym_vertical_sm.jpg')"
                  :alt="$t('wmoLogo')"
                  width="111"
                  height="150"
                  itemprop="logo"
                />
              </a>
            </v-avatar>
          </div>
        </v-card>
        <v-card
          max-width="400"
          class="ma-2"
          itemprop="memberOf"
          itemscope
          itemtype="http://schema.org/GovernmentOrganization"
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline">
                <a
                  target="_blank"
                  href="http://www.wmo.int/gaw"
                  itemprop="name"
                >
                  {{ $t('gaw') }}
                </a>
              </v-card-title>
              <v-card-subtitle>
                {{ $t('gawFull') }}
              </v-card-subtitle>
            </div>
            <v-avatar class="ma-3" size="150" tile>
              <a target="_blank" href="http://www.wmo.int/gaw" itemprop="url">
                <v-img
                  :src="require('~/assets/gaw_acronym_vertical_sm.jpg')"
                  :alt="$t('gawLogo')"
                  width="102"
                  height="150"
                  itemprop="logo"
                />
              </a>
            </v-avatar>
          </div>
        </v-card>
      </v-container>
      <v-card-text itemprop="description">
        A World Meteorological Organization (
        <a href="https://www.wmo.int" target="_blank">WMO</a>
        ) data centre supporting the Global Atmosphere Watch (
        <a href="https://www.wmo.int/gaw" target="_blank">GAW</a>
        ) program operated by Environment and Climate Change Canada.
      </v-card-text>
      <v-card-actions>
        <v-btn
          :to="localePath('about')"
          :title="$t('aboutWoudc')"
          color="primary"
          nuxt
        >
          {{ $t('learnMore') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<i18n>
{
  "en": {
    "aboutWoudc": "About WOUDC",
    "adTitle": "Discover, Visualize and Access a Global Archive of Ground-based Ozone and UV Radiation Data",
    "gaw": "GAW",
    "gawFull": "Global Atmosphere Watch",
    "gawLogo": "Logo: @.gawFull",
    "learnMore": "Learn more",
    "welcome": "Welcome",
    "wmo": "WMO",
    "wmoFull": "World Meteorological Organization",
    "wmoLogo": "Logo: @.wmoFull"
  },
  "fr": {
    "aboutWoudc": "Qu’est-ce que le WOUDC",
    "adTitle": "Découvrez, visualisez ou accédez aux archives mondiales des données terrestres sur l’ozone et le rayonnement UV",
    "gaw": "VAG",
    "gawFull": "Veille de l'atmosphère globale",
    "gawLogo": "Logo : @.gawFull",
    "learnMore": "En savoir plus",
    "welcome": "Bienvenue",
    "wmo": "OMM",
    "wmoFull": "Organisation météorologique mondiale",
    "wmoLogo": "Logo : @.wmoFull"
  }
}
</i18n>

<script>
export default {
  name: 'Home',
  data() {
    return {
      envVarTest: {
        servicesHostname: process.env.SERVICES_HOSTNAME,
        routerBase: process.env.ROUTER_BASE,
        emailAddress: process.env.EMAIL_ADDRESS
      }
    }
  },
  head() {
    return {
      title: 'Home'
    }
  }
}
</script>
