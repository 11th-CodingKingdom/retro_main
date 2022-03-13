/* 년도 선택시 빨간색으로 활성화 */
let cur_yearsBtn; // 현재 활성화된 버튼
let yearsBtns = document.querySelectorAll('.years-btn');

function clickYearsBtnHandler() {
  cur_yearsBtn = document.querySelector('.years-btn-active');
  if(cur_yearsBtn){
    cur_yearsBtn.classList.remove('years-btn-active');
  }
  this.classList.add('years-btn-active');
  cur_yearsBtn = this;

  changeYearBtnText(cur_yearsBtn);
}

for(let i=0; i<yearsBtns.length; i++){
  yearsBtns[i].addEventListener('click', clickYearsBtnHandler);
}

/* 년도 선택시 하단 버튼 텍스트 변경 */
function changeYearBtnText(cur_yearsBtn){
  if(cur_yearsBtn.innerHTML === "전체 곡"){
    document.getElementById("retrocollect-year-btn").style.display ="none";
  } else {
    document.getElementById("retrocollect-year-btn").style.display ="block";
    changeText();  
  }
  function changeText(){
    const yearBtns = document.getElementById("retrocollect-year-btn").children;
    for(let i=0; i<yearBtns.length; i++){
      let temp = cur_yearsBtn.innerHTML.slice(0,3);
      yearBtns[i].value = temp+i.toString();
    }
  }
}

/* 예) 1980~1989 버튼 클릭시 빨간색으로 활성화*/
let cur_yearBtn;
let yearBtns = document.querySelectorAll('.year-btn');

function clickYearBtnHandler() {
  cur_yearBtn = document.querySelector('.year-btn-active');
  if(cur_yearBtn){
    cur_yearBtn.classList.remove('year-btn-active');
  }
  this.classList.add('year-btn-active');
  cur_yearBtn = this;
}

for(let i=0; i<yearBtns.length; i++){
  yearBtns[i].addEventListener('click', clickYearBtnHandler);
}