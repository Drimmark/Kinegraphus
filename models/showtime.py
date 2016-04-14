# -*- coding: utf-8 -*-
from models.basicmodel import db


class ShowTime(db.Model):
    cinema_id = db.Column(db.Integer, db.ForeignKey('cinema.id'), primary_key=True)
    movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'), primary_key=True)
    time = db.Column(db.String(128), primary_key=True)

    def __init__(self, cinema_id, movie_id, time):
        self.cinema_id = cinema_id
        self.movie_id = movie_id
        self.time = time

    def __repr__(self):
        return str(self.movie_id) + ' - ' + self.time
