from flask import Flask, render_template, jsonify, request, redirect, url_for
from pymongo import MongoClient
from flask_bcrypt import Bcrypt

app = Flask(__name__)
bcrypt = Bcrypt(app)

client = MongoClient('localhost', 27017)
db = client.retro

# HTML 화면 보여주기
@app.route('/')
def home():
    return render_template('index.html')

# API 역할을 하는 부분
@app.route('/musics', methods=['GET'])
def show_musics():
    musics = list(db.musics.find({},{'_id':False}))
    return jsonify({'musics': musics})

@app.route('/regist')
def regist_page():
    return render_template('index-signup.html')

@app.route('/regist', methods=['POST'])
def Regist():
    id = request.form['id']
    pw = bcrypt.generate_password_hash(request.form['pw'])
    pwCheck = request.form['pwCheck']
    name = request.form['name']
    email = request.form['email']

    if db.users.find_one({'id': id}, {'_id': False}) != None:
        msg = "입력하신 ID는 다른 사용자가 사용중입니다."

    elif len(pwCheck) < 10:
        msg = "비밀번호는 10자리 이상이어야 합니다."

    elif bcrypt.check_password_hash(pw, pwCheck) != True:
        msg = "비밀번호 입력을 다시 확인하세요."

    elif db.users.find_one({'name': name}, {'_id': False}) != None:
        msg = "동일한 사용자가 존재합니다."

    else:
        information = {'id': id, 'pw': pw, 'email': email, 'name': name}
        db.users.insert_one(information)
        msg = "회원가입 완료!"

    return jsonify({'msg': msg})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)