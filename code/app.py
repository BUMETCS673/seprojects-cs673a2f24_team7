from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from configuration.config import Config
from modules.upload import upload_parse_resume

app = Flask(__name__)

app.config.from_object(Config)

# MongoDB
client = MongoClient(app.config['MONGO_URI'])

db = client['resume_db']
resume_collection = db['resumes']


@app.route('/upload', methods=['POST'])
def upload_resume():
    user_id = request.form.get('user_id')
    if not user_id:
        return jsonify({"error": "No user ID provided."}), 400

    return upload_parse_resume(request, resume_collection)


if __name__ == '__main__':
    app.run(debug=True)
