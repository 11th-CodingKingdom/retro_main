
//필요 사항
// 플레이리스트 제공
// 노래 좋아요 클릭
// 하단 재생바 활성화

//editor's pick 새로고침 (좋아요 노래, 에디터 픽 노래 업로드)
//플레이리스트 제공
function userinfo_get(chart_year) {
    id = sessionStorage.getItem('id')
    $.ajax({
        type: 'GET',
        url: '/playlist',
        data: {
            'playlist_type': playlist_type,
            'playlist_who': playlist_who
        },
        success: function (response) {
            music_list = response['music_list']
            if (music_list.length >= 1) {
                for (let i = 0; i < music_list.length; i++) {
                    let albumImageUrl = music_list[i]['albumImageUrl']
                    let singer = music_list[i]['singer']
                    let title = music_list[i]['title']
                    let songID = music_list[i]['songID']
                    let year = music_list[i]['year']
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
                                                <img src="../static/images/playbn_icon_black.png" alt=""
                                                     class="playbtn" onclick="main_playing_active(${songID})">
                                            </button>
                                        </td>
                                        <td>
                                            <!-- 좋아요 버튼 -->
                                            <button type="button">
                                                <img src="../static/images/like_icon_hover.png" alt="" id="likebtn"
                                                     onclick="likeclick_editorPick('${userID}', '${title}', '${singer}', '${rank}')"/>
                                            </button>
                                        </td>
                                    </tr>`
                        $('#rankchart-row').append(temp_html)
                    }
                }
            }
            update_info(chart_year)
        }
    });
}


//editor's pick 차트페이지에서 좋아요 클릭
function likeclick_editorPick(userID, title, singer, rank) {
  $.ajax({
    type: 'POST',
    url: '/playlist/likeclick',
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
