from multiprocessing.connection import Client
import os
from flask import Flask, render_template, url_for, request, session, redirect, flash, jsonify
from pymongo import MongoClient

from models.Client import Client

from middleware.auth import token_required

from routes.foodles import foodles
from routes.auth import auth_routes


# get environment variables
JWT_SECRET_KEY = os.getenv('SECRET_KEY') or '8f181893fg1813f98g13g183g1f'

client = Client()

db = client.get().foodle

app = Flask(__name__)

# set secrets
app.config['SECRET_KEY'] = JWT_SECRET_KEY


# register routes
app.register_blueprint(foodles, url_prefix='/api/v1/foodle/')

app.register_blueprint(auth_routes, url_prefix='/api/v1/auth/')


@app.route("/")
def main():
    return jsonify({"color": "asd"})


@app.route('/')
@token_required
def user(current_user):
    return jsonify(current_user)


@app.route('/<pdt_id>')
@token_required
def product(current_user, pdt_id):
    return jsonify({"name": "asd", "user": current_user})


if __name__ == "__main__":
    app.run(debug=True)
    app.run()
