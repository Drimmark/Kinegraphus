from models.basicmodel import db


class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=1)
    title = db.Column(db.String(255), nullable=False)
    sinopsis = db.Column(db.Text)
    format = db.Column(db.String(128), nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    imdb = db.Column(db.String(128))
    vose = db.Column(db.Boolean)
    rating = db.Column(db.String(255), nullable=False)
    cartel = db.Column(db.String(128), nullable=True)
    show_times = db.relationship('ShowTime', backref='movie')

    def __init__(self, title=None, sinopsis=None, format=None, duration=None, imdb=None, vose=None, rating=None, cartel=None):
        self.title = title
        self.sinopsis = sinopsis
        self.format = format
        self.duration = duration
        self.imdb = imdb
        self.vose = vose
        self.rating = rating
        self.cartel = cartel

    def __repr__(self):
        return self.title
