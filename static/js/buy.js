$(function() {

	//Generación de la sala
	for (i in sala) {
		ul = $("<ul>",{'class':'fila'}).appendTo("#salas");
		for (k in sala[i]) {
			if (sala[i][k] == 0) {
				$("<li>").html('<i class="fa fa-circle verde" aria-hidden="true"></i>').appendTo(ul);
			} else if (sala[i][k] == 1) {
				$("<li>").html('<i class="fa fa-circle rojo" aria-hidden="true"></i>').appendTo(ul);
			} else {
				$("<li>").html('<i class="fa fa-circle amarillo" aria-hidden="true"></i>').appendTo(ul);
			}
		}
	}

	$('div#salas ul li i').click(function(){
		if (this.classList[2] != 'rojo') {
			$(this).toggleClass('verde');
			$(this).toggleClass('amarillo');
			if (this.classList[2] == 'verde') {
				$('#numButacas').html(parseInt($('#numButacas').html()) - 1 ); 
			} else {
				$('#numButacas').html(parseInt($('#numButacas').html()) + 1 ); 
			}
		}
	});

	//Hay que actualizar tambien el número de entradas.
	$('#showButacas').click(function(){
		if ( $('#butacas').css('width') != '0px'){
			$('#showButacas').removeClass("fa fa-minus-square");
			$('#showButacas').addClass("fa fa-plus-square");
			$('#butacas').css('width', '0%');
		} else {
			$('#showButacas').removeClass("fa fa-plus-square");
			$('#showButacas').addClass("fa fa-minus-square");
			$('#butacas').css('width', '100%');
		}
	});
});
