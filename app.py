from flask import Flask, render_template, jsonify, request, session, redirect
from pymongo import MongoClient
from flask_bcrypt import Bcrypt
import random

app = Flask(__name__)
app.secret_key = "qwertyuiop"
bcrypt = Bcrypt(app)

client = MongoClient('mongodb://test:test@54.144.213.113:27017')
db = client.retro

# HTML 화면 보여주기
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/main/chart', methods=['GET'])
def main_chart():
    data_1980 = list(db.musics.find({'rank_type': "AG", 'year': 1980}, {'_id': False}).sort("like", -1).limit(6))
    data_1990 = list(db.musics.find({'rank_type': "AG", 'year': 1990}, {'_id': False}).sort("like", -1).limit(6))
    data_2000 = list(db.musics.find({'rank_type': "AG", 'year': 2000}, {'_id': False}).sort("like", -1).limit(6))
    data_2010 = list(db.musics.find({'rank_type': "AG", 'year': 2010}, {'_id': False}).sort("like", -1).limit(6))
    music_list = []
    data = data_1980+data_1990+data_2000+data_2010
    for music in data:
        [music.pop(key, None) for key in ['albumID', 'genre', 'Region', 'rank_type']]
        music_list.append(music)

    return jsonify({"music_list": music_list})

@app.route('/login_page')
def login_page():
    return render_template('index-login.html')

@app.route('/login', methods=['POST'])
def login():
    id = request.form['id']
    pw = request.form['pw']
    userinfo = {}
    information = db.users.find_one({'id':id}, {'_id': False})
    if information is not None:
        if bcrypt.check_password_hash(information['pw'], pw):
            email = information['email']
            name = information['name']
            preferenceResult = information['preferenceResult']
            userinfo = {'id': id, 'email':email, 'name': name, 'preferenceResult':preferenceResult}
            msg = "로그인 성공!"
        else:
            msg = "ID 혹은 비밀번호를 확인하세요"
    else:
        msg = "ID 혹은 비밀번호를 확인하세요"

    return jsonify({'msg': msg,'userinfo': userinfo})

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
    
    # 아이디 형식 확인
    i = 0
    while i<len(id) : 
        if 'a' <= id[i] <= 'z' or 'A' <= id[i] <= 'Z' or '0' <= id[i] <= '9' :
            idcondition = True
        else: 
            idcondition = False
            break
        i+=1
    
    # 이메일 형식 확인
    i = 0
    while i<len(email) : 
        if 'a' <= email[i] <= 'z' or 'A' <= email[i] <= 'Z' or '@' == email[i] or '.' == email[i] or '0' <= email[i] <= '9' :
            emailcondition = True
        else: 
            emailcondition = False
            break
        i+=1

    if idcondition : 
        if emailcondition:     
            if db.users.find_one({'name': name}, {'_id': False}) is not None:
                msg = "동일한 사용자가 존재합니다."

            elif email.find("@") == -1 or email.find(".")==-1:
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
        else:
            msg = "올바른 이메일을 입력하세요"
    else:
        msg = "아이디는 영문, 숫자 조합으로 생성 가능합니다."

    return jsonify({'msg': msg})

@app.route('/mypage')
def mypage():
    return render_template('index-mypage.html')

@app.route('/userinfo', methods=['GET'])
def userinfo():
    id = request.args.get('id')
    likeMusics = list(db.likeMusic.find({'id': id}, {'_id': False}))
    return jsonify({"likeMusic":likeMusics})

@app.route('/userinfo', methods=['POST'])
def withdraw():
    id = request.form['id']
    information = db.users.find_one({'id':id}, {'_id': False})
    if information is not None:
        db.users.delete_one({'id':id})
        db.likeMusic.delete_many({'id': id})
    return jsonify({"msg": "회원탈퇴 완료"})

