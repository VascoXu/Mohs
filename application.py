import os
import glob
import shutil

from flask import Flask, flash, jsonify, request, redirect, session, render_template, url_for, send_file
from helpers import zipdir
from base64 import b64decode
from werkzeug.utils import secure_filename
from flask_session import Session
from tempfile import mkdtemp
import json
import csv
import zipfile
import webbrowser
from threading import Timer


# Configure application
app = Flask(__name__, static_folder='./build', static_url_path='/')

# Ensure responses aren't cached
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


@app.route('/')
def index():
    """Show main page"""
    return app.send_static_file('index.html')


@app.route('/home')
def home():
    """Home Page"""
    return render_template("home.html")


@app.route('/api/procedure')
def procedure():
    """Return the procedure and list of questions"""

    procedure = []
    with open('procedure.txt') as fp:
        # Remove empty lines
        lines = (line.rstrip() for line in fp)
        lines = (line for line in lines if line)

        for line in lines:
            # Insert procedure
            step = {}
            step['procedure'] = line[2:].lstrip()

            # Insert question and answers
            questions = []
            question = next(lines, None)

            # Reached end
            if not question:
                break

            # Iterate through questions
            while not question.startswith('-'):    
                answer = next(lines, None)
                q = (question[2:].lstrip(), answer[2:].lstrip())

                questions.append(q)
                question = next(lines, None)
                
            step['questions'] = questions

            procedure.append(step)    

    return jsonify(procedure)


@app.route('/api/pnum', methods=['POST'])
def pnum():
    """Create a directory for a participant"""

    # Get Participant Number from POST request
    data = request.get_json()
    foldername = data['foldername']
    pnum = data['pnum']
    etime = data['etime']
    ptime = data['ptime']

    # Delete directory, if exists (start fresh)
    if os.path.exists(f'Participants/{foldername}'):
        shutil.rmtree(f'Participants/{foldername}')

    os.mkdir(f'Participants/{foldername}')
    os.mkdir(f'Participants/{foldername}/soundfiles')
    os.mkdir(f'Participants/{foldername}/logfiles')

    # Create log file with headers
    with open(f'Participants/{foldername}/logfiles/{foldername}.csv', 'w') as logfile:
        csv_writer = csv.writer(logfile)
        csv_writer.writerow(['Absolute Time', 'Relative Time', 'Action'])
        csv_writer.writerow([etime, 'N/A', 'Experimenter Ready'])
        csv_writer.writerow([ptime, 'N/A', 'Participant Ready'])

    return jsonify({'res': "Success!"})


@app.route('/api/audio', methods=['POST'])
def audio():
    """Locally save audio file"""

    audio = request.files['audio']
    pnum = request.form['pnum']
    filename = request.form['filename']
    foldername = request.form['foldername']

    audio.save(f'Participants/{foldername}/soundfiles/{filename}.wav')

    return jsonify({'res': "Success!"})


@app.route('/api/export', methods=['POST'])
def export():
    """Send zip file back to client"""

    # Get pnum from POST request arguments
    data = request.get_json()
    foldername = data['foldername']
    zipname = f'{foldername}.zip'
    path = f'Participants/{zipname}.zip'

    # Zip folder
    zipdir(f'Participants/{foldername}/', path)

    return send_file(path, mimetype='application/zip', attachment_filename=zipname, as_attachment=True)


@app.route('/api/log', methods=['POST'])
def logfile():
    """Locally save CSV log file"""

    # Get log file data from POST request
    data = request.get_json()
    foldername = data['foldername']
    abs_timestamp = data['abs_timestamp']
    rel_timestamp = data['rel_timestamp']
    action = data['action']

    # Determine filename
    filename = glob.glob(f'Participants/{foldername}/logfiles/*.csv')[0]

    # Write log to file
    with open(filename, 'a') as logfile:
        csv_writer = csv.writer(logfile)
        csv_writer.writerow([abs_timestamp, rel_timestamp, action])
    
    return jsonify({'res': "Success!"})


@app.route('/api/version', methods=['POST', 'GET'])
def version():
    """Retrieve the version number"""

    # Get version number
    if request.method == "GET":
        version = 0
        with open("version.txt", "r") as fp:
            version = fp.readline()
        return jsonify({'version': version})
    
    # Update version number
    if request.method == "POST":
        version = 0
        with open("version.txt", "r") as fp:
            version = str(int(fp.readline()) + 1)
        
        with open("version.txt", "w") as fp:
            fp.write(version)
            
        return jsonify({'res': "Success!"})  


def open_browser():
    """Open web aplication automatically"""
    webbrowser.open_new('http://127.0.0.1:5000/')
    

if __name__ == "__main__":
      Timer(1, open_browser).start()
      app.run(host="0.0.0.0", port=5000)
