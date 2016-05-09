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
		x = document.getElementById('search').offsetHeight;
		h = document.getElementById('header').offsetHeight;
		f = document.getElementById('footer').offsetHeight;
		w = window.innerHeight;
		aux = 0;

		if (x<w){//Necesario para casos en los que hay muy pocos resultados
			a = x;
		}
		else{
			a = w;
		}
		if (x < w){
			document.getElementById("map").style.height = String(x) + "px";
		}

		//Estamos arriba
		if( $(this).scrollTop() < h){
			document.getElementById("map").style.top = String(h - $(this).scrollTop()) + "px";
		}
		//Estamos en medio
		else if( $(this).scrollTop() > h && ($(this).scrollTop() < h+x-w)){
			document.getElementById("map").style.top = "0px";
		}
		//Estamos abajo
		else if ($(this).scrollTop() > h+x-a){
			document.getElementById("map").style.top = "-" + String(-(x+h-a) + ($(this).scrollTop())) + "px";
		}

		//Estamos arriba
		if( $(this).scrollTop() < h){
			document.getElementById("filters").style.top = String(h - $(this).scrollTop()) + "px";
		}
		//Estamos en medio
		else if( $(this).scrollTop() > h && ($(this).scrollTop() < h+x-w)){
			document.getElementById("filters").style.top = "0px";
		}

	});
})