@app.route('/main/playing', methods=['POST'])
def main_playing_active(): # 메인페이지 하단 뮤직플레이어 작동 기능
    songID = request.form['songID_give']
    userID = request.form['userID_give']
    music = db.musics.find_one({'songID': songID}, {'_id': False})

    singer = music['singer']
    title = music['title']
    temp_music = db.musicPlaySrc.find_one({'songID': songID})

    temp_like = db.likeMusic.find_one({'id': userID, 'title': title, 'singer': singer})
    musicPlaySrc = temp_music['musicPlaySrc']

    if (temp_like == None) :
        like = 0
    else :
        like = 1

    music_info = {
        'singer': singer,
        'title': title,
        'musicPlaySrc': musicPlaySrc,
        'like': like
    }

    return jsonify({'music_info': music_info,'msg': '연결 완료'})

@app.route('/playing/likeclick', methods=['POST'])
def player_likeclick(): # 하단 뮤직플레이어에서 좋아요 클릭했을 때
    id = request.form['id_give']
    title = request.form['title_give']
    singer = request.form['singer_give']

    if (id != 'null') :
        temp_like = db.likeMusic.find_one({'id': id, 'title': title, 'singer': singer})

        if (temp_like == None) :
            # 좋아요 안한 상태에서 클릭했을때
            like = 1
            music = db.musics.find_one({'title': title, 'singer': singer})
            music_src = db.musicPlaySrc.find_one({'title': title, 'singer':singer})

            temp_music = {
                'title': title,
                'singer': singer,
                'id': id,
                'year': music['year'],
                'albumImageUrl': music['albumImageUrl'],
                'musicPlaySrc': music_src['musicPlaySrc'],
                'albumtitle' : music['albumtitle']
            }
            db.likeMusic.insert_one(temp_music)
            msg = '좋아요 설정 완료'
        else:
            # 좋아요 한 상태에서 클릭했을때
            like = 0
            db.likeMusic.delete_one({'id': id, 'title': title, 'singer': singer})
            msg = '좋아요 삭제 완료'
    else :
        like = 0
        msg = '로그인을 해주세요'

    return jsonify({'like': like, 'msg': msg})

@app.route('/retrochart_page')
def retro_chart_page():
    return render_template('index-retrochart.html')

@app.route('/chart', methods=['POST'])
def retro_chart_update():
    year = request.form['year_give']
    userID = request.form['userID_give']
    datas = list(db.music.find({'rank_type': "AG", 'year': int(year)}, {'_id': False}).sort("like", -1).limit(100))
    musics = []
    likes = []
    music_only_one = []

    user_musics = list(db.likeMusic.find({'id': userID}, {'_id':False}))

    for music in user_musics:
        [music.pop(key, None) for key in ['id', 'year', 'albumImageUrl', 'musicPlaySrc', 'albumtitle']]
        likes.append(music)

    for music in datas:
        [music.pop(key, None) for key in ['albumID', 'genre', 'Region', 'rank_type']]
        songID = music['songID']
        title = music['title']
        singer = music['singer']

        music_temp = {'title': title, 'singer': singer}
        #temp_like = None
        if music_temp in likes:
            like = 1
        else:
            like = 0

        music['like'] = like
        if music_temp not in music_only_one:
            musics.append(music)
            music_only_one.append(music_temp)

    return jsonify({'music_list': musics,'msg': '연결 완료'})

@app.route('/chart/likeclick', methods=['POST'])
def retro_chart_likeclick():
    id = request.form['id_give']
    title = request.form['title_give']
    singer = request.form['singer_give']

    if (id != 'null'):
        temp_like = db.likeMusic.find_one({'id': id, 'title': title, 'singer': singer})

        if (temp_like == None):
            # 좋아요 안한 상태에서 클릭했을때
            like = 1
            music = db.musics.find_one({'title': title, 'singer': singer})
            music_src = db.musicPlaySrc.find_one({'title': title, 'singer': singer})

            temp_music = {
                'title': title,
                'singer': singer,
                'id': id,
                'year': music['year'],
                'albumImageUrl': music['albumImageUrl'],
                'musicPlaySrc': music_src['musicPlaySrc'],
                'albumtitle': music['albumtitle']
            }
            db.likeMusic.insert_one(temp_music)
            msg = '좋아요 설정 완료'

        else:
            # 좋아요 한 상태에서 클릭했을때
            like = 0
            db.likeMusic.delete_one({'id': id, 'title': title, 'singer': singer})
            msg = '좋아요 삭제 완료'
    else:
        like = 0
        msg = '로그인을 해주세요'

    return jsonify({'like': like, 'msg': msg})

