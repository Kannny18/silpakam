jQuery(function($) {
  const monumentCoords = [13.764965736837137,100.54030365081788];

var map = L.map("map").setView(monumentCoords, 16);
var osm = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  ).addTo(map);
var gsat = L.tileLayer(
  "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
  ).addTo(map);

var baseMaps = {
  OSM: osm,
  GoogleSat: gsat,
};
L.control.layers(baseMaps).addTo(map);

  const greenIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
  
  var marker;
  map.on("click", function(event) {
  var latitude = event.latlng.lat;
  var longitude = event.latlng.lng;

  if (marker) {
    map.removeLayer(marker);
  }
  $('#latitude').val(latitude);
  $('#longitude').val(longitude);

      marker = L.marker([latitude, longitude], {icon: greenIcon}).addTo(map);
  marker.bindPopup("<b>ตำแหน่ง</b><br> ละติจูด: " + latitude + "<br>ลองติจูด: " + longitude).openPopup();
});
  

  $('#bth-search').click(function() {
      let query = $('#input-search').val();
      let url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + query;

      fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          var latitude = data[0].lat;
          var longitude = data[0].lon;

          if (marker) {
              map.removeLayer(marker);
          }
          $('#latitude').val(latitude);
          $('#longitude').val(longitude);
  
          marker = L.marker([latitude, longitude], {icon: greenIcon}).addTo(map);
          map.setView([latitude, longitude], 15);
          marker.bindPopup("<b>ตำแหน่ง</b><br> ละติจูด: " + latitude + "<br>ลองติจูด: " + longitude).openPopup();

        } else {
          console.log("ไม่พบข้อมูลสถานที่");
        }
      })
      .catch(error => {
        console.error('เกิดข้อผิดพลาดในการค้นหา:', error);
      });
  })
});​