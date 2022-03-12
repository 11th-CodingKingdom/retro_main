// 차트에 1980 ~ 2010 버튼 클릭 시 빨간색으로 변경
let currentBtn;
let btns = document.querySelectorAll('.btn');
var chart_year = document.getElementsByClassName("btn-active")[0].value;
userinfo_get(chart_year);

function clickBtn() {
  currentBtn = document.querySelector('.btn-active');
  if (currentBtn){
    currentBtn.classList.remove('btn-active');
  }
  this.classList.add('btn-active');
  currentBtn = this;
  chart_year = document.getElementsByClassName("btn-active")[0].value;
  update_info(chart_year)
}
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', clickBtn);
}

// 좋아요 버튼 클릭 시 하트 변경
function toggleLike() {
  document.getElementById("likebtn").src = "../static/images/like_icon_hover.png";
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