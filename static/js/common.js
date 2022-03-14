// 하단 playbar에서 play 버튼 <-> pause 버튼 변경을 위한 변수
let playcnt = 1;
// 상단 로고 클릭 시 Home으로 이동
$("#logo").attr("onclick", "location.href='/'")
// 하단 로고 클릭 시 Home으로 이동
$("#footer_logo").attr("onclick", "location.href='/'")
//페이지 초기화_nar_right update(로그인 상태에 따라서)
nav_update()

// 로그아웃 클릭 시 session storage 삭제
function logout() {
    sessionStorage.clear()
}

// 로그인 상태확인 후 nav update (좌우측 모두, 성향테스트는 수정 필요)
function nav_update() {
    userID = sessionStorage.getItem('id')
    $('#nav_right').empty()
    if (userID === null) {
        login_mypage = "로그인"
        regist_logout = "회원가입"
        href_login_mypage = "/login_page"
        href_regist_logout = "/regist_page"
        $("#nav_left ul li a:eq(1)").attr("href", "/login_page")
    }
    else{
        login_mypage = "마이페이지"
        regist_logout = "로그아웃"
        href_login_mypage = "/mypage"
        href_regist_logout = "/"
        $("#nav_left ul li a:eq(1)").attr("href", "/mypage")
    }
    let login_html = `<ul>
                        <li><a href="#">RE:TRO 소개</a></li>
                        <li><a href=${href_login_mypage}>${login_mypage}</a></li>
                        <li><a href=${href_regist_logout} onclick="logout()">${regist_logout}</a></li>
                      </ul>`
    $('#nav_right').append(login_html)
}

// 화면 하단 플레이어 재생, 일시정지 제어함수
function playing_control(){
    let playing_active = $('#player_active').text();
    let temp_html = ``
    if(playing_active == 1) {
        temp_html = `<td id="player_active" style="display:none">0</td>`
        $("iframe")[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
    }
    else {
        temp_html = `<td id="player_active" style="display:none">1</td>`
        $("iframe")[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
    }
    $('#playbar_control').empty();
    $('#playbar_control').append(temp_html);
}

// 일시정지, 재생 버튼 번갈아 변경
function togglePause() {
    playing_control()

        let playing_active = $('#player_active').text();
  let play = document.getElementById("playbtn");

  if(playing_active == 1) {
    play.src = '../static/images/playbar_menu_pau.png';
    play.style.width = '30px';
    play.style.height = 'auto';
    play.style.marginTop = '10px';
    play.style.marginLeft = '10px';
  } else {
    play.src = '../static/images/palybn_icon.png';
    play.style.width = '50px';
    play.style.height = 'auto';
    play.style.marginTop = '0px';
    play.style.marginLeft = '0px';
  }
  playcnt++;
}

// 하단 플레이어바에서 좋아요버튼 클릭시 기능
function likeclick(userID, title, singer) {
    $.ajax({
        type: 'POST',
        url: '/playing/likeclick',
        data: {
            id_give: userID,
            title_give: title,
            singer_give: singer
        },
        success: function (response) {
            let like = response['like']
            let likebtn = document.getElementById("likebtn");

            if (like == 1) {
                likebtn.src = '../static/images/like_icon_hover.png';
            } else {
                likebtn.src = '../static/images/like_icon.png';
            }
            var link = document.location.href;
            let temp = link.split('/')
            let page = temp[temp.length -1]

            if(page == '') {
            } else if (page == 'retrochart_page') {
                chart_year = document.getElementsByClassName("btn-active")[0].value;
                console.log(chart_year)
                retro_chart_loading(chart_year)
            } else if (page == 'retrocollection_page') {
                chart_year = document.getElementsByClassName("year-btn-active")[0].value;
                console.log(chart_year)
                retro_collection_loading(chart_year)
            }


            alert(response['msg'])
        }
    });
}

// 하단 플레이어 작동 기능
function main_playing_active(songID) {
    let userID = sessionStorage.getItem('id')
    $.ajax({
        type: 'POST',
        url: '/main/playing',
        data: {
            songID_give: songID,
            userID_give: userID
        },
        success: function (response) {
            let singer = response['music_info']['singer']
            let title = response['music_info']['title']
            let musicPlaySrc = response['music_info']['musicPlaySrc']
            let like = response['music_info']['like']

            localStorage.setItem('playbar_title', title)
            localStorage.setItem('playbar_singer', singer)

            let temp_html = `<div class="youtube_movie">
                                <iframe width="100" height="75" src="${musicPlaySrc}?enablejsapi=1&version=3&playerapiid=ytplayer&autoplay=1&mute=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                             </div>
                             <div class="playbar_song_wrap">
                                <div class="playbar_song_title">${title}</div>
                                <div class="playbar_song_artist">${singer}</div>
                             </div>
                             <div id="like_control"></div>`
            let temp_html2 = ``
            if (like == 0) {
                temp_html2 = `<img src="../static/images/like_icon.png" alt="" id="likebtn" onclick="likeclick('${userID}', '${title}', '${singer}')">`
            } else {
                temp_html2 = `<img src="../static/images/like_icon_hover.png" alt="" id="likebtn" onclick="likeclick('${userID}', '${title}', '${singer}')">`
            }

            $('#playbar_song').empty()
            $('#playbar_song').append(temp_html)
            $('#like_control').empty()
            $('#like_control').append(temp_html2)

            temp_html = `<td id="player_active" style="display:none">1</td>`
            $('#playbar_control').empty();
            $('#playbar_control').append(temp_html);

            let play = document.getElementById("playbtn");
            play.src = '../static/images/playbar_menu_pau.png';
            play.style.width = '30px';
            play.style.height = 'auto';
            play.style.marginTop = '10px';
            play.style.marginLeft = '10px';
            //alert(response["msg"])
        }
    })
}