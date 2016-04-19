# -*- coding: utf-8 -*-
from flask import Flask, render_template, request, redirect, url_for, json, abort, Response
from models import db, Cinema, Movie, ShowTime
from difflib import SequenceMatcher

app = Flask(__name__)
app.config.from_pyfile('config_file.cfg')
db.app = app
db.init_app(app)


@app.route('/')
def index():
    cities = db.session.query(Cinema.city).distinct()
    premieres_id = db.session.query(ShowTime.movie_id, db.func.count(ShowTime.movie_id))\
        .group_by(ShowTime.movie_id)\
        .order_by(db.func.count(ShowTime.movie_id).desc())\
        .limit(10)
    premieres = [Movie.query.get(premiere_id.movie_id) for premiere_id in premieres_id]

    return render_template('index.html', cities=cities, premieres=premieres)


@app.route('/searchsuggestions')
def search_suggestions():
    term = request.args.get('term', None)
    if term is not None:
        cinemas = Cinema.query.filter(Cinema.name.ilike('%' + term + '%')).all()
        movies = Movie.query.filter(Movie.title.ilike('%' + term + '%')).all()

        results = []
        results.extend([{'type': 0, 'value': cinema.name, 'id': cinema.id} for cinema in cinemas])
        results.extend([{'type': 1, 'value': movie.title, 'id': movie.id} for movie in movies])

        results = sorted(results, key=lambda result: 1-SequenceMatcher(None, result['value'].lower(), term.lower()).ratio())

        return Response(response=json.dumps(results),
                        status=200,
                        mimetype="application/json")
    else:
        abort(404)


@app.route('/searchcinemas', methods=['GET'])
def searchcinemas():
    cities = db.session.query(Cinema.city).distinct()
    movie_id = request.args.get('movie_id', None)
    city = request.args.get('city', None)
    time = request.args.get('time', None)

    if movie_id is not None:
        cinemas = Cinema.query.join(Cinema.show_times)\
            .filter(ShowTime.movie_id == movie_id)

        if city and len(city) > 0 is not None:
            cinemas = cinemas.filter(Cinema.city == city)

        if time is not None:
            cinemas = cinemas.filter(ShowTime.time >= time)

        return render_template('searchcinemas.html', cinemas=cinemas.all(), city=city, movie_id=movie_id, time=time, cities=cities, randoms=[10,20,30,40,50,60,70,80,90])
    else:
        return redirect(url_for('index'))


@app.route('/searchmovies', methods=['GET'])
def searchmovies():
    cinema_id = request.args.get('cinema_id', None)
    time = request.args.get('time', None)
    d2 = request.args.get('d2', None)
    d3 = request.args.get('d3', None)
    vose = request.args.get('vose', None)

    if cinema_id is not None:
        movies = Movie.query.join(Movie.show_times)\
            .filter(ShowTime.cinema_id == cinema_id)

        if time is not None:
            movies = movies.filter(ShowTime.time >= time)
        if d2 is not None:
            d2 = 'checked'
            if d3 is None:
                movies = movies.filter(Movie.format.like('%2D%'))
        if d3 is not None:
            d3 = 'checked'
            if d2 is None:
                movies = movies.filter(Movie.format.like('%3D%'))
        if vose is not None:
            vose = 'checked'
            movies = movies.filter(Movie.vose == '1')

        return render_template('searchmovies.html', movies=movies.all(), cinema_id=cinema_id, time=time, d2=d2, d3=d3, vose=vose, randoms=[10,20,30,40,50,60,70,80,90])
    else:
        return redirect(url_for('index'))


@app.route('/buy', methods=['POST'])
def buy():
    cinema_id = request.form.get('cinema_id', None)
    movie_id = request.form.get('movie_id', None)
    number = request.form.get('number', None)
    time = request.form.get('time', None)

    showtime = ShowTime.query.filter(ShowTime.cinema_id==cinema_id,
                                ShowTime.movie_id==movie_id,
                                ShowTime.time==time).first_or_404()

    return render_template('buy.html', showtime=showtime, number=number)


if __name__ == '__main__':
    app.run(debug=True)
