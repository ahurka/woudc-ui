<template>
  <v-layout justify-center column align-content-center>
    <h2>{{ $t('about.home.title') }}</h2>
    <p>{{ $t('about.home.blurb.body-intro') }}</p>
    <p>{{ $t('about.home.blurb.body-datasets') }}</p>
    <i18n path="about.home.blurb.body-contributors" tag="p">
      <template v-slot:stations>
        <nuxt-link :to="localePath('data-stations')">
          {{ $t('common.stations') }}
        </nuxt-link>
      </template>
      <template v-slot:contributors>
        <nuxt-link :to="localePath('contributors')">
          {{ $t('common.contributors') }}
        </nuxt-link>
      </template>
    </i18n>
    <p>{{ $t('about.home.blurb.body-products') }}</p>
    <i18n path="about.home.blurb.body-access" tag="p">
      <template v-slot:search>
        <nuxt-link :to="localePath('data-explore')">
          {{ $t('common.search-page') }}
        </nuxt-link>
      </template>
      <template v-slot:access>
        <nuxt-link :to="localePath('about-dataaccess')">
          {{ $t('common.access') }}
        </nuxt-link>
      </template>
    </i18n>
    <v-card
      id="history"
      itemprop="hasPart"
      itemscope
      itemtype="http://schema.org/CreativeWork"
    >
      <v-card-title itemprop="name">
        {{ $t('about.home.history.title') }}
      </v-card-title>
      <v-list itemprop="about" itemscope itemtype="http://schema.org/ItemList">
        <v-list-item
          v-for="(event, year, i) in $t('about.home.history.milestones')"
          :key="i"
          itemprop="itemListElement"
        >
          <span>
            <strong>{{ year }}</strong> : {{ event }}
          </span>
        </v-list-item>
      </v-list>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  head() {
    return {
      title: this.$t('about.home.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'The World Ozone and Ultraviolet Radiation Data Centre (WOUDC) is one of six World Data Centres which are part of the Global Atmosphere Watch programme of the World Meteorological Organization. The WOUDC data centre is operated by the Meteorological Service of Canada, a branch of Environment and Climate Change Canada.'
        }
      ]
    }
  },
  nuxtI18n: {
    paths: {
      en: '/about',
      fr: '/a-propos'
    }
  }
}
</script>
