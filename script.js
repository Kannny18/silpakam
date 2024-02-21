jQuery(function($) {
    const monumentCoords = [13.63295258979151, 100.75565341514103];
    
    var map = L.map("map").setView(monumentCoords, 8);
    var OpenStreetMap_Mapnik = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  

  
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
		$('#latitude').val(x);
		$('#longitude').val(y);

        marker = L.marker([x, y], {icon: greenIcon}).addTo(map);
		marker.bindPopup("<b>ตำแหน่ง</b><br> ละติจูด: " + x + "<br>ลองติจูด: " + y).baseMaps();
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
            $('#latitude').val(x);
            $('#longitude').val(y);
    
            marker = L.marker([x, y], {icon: greenIcon}).addTo(map);
            map.setView([x, y], 15);
            marker.bindPopup("<b>ตำแหน่ง</b><br> ละติจูด: " + x + "<br>ลองติจูด: " + y).baseMaps();

          } else {
            console.log("ไม่พบข้อมูลสถานที่");
          }
        })
        .catch(error => {
          console.error('เกิดข้อผิดพลาดในการค้นหา:', error);
        });
    })
});​