import os
from pymongo import MongoClient


MONGO_URI = os.getenv('MONGO_URI')

class Client:
    def __init__(self):
        self.instance = MongoClient(MONGO_URI)

    def get(self):
        if(not self.instance):
            self.instance = MongoClient(MONGO_URI)
        return self.instance
