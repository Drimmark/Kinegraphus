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
		if (positions.length == 1) {//si hay solo un cine, ponemos zoom para ver servicios
			zoom = 19;
		}
		else{//Si hay varios, zoom para verlos todos
			zoom = 12;
		}	
	}
	else if(!city.localeCompare("geo")){//Si no hemos filtrado ciudad y tenemos geolocalizacion, machacamos los centros calculados y usamos los de geolocalizacion
		lat = my_latitud;
		lng = my_longitud;
		zoom = 14;
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