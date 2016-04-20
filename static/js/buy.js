$(function() {

	//Generación de la sala
	for (i in sala) {
		ul = $("<ul>",{'class':'fila'}).appendTo("#salas");
		for (k in sala[i]) {
			if (sala[i][k] == 0) {
				$("<li>").html('<i class="fa fa-circle verde" aria-hidden="true"></i>').appendTo(ul);
			} else {
				$("<li>").html('<i class="fa fa-circle rojo" aria-hidden="true"></i>').appendTo(ul);
			}
		}
	}

	$('#salas ul li .verde').click(function(){
		$(this).toggleClass('verde');
		$(this).toggleClass('amarillo');
	});

	$('#salas ul li .amarillo').click(function(){
		$(this).toggleClass('verde');
		$(this).toggleClass('amarillo');
	});

	//Hay que actualizar tambien el número de entradas.
	$('#showButacas').click(function(){
		$('#butacas').slideToggle('horizontal','slow');
	});
});