@app.route('/retrocollection_page')
def retro_collection_page():
    return render_template('index-retrocollection.html')

@app.route('/intro_page')
def retro_introduce_page():
    return render_template('index-introduce.html')

@app.route('/collection', methods=['POST'])
def retro_collection_update():
    year = request.form['year_give']
    userID = request.form['userID_give']
    datas= []

    print(year)
    if (year == 'all'):
        years = [1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989,
                 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,
                 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
                 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]
        random_years = random.sample(years, 10)
        for temp_year in random_years:
            data = list(db.music.find({'rank_type': "YE", 'year': temp_year}, {'_id': False}).sort("like", -1).limit(40))
            datas = datas + data
    else:
        datas = list(db.music.find({'rank_type': "YE", 'year': int(year)}, {'_id': False}).sort("like", -1).limit(200))
    musics = []
    likes = []
    music_only_one = []

    user_musics = list(db.likeMusic.find({'id': userID}, {'_id':False}))

    for music in user_musics:
        [music.pop(key, None) for key in ['id', 'year', 'albumImageUrl', 'musicPlaySrc', 'albumtitle']]
        likes.append(music)

    for music in datas:
        [music.pop(key, None) for key in ['albumID', 'genre', 'Region', 'rank_type']]
        songID = music['songID']
        title = music['title']
        singer = music['singer']

        music_temp = {'title': title, 'singer': singer}
        #temp_like = None
        if music_temp in likes:
            like = 1
        else:
            like = 0

        music['like'] = like
        if music_temp not in music_only_one:
            musics.append(music)
            music_only_one.append(music_temp)

    return jsonify({'music_list': musics,'msg': '연결 완료'})

@app.route('/collection/likeclick', methods=['POST'])
def retro_collection_likeclick():
    id = request.form['id_give']
    title = request.form['title_give']
    singer = request.form['singer_give']

    if (id != 'null'):
        temp_like = db.likeMusic.find_one({'id': id, 'title': title, 'singer': singer})

        if (temp_like == None):
            # 좋아요 안한 상태에서 클릭했을때
            like = 1
            music = db.musics.find_one({'title': title, 'singer': singer})
            music_src = db.musicPlaySrc.find_one({'title': title, 'singer': singer})

            temp_music = {
                'title': title,
                'singer': singer,
                'id': id,
                'year': music['year'],
                'albumImageUrl': music['albumImageUrl'],
                'musicPlaySrc': music_src['musicPlaySrc'],
                'albumtitle' : music['albumtitle']
            }
            db.likeMusic.insert_one(temp_music)
            msg = '좋아요 설정 완료'

        else:
            # 좋아요 한 상태에서 클릭했을때
            like = 0
            db.likeMusic.delete_one({'id': id, 'title': title, 'singer': singer})
            msg = '좋아요 삭제 완료'
    else:
        like = 0
        msg = '로그인을 해주세요'

    return jsonify({'like': like, 'msg': msg})

@app.route('/search_page')
def retro_search_page():
    return render_template('index-search.html')

