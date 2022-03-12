// 마이페이지 년도 변경 시 button update 및 노래 update 함수연결
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

//마이페이지 새로고침 (좋아요 노래, 성향테스트 결과 표시)
function userinfo_get(chart_year) {
  $.ajax({
    type: 'GET',
    url: '/userinfo',
    data: {},
    success: function (response) {
      likeMusic = response['likeMusic']
      preferenceResult = response['preferenceResult']
      if (typeof preferenceResult == "undefined" || preferenceResult == null || preferenceResult == "") {
        $('.test_left_middle').text("성향평가가 필요!")
      }
      else {
        $('.test_left_middle').text(preferenceResult)
      }
      update_info(chart_year)
    }
  });
}

//년도에 따른 좋아요 노래 update
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

//회원탈퇴
function withdraw() {
  $.ajax({
    type: 'POST',
    url: '/userinfo',
    data: {},
    success: function (response) {
      console.log(response)
      location.href='/';
    }
  });
}