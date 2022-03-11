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
        $('.test_left_middle').text("성향평가가 필요!")
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