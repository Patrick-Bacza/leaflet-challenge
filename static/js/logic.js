// Earthquake URL for all earthquakes in the last 7 days
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

 let myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
  });

  // Function create marker size

  function markerSize(earthquakes) {
    return earthquakes * 10000
  }

  function markerColor(earthquakes) { 
        if (earthquakes >= -10 && earthquakes < 10){
          return "green"
        }
        else if (earthquakes >= 10 && earthquakes < 30){
          return "yellow"
        }
        else if(earthquakes >= 30 && earthquakes < 70){
          return "orange"
        }
        else if (earthquakes >= 70 && earthquakes < 90){
          return "red"
        }
        else if (earthquakes >= 90){
          return "red"
        }
  }

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

d3.json(url).then(function(response) {
  features = response.features;

  for (let i = 0; i < features.length; i++) {

      L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]] , {
          fillOpacity: 0.75 , 
          color: markerColor(features[i].geometry.coordinates[2]),
          fillColor: markerColor(features[i].geometry.coordinates[2]),
          radius: markerSize(features[i].properties.mag)
      })
      .bindPopup(`<h3>${features[i].properties.place}</h3><hr><p>${new Date(features[i].properties.time)}</p><hr><p>Magnitude: ${features[i].properties.mag}`)
      .addTo(myMap)
    }
  
  }

);

  

