$(function() {

    // Search filters
    $('#filters form select, #filters form input').on('change', function() {
        $('#filters form').submit();
    })

    $('#time').clockpicker({
        'autoclose': true
    })
})

$(document).ready(function(){
 
	$(window).scroll(function(){
		x = document.getElementById('search').offsetHeight;
		//$(this).scrollTop() < footer
		if( $(this).scrollTop() < 106){//Estamos arriba
			//$('#map').removeClass('map3');
			$('#map').removeClass('map2');
			$('#map').addClass('map');
		}	
		else if( $(this).scrollTop() > 106 && $(this).scrollTop() < x-400){//estamos en medio
			$('#map').removeClass('map3');
			$('#map').removeClass('map');
			$('#map').addClass('map2');
			;	
		} else if ($(this).scrollTop() > x-400){//estamos abajo
			//$('#map').removeClass('map');
			$('#map').removeClass('map2');
			$('#map').addClass('map3')
		}
	});
 
});//section#search .map