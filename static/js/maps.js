$(document).ready(function(){
	//var lat;
	//var lng;
	var zoom = 6;
	if (city.localeCompare("")){
		zoom = 10;
		
	}
	map = new GMaps({
		div: '#map',//pondriamos coordenadas de ??
		lat: 40.2172278, 
		lng: -3.8546396,
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