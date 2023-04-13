// Earthquake URL for all earthquakes in the last 7 days
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

let myMap = L.map("map", {
  center: [
    37.09, -95.71
  ],
  zoom: 5
 
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap)



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



let earthquakeMarkers = []

  d3.json(url).then(function(data) {

    L.geoJson(data , {
      pointToLayer: function(feature, latlng){
        console.log(data);
        return L.circleMarker(latlng)
      },

      style: function(feature) {
        return {
            color: false,
            fillColor: "green",
            //radius: markerSize(feature.properties.mag)

        }
      },
      onEachFeature: function(feature , layer) {
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p><hr><p>Magnitude: ${feature.properties.mag}`)
      }

    }).addTo(myMap)
      
       
        
      });






