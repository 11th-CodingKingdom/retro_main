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

// 일시정지, 재생 버튼 번갈아 변경
let playcnt = 1;
function togglePause() {
  let play = document.getElementById("playbtn");
  
  if(playcnt % 2 == 1) {
    play.src = '../static/images/playbar_menu_pau.png';
    play.style.width = '30px';
    play.style.height = 'auto';
    play.style.marginTop = '10px';
    play.style.marginLeft = '10px';
  } else {
    play.src = '../static/images/palybn_icon.png';
    play.style.width = '50px';
    play.style.height = 'auto';
    play.style.marginTop = '0px';
    play.style.marginLeft = '0px';
  }
  playcnt++;
}