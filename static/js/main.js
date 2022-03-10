// 차트에 1980 ~ 2010 버튼 클릭 시 빨간색으로 변경
$(document).ready(function () {
    loginStatus();
});

let currentBtn;
let btns = document.querySelectorAll('.btn');
let chart_year = document.getElementsByClassName("btn-active")[0].value;
retroChart(chart_year)

function clickBtn() {
  currentBtn = document.querySelector('.btn-active');
  if (currentBtn){
    currentBtn.classList.remove('btn-active');
  }
  this.classList.add('btn-active');
  currentBtn = this;
  chart_year = document.getElementsByClassName("btn-active")[0].value;
  retroChart(chart_year)
}
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', clickBtn);
}


// 상단 팝업 닫기
let popup = document.querySelector('.close');
let banner = document.querySelector('.banner');

function closePopup() {
  banner.style.display = "none";
}
popup.addEventListener('click', closePopup);

// 좋아요 버튼 클릭 시 하트 변경
function toggleLike() {
  document.getElementById("likebtn").src = "../static/images/like_icon_hover.png";
}



function loginStatus(){
    let userID = $('.session').get("userID")
    $('#nav_right').empty()
    if (typeof userID === "undefined") {
        login_out = "로그인"
        regist_mypage = "회원가입"
        href_login_out = "/login_page"
    }
    else{
        login_out = "로그아웃"
        regist_mypage = "마이페이지"
        href_login_out = "/logout"
    }
    let login_html = `<ul>
                        <li><a href="#">RE:TRO 소개</a></li>
                        <li><a href=${href_login_out}>${login_out}</a></li>
                        <li><a href='/regist_page'>${regist_mypage}</a></li>
                      </ul>`
    $('#nav_right').append(login_html)
}

function retroChart(chart_year) {
    $.ajax({
        type: 'GET',
        url: '/main/chart',
        data: {'chart_year':chart_year},
        success: function (response) {
            let music_list = response['music_list']
            $('#section_albumchart .albumchart_rowbody:eq(0)').empty()
            $('#section_albumchart .albumchart_rowbody:eq(1)').empty()
            $('#rankchart-table').empty()
            for (let i = 0; i < 6; i ++)
            {
                let albumImageUrl = music_list[i]['albumImageUrl']
                let rank = music_list[i]['rank']
                let singer = music_list[i]['singer']
                let title = music_list[i]['title']
                let albumchart_html = `<div class="albumchart-box" onclick="location.href='#'" style="cursor: pointer;">
                                            <div id="albumchart_img" style="background-image: url('${albumImageUrl}');">
                                              <img src="../static/images/palybn_icon_red.png" alt="">
                                            </div>
                                            <div id="albumchart_desc">
                                              <span id="albumchart_rank">${rank}</span>
                                              <span id="albumchart_song">${title}</span>
                                              <span id="albumchart_artist">${singer}</span>
                                            </div>
                                         </div>`
                let rankchart_html = `<tr id="rankchart-row">
                                        <td>
                                          <div id="rankchart_img">
                                            <img src='${albumImageUrl}' width="50px" height="50px" style="border-radius:10px"/>
                                          </div>
                                        </td>
                                        <td>
                                          <div id="rankchart_rank">${rank}</div>
                                        </td>
                                        <td>
                                          <div id="rankchart_desc">
                                            <div id="rankchart_song">${title}</div>
                                            <div id="rankchart_artist">${singer}</div>
                                          </div>
                                        </td>
                                      </tr>`
                if (i < 3) {
                    $('#section_albumchart .albumchart_rowbody:eq(0)').append(albumchart_html)
                    $('#rankchart-table').append(rankchart_html)
                }
                else{
                    $('#section_albumchart .albumchart_rowbody:eq(1)').append(albumchart_html)
                    $('#rankchart-table').append(rankchart_html)
                }
            }

        }
    });
}
