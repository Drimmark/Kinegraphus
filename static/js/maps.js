$(document).ready(function(){
	var lat = 0;
	var lng = 0;
	var zoom;
	//Calculamos el centro
	for (var i = 0; i < positions.length; i++) {
		lat += positions[i].latitude;
		lng += positions[i].longitude;
	}
	lat = lat/positions.length;
	lng = lng/positions.length;
	if (city.localeCompare("")){//Entra al filtrar una ciudad
		if (positions.length == 1) {
			zoom = 15;
		}
		else{
			zoom = 12;
		}	
	}
	else{
		zoom = 4;
	}
	map = new GMaps({
		div: '#map',//pondriamos coordenadas de ??
		lat: lat, 
		lng: lng,
		zoom: zoom,
	});
	for(var i = 0; i< positions.length; i++){
		map.addMarker({
			lat: positions[i].latitude, 
			lng: positions[i].longitude,
			title: positions[i].name
		})
	}
});