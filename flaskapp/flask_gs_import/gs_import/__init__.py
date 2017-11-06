from flask import Flask, jsonify, request
from flask_uploads import UploadSet, configure_uploads
import os
from functools import wraps
from .response_types.json_response_types import error_response
import jwt
from flask_cors import CORS

app = Flask(__name__, static_folder=os.path.join('ui', 'build'))
app.config.from_object('gs_import.config.ProductionConfig')
CORS(app)


# handler = RotatingFileHandler('foo.log', maxBytes=10000, backupCount=1)
# handler.setLevel(logging.INFO)
# app.logger.addHandler(handler)

def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'x-auth-token' not in request.headers:
            return error_response('Login required', 401)
        token = request.headers['x-auth-token']
        try:
            jwt.decode(token, app.config['SECRET_KEY'])
        except jwt.InvalidTokenError:
            return error_response('Login required', 401)
        return f(*args, **kwargs)
    return decorated_function


@app.errorhandler(404)
def handle_404(aa):
    response = jsonify({'payload': 'Resource does not exist'})
    response.status_code = 404
    return response


@app.errorhandler(500)
def handle_500(aa):
    response = jsonify({'payload': 'Internal server error'})
    response.status_code = 500
    return response


# Flask uploads
upload_file_set = UploadSet('uploadFileSet', extensions=('zip', 'tif'))
configure_uploads(app, upload_file_set)

from .routes_import.importer import import_blueprint
from .routes_auth.auth import auth_blueprint
from .routes_serve_ui.serve_ui import serve_ui_blueprint

app.register_blueprint(auth_blueprint, url_prefix='/auth')
app.register_blueprint(import_blueprint, url_prefix='/import')
app.register_blueprint(serve_ui_blueprint, url_prefix='')
