<template>
  <div>
    <h1>{{ $t('about.access.title') }}</h1>
    <v-row>
      <v-col cols="8">
        <p>{{ $t('about.access.blurb.body-intro') }}</p>
        <i18n path="about.access.blurb.body-accessibility" tag="p">
          <template v-slot:contact-us>
            <nuxt-link :to="localePath('contact')">
              {{ $t('common.contact-us') }}
            </nuxt-link>
          </template>
        </i18n>
        <v-card class="mt-1 mb-4" color="info">
          <v-card-title class="pt-3 pb-0">
            {{ $t('about.access.note1.title') }}
          </v-card-title>
          <v-card-text>
            <i18n class="mb-0" path="about.access.note1.body" tag="p">
              <template v-slot:policy>
                <nuxt-link :to="localePath('about-datapolicy')">
                  {{ $t('common.policy') }}
                </nuxt-link>
              </template>
            </i18n>
          </v-card-text>
        </v-card>
        <v-card class="mt-1 mb-4" color="info">
          <v-card-title class="pt-3 pb-0">
            {{ $t('about.access.note2.title') }}
          </v-card-title>
          <v-card-text>
            <i18n class="mb-0" path="about.access.note2.body" tag="p">
              <template v-slot:stations-page>
                <nuxt-link :to="localePath('data-stations')">
                  {{ $t('common.stations-page') }}
                </nuxt-link>
              </template>
            </i18n>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card id="contents-table">
          <v-card-title>{{ $t('about.access.contents.title') }}</v-card-title>
          <v-list id="contents-body">
            <div v-for="section in tableOfContents" :key="section.selector">
              <v-divider v-if="i !== 0" />
              <template v-if="section.subsections === null">
                <v-list-item>
                  <v-list-item-title>
                    <nuxt-link :to="'#' + section.selector">
                      {{ section.text }}
                    </nuxt-link>
                  </v-list-item-title>
                </v-list-item>
              </template>
              <template v-else>
                <v-list-group>
                  <template v-slot:activator>
                    <v-list-item-title>
                      <nuxt-link :to="'#' + section.selector">
                        {{ section.text }}
                      </nuxt-link>
                    </v-list-item-title>
                  </template>
                  <v-list-item
                    v-for="subsection in section.subsections"
                    :key="subsection.selector"
                  >
                    <v-list-item-title>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <nuxt-link :to="'#' + subsection.selector">
                        {{ subsection.text }}
                      </nuxt-link>
                    </v-list-item-title>
                  </v-list-item>
                </v-list-group>
              </template>
            </div>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <div id="data-search-section">
      <h2>{{ $t('about.access.search.title') }}</h2>
      <i18n path="about.access.search.blurb.body-intro" tag="p">
        <template v-slot:search>
          <nuxt-link :to="localePath('data-explore')">
            {{ $t('common.search-page') }}
          </nuxt-link>
        </template>
      </i18n>
      <i18n path="about.access.search.blurb.body-howto" tag="p">
        <template v-slot:how-to>
          <a :href="searchHelpURL" target="_blank">
            {{ $t('about.access.search.how-to') }}
          </a>
        </template>
      </i18n>
      <v-card class="mt-1 mb-4" color="info">
        <v-card-text>
          {{ $t('about.access.search.note') }}
        </v-card-text>
      </v-card>
    </div>
    <div id="waf-section">
      <h2>{{ $t('about.access.waf.title') }}</h2>
      <i18n path="about.access.waf.blurb.body-intro" tag="p">
        <template v-slot:waf>
          <a :href="wafURL" target="_blank">
            {{ $t('common.wafFull') }}
          </a>
        </template>
      </i18n>
      <i18n path="about.access.waf.blurb.body-files" tag="p">
        <template v-slot:summary>
          <a :href="wafSummaryURL" target="_blank">
            {{ $t('about.access.waf.summary') }}
          </a>
        </template>
      </i18n>
      <i18n path="about.access.waf.blurb.body-howto" tag="p">
        <template v-slot:how-to>
          <a :href="wafGuideURL" target="_blank">
            {{ $t('about.access.waf.how-to') }}
          </a>
        </template>
      </i18n>
    </div>
    <div id="web-services-section">
      <h2>{{ $t('about.access.web.title') }}</h2>
      <p>{{ $t('about.access.web.blurb.body-intro') }}</p>
      <i18n path="about.access.web.blurb.body-standards" tag="p">
        <template v-slot:ogc>
          <a :href="ogcURL" target="_blank">
            {{ $t('common.ogc') }}
          </a>
        </template>
        <template v-slot:iso>
          <a :href="isoURL" target="_blank">
            {{ $t('common.iso') }}
          </a>
        </template>
        <template v-slot:interoperability>
          <a :href="interoperabilityURL" target="_blank">
            {{ $t('common.interoperability') }}
          </a>
        </template>
        <template v-slot:wis>
          <a :href="wisURL" target="_blank">
            {{ $t('common.wis') }}
          </a>
        </template>
      </i18n>
      <v-card class="mt-1 mb-4" color="info">
        <v-card-title class="pt-3 pb-0">
          {{ $t('about.access.web.table.title') }}
        </v-card-title>
        <v-card-text>
          <span>That font size is too big. Also the colour is wrong.</span>
        </v-card-text>
      </v-card>
      <div id="csw-subsection">
        <h3>{{ $t('about.access.csw.title') }}</h3>
        <i18n class="mb-0" path="about.access.csw.blurb" tag="p">
          <template v-slot:ogc-cs>
            <a :href="ogcStandardsURL" target="_blank">
              {{ $t('common.ogc-cs') }}
            </a>
          </template>
        </i18n>
        <v-card class="mt-1 mb-4" color="info">
          <v-card-title class="pt-3 pb-0">
            {{ $t('about.access.csw.note.title') }}
          </v-card-title>
          <v-card-text>
            <i18n class="mb-0" path="about.access.csw.note.body" tag="p">
              <template v-slot:link>
                <a :href="cswURL" target="_blank">
                  {{ cswURL }}
                </a>
              </template>
            </i18n>
          </v-card-text>
        </v-card>
      </div>
      <div id="wms-subsection">
        <h3>{{ $t('about.access.wms.title') }}</h3>
        <i18n path="about.access.wms.blurb" tag="p">
          <template v-slot:wms>
            <a href="" target="_blank">
              {{ $t('common.wms') }}
            </a>
          </template>
        </i18n>
        <v-card class="mt-1 mb-4" color="info">
          <v-card-title class="pt-3 pb-0">
            {{ $t('about.access.wms.note.title') }}
          </v-card-title>
          <v-card-text>
            <i18n class="mb-0" path="about.access.wms.note.body" tag="p">
              <template v-slot:link>
                <a :href="wmsURL" target="_blank">
                  {{ wmsURL }}
                </a>
              </template>
            </i18n>
          </v-card-text>
        </v-card>
      </div>
      <div id="wfs-subsection">
        <h3>{{ $t('about.access.wfs.title') }}</h3>
        <i18n path="about.access.wfs.blurb.body-intro" tag="p">
          <template v-slot:wfs>
            <a href="" target="_blank">
              {{ $t('common.wfs') }}
            </a>
          </template>
        </i18n>
        <p>{{ $t('about.access.wfs.blurb.body-limits') }}</p>
        <v-card class="mt-1 mb-4" color="info">
          <v-card-title class="pt-3 pb-0">
            {{ $t('about.access.wfs.note.title') }}
          </v-card-title>
          <v-card-text>
            <i18n class="mb-0" path="about.access.wfs.note.body" tag="p">
              <template v-slot:link>
                <a :href="wfsURL" target="_blank">
                  {{ wfsURL }}
                </a>
              </template>
            </i18n>
          </v-card-text>
        </v-card>
      </div>
      <div id="wps-section">
        <h3>{{ $t('about.access.wps.title') }}</h3>
        <i18n path="about.access.wps.blurb" tag="p">
          <template v-slot:wps>
            <a href="" target="_blank">
              {{ $t('common.wps') }}
            </a>
          </template>
        </i18n>
        <v-card class="mt-1 mb-4" color="info">
          <v-card-title class="pt-3 pb-0">
            {{ $t('about.access.wps.note.title') }}
          </v-card-title>
          <v-card-text>
            <i18n class="mb-0" path="about.access.wps.note.body" tag="p">
              <template v-slot:link>
                <a :href="wpsURL" target="_blank">
                  {{ wpsURL }}
                </a>
              </template>
            </i18n>
          </v-card-text>
        </v-card>
      </div>
    </div>
    <div id="definitions-service-section">
      <h2>{{ $t('about.access.definitions.title') }}</h2>
      <p>{{ $t('about.access.definitions.blurb') }}</p>
      <v-card class="mt-1 mb-4" color="info">
        <v-card-title class="pt-3 pb-0">
          {{ $t('about.access.definitions.note.title') }}
        </v-card-title>
        <v-card-text>
          <i18n class="mb-0" path="about.access.definitions.note.body" tag="p">
            <template v-slot:link>
              <a :href="definitionsURL" target="_blank">
                {{ definitionsURL }}
              </a>
            </template>
          </i18n>
        </v-card-text>
      </v-card>
    </div>
    <div id="iso-catalogue-section">
      <h2>{{ $t('about.access.iso.title') }}</h2>
      <p>{{ $t('about.access.iso.blurb-intro') }}</p>
      <v-card class="mt-1 mb-4" color="info">
        <v-card-title class="pt-3 pb-0">
          {{ $t('about.access.iso.note.title') }}
        </v-card-title>
        <v-card-text>
          <i18n class="mb-0" path="about.access.iso.note.body" tag="p">
            <template v-slot:link>
              <a :href="isoURL" target="_blank">
                {{ isoURL }}
              </a>
            </template>
          </i18n>
        </v-card-text>
      </v-card>
      <i18n path="about.access.iso.blurb-howto" tag="p">
        <template v-slot:how-to>
          <a href="" target="_blank">
            {{ $t('about.access.iso.how-to') }}
          </a>
        </template>
      </i18n>
    </div>
    <div id="examples-section">
      <h2>{{ $t('about.access.examples.title') }}</h2>
      <i18n path="about.access.examples.blurb" tag="p">
        <template v-slot:github>
          <a :href="githubURL" target="_blank">
            {{ $t('common.github') }}
          </a>
        </template>
      </i18n>
      <v-card>
        <v-list id="example-list" dense>
          <v-list-item>
            <a :href="examples.pywoudc" target="_blank">
              pywoudc
            </a> : {{ $t('about.access.examples.links.pywoudc') }}
          </v-list-item>
          <v-divider />
          <v-list-item>
            <a :href="examples.notebooks" target="_blank">
              notebooks
            </a> : {{ $t('about.access.examples.links.notebooks') }}
          </v-list-item>
        </v-list>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cswURL: 'https://geo.woudc.org/csw?service=CSW&version=2.0.2&request=GetCapabilities',
      definitionsURL: 'https://geo.woudc.org/def',
      githubURL: 'https://github.com/woudc',
      interoperabilityURL: 'https://www.wmo.int/pages/prog/www/WIS/documents/MOAWMO_OGC.pdf',
      isoURL: 'https://geo.woudc.org/codelists.xml',
      ogcStandardsURL: 'https://opengeospatial.org/standards/cat',
      ogcURL: 'https://opengeospatial.org/',
      searchHelpURL: 'https://github.com/woudc/woudc/wiki/DataSearchDownloadHowto',
      wafURL: 'https://woudc.org/archive/',
      wafGuideURL: 'https://github.com/woudc/woudc/wiki/WAFHowto',
      wafSummaryURL: 'https://woudc.org/archive/Summaries/dataset-snapshots',
      wfsURL: 'https://geo.woudc.org/ows?service=WFS&version=1.1.0&request=GetCapabilities',
      wisURL: 'https://www.wmo.int/pages/prog/www/WIS/',
      wmsURL: 'https://geo.woudc.org/ows?service=WMS&version=1.3.0&request=GetCapabilities',
      wpsURL: 'https://geo.woudc.org/wps?service=WPS&version=1.0.0&request=GetCapabilities',
      contentsSelectors: {
        csw: 'csw-subsection',
        definitions: 'definitions-service-section',
        examples: 'examples-section',
        iso: 'iso-catalogue-section',
        search: 'data-search-section',
        waf: 'waf-section',
        web: 'web-services-section',
        wfs: 'wfs-subsection',
        wms: 'wms-subsection',
        wps: 'wps-subsection'
      },
      examples: {
        pywoudc: 'https://github.com/woudc/pywoudc',
        notebooks: 'https://github.com/woudc/woudc/tree/master/notebooks'
      }
    }
  },
  computed: {
    tableOfContents() {
      const sections = [
        'search', 'waf', 'web', 'definitions', 'iso', 'examples'
      ].map(this.prepareContentsLink)

      sections[2].subsections = this.webContentsSubsections
      return sections
    },
    webContentsSubsections() {
      return [ 'csw', 'wms', 'wfs', 'wps' ].map(this.prepareContentsLink)
    }
  },
  methods: {
    prepareContentsLink(key) {
      return {
        text: this.$t('about.access.contents.links.' + key),
        selector: this.contentsSelectors[key],
        subsections: null
      }
    }
  },
  nuxtI18n: {
    paths: {
      en: '/about/data-access',
      fr: '/a-propos/accessibilite-donnees'
    }
  }
}
</script>

<style scoped>
.card {
  background-color: #cef;
  color: steelblue;
}

#contents-table {
  color: white;
  background-color: royalblue;
}

#contents-body {
  padding: 0px;
  font-size: 14px;
}

#contents-body ul {
  margin-bottom: 16px;
}

#example-list {
  padding: 0px;
  font-size: 14px;
}
</style>
