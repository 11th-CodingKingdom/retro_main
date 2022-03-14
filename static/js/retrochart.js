// 차트에 1980 ~ 2010 버튼 클릭 시 빨간색으로 변경
let currentBtn;
let btns = document.querySelectorAll('.btn');
let chart_year

//let chart_year = document.getElementsByClassName("btn-active")[0].value;
//retroChart(chart_year)

if(localStorage.getItem('retrochart_year')){
    chart_year = localStorage.getItem('retrochart_year')
}
else{
    chart_year = '1980'
}
for (let i = 0; i < btns.length; i++) {
  if (chart_year == btns[i].value) {
      btns[i].classList.add('btn-active');
      currentBtn = btns[i];
  }
}
retro_chart_loading(chart_year);

function clickBtn() {
  currentBtn = document.querySelector('.btn-active');
  if (currentBtn){
    currentBtn.classList.remove('btn-active');
  }
  this.classList.add('btn-active');
  currentBtn = this;
  chart_year = document.getElementsByClassName("btn-active")[0].value;
  retro_chart_loading(chart_year);
}
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', clickBtn);
}


$(document).ready(function () {
    localStorage.setItem('playbar_title', '')
    localStorage.setItem('playbar_singer', '')
    localStorage.setItem('retrochart_year', '1980')
})

//RE:TRO 차트페이지에서 차트 새로고침 (좋아요 노래, 성향테스트 결과 표시)
function retro_chart_loading(chart_year) {
    let userID = sessionStorage.getItem('id')
  $.ajax({
    type: 'POST',
    url: '/chart',
    data: {
        year_give : chart_year,
        userID_give : userID
    },
    success: function (response) {
        let music_list = response['music_list']
        $('#chart_body').empty()
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
                                  <div id="retrochart_rank">${rank}</div>
                                </td>
                                <td>
                                  <div id="retrochart_song_wrap">
                                    <img src="${albumImageUrl}"/>
                                    <div id="retrochart_song_desc">
                                      <div id="retrochart_song">${title}</div>
                                      <div id="retrochart_album">${albumtitle}</div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div id="retrochart_artist">${singer}</div>
                                </td>
                                <td><img onclick="main_playing_active(${songID})" src="../static/images/playbn_icon_black.png" width="40px" height="40px"/></td>
                                <td><img src="../static/images/like_icon.png" width="30px" height="30px" id="like_chart" onclick="likeclick_retrochart('${userID}', '${title}', '${singer}', '${rank}')"/></td>
                              </tr>`
            } else {
                temp_html = `<tr>
                            <td>
                              <div id="retrochart_rank">${rank}</div>
                            </td>
                            <td>
                              <div id="retrochart_song_wrap">
                                <img src="${albumImageUrl}"/>
                                <div id="retrochart_song_desc">
                                  <div id="retrochart_song">${title}</div>
                                  <div id="retrochart_album">${albumtitle}</div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div id="retrochart_artist">${singer}</div>
                            </td>
                            <td><img onclick="main_playing_active(${songID})" src="../static/images/playbn_icon_black.png" width="40px" height="40px"/></td>
                            <td><img src="../static/images/like_icon_hover.png" width="30px" height="30px" id="like_chart" onclick="likeclick_retrochart('${userID}', '${title}', '${singer}', '${rank}')"/></td>
                          </tr>`
            }
            $('#chart_body').append(temp_html)
        }
    }
  });
}

//RE:TRO 차트페이지에서 좋아요 클릭
function likeclick_retrochart(userID, title, singer, rank) {
  $.ajax({
    type: 'POST',
    url: '/chart/likeclick',
    data: {
        id_give: userID,
        title_give: title,
        singer_give: singer
    },
    success: function (response) {
        let like = response['like']
        let likebtn;
        let likebtns = document.querySelectorAll('#like_chart');
        for (let i = 0; i < likebtns.length; i++){
            if(rank == i+1) {
                likebtn = likebtns[i]
                console.log('like click rank')
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

        alert(response['msg'])
    }
  });
}