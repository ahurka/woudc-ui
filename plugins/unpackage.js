
function standardizedCountryName(geoJSON) {
  return {
    en: geoJSON.properties.country_name_en,
    fr: geoJSON.properties.country_name_fr
  }
}

function standardizedGeometry(geoJSON) {
  return {
    type: geoJSON.geometry.type,
    coordinates: [
      geoJSON.geometry.coordinates[1],
      geoJSON.geometry.coordinates[0]
    ]
  }
}

function unpackageStation(geoJSON) {
  const station = Object.assign({}, geoJSON.properties)
  station.identifier = station.woudc_id

  station.country_name = standardizedCountryName(geoJSON)
  station.geometry = standardizedGeometry(geoJSON)
  station.last_validated_datetime =
    station.last_validated_datetime.substring(0, 10)

  return station
}


function unpackageBareStation(geoJSON) {
  const station = Object.assign({}, geoJSON.properties)
  station.identifier = station.woudc_id || station.station_id

  station.geometry = standardizedGeometry(geoJSON)

  return station
}

function unpackageInstrument(geoJSON) {
  const instrument = geoJSON.properties

  instrument.country_name = standardizedCountryName(geoJSON)
  instrument.geometry = standardizedGeometry(geoJSON)

  return instrument
}

function unpackageContributor(geoJSON) {
  const contributor = geoJSON.properties

  contributor.country_name = standardizedCountryName(geoJSON)
  contributor.geometry = standardizedGeometry(geoJSON)

  return contributor
}

function unpackageDeployment(geoJSON) {
  const deployment = geoJSON.properties

  deployment.country_name = standardizedCountryName(geoJSON)

  return deployment
}

function unpackageDefault(geoJSON) {
  return geoJSON.properties
}

export {
  unpackageStation,
  unpackageBareStation,
  unpackageContributor,
  unpackageInstrument,
  unpackageDeployment,
  unpackageDefault
}
