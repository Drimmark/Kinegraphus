from models.basicmodel import db

class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=1)
    title = db.Column(db.String(255), nullable=False)
    sinopsis = db.Column(db.Text)
    duration = db.Column(db.Integer, nullable=False)
    imdb = db.Column(db.String(128))
    vose = db.Column(db.Boolean)
    rating = db.Column(db.String(255), nullable=False)
    cartel = db.Column(db.String(255), nullable=True)


    def __init__(self, title=None, sinopsis=None, duration=None, imdb=None, vose=None, rating=None):
        self.title = title
        self.sinopsis = sinopsis
        self.duration = duration
        self.imdb = imdb
        self.vose = vose
        self.rating = rating

    def __repr__(self):
        return self.title
