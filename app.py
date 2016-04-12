# -*- coding: utf-8 -*-
from flask import Flask, render_template, request, redirect, url_for
from models import db, Cinema, Movie, ShowTime

app = Flask(__name__)
app.config.from_pyfile('config_file.cfg')
db.app = app
db.init_app(app)


def import_xml(file_name):
    import xml.etree.cElementTree as et
    root = et.ElementTree(file=file_name).getroot()
    theaters = root.findall('theaters')[0]
    movies = root.findall('movies')[0]
    show_times = root.findall('showTimes')[0]

    for theater in theaters:
        cinema = Cinema(theater.find('name').text,
                        theater.find('telephone').text,
                        theater.find('address').find('streetAddress').find('street').text,
                        theater.find('address').find('city').text,
                        theater.find('address').find('state').text,
                        theater.find('address').find('postalCode').text,
                        theater.find('address').find('country').text,
                        float(theater.find('longitude').text) if theater.find('longitude').text is not None else None,
                        float(theater.find('latitude').text) if theater.find('latitude').text is not None else None)
        cinema.id = theater.attrib['theaterId']
        db.session.add(cinema)

    for movie in movies:
        mov = Movie(movie.find('officialTitle').text,
                    movie.find('sinopsis').text if movie.find('sinopsis') is not None else None,
                    movie.find('format').text,
                    int(movie.find('runningTime').text) if movie.find('runningTime').text is not None else None,
                    movie.find('imdb').text if movie.find('imdb') is not None else None,
                    movie.find('version').text == 'Z',
                    movie.find('ratings').find('rating').text,
                    movie.find('cartel').text)
        mov.id = movie.attrib['movieId']
        db.session.add(mov)

    for show_time in show_times:
        for time in show_time.find('times').findall('time'):
            if Movie.query.get(show_time.attrib['movieId']) and Cinema.query.get(show_time.attrib['theaterId']):
                showtime = ShowTime(show_time.attrib['theaterId'],
                                    show_time.attrib['movieId'],
                                    time.text[0:2] + ':' + time.text[2:4])
                db.session.merge(showtime)

    db.session.commit()


@app.route('/')
def index():
    cities = db.session.query(Cinema.city).distinct()
    premieres_id = db.session.query(ShowTime.movie_id, db.func.count(ShowTime.movie_id))\
        .group_by(ShowTime.movie_id)\
        .order_by(db.func.count(ShowTime.movie_id).desc())\
        .limit(10)
    premieres = [Movie.query.get(premiere_id.movie_id) for premiere_id in premieres_id]

    return render_template('index.html', cities=cities, premieres=premieres)


@app.route('/searchcinemas')
def search_cinemas():
    movie_id = request.args.get('movie_id', None)
    city = request.args.get('city', None)
    time = request.args.get('time', None)

    if movie_id is not None:
        cinemas = Cinema.query.join(Cinema.show_times)\
            .filter(ShowTime.movie_id == movie_id)

        if city is not None:
            cinemas = cinemas.filter(Cinema.city == city)

        if time is not None:
            cinemas = cinemas.filter(ShowTime.time >= time)

        return render_template('searchcinemas.html', cinemas=cinemas.all())
    else:
        return redirect(url_for('index'))


@app.route('/searchmovies')
def search_movies():
    pass


if __name__ == '__main__':
    app.run(debug=True)
