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
// function toggleLike() {
  // document.getElementById("likebtn").src = "../static/images/like_icon_hover.png";
// }
let likecnt = 1;
function toggleLike() {
  let like = document.getElementById("likebtn");
  
  if(likecnt % 2 == 1) {
    like.src = '../static/images/like_icon_hover.png';
  } else {
    like.src = '../static/images/like_icon.png';
  }
  likecnt++;
}

// RetroChart 업데이트
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
              let songID = music_list[i]['songID']
              let albumchart_html = `<div class="albumchart-box" onclick="location.href='#'">
                                          <div id="albumchart_img" style="background-image: url('${albumImageUrl}');">
                                            <img onclick="main_playing_active(${songID})" src="../static/images/palybn_icon_red.png" alt="" id="albumchart_play" onmouseover="this.src='../static/images/palybn_icon_red_hover.png'" onmouseout="this.src='../static/images/palybn_icon_red.png'">
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

// 하단 플레이어 작동 기능
function main_playing_active(songID) {
            $.ajax({
                type: 'POST',
                url: '/main/playing',
                data: { songID_give: songID
                },
                success: function (response) {
                    singer = response['music_info']['singer']
                    title = response['music_info']['title']
                    musicPlaySrc = response['music_info']['musicPlaySrc']

                    console.log(singer, title, musicPlaySrc)
                    let temp_html = `<div class="youtube_movie">
                                        <iframe width="100" height="75" src="${musicPlaySrc}?enablejsapi=1&version=3&playerapiid=ytplayer&autoplay=1&mute=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                     </div>
                                     <div class="playbar_song_wrap">
                                        <div class="playbar_song_title">${title}</div>
                                        <div class="playbar_song_artist">${singer}</div>
                                     </div>
                                     <img src="../static/images/like_icon.png" alt="" id="likebtn" onclick="toggleLike()">`


                    $('#playbar_song').empty()
                    $('#playbar_song').append(temp_html)

                    temp_html = `<td id="player_active" style="display:none">1</td>`
                    $('#playbar_control').empty();
                    $('#playbar_control').append(temp_html);

                    //alert(response["msg"])
                }
            })
}

