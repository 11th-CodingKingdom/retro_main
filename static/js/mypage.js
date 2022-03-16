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
let likeMusic;
//마이페이지 새로고침 (좋아요 노래, 성향테스트 결과 표시)
function userinfo_get(chart_year) {
    id = sessionStorage.getItem('id')
    $.ajax({
        type: 'GET',
        url: '/userinfo',
        data: {'id':id},
        success: function (response) {
            likeMusic = response['likeMusic']
            let preferenceResult = sessionStorage.getItem('preferenceResult')
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
    let userID = sessionStorage.getItem('id')
    if (likeMusic.length >= 1) {
        for (let i =0; i<likeMusic.length; i++) {
            let albumImageUrl = likeMusic[i]['albumImageUrl']
            let singer = likeMusic[i]['singer']
            let title = likeMusic[i]['title']
            let musicPlaySrc = likeMusic[i]['musicPlaySrc']
            let year = likeMusic[i]['year']
            let albumtitle = likeMusic[i]['albumtitle']
            let rank = i+1

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
                                            <div id="retrocollect_album">${albumtitle}</div>
                                        </td>
                                        <td>
                                            <div id="rankchart_artist">${singer}</div>
                                        </td>
                                        <td>
                                            <!-- 재생버튼 -->
                                            <button type="button">
                                                <img onclick="main_playing_active_3('${title}', '${singer}')" id="play_mypage" src="../static/images/playbn_icon_black.png" alt="" class="playbtn">
                                            </button>
                                        </td>
                                        <td>
                                            <!-- 좋아요 버튼 -->
                                            <button type="button">
                                                <img src="../static/images/like_icon_hover.png" alt="" width="30px" height="30px" id="like_mypage" onclick="likeclick_mypage('${userID}', '${title}', '${singer}', '${rank}')">
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
                            <div onclick="playlist_banner_btn_click()" class="list_btn">추천 음악 바로 가기</div>
                        </div>`
        $('#year-btn').remove();
        $('.chart_text').remove();
        $('#section_rankchart').remove();
        $('#chart-body').append(temp_html)
    }
}


//login 상태에 따라서 버튼 클릭 시 이동되는 페이지 변화
function playlist_banner_btn_click() {
        location.href='/retrochart_page';
}

//회원탈퇴
function withdraw() {
    id = sessionStorage.getItem('id')
  $.ajax({
    type: 'POST',
    url: '/userinfo',
    data: {'id':id},
    success: function (response) {
        sessionStorage.clear()
        location.href='/';
    }
  });
}

//mypage에서 좋아요 클릭
function likeclick_mypage(userID, title, singer, rank) {
  $.ajax({
    type: 'POST',
    url: '/mypage/likeclick',
    data: {
        id_give: userID,
        title_give: title,
        singer_give: singer
    },
    success: function (response) {
        let like = response['like']
        let likebtn;
        let likebtns = document.querySelectorAll('#like_mypage');
        for (let i = 0; i < likebtns.length; i++){
            if(rank == i+1) {
                likebtn = likebtns[i]
            }
        }

        let playbar_title;
        let playbar_singer;
        let playbar_likebtn;
        if(localStorage.getItem('playbar_title')) {
            playbar_title= localStorage.getItem('playbar_title')
        } else {
            playbar_title = ''
        }
        if (localStorage.getItem('playbar_singer')) {
            playbar_singer = localStorage.getItem('playbar_singer')
        } else {
            playbar_singer = ''
        }

        if (like == 1) {
            userinfo_get(chart_year)
            if (title == playbar_title && singer == playbar_singer) {
                playbar_likebtn = document.querySelector('#likebtn');
                playbar_likebtn.src = '../static/images/like_icon_hover.png';
                console.log('playbar like on')
            }
        } else {
            userinfo_get(chart_year)
            if (title == playbar_title && singer == playbar_singer) {
                playbar_likebtn = document.querySelector('#likebtn');
                playbar_likebtn.src = '../static/images/like_icon.png';
                console.log('playbar like off')
            }
        }

        alert(response['msg'])
    }
  });
}
