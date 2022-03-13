// 차트에 1980 ~ 2010 버튼 클릭 시 빨간색으로 변경
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
  retroChart_update(chart_year)
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

// RetroChart 업데이트
function retroChart(chart_year) {
  $.ajax({
      type: 'GET',
      url: '/main/chart',
      data: {},
      success: function (response) {
          music_list = response['music_list']
          retroChart_update(chart_year)
      }
  });
}

//login 상태에 따라서 버튼 클릭 시 이동되는 페이지 변화
function button_banner_btn_click() {
    userID = sessionStorage.getItem('id')
    if (userID === null) {
        location.href='/login_page';
    } else {
        location.href='/mypage';
    }
}

// RetroChart Update (년도 변경 시 Chart update)
function retroChart_update(chart_year) {
    $('#section_albumchart .albumchart_rowbody:eq(0)').empty()
    $('#section_albumchart .albumchart_rowbody:eq(1)').empty()
    $('#rankchart-table').empty()
    ranks = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]
    for (let i = 0; i < music_list.length; i++) {
        let albumImageUrl = music_list[i]['albumImageUrl']
        let rank = ranks[i]
        let singer = music_list[i]['singer']
        let title = music_list[i]['title']
        let songID = music_list[i]['songID']
        let year = music_list[i]['year']
        chart_year = parseInt(chart_year)
        if (year == chart_year) {
            localStorage.setItem('retrochart_year', year)
            console.log('setItem', year)
            if (title.length > 10){
                let albumchart_html = `<div class="albumchart-box">
                                          <div id="albumchart_img" style="background-image: url('${albumImageUrl}');">
                                            <img onclick="main_playing_active(${songID})" src="../static/images/palybn_icon_red.png" alt="" id="albumchart_play" onmouseover="this.src='../static/images/palybn_icon_red_hover.png'" onmouseout="this.src='../static/images/palybn_icon_red.png'">
                                          </div>
                                          <div id="albumchart_desc">
                                            <span id="albumchart_rank">${rank}</span>
                                            <span id="albumchart_song" onclick="location.href='/retrochart_page';">
                                                <MARQUEE width="168" height="18" scrollamount="5">${title}</MARQUEE>
                                            </span>
                                            <span id="albumchart_artist">${singer}</span>
                                          </div>
                                       </div>`
                let rankchart_html = `<tr id="rankchart-row">
                                          <td>
                                            <div id="rankchart_img">
                                              <img src='${albumImageUrl}' width="50px" height="50px" style="border-radius:10px" onclick="location.href='/retrochart_page'"/>
                                            </div>
                                          </td>
                                          <td>
                                            <div id="rankchart_rank">${rank}</div>
                                          </td>
                                          <td>
                                            <div id="rankchart_desc">
                                              <div id="rankchart_song" onclick="location.href='/retrochart_page'">
                                                  <MARQUEE width="168" height="18" scrollamount="5">${title}</MARQUEE>
                                              </div>
                                              <div id="rankchart_artist">${singer}</div>
                                            </div>
                                          </td>
                                        </tr>`
                if (rank < 4) {
                    $('#section_albumchart .albumchart_rowbody:eq(0)').append(albumchart_html)
                    $('#rankchart-table').append(rankchart_html)
                } else {
                    $('#section_albumchart .albumchart_rowbody:eq(1)').append(albumchart_html)
                    $('#rankchart-table').append(rankchart_html)
                }
                }
            else {
                let albumchart_html = `<div class="albumchart-box">
                                          <div id="albumchart_img" style="background-image: url('${albumImageUrl}');">
                                            <img onclick="main_playing_active(${songID})" src="../static/images/palybn_icon_red.png" alt="" id="albumchart_play" onmouseover="this.src='../static/images/palybn_icon_red_hover.png'" onmouseout="this.src='../static/images/palybn_icon_red.png'">
                                          </div>
                                          <div id="albumchart_desc">
                                            <span id="albumchart_rank">${rank}</span>
                                            <span id="albumchart_song" onclick="location.href='/retrochart_page';">
                                                ${title}
                                            </span>
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
                if (rank < 4) {
                    $('#section_albumchart .albumchart_rowbody:eq(0)').append(albumchart_html)
                    $('#rankchart-table').append(rankchart_html)
                } else {
                    $('#section_albumchart .albumchart_rowbody:eq(1)').append(albumchart_html)
                    $('#rankchart-table').append(rankchart_html)
                }
            }
        }
    }
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

            console.log(singer, title, musicPlaySrc)
            let temp_html = `<div class="youtube_movie">
                                <iframe width="100" height="75" src="${musicPlaySrc}?enablejsapi=1&version=3&playerapiid=ytplayer&autoplay=1&mute=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                             </div>
                             <div class="playbar_song_wrap">
                                <div class="playbar_song_title">${title}</div>
                                <div class="playbar_song_artist">${singer}</div>
                             </div>`
            let temp_html2 = ``
            if (like == 0) {
                temp_html2 = `<img src="../static/images/like_icon.png" alt="" id="likebtn" onclick="likeclick('${userID}', '${title}', '${singer}')">`
            } else {
                temp_html2 = `<img src="../static/images/like_icon_hover.png" alt="" id="likebtn" onclick="likeclick('${userID}', '${title}', '${singer}')">`
            }

            $('#playbar_song').empty()
            $('#playbar_song').append(temp_html)
            $('#playbar_song').append(temp_html2)

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