@app.route('/search', methods=['POST'])
def retro_search():
    word = request.form['word_give']
    userID = request.form['userID_give']

    data_title = list(db.music.find({'rank_type': "YE", 'title': {'$regex': word}}, {'_id': False}).limit(10))
    data_singer = list(db.music.find({'rank_type': "YE", 'singer': {'$regex': word}}, {'_id': False}).limit(10))
    datas = data_title + data_singer
    musics = []
    likes = []
    music_only_one = []

    user_musics = list(db.likeMusic.find({'id': userID}, {'_id': False}))

    for music in user_musics:
        [music.pop(key, None) for key in ['id', 'year', 'albumImageUrl', 'musicPlaySrc', 'albumtitle']]
        likes.append(music)

    for music in datas:
        [music.pop(key, None) for key in ['albumID', 'genre', 'Region', 'rank_type']]
        songID = music['songID']
        title = music['title']
        singer = music['singer']
        music_temp = {'title': title, 'singer': singer}

        # temp_like = None
        if music_temp in likes:
            like = 1
        else:
            like = 0
        music['like'] = like

        if music_temp not in music_only_one:
            musics.append(music)
            music_only_one.append(music_temp)

    msg = '검색 완료'
    return jsonify({'music_list': musics,'msg': msg})

@app.route('/search/likeclick', methods=['POST'])
def retro_search_likeclick():
    id = request.form['id_give']
    title = request.form['title_give']
    singer = request.form['singer_give']

    if (id != 'null'):
        temp_like = db.likeMusic.find_one({'id': id, 'title': title, 'singer': singer})

        if (temp_like == None):
            # 좋아요 안한 상태에서 클릭했을때
            like = 1
            music = db.musics.find_one({'title': title, 'singer': singer})
            music_src = db.musicPlaySrc.find_one({'title': title, 'singer': singer})

            temp_music = {
                'title': title,
                'singer': singer,
                'id': id,
                'year': music['year'],
                'albumImageUrl': music['albumImageUrl'],
                'musicPlaySrc': music_src['musicPlaySrc'],
                'albumtitle' : music['albumtitle']
            }
            db.likeMusic.insert_one(temp_music)
            msg = '좋아요 설정 완료'

        else:
            # 좋아요 한 상태에서 클릭했을때
            like = 0
            db.likeMusic.delete_one({'id': id, 'title': title, 'singer': singer})
            msg = '좋아요 삭제 완료'
    else:
        like = 0
        msg = '로그인을 해주세요'

    return jsonify({'like': like, 'msg': msg})

@app.route('/recommend_page')
def retro_recommend_page():
    return render_template('index-playlist.html')

@app.route('/recommend', methods=['POST'])
def retro_recommend():
    person = request.form['who_give']
    userID = request.form['userID_give']

    datas = list(db.recommendation.find({'listname': person}, {'_id': False}))

    musics = []
    likes = []
    music_only_one = []

    user_musics = list(db.likeMusic.find({'id': userID}, {'_id':False}))

    for music in user_musics:
        [music.pop(key, None) for key in ['id', 'year', 'albumImageUrl', 'musicPlaySrc', 'albumtitle']]
        likes.append(music)

    for music in datas:
        [music.pop(key, None) for key in ['albumID', 'genre', 'Region', 'rank_type']]
        title = music['title']
        singer = music['singer']

        music_temp = {'title': title, 'singer': singer}
        #temp_like = None
        if music_temp in likes:
            like = 1
        else:
            like = 0

        music['like'] = like
        if music_temp not in music_only_one:
            musics.append(music)
            music_only_one.append(music_temp)


    msg = '연결 완료'
    return jsonify({'music_list': musics,'msg': msg})

@app.route('/recommend/playing', methods=['POST'])
def main_playing_active_2(): # 메인페이지 하단 뮤직플레이어 작동 기능
    title = request.form['title_give']
    singer = request.form['singer_give']
    listname = request.form['listname_give']
    userID = request.form['userID_give']
    music = db.recommendation.find_one({'title': title, 'singer': singer, 'listname': listname}, {'_id': False})
    musicPlaySrc = music['musicPlaySrc']


    temp_like = db.likeMusic.find_one({'id': userID, 'title': title, 'singer': singer})

    if (temp_like == None) :
        like = 0
    else :
        like = 1

    music_info = {
        'singer': singer,
        'title': title,
        'musicPlaySrc': musicPlaySrc,
        'like': like
    }
    print(music_info)

    return jsonify({'music_info': music_info,'msg': '연결 완료'})

