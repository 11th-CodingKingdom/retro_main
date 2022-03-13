
// 하단 playbar에서 play 버튼 <-> pause 버튼 변경을 위한 변수
let playcnt = 1;
// 보관함 클릭 시 mypage이동 (로그인 상태 아닐 땐 로그인 페이지로 이동)
$("#nav_left ul li a:eq(1)").attr("href", "/mypage")
// 상단 로고 클릭 시 Home으로 이동
$("#logo").attr("onclick", "location.href='/'")
// 하단 로고 클릭 시 Home으로 이동
$("#footer_logo").attr("onclick", "location.href='/'")

// 로그인 상태확인 후 상단 우측(로그인/회원가입, 마이페이지/로그아웃) ITEM 수정
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