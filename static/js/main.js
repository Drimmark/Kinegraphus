$(document).ready(function () {
	$('#inputText').keyup(function() {

		$('#busqueda').css('opacity', 0.2);
		$('#busqueda').css('cursor', 'none');

		request = $.ajax({
			url: "/searchsuggestions",
			type: "get",
			data: "term="+this.value
		});
		
		// Callback handler that will be called on success
		request.done(function (response, textStatus, jqXHR){
			lista = [];
			for (i = 0; i < response.length; i++) {
				lista.push(response[i].name);
			}
			$( "#inputText" ).autocomplete({
				minLength: 3,
   				open: function( event, ui ) {
   					$('#ui-id-1 li div').click(function () {
						$('#busqueda').css('opacity', 1);
						$('#busqueda').css('cursor', 'pointer');
					});
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

	$('#ui-id-1 li div').click(function () {
		$('#busqueda').css('opacity', 1);
		$('#busqueda').css('cursor', 'pointer');
	});

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