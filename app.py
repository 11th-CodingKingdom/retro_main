from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient('localhost', 27017)
db = client.retro

# HTML 화면 보여주기
@app.route('/')
def home():
    return render_template('index.html')

# API 역할을 하는 부분
@app.route('/musics', methods=['GET'])
def show_stars():
    musics = list(db.musics.find({},{'_id':False}))
    return jsonify({'musics': musics})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)