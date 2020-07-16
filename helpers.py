from flask import redirect, render_template, request, session
from functools import wraps
import os
import zipfile

def login_required(f):
    """
    Decorate routes to require login.
    http://flask.pocoo.org/docs/0.12/patterns/viewdecorators/
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("user_id") is None:
            return redirect("/login")
        return f(*args, **kwargs)
    return decorated_function

def zipdir(path, zipname):
    """Zip a folder"""

    rootdir = os.path.basename(path)
    zip = zipfile.ZipFile(zipname, 'w', zipfile.ZIP_DEFLATED)

    for root, dirs, files in os.walk(path):
        for file in files:
            filepath = os.path.join(root, file)
            parentpath = os.path.relpath(filepath, path)
            arcname = os.path.join(rootdir, parentpath)

            zip.write(filepath, arcname)
            
    zip.close()