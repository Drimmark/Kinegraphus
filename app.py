from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def indexAction():
    return render_template('index.html')

@app.route('/results')
def resultsAction():
    return render_template('results.html')

if __name__ == '__main__':
	app.run(debug=True)