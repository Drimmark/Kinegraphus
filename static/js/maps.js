$(document).ready(function(){
	map = new GMaps({
		div: '#map',//pondriamos coordenadas de ??
		lat: 40.2172278, 
		lng: -3.8546396,
		zoom: 6,
	});
	//for(var i = 0; i< /*positions.length*/5; i++){
		map.addMarker({
			lat: 38.8802,//positions[i].latitude, 
			lng: -7.02625,//positions[i].longitude,
			title: city//positions[i].name
		})
	//}
});