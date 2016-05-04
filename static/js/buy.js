$(function() {

	for (i in butacasSelect){
		$("<li>").html('Butaca: '+ butacasSelect[i][1] + ' Fila: ' + butacasSelect[i][0]).appendTo($('#butacasSelect'));
		$("<li>").html('<input type="hidden" name="butaca" value="Butaca: '+ butacasSelect[i][1] + ' Fila: ' + butacasSelect[i][0]+ '">').appendTo($('#butacasSelect'));
	}
	if ($('#entradas input').val() > 1){
		$('#entradas span').html($('#entradas input').val() + " entradas");
	} else {
		$('#entradas span').html($('#entradas input').val() + " entrada");
	}
	$('#conteo').html("<b>Entradas:</b> " + $('#entradas input').val() + " x 4.90 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>" + Math.round($('#entradas input').val() * 4.9 * 100) / 100 + " €</b>");
	$('#total').html("Precio &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + Math.round($('#entradas input').val() * 4.9 * 100) / 100 + " €");

	// Payment methods
	$('input[name="payment_t"]').on('change', function() {
        if ($(this).val() == 1) {
            $('div#card').slideDown();
            $('div#card input#card_number').focus();
            $('form button').attr('disabled', true);
        } else {
            $('div#card').slideUp();
            $('form button').attr('disabled', false);
        }
    });

	$('div#card input#card_number').on('input', function() {
        var provider = getCardType($(this).val());
        var elem = $('div#card i.big');
        if (provider != null) {
            elem.removeClass();
            elem.addClass('fa big fa-cc-' + provider);
        } else {
            elem.removeClass();
            elem.addClass('fa big fa-credit-card');
        }
    });

	$('div#card input#card_number').on('keypress', function() {
        var str = '';
        var orig = $(this).val().replace(/ /g,'');
        for (var i = 0; i < orig.length; i++) {
            str += orig[i];
            if ((i+1) % 4 == 0) {
                str += ' ';
            }
        }
        $(this).val(str);

		if (orig.length >= 15) {
			$('div#card input#card_expiration').focus();
		}
    });

    $('div#card input#card_expiration').on('keypress', function() {
        var str = '';
        var orig = $(this).val().replace(/ \/ /g,'');
        for (var i = 0; i < orig.length; i++) {
            str += orig[i];
            if (i == 1) {
                str += ' / ';
            }
        }

        $(this).val(str);

		if (orig.length >= 3) {
			$('div#card input#card_cvx').focus();
		}
    });

	$('div#card input').on('keyup', function()  {
		if ($('div#card input#card_expiration').val().length > 0 &&
			$('div#card input#card_number').val().length > 0 &&
			$('div#card input#card_cvx').val().length > 0) {
			$('form button').attr('disabled', false);
		} else {
			$('form button').attr('disabled', true);
		}
	})


	//Generación de la sala
	for (i in sala) {
		ul = $("<ul>",{'class':'fila'}).appendTo("#salas");
		for (k in sala[i]) {
			if (sala[i][k] == 0) {
				$("<li>").html('<i fila='+ (sala.length-i) +' asiento='+ (sala[i].length-k) +' class="fa fa-circle verde" aria-hidden="true"></i>').appendTo(ul);
			} else if (sala[i][k] == 1) {
				$("<li>").html('<i fila='+ (sala.length-i) +' asiento='+ (sala[i].length-k)+ ' class="fa fa-circle rojo" aria-hidden="true"></i>').appendTo(ul);
			} else {
				$("<li>").html('<i fila='+ (sala.length-i) +' asiento='+ (sala[i].length-k)+ ' class="fa fa-circle amarillo" aria-hidden="true"></i>').appendTo(ul);
			}
		}
	}

	$('div#salas ul li i').click(function(){
		if (this.classList[2] != 'rojo') {
			$(this).toggleClass('verde');
			$(this).toggleClass('amarillo');
			if (this.classList[2] == 'verde') {
				$('#entradas input').val(parseInt($('#entradas input').val()) - 1);
				if ($('#entradas input').val() > 1){
					$('#entradas span').html($('#entradas input').val() + " entradas");
				} else {
					$('#entradas span').html($('#entradas input').val() + " entrada");
				}
				$('#conteo').html("<b>Entradas:</b> " + $('#entradas input').val() + " x 4.90 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>" + Math.round($('#entradas input').val() * 4.9 * 100) / 100 + " €</b>");
				$('#total').html("Precio &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + Math.round($('#entradas input').val() * 4.9 * 100) / 100 + " €");
				butaca = [$(this).attr("fila"), $(this).attr("asiento")];
				$('#butacasSelect').html("");
				for (i in butacasSelect){
					if (butaca[0] == butacasSelect[i][0] && butaca[1] == butacasSelect[i][1]){
						delete butacasSelect[i];
						if (parseInt($('#entradas input').val()) == 0)
							$('#butacasSelect').html("Butacas");
					}
					else {
						$("<li>").html('Butaca: '+ butacasSelect[i][1] + ' Fila: ' + butacasSelect[i][0]).appendTo($('#butacasSelect'));
						$("<li>").html('<input type="hidden" name="butaca" value="Butaca: '+ butacasSelect[i][1] + ' Fila: ' + butacasSelect[i][0]+ '">').appendTo($('#butacasSelect'));
					}
				}
			} else {
				$('#entradas input').val(parseInt($('#entradas input').val()) + 1);
				if ($('#entradas input').val() > 1){
					$('#entradas span').html($('#entradas input').val() + " entradas");
				} else {
					$('#entradas span').html($('#entradas input').val() + " entrada");
				}
				$('#conteo').html("<b>Entradas:</b> " + $('#entradas input').val() + " x 4.90 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>" + Math.round($('#entradas input').val() * 4.9 * 100) / 100 + " €</b>");
				$('#total').html("Precio &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + Math.round($('#entradas input').val() * 4.9 * 100) / 100 + " €");
				$('#butacasSelect').html("");
				butaca = [$(this).attr("fila"), $(this).attr("asiento")];
				butacasSelect.push(butaca)
				for (i in butacasSelect){
					$("<li>").html('Butaca: '+ butacasSelect[i][1] + ' Fila: ' + butacasSelect[i][0]).appendTo($('#butacasSelect'));
					$("<li>").html('<input type="hidden" name="butaca" value="Butaca: '+ butacasSelect[i][1] + ' Fila: ' + butacasSelect[i][0]+ '">').appendTo($('#butacasSelect'));
				}
			}
		}
	});
	//for (i in butacasSelect){
	//	$("<li>").html('Butaca: '+ butacasSelect[i][1] + ' Fila: ' + butacasSelect[i][0]).appendTo($('#butacasSelect'));
	//}

	//Hay que actualizar tambien el número de entradas.
	$('#showButacas a').click(function(e){
		e.preventDefault();

		if ( $('#complements').css('width') != '0px'){
			$('#showComplements a i').removeClass("fa-minus-square");
			$('#showComplements a i').addClass("fa-plus-square");
			$('#complements').css('width', '0%');
		}
		if ( $('#butacas').css('font-size') != '8px'){
			console.log( $('#butacas').css('font-size'));
			$('#showButacas a i').removeClass("fa-search-minus");
			$('#showButacas a i').addClass("fa-search-plus");
			$('#butacas').css('font-size', '8px');
			$('#butacas').css('width', '25%');
		} else {
			$('#showButacas a i').removeClass("fa-search-plus");
			$('#showButacas a i').addClass("fa-search-minus");
			$('#butacas').css('font-size', '16px');
			$('#butacas').css('width', '100%');
		}
	});

	var complementContainer = document.getElementById('complement');

	for (complementIndex in complementsOptions) {
		newNode = document.createElement('li');
		temporalNode = document.createElement('h3');
		temporalNode.innerHTML = complementsOptions[complementIndex].name;
		newNode.appendChild(temporalNode);
		temporalNode = document.createElement('img');
		temporalNode.src = complementsOptions[complementIndex].image;
		newNode.appendChild(temporalNode);
		groupNode = document.createElement('div');
		temporalNode = document.createElement('p');
		temporalNode.innerHTML = complementsOptions[complementIndex].price + ' €';
		groupNode.appendChild(temporalNode);
		plusButton = document.createElement('i');
		plusButton.className = 'fa fa-plus';
		plusButton.setAttribute('index', complementIndex);
		groupNode.appendChild(plusButton);
		newNode.appendChild(groupNode);

		complementContainer.appendChild(newNode);

		plusButton.addEventListener('click', function(e) {
			var index = e.target.getAttribute('index');

			complements[index].amount += 1;
		});
	}

	//Show complements
	$('#showComplements a').click(function(e){
		e.preventDefault();

		if ( $('#butacas').css('width') != '0px'){
			$('#showButacas a i').removeClass("fa-search-minus");
			$('#showButacas a i').addClass("fa-search-plus");
			$('#butacas').css('width', '0%');
		}
		if ( $('#complements').css('width') != '0px'){
			$('#showComplements a i').removeClass("fa-minus-square");
			$('#showComplements a i').addClass("fa-plus-square");
			$('#complements').css('width', '0%');
			$('#butacas').css('width', '40%');
		} else {
			$('#showComplements a i').removeClass("fa-plus-square");
			$('#showComplements a i').addClass("fa-minus-square");
			$('#complements').css('width', '100%');
		}
	});


	//Actualizar entradas y precio
	$('#entradas input').on('input', function() {
		$('#conteo').html("<b>Entradas:</b> " + $('#entradas input').val() + " x 4.90 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>" + Math.round($('#entradas input').val() * 4.9 * 100) / 100 + " €</b>");
		$('#total').html("Precio &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + Math.round($('#entradas input').val() * 4.9 * 100) / 100 + " €");
	});
});

function getCardType(number) {
    // visa
    var re = new RegExp("^4");
    if (number.match(re) != null)
        return "visa";

    // Mastercard
    re = new RegExp("^5[1-5]");
    if (number.match(re) != null)
        return "mastercard";

    // AMEX
    re = new RegExp("^3[47]");
    if (number.match(re) != null)
        return "amex";
    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null)
        return "jcb";

    return null;
}
