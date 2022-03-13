
// 하단 playbar에서 play 버튼 <-> pause 버튼 변경을 위한 변수
let playcnt = 1;

// 로그인 상태 업데이트
function loginStatus() {
    $.ajax({
        type: 'GET',
        url: '/login_status',
        data: {},
        success: function (response) {
            userID = response['id']
            $('#nav_right').empty()
            if (userID === "") {
                login_mypage = "로그인"
                regist_logout = "회원가입"
                href_login_mypage = "/login_page"
                href_regist_logout = "/regist_page"
            }
            else{
                login_mypage = "마이페이지"
                regist_logout = "로그아웃"
                href_login_mypage = "/mypage"
                href_regist_logout = "/logout"
            }
            let login_html = `<ul>
                                <li><a href="#">RE:TRO 소개</a></li>
                                <li><a href=${href_login_mypage}>${login_mypage}</a></li>
                                <li><a href=${href_regist_logout}>${regist_logout}</a></li>
                              </ul>`
            $('#nav_right').append(login_html)
        }
    });

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
            alert(response['msg'])
        }
    });

}