from flask import Flask, render_template, jsonify, request, session, redirect
from pymongo import MongoClient
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.secret_key = "qwertyuiop"
bcrypt = Bcrypt(app)

client = MongoClient('mongodb://test:test@54.144.213.113:27017')
db = client.retro

# HTML 화면 보여주기
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/login_status')
def login_status():
    if 'userID' in session:
        id = session['userID']
    else:
        id = ""
    return jsonify({'id': id})

@app.route('/main/chart', methods=['GET'])
def main_chart():
    data_1980 = list(db.musics.find({'rank_type': "AG", 'year': 1980}, {'_id': False}).sort("like", -1).limit(6))
    data_1990 = list(db.musics.find({'rank_type': "AG", 'year': 1990}, {'_id': False}).sort("like", -1).limit(6))
    data_2000 = list(db.musics.find({'rank_type': "AG", 'year': 2000}, {'_id': False}).sort("like", -1).limit(6))
    data_2010 = list(db.musics.find({'rank_type': "AG", 'year': 2010}, {'_id': False}).sort("like", -1).limit(6))
    datas = data_1980+data_1990+data_2000+data_2010
    musics = []
    for music in datas:
        [music.pop(key, None) for key in ['albumID', 'genre', 'Region', 'rank_type']]
        musics.append(music)

    return jsonify({'music_list': musics})

@app.route('/login_page')
def login_page():
    return render_template('index-login.html')

@app.route('/login', methods=['POST'])
def login():
    id = request.form['id']
    pw = request.form['pw']
    information = db.users.find_one({'id':id}, {'_id': False})

    if information is not None:
        if bcrypt.check_password_hash(information['pw'], pw):
            email = information['email']
            name = information['name']
            preferenceResult = information['preferenceResult']
            session['userID'] = id
            session['email'] = email
            session['name'] = name
            session['preferenceResult'] = preferenceResult
            msg = "로그인 성공!"
        else:
            msg = "ID 혹은 비밀번호를 확인하세요"
    else:
        msg = "ID 혹은 비밀번호를 확인하세요"

    return jsonify({'msg': msg})

@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')

@app.route('/regist_page')
def regist_page():
    return render_template('index-signup.html')

@app.route('/regist', methods=['POST'])
def regist():
    name = request.form['name']
    email = request.form['email']
    id = request.form['id']
    pw = bcrypt.generate_password_hash(request.form['pw'])
    pwCheck = request.form['pwCheck']
    preferenceResult =""
    information = {'id': id, 'pw': pw, 'email': email, 'name': name, 'preferenceResult': preferenceResult}

    if db.users.find_one({'name': name}, {'_id': False}) is not None:
        msg = "동일한 사용자가 존재합니다."

    elif email.find("@") == -1:
        msg = "올바른 이메일을 입력하세요"

    elif db.users.find_one({'id': id}, {'_id': False}) is not None:
        msg = "입력하신 ID는 다른 사용자가 사용중입니다."

    elif len(request.form['pw']) < 10:
        msg = "비밀번호는 10자리 이상이어야 합니다."

    elif bcrypt.check_password_hash(pw, pwCheck) is not True:
        msg = "비밀번호 입력을 다시 확인하세요."

    else:
        db.users.insert_one(information)
        msg = "회원가입 완료!"

    return jsonify({'msg': msg})

@app.route('/mypage')
def mypage():
    if 'userID' in session:
        return render_template('index-mypage.html')
    else :
        return redirect('/login_page')

@app.route('/userinfo', methods=['GET'])
def userinfo():
    id = session['userID']
    preferenceResult =session['preferenceResult']
    likeMusics = list(db.likeMusic.find({'id': id}, {'_id': False}))
    return jsonify({"likeMusic":likeMusics, "preferenceResult":preferenceResult})

@app.route('/userinfo', methods=['POST'])
def withdraw():
    id = session['userID']
    information = db.users.find_one({'id':id}, {'_id': False})
    if information != None:
        db.users.delete_one({'id':id})
        db.likeMusic.delete_many({'id': id})
        session.clear()
    return jsonify({"msg": "회원탈퇴 완료"})

@app.route('/main/playing', methods=['POST'])
def main_playing_active(): # 메인페이지 하단 뮤직플레이어 작동 기능
    songID = request.form['songID_give']
    music = db.musics.find_one({'songID': songID}, {'_id': False})

    singer = music['singer']
    title = music['title']
    temp_music = db.musicPlaySrc.find_one({'songID': songID})
    musicPlaySrc = temp_music['musicPlaySrc']

    music_info = {
        'singer': singer,
        'title': title,
        'musicPlaySrc': musicPlaySrc
    }

    return jsonify({'music_info': music_info,'msg': '연결 완료'})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
