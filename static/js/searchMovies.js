$('.imdb-rate').each(function() {
    var imdbContainer = $(this);
    $.get( "http://www.omdbapi.com/", {i: imdbContainer.data('imdbid')}, function(data) {
        $(imdbContainer).replaceWith(data.imdbRating);
    });
});
