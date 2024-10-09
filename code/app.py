import json
import os
from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from modules.upload import upload_parse_resume

app = Flask(__name__)

config_path = os.path.join('configs', 'config.json')
with open(config_path, 'r') as file:
    config = json.load(file)

# MongoDB
client = MongoClient(config['MONGO_URI'])

db = client['resume_db']
resume_collection = db['resumes']


@app.route('/upload', methods=['POST'])
def upload_resume():
    user_id = request.form.get('user_id')
    if not user_id:
        return jsonify({"error": "No user ID provided."}), 400
    # vector the resume text
    return upload_parse_resume(request, resume_collection)

# def evaluation():


if __name__ == '__main__':
    app.run(debug=True)
