$(document).ready(function(){
	map = new GMaps({
		div: '#map',//pondriamos coordenadas de ??
		lat: 40.2172278, 
		lng: -3.8546396,
		zoom: 6,
	});
	for(var i = 0; i< positions.length; i++){
		map.addMarker({
			lat: positions[i].latitude, 
			lng: positions[i].longitude,
			title: positions[i].name
		})
	}
});