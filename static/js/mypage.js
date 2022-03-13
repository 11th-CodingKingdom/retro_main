// 차트에 1980 ~ 2010 버튼 클릭 시 빨간색으로 변경
let currentBtn;
let btns = document.querySelectorAll('.btn');
var chart_year = document.getElementsByClassName("btn-active")[0].value;
userinfo_get(chart_year);
$('.user_name').text(sessionStorage.getItem('name'))
$('#user_id').text(sessionStorage.getItem('id'))
$('#user_email').text(sessionStorage.getItem('email'))

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

//마이페이지 새로고침 (좋아요 노래, 성향테스트 결과 표시)
function userinfo_get(chart_year) {
    id = sessionStorage.getItem('id')
    $.ajax({
        type: 'GET',
        url: '/userinfo',
        data: {'id':id},
        success: function (response) {
            likeMusic = response['likeMusic']
            preferenceResult = sessionStorage.getItem('preferenceResult')
            console.log(preferenceResult)
            if (typeof preferenceResult == "undefined" || preferenceResult == null || preferenceResult == "") {
                $('.test_left_middle').text("아직 음악 성향 테스트를 안하셨네요?")
                $('.test_left_bottom').text("테스트를 진행해보고, 나에게 맞는 음악을 추천 받아보세요!")
                $('.music_test_btn').text("테스트 바로가기")
            }
            else {
                $('.test_left_middle').text(preferenceResult)
                $('.music_test_btn').text("추천 음악 바로 가기")
            }
            update_info(chart_year)
        }
    });
}

//년도에 따른 좋아요 노래 update
function update_info(chart_year) {
    $('#rankchart-row').empty()

    if (likeMusic.length >= 1) {
        for (let i =0; i<likeMusic.length; i++) {
            let albumImageUrl = likeMusic[i]['albumImageUrl']
            let singer = likeMusic[i]['singer']
            let title = likeMusic[i]['title']
            let musicPlaySrc = likeMusic[i]['musicPlaySrc']
            let year = likeMusic[i]['year']
            chart_year = parseInt(chart_year)
            if (year >= chart_year && year < chart_year + 10) {
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
    else {
        let temp_html = `<div id="list-img">
                            <img id="theImg" src="../static/images/mypage_bn_like_no.png" />
                            <div class="list_btn">추천 음악 바로 가기</div>
                        </div>`
        $('#year-btn').remove();
        $('.chart_text').remove();
        $('#section_rankchart').remove();
        $('#chart-body').append(temp_html)
    }
}

//회원탈퇴
function withdraw() {
  $.ajax({
    type: 'POST',
    url: '/userinfo',
    data: {},
    success: function (response) {
      location.href='/';
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