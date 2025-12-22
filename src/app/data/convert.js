const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('data_gov_hk_2.geojson', 'utf8'));
const fixed = {
  type: 'FeatureCollection',
  features: raw.features.map(feat => {
    const props = {
      name: feat.properties.District || feat.properties.name,
      ID_0: 102,
      ID_1: raw.features.findIndex(f => f.properties.District === feat.properties.District) + 1,
      ISO: 'HKG'
    };
    
    let geometry;
    if (feat.geometry.type === 'Polygon') {
      geometry = { type: 'MultiPolygon', coordinates: [feat.geometry.coordinates] };
    } else {
      geometry = feat.geometry; // Keep MultiPolygon as-is
    }
    
    return { type: 'Feature', properties: props, geometry };
  })
};

fs.writeFileSync('hk_districts_fixed.geojson', JSON.stringify(fixed, null, 2));
console.log('Fixed GeoJSON saved - all MultiPolygon, official boundaries');
