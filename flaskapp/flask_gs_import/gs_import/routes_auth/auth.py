from flask import request, Blueprint
from .. import app
from ..response_types.json_response_types import success_response, error_response
import jwt
import datetime

auth_blueprint = Blueprint(name='auth_blueprint', import_name=__name__)


@auth_blueprint.route('', methods=['POST'])
def auth():
    req_obj = request.json
    if 'username' in req_obj:
        if 'password' in req_obj:
            username = req_obj['username']
            password = req_obj['password']
            if username == app.config['USERNAME'] and password == app.config['PASSWORD']:
                token = jwt.encode(
                    {'username': username, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)},
                    app.config['SECRET_KEY'])
                return success_response(token.decode('UTF-8'))
            return error_response('Wrong username or password')
        return error_response('Parameter password is required')
    return error_response('Parameter username is required')


@auth_blueprint.route('/validate', methods=['POST'])
def validate_token():
    req_obj = request.json
    if 'token' in req_obj:
        token = req_obj['token']
        try:
            jwt.decode(token, app.config['SECRET_KEY'])
        except jwt.exceptions.InvalidTokenError:
            return error_response('You are logged out', 401)
        return success_response(token)
    return error_response('Parameter token is required')
