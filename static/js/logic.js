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

d3.json(url).then(function(data) {

// Create the marker size using the magnitude
  function markerSize(earthquakes) {
    return earthquakes * 5
  }

  

  // Create makrer color based on depth
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

    else if (earthquakes >= 70){
      return "red"
    }
}

function markerOpacity(earthquakes){
        if (earthquakes >= -10 && earthquakes < 10){
          return .40
        }
        else if (earthquakes >= 10 && earthquakes < 30){
          return .60
        }
        else if(earthquakes >= 30 && earthquakes < 70){
          return .70
        }
    
        else if (earthquakes >= 70){
          return .9
        }

}

    L.geoJson(data , {
      pointToLayer: function(feature, latlng){
        console.log(latlng);
        return L.circleMarker(latlng)
      },

      style: function(feature) {
        return {
          opacity: 1,
          fillOpacity: markerOpacity(feature.geometry.coordinates[2]),
          fillColor: markerColor(feature.geometry.coordinates[2]),
          color: "green",
          radius: markerSize(feature.properties.mag),
          stroke: true,
          weight: 0.5
        };

      },
      
      onEachFeature: function(feature , layer) {
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p><hr><p>Magnitude: ${feature.properties.mag}`)
      }

    }).addTo(myMap)
      


// legend 

let legend = L.control({
  position: "bottomright"
});

legend.onAdd = function() {
  let div = L.DomUtil.create("div" , "info legend")
  let depth = ['-10-10' , '10-30' , '30-70' , '70+'] 
  let  colors = ['green' , 'yellow' , 'orange' , 'red']
  let labels = []
  
}

 
  legend.addTo(map);
});






