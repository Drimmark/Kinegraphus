$(function() {

    // Search filters
    $('#filters form select, #filters form input').on('change', function() {
        $('#filters form').submit();
    })

    $('#time').clockpicker({
        'autoclose': true
    })

    // search
    $(window).scroll(function(){
	/*	x = document.getElementById('search').offsetHeight;
		//$(this).scrollTop() < footer
		if( $(this).scrollTop() < 110){//Estamos arriba
			//$('#map').removeClass('map3');
			$('#map').removeClass('map2');
			$('#map').addClass('map');
		}
		else if( $(this).scrollTop() > 110 && $(this).scrollTop() < x-400){//estamos en medio
			$('#map').removeClass('map3');
			$('#map').removeClass('map');
			$('#map').addClass('map2');
			;
		} else if ($(this).scrollTop() > x-400){//estamos abajo
			//$('#map').removeClass('map');
			$('#map').removeClass('map2');
			$('#map').addClass('map3')
		}*/

		x = document.getElementById('search').offsetHeight;
		h = document.getElementById('header').offsetHeight;
		f = document.getElementById('footer').offsetHeight;
		w = window.innerHeight;
		
		//$(this).scrollTop() < footer
		if( $(this).scrollTop() < h){//Estamos arriba
			document.getElementById("map").style.top = String(h - $(this).scrollTop()) + "px";
			//document.getElementById("map").style.height = String(w - $(this).scrollTop()) + "px";
		}
		else if( $(this).scrollTop() > h && ($(this).scrollTop() < h+x-w)){//estamos en medio
			document.getElementById("map").style.top = "0px";
			//document.getElementById("map").style.height = String(w) + "px";
		}
		else if ($(this).scrollTop() > h+x-w){//estamos abajo
			document.getElementById("map").style.top = "-" + String(-(x+h-w) + ($(this).scrollTop())) + "px";
			//document.getElementById("map").style.height = String(w - x - $(this).scrollTop()) + "px";
		}

		//HAY QUE PONER EL TAMAÑO DEL BICHO TAMBIEN CON LA DIFERENCIA

	});
})
