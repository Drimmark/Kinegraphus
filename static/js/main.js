$(document).ready(function () {
	$('#inputText').keyup(function() {

		$('#busqueda').css('opacity', 0.2);
		$('#busqueda').css('cursor', 'not-allowed');

		request = $.ajax({
			url: "/searchsuggestions",
			type: "get",
			data: "term="+this.value
		});
		
		// Callback handler that will be called on success
		request.done(function (response, textStatus, jqXHR){
			
			lista = [];
			//console.log(response);
			for (i = 0; i < response.length; i++) {
				var pelicula = {value:response[i].name, id:response[i].id, tipo:response[i].type};
				lista.push(pelicula);
			}

			$( "#inputText" ).autocomplete({
				minLength: 3,
   				select: function( event, ui ) {
   					$('#busqueda').css('opacity', 1);
					$('#busqueda').css('cursor', 'pointer');
					//$('#busqueda').attr('type', 'submit');
					if (ui.item['tipo'] == 1){ //PELICULA
						$('#selectCity').animate({
							width: 'toggle'
						});
   						$('#aBusqueda').attr('href', '/searchcinemas?movie_id='+ui.item['id']);
					} else { //CINE
						$('#aBusqueda').attr('href', '/searchmovies?cinema_id='+ui.item['id']);
					}
   				},
				source: lista
   			});

		});
    
		// Callback handler that will be called on failure
		request.fail(function (jqXHR, textStatus, errorThrown){
			// Log the error to the console
			console.error(
			"The following error occurred: "+
			textStatus, errorThrown
			);
		});
    
	});

	//$('#busqueda').click(function() {
	//	request = $.ajax({
	//        url: "/searchcinemas",
	//        type: "get",
	//        data: "movie_id=30611"
	//	});
	//});

	//$('#addFiltros').click(function(){
	//	if ($('#filtros').css('display') == 'flex') {
	//		$('.fa-plus-square').css('display','flex');
	//		$('.fa-minus-square').css('display','none');
	//		$('#filtros').css('display','none');
	//	}
	//	else{
	//		$('.fa-minus-square').css('display','flex');
	//		$('.fa-plus-square').css('display','none');
	//		$('#filtros').css('display','flex');
	//	}
	//});

});