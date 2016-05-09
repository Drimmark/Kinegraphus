# -*- coding: utf-8 -*-
from flask import Flask, render_template, request, redirect, url_for, json, abort, Response
from models import db, Cinema, Movie, ShowTime
from difflib import SequenceMatcher
from datetime import *

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
    date = datetime.now().strftime('%Y-%m-%d')
    return render_template('index.html', cities=cities, premieres=premieres, date=date)


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
    print request.args.get('date')
    date = datetime.strptime(request.args.get('date'), "%Y-%m-%d") if request.args.get('date', None) is not None else datetime.today()

    if movie_id is not None:
        cinemas = Cinema.query.join(Cinema.show_times)\
            .filter(ShowTime.movie_id == movie_id)

        if city and len(city) > 0 is not None:
            cinemas = cinemas.filter(Cinema.city == city)

        if time is not None:
            cinemas = cinemas.filter(ShowTime.time >= time)

        return render_template('searchcinemas.html', cinemas=cinemas.all(), city=city, movie_id=movie_id, time=time, date=date, cities=cities, randoms=[10,20,30,40,50,60,70,80,90])
    else:
        return redirect(url_for('index'))


@app.route('/searchmovies', methods=['GET'])
def searchmovies():
    cinema_id = request.args.get('cinema_id', None)
    time = request.args.get('time', None)
    print request.args.get('date') == None
    date = datetime.strptime(request.args.get('date'), "%Y-%m-%d") if request.args.get('date', None) is not None else datetime.today()
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

        cinema = Cinema.query.filter(Cinema.id == cinema_id).first()
        return render_template('searchmovies.html', movies=movies.all(), cinema=cinema, cinema_id=cinema_id, time=time, date=date, d2=d2, d3=d3, vose=vose, randoms=[10,20,30,40,50,60,70,80,90])
    else:
        return redirect(url_for('index'))


@app.route('/buy', methods=['POST'])
def buy():
    cinema_id = request.form.get('cinema_id', None)
    movie_id = request.form.get('movie_id', None)
    number = request.form.get('number', None)
    date = datetime.strptime(request.form.get('date'), "%Y-%m-%d") if request.form.get('date', None) is not None else datetime.today()
    time = request.form.get('time', None)

    showtime = ShowTime.query.filter(ShowTime.cinema_id==cinema_id,
                                ShowTime.movie_id==movie_id,
                                ShowTime.time==time).first_or_404()

    butacas = [[[0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0] ],

               [[0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [],
                #Aqui un pasillo o argo
                [0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0] ],
               [[0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [],
                #Aqui un pasillo o argo
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0] ]
                ]

    return render_template('buy.html', showtime=showtime, number=number, date=date, butacas=butacas)


@app.route('/buyEnd', methods=['POST'])
def buyEnd():
    precio = int(request.form.get('entradas',None))*4.9
    pelicula = request.form.get('pelicula',None)
    cartel = request.form.get('id_pelicula', None)
    cine = request.form.get('cine',None)
    location = request.form.get('maps_cine',None)
    date = request.form.get('fecha',None)
    showtime = request.form.get('horario',None)
    butacas = request.form.getlist('butaca')
    golosinas = int(request.form.get('golosinas',None))
    nestea = int(request.form.get('nestea',None))
    cola = int(request.form.get('cola',None))
    colaZ = int(request.form.get('cola-zero',None))
    nachos = int(request.form.get('nachos',None))
    palomitas = int(request.form.get('palomitas',None))

    precio += golosinas*1.0 + nestea*2.5 + cola*1.8 + colaZ*2.0 + nachos*4.0 + palomitas*2.5
    # print request.form
    return render_template('buyEnd.html', cine=cine, location=location, pelicula=pelicula, cartel = cartel, showtime=showtime, precio=precio, date=date, butacas=butacas, nestea=nestea, golosinas=golosinas,colaZ=colaZ, cola=cola, nachos=nachos, palomitas=palomitas)

@app.route('/contacto')
def contacto():

    return render_template('contacto.html')


if __name__ == '__main__':
    app.run(debug=True)
