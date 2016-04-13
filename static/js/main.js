$(document).ready(function () {
	$('#inputText').keyup(function() {
		request = $.ajax({
			url: "/searchsuggestions",
			type: "get",
			data: "term="+this.value
		});
		
		// Callback handler that will be called on success
		request.done(function (response, textStatus, jqXHR){
			lista = [];
			console.log(response);
			for (i = 0; i < response.length && i < 10; i++) {
				lista.push(response[i].name);
			}
			console.log(lista);
			$( "#inputText" ).autocomplete({
				minLength: 3,
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

});