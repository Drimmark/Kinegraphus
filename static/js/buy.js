$(function() {
	for (i in sala) {
		ul = $("<ul>",{'class':'fila'}).appendTo("#salas");
		for (k in sala[i]) {
			if (sala[i][k] == 0) {
				$("<li>").html('<i class="fa fa-circle-o" aria-hidden="true"></i>').appendTo(ul);
			} else {
				$("<li>").html('<i class="fa fa-circle" aria-hidden="true"></i>').appendTo(ul);
			}

		}
	}
});
