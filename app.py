# -*- coding: utf-8 -*-
from flask import Flask, render_template
#from models.basicmodel import db

app = Flask(__name__)
#app.config.from_pyfile('config_file.cfg')
#db.app = app
#db.init_app(app)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/results')
def results():
    return render_template('results.html')


if __name__ == '__main__':
    app.run(debug=True)
