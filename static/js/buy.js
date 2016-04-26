$(function() {

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

	var complementContainer = document.getElementById('complement');

	for (complementIndex in complementsOptions) {
		newNode = document.createElement('li');
		temporalNode = document.createElement('h3');
		temporalNode.innerHTML = complementsOptions[complementIndex].name;
		newNode.appendChild(temporalNode);
		temporalNode = document.createElement('img');
		temporalNode.src = complementsOptions[complementIndex].image;
		newNode.appendChild(temporalNode);
		temporalNode = document.createElement('p');
		temporalNode.innerHTML = complementsOptions[complementIndex].price + ' €';
		newNode.appendChild(temporalNode);

		complementContainer.appendChild(newNode);

		console.log(newNode);

		console.log(complementsOptions[complementIndex]);
	}

	//Show complements
	$('#showComplements').click(function(){
		if ( $('#complements').css('width') != '0px'){
			$('#showComplements').removeClass("fa fa-minus-square");
			$('#showComplements').addClass("fa fa-plus-square");
			$('#complements').css('width', '0%');
		} else {
			$('#showComplements').removeClass("fa fa-plus-square");
			$('#showComplements').addClass("fa fa-minus-square");
			$('#complements').css('width', '100%');
		}
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
