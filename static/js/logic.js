// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([30, 30], 2);

// // Get data from cities.js
// let cityData = cities;

//   // Loop through the cities array and create one marker for each city.
//   cityData.forEach(function(city) {
//     console.log(city)
//     L.circleMarker(city.location, {radius: city.population/100000})
//     .bindPopup("<h2>" + city.city + ", " +city.state + "</h2> <hr> <h3> Population: "+ city.population.toLocaleString() + "</h2> <hr> <h4> Location:" + " " + city.location)
//     .addTo(map);
// });



// // Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

// L.geoJson(sanFranAirport, {
//     // We turn each feature into a marker on the map.
//     pointToLayer: function(feature, latlng) {
//       console.log(feature);
//       return L.marker(latlng)
//       .bindPopup("<h1>" + feature.properties.name + "</h1" + "<hr> <h2>" + feature.properties.city + "</h2>");
//     }

//   }).addTo(map);

// L.geoJson(sanFranAirport, {
//     onEachFeature: function(feature, layer){
//         console.log(layer);
//         layer.bindPopup("<h1>" + feature.properties.faa + "</h1>");
//     }
// }).addTo(map);


// let airportData = "https://raw.githubusercontent.com/jamesdemott/Mapping_Earthquakes/Mapping_GeoJSON_Points/static/majorAirports.json";

// // Grabbing our GeoJSON data.
// d3.json(airportData).then(function(data) {
//     console.log(data);
//   // Creating a GeoJSON layer with the retrieved data.
//   L.geoJson(data, {
//       onEachFeature: function(feature, layer){
//           console.log(layer);
//           layer.bindPopup("<h1>" + feature.properties.name + "</h1>")
//       }
//   }).addTo(map);
// });

// let torontoData = "https://raw.githubusercontent.com/jamesdemott/Mapping_Earthquakes/main/torontoRoutes.json"

// d3.json(torontoData).then(function(data){
//     console.log(data);
//     L.geoJson(data, {
//         onEachFeature: function(feature, layer){
//             console.log(layer);
//             layer.bindPopup("<h1>" + feature.properties.dst + "</h1>")
//         }
//     }).addTo(map);
// })

// let torontoHoods = "https://raw.githubusercontent.com/jamesdemott/Mapping_Earthquakes/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json"; 

// d3.json(torontoHoods).then(function(data){
//     console.log(data);
//     L.geoJson(data, {
//         weight: 1, 
//         fillColor: 'yellow';
//         layer.b¬indPopup("<h1>" + feature.properties.AREA_NAME + "</h1>")
//     }
//     }).addTo(map);
// })




let earthquakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


d3.json(earthquakes).then(function(data){
    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        }, 
        style: styleInfo
    }).addTo(map);
});

function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: "#ffae42",
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.

  
  function getRadius(magnitude){
      if (magnitude === 0) {
        return 1;
      }
      return magnitude * 4;
  }

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});


// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Dark: dark
  };
  
L.control.layers(baseMaps).addTo(map);


