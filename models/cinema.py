# -*- coding: utf-8 -*-
from models.basicmodel import db


class Cinema(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=1)
    name = db.Column(db.String(128), nullable=False)
    telephone = db.Column(db.String(128))
    street = db.Column(db.String(128), nullable=False)
    city = db.Column(db.String(128), nullable=False)
    state = db.Column(db.String(128), nullable=False)
    postal_code = db.Column(db.String(128), nullable=False)
    country = db.Column(db.String(128), nullable=False)
    longitude = db.Column(db.Float)
    latitude = db.Column(db.Float)
    show_times = db.relationship('ShowTime', backref='event')

    def __init__(self, name, telephone, street, city, state, postal_code, country, longitude, latitude):
        self.name = name
        self.telephone = telephone
        self.street = street
        self.city = city
        self.state = state
        self.postal_code = postal_code
        self.country = country
        self.longitude = longitude
        self.latitude = latitude
        
    def __repr__(self):
        return self.title