@app.route('/mypage/playing', methods=['POST'])
def main_mypage_active_3(): # 메인페이지 하단 뮤직플레이어 작동 기능
    title = request.form['title_give']
    singer = request.form['singer_give']
    userID = request.form['userID_give']

    userID = request.form['userID_give']
    music = db.likeMusic.find_one({'title': title, 'singer': singer, 'id': userID}, {'_id': False})
    musicPlaySrc = music['musicPlaySrc']


    temp_like = db.likeMusic.find_one({'id': userID, 'title': title, 'singer': singer})

    if (temp_like == None) :
        like = 0
    else :
        like = 1

    music_info = {
        'singer': singer,
        'title': title,
        'musicPlaySrc': musicPlaySrc,
        'like': like
    }
    print(music_info)

    return jsonify({'music_info': music_info,'msg': '연결 완료'})

@app.route('/recommend/likeclick', methods=['POST'])
def retro_recommend_likeclick():
    id = request.form['id_give']
    title = request.form['title_give']
    singer = request.form['singer_give']

    if (id != 'null'):
        temp_like = db.likeMusic.find_one({'id': id, 'title': title, 'singer': singer})

        if (temp_like == None):
            # 좋아요 안한 상태에서 클릭했을때
            like = 1
            music = db.musics.find_one({'title': title, 'singer': singer})
            music_src = db.musicPlaySrc.find_one({'title': title, 'singer': singer})

            temp_music = {
                'title': title,
                'singer': singer,
                'id': id,
                'year': music['year'],
                'albumImageUrl': music['albumImageUrl'],
                'musicPlaySrc': music_src['musicPlaySrc'],
                'albumtitle' : music['albumtitle']
            }
            db.likeMusic.insert_one(temp_music)
            msg = '좋아요 설정 완료'

        else:
            # 좋아요 한 상태에서 클릭했을때
            like = 0
            db.likeMusic.delete_one({'id': id, 'title': title, 'singer': singer})
            msg = '좋아요 삭제 완료'
    else:
        like = 0
        msg = '로그인을 해주세요'

    return jsonify({'like': like, 'msg': msg})

@app.route('/mypage/likeclick', methods=['POST'])
def retro_mypagae_likeclick():
    id = request.form['id_give']
    title = request.form['title_give']
    singer = request.form['singer_give']

    if (id != 'null'):
        temp_like = db.likeMusic.find_one({'id': id, 'title': title, 'singer': singer})

        if (temp_like == None):
            # 좋아요 안한 상태에서 클릭했을때
            like = 1
            music = db.musics.find_one({'title': title, 'singer': singer})
            music_src = db.musicPlaySrc.find_one({'title': title, 'singer': singer})

            temp_music = {
                'title': title,
                'singer': singer,
                'id': id,
                'year': music['year'],
                'albumImageUrl': music['albumImageUrl'],
                'musicPlaySrc': music_src['musicPlaySrc'],
                'albumtitle' : music['albumtitle']
            }
            db.likeMusic.insert_one(temp_music)
            msg = '좋아요 설정 완료'

        else:
            # 좋아요 한 상태에서 클릭했을때
            like = 0
            db.likeMusic.delete_one({'id': id, 'title': title, 'singer': singer})
            msg = '좋아요 삭제 완료'
    else:
        like = 0
        msg = '로그인을 해주세요'

    return jsonify({'like': like, 'msg': msg})

@app.route('/test_intro')
def retro_test_intro_page():
    return render_template('test_intro.html')

@app.route('/test')
def retro_test_page():
    return render_template('test.html')

@app.route('/test_output')
def retro_test_output_page():
    return render_template('test_output.html')

@app.route('/test_output', methods=['POST'])
def retro_test_output_save():
    type = request.form['type_give']
    userID = request.form['userID_give']

    # 바꾸기 - 예시
    db.users.update_one({'id': userID}, {'$set': {'preferenceResult': type}})

    msg = '성향 저장 완료!'
    return jsonify({'msg': msg})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
