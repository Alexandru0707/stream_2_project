
from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json


app = Flask(__name__)

MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'my_db'
COLLECTION_NAME = 'paintings'






@app.route("/")

def home():


    """
    A Flask view to serve the main dashboard page.
    """
    return render_template("home.html")













@app.route("/ArtDATA/projects")





def facebook_projects():


    """
    A Flask view to serve the project data from
    MongoDB in JSON format.

    """

    # A constant that defines the record fields that we wish to retrieve.
    FIELDS = {
        '_id': False,  'date': True, 'type': True,
        'tech': True,  'nr': True,
        'title': True, 'draw_on': True




    }

    # Open a connection to MongoDB using a with statement such that the
    # connection will be closed as soon as we exit the with statement
    with MongoClient(MONGODB_HOST, MONGODB_PORT) as conn:
        # Define which collection we wish to access
        collection = conn[DBS_NAME][COLLECTION_NAME]
        # Retrieve a result set only with the fields defined in FIELDS
        # and limit the the results to 55000
        projects = collection.find(projection=FIELDS, limit=55000)
        # Convert projects to a list in a JSON object and return the JSON data
        return json.dumps(list(projects))












if __name__ == "__main__":
    app.run(debug=True)



