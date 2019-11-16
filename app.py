from flask import Flask, render_template, send_from_directory, request, jsonify, Response
import logging
from validation import validate_new_line
import re

logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__, template_folder='templates')
app.config['SECRET_KEY'] = 'you-will-never-guess'
app.config['WTF_CSRF_ENABLED'] = False
app.config['TEMPLATES_AUTO_RELOAD'] = True


@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')


@app.route('/static/<path:path>')
def send_js(path):
    return send_from_directory('templates', path)


@app.route("/validate", methods=['GET', 'POST'])
def api_info():
    txt = request.form['txt']
    print(txt)
    is_ok = validate_new_line(txt)
    if is_ok == True:
        return jsonify(result="A-OK")
    else:
        return jsonify(result=is_ok)


if __name__ == '__main__':
    app.run()