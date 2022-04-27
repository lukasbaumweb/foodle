from flask import Blueprint, jsonify

foodles = Blueprint('foodles', __name__)

# Returns all foodles or creates and updates one foodle
@foodles.route('/', methods=["GET", "POST", "PUT"])
def all():
    return jsonify("foodle")

# Returns or deletes one foodle
@foodles.route('/<objectId>', methods=["GET", "DELETE"])
def getFoodle():
    return jsonify("foodle")
