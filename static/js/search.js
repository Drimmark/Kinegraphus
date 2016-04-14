$(function() {

    // Search filters
    $('#filters form select, #filters form input').on('change', function() {
        $('#filters form').submit();
    })

    $('#time').clockpicker({
        'autoclose': true
    })
})
