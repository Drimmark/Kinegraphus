from models.basicmodel import db

#
class Ticket(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=1)
    showtime = db.Column(db.Integer, db.ForeignKey('showtime.id'))
    seat = db.Column(db.Integer, db.ForeignKey('seat.id'))
    

    def __init__(self, showtime=None, seat=None):
        self.showtime = showtime
        self.seat = seat

    def __repr__(self):
        return self.!!!!!!!!!!
