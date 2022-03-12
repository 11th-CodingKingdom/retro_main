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

// 회원 정보 불러오는 기능
var email, id, name, likeMusic, preferenceResult;
function userinfo_get(chart_year) {
  $.ajax({
    type: 'GET',
    url: '/userinfo',
    data: {},
    success: function (response) {
      email = response['userinfo']['email']
      name = response['userinfo']['name']
      preferenceResult = response['userinfo']['preferenceResult']
      id = response['userinfo']['id']
      likeMusic = response['likeMusic']

      $('#user_email').text(email)
      $('#user_id').text(id)
      $('.user_name').text(name)
      if (typeof preferenceResult == "undefined" || preferenceResult == null || preferenceResult == "") {
        $('.test_left_middle').text("아직 음악 성향 테스트를 안하셨네요?")
        $('.test_left_bottom').text("테스트를 진행해보고, 나에게 맞는 음악을 추천 받아보세요!")
      }
      else {
        $('.test_left_middle').text(preferenceResult)
      }
      update_info(chart_year)
    }
  });
}

//불러온 회원 정보 update (년도 선택 시)
function update_info(chart_year) {
  $('#rankchart-row').empty()
  for (let i = 0; i < likeMusic.length; i++) {
    let albumImageUrl = likeMusic[i]['albumImageUrl']
    let singer = likeMusic[i]['singer']
    let title = likeMusic[i]['title']
    let musicPlaySrc = likeMusic[i]['musicPlaySrc']
    let year = likeMusic[i]['year']
    chart_year = parseInt(chart_year)
    if ( year >= chart_year && year < chart_year+10 ){
      console.log(year >= chart_year)
      console.log(year < chart_year+10)
      console.log(year)
      console.log(chart_year)
      let temp_html = `<tr class="rankchart-row-box table_line">
                                <td>
                                    <div id="rankchart_img">
                                        <img src='${albumImageUrl}' width="50px" height="50px"
                                             style="border-radius:10px"/>
                                    </div>
                                </td>
                                <td>
                                    <div id="rankchart_song">${title}</div>
                                </td>
                                <td>
                                    <div id="rankchart_artist">${singer}</div>
                                </td>
                                <td>
                                    <!-- 재생버튼 -->
                                    <button type="button">
                                        <img src="../static/images/palybn_icon_red_hover.png" alt=""
                                             class="playbtn">
                                    </button>
                                </td>
                                <td>
                                    <!-- 좋아요 버튼 -->
                                    <button type="button">
                                        <img src="../static/images/like_icon_hover.png" alt="" id="likebtn"
                                             onclick="toggleLike()">
                                    </button>
                                </td>
                            </tr>`
      $('#rankchart-row').append(temp_html)
    }
  }
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