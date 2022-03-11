// 차트에 1980 ~ 2010 버튼 클릭 시 빨간색으로 변경
let currentBtn;
let btns = document.querySelectorAll('.btn');
userinfo_get(2002);


function clickBtn() {
  currentBtn = document.querySelector('.btn-active');
  if (currentBtn){
    currentBtn.classList.remove('btn-active');
  }
  this.classList.add('btn-active');
  currentBtn = this;


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
function userinfo_get(year) {
  $.ajax({
    type: 'GET',
    url: '/userinfo',
    data: {'year': year},
    success: function (response) {
      let email = response['userinfo']['email']
      let name = response['userinfo']['name']
      let preferenceResult = response['userinfo']['preferenceResult']
      let likeMusic = response['likeMusic']
      $('#user_email').text(email)
      $('.mypage_hello span').text(name)
      console.log(preferenceResult)
      if(typeof preferenceResult == "undefined" || preferenceResult == null || preferenceResult == ""){
        $('.type').text("성향평가가 필요!"+' '+name)
      }
      else{
        $('.type').text(preferenceResult+' '+name)
      }
      $('#rankchart-row').empty()
      for (let i=0; i < likeMusic.length; i++){
        let albumImageUrl = likeMusic[i]['albumImageUrl']
        let singer = likeMusic[i]['singer']
        let title = likeMusic[i]['title']
        let musicPlaySrc = likeMusic[i]['musicPlaySrc']
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
  });
}
