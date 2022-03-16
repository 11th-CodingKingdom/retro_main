let cur_yearBtn;
let yearBtns = document.querySelectorAll('.year-btn');

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


  cur_yearBtn = document.querySelector('.year-btn-active');
  if(cur_yearBtn){
    cur_yearBtn.classList.remove('year-btn-active');
  }
  yearBtns[0].classList.add('year-btn-active');
  cur_yearBtn = yearBtns[0];
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


function clickYearBtnHandler() {
  cur_yearBtn = document.querySelector('.year-btn-active');
  if(cur_yearBtn){
    cur_yearBtn.classList.remove('year-btn-active');
  }
  this.classList.add('year-btn-active');
  cur_yearBtn = this;
  collect_year = document.getElementsByClassName("year-btn-active")[0].value;
  retro_collection_loading(collect_year);
}

for(let i=0; i<yearBtns.length; i++){
  yearBtns[i].addEventListener('click', clickYearBtnHandler);
}


console.log(localStorage)
let collect_year;
if(localStorage.getItem('retrocollect_year')){
    collect_year = localStorage.getItem('retrocollect_year')
}
else{
    collect_year = '1980'
}
retro_collection_loading(collect_year)


cur_yearsBtn = document.querySelector('.years-btn-active');
if(cur_yearsBtn){
cur_yearsBtn.classList.remove('years-btn-active');
}
if($('#collect_1980').attr('value') == collect_year) {
    yearsBtns[0].classList.add('years-btn-active');
    cur_yearsBtn = yearsBtns[0];
    changeYearBtnText(cur_yearsBtn);

} else if ($('#collect_1990').attr('value') == collect_year) {
    yearsBtns[1].classList.add('years-btn-active');
    cur_yearsBtn = yearsBtns[1];
    changeYearBtnText(cur_yearsBtn);

} else if ($('#collect_2000').attr('value') == collect_year) {
    yearsBtns[2].classList.add('years-btn-active');
    cur_yearsBtn = yearsBtns[2];
    changeYearBtnText(cur_yearsBtn);

} else if ($('#collect_2010').attr('value') == collect_year) {
    yearsBtns[3].classList.add('years-btn-active');
    cur_yearsBtn = yearsBtns[3];
    changeYearBtnText(cur_yearsBtn);

} else if ($('#collect_all').attr('value') == collect_year) {
    yearsBtns[4].classList.add('years-btn-active');
    cur_yearsBtn = yearsBtns[4];
    changeYearBtnText(cur_yearsBtn);

}





$(document).ready(function () {
    localStorage.setItem('playbar_title', '')
    localStorage.setItem('playbar_singer', '')
    localStorage.setItem('retrocollect_year', '1980')
})

//RE:TRO 모음집 이지에서 차트 새로고침 (좋아요 노래, 성향테스트 결과 표시)
function retro_collection_loading(chart_year) {
    let userID = sessionStorage.getItem('id')
    localStorage.setItem('retrocollect_year', chart_year)
  $.ajax({
    type: 'POST',
    url: '/collection',
    data: {
        year_give : chart_year,
        userID_give : userID
    },
    success: function (response) {
        let music_list = response['music_list']
        $('#collection_body').empty()
        for (let i = 0; i < music_list.length; i++) {
            let albumImageUrl = music_list[i]['albumImageUrl']
            let rank = i + 1
            let singer = music_list[i]['singer']
            let title = music_list[i]['title']
            let songID = music_list[i]['songID']
            let year = music_list[i]['year']
            let like = music_list[i]['like']
            let albumtitle = music_list[i]['albumtitle']

            let temp_html = ``
            if (like == 0){
                temp_html = `<tr>
                                <td>
                                  <div id="retrocollect_song_wrap">
                                    <img src="${albumImageUrl}"/>
                                    <div id="retrocollect_song_desc">
                                      <div id="retrocollect_song">${title}</div>
<!--                                      <div id="retrocollect_album">${albumtitle}</div>-->
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div id="retrocollect_artist">${singer}</div>
                                </td>
                                <td><img onclick="main_playing_active(${songID})" src="../static/images/playbn_icon_black.png" width="35px" height="35px" id="play_collection" /></td>
                                <td><img src="../static/images/like_icon.png" width="25px" height="25px" id="like_collection" onclick="likeclick_retrocollection('${userID}', '${title}', '${singer}', '${rank}')"/></td>
                              </tr>`
            } else {
                temp_html = `<tr>
                                <td>
                                  <div id="retrocollect_song_wrap">
                                    <img src="${albumImageUrl}"/>
                                    <div id="retrocollect_song_desc">
                                      <div id="retrocollect_song">${title}</div>
<!--                                      <div id="retrocollect_album">${albumtitle}</div>-->
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div id="retrocollect_artist">${singer}</div>
                                </td>
                                <td><img onclick="main_playing_active(${songID})" src="../static/images/playbn_icon_black.png" width="35px" height="35px" id="play_collection" /></td>
                                <td><img src="../static/images/like_icon_hover.png" width="25px" height="25px" id="like_collection" onclick="likeclick_retrocollection('${userID}', '${title}', '${singer}', '${rank}')"/></td>
                              </tr>`

            }
            $('#collection_body').append(temp_html)
        }
    }
  });
}

//RE:TRO 모음집 페이지에서 좋아요 클릭
function likeclick_retrocollection(userID, title, singer, rank) {
  $.ajax({
    type: 'POST',
    url: '/collection/likeclick',
    data: {
        id_give: userID,
        title_give: title,
        singer_give: singer
    },
    success: function (response) {
        let like = response['like']
        let likebtn;
        let likebtns = document.querySelectorAll('#like_collection');
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
            likebtn.src = '../static/images/like_icon_hover.png';
            if (title == playbar_title && singer == playbar_singer) {
                playbar_likebtn = document.querySelector('#likebtn');
                playbar_likebtn.src = '../static/images/like_icon_hover.png';
                console.log('playbar like on')
            }
        } else {
            likebtn.src = '../static/images/like_icon.png';
            if (title == playbar_title && singer == playbar_singer) {
                playbar_likebtn = document.querySelector('#likebtn');
                playbar_likebtn.src = '../static/images/like_icon.png';
                console.log('playbar like off')
            }
        }

        //alert(response['msg'])
    }
  });
}

