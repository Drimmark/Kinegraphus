$(function () {
	$.widget("custom.kineAutocomplete", $.ui.autocomplete, {
		_renderItem: function(ul, item) {
			return $("<li>")
			.append( $( "<div>", {'class': item.type == 1 ? 'film-suggestion' : 'movie-suggestion'} )
			.html('<i class="fa '+ (item.type == 1 ? 'fa-film' : 'fa-building') + '"></i><span>' + item.label + '</span>') )
			.appendTo(ul);
		}
	})

	$('form.search input#inputText').kineAutocomplete({
		minLength: 2,
		search: function() {
			$('form.search button').prop('disabled', 1);
		},
		select: function(event, ui) {
			$('form.search button').prop('disabled', 0);

			if (ui.item['type'] == 1){ //PELICULA
				$('#selectCity').animate({
					width: 'toggle'
				});

				$('form.search').attr('action', '/searchcinemas');
				$('form.search #hidden').attr('name', 'movie_id').attr('value', ui.item['id']);
			} else { //CINE
				$('#selectCity').hide();

				$('form.search').attr('action', '/searchmovies');
				$('form.search #hidden').attr('name', 'cinema_id').attr('value', ui.item['id']);
			}
		},
		source: "/searchsuggestions"
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
