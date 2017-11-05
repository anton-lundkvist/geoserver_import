from flask import jsonify


def success_response(payload, status_code=200):
    return jsonify({'payload': payload}), status_code


def error_response(payload, status_code=400):
    return jsonify({'payload': payload}), status_code
