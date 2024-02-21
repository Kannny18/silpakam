jQuery(function($) {
    const monumentCoords = [13.764965736837137,100.54030365081788];
	
	var map = L.map("map").setView(monumentCoords, 16);
	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	attribution: "© OpenStreetMap contributors",
	}).addTo(map);

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

});