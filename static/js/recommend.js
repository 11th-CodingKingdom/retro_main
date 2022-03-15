





retro_recommend_loading('2')

$(document).ready(function () {
    localStorage.setItem('playbar_title', '')
    localStorage.setItem('playbar_singer', '')
    localStorage.setItem('retrocollect_year', '1980')
})

//추천플레이리스트 페이지에서 차트 새로고침
function retro_recommend_loading(who) {
    let userID = sessionStorage.getItem('id')
  $.ajax({
    type: 'POST',
    url: '/recommend',
    data: {
        who_give: who,
        userID_give: userID
    },
    success: function (response) {
        let music_list = response['music_list']
        console.log(music_list)

        $('.playlist_top').empty()
        $('#rankchart-row').empty()

        let image_cover;
        let subcomment = music_list[0]['subcomment'];
        let maincomment = music_list[0]['maincomment'];
        let length = music_list.length;

        if (who == '1'){
            image_cover = 'Editor_01.png'
        } else if (who == '2') {
            image_cover = 'Editor_02.png'
        } else if (who == '3') {
            image_cover = 'Editor_03.png'
        } else if (who == '4') {
            image_cover = 'Editor_04.png'
        } else if (who == '5') {
            image_cover = 'Editor_05.png'
        } else if (who == '6') {
            image_cover = 'Editor_06.png'
        } else if (who == 'moon') {
            image_cover = 'sub_bn_01.png'
        } else if (who == 'son') {
            image_cover = 'sub_bn_02.png'
        }
        
        let temp_html2 = ``
        temp_html2 = `  <div class="playlist_img">
                            <img src="../static/images/${image_cover}" alt="">
                        </div>
                        <div class="playlist_text">
                            <span class="text_top test_text">${maincomment}</span>
                            <span class="text_middle test_text">${subcomment}</span>
                            <span class="text_bottom test_text">총 ${length}곡</span>
                        </div>`

        $('.playlist_top').append(temp_html2)

        for (let i = 0; i < music_list.length; i++) {
            let albumImageUrl = music_list[i]['albumImageUrl']
            let rank = i + 1
            let singer = music_list[i]['singer']
            let title = music_list[i]['title']
            let year = music_list[i]['year']
            let like = music_list[i]['like']
            let albumtitle = music_list[i]['albumtitle']

            let temp_html = ``
            if (like == 0){
                temp_html = `<tr class="rankchart-row-box table_line">
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
                                        <img src="../static/images/playbn_icon_black.png"  alt="" class="playbtn">
                                    </button>
                                </td>
                                <td>
                                    <!-- 좋아요 버튼 -->
                                    <button type="button">
                                        <img src="../static/images/like_icon.png" width="30px" height="30px" alt="" id="like_recommend"/>
                                    </button>
                                </td>
                            </tr>`
            } else {
                temp_html = `<tr class="rankchart-row-box table_line">
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
                                        <img src="../static/images/playbn_icon_black.png" alt="" class="playbtn">
                                    </button>
                                </td>
                                <td>
                                    <!-- 좋아요 버튼 -->
                                    <button type="button">
                                        <img src="../static/images/like_icon_hover.png" width="30px" height="30px" alt="" id="like_recommend"/>
                                    </button>
                                </td>
                            </tr>`
            }
            $('#rankchart-row').append(temp_html)
        }


        //alert(response['msg'])
    }
  });
}

// //RE:TRO 모음집 페이지에서 좋아요 클릭
// function likeclick_retrocollection(userID, title, singer, rank) {
//   $.ajax({
//     type: 'POST',
//     url: '/collection/likeclick',
//     data: {
//         id_give: userID,
//         title_give: title,
//         singer_give: singer
//     },
//     success: function (response) {
//         let like = response['like']
//         let likebtn;
//         let likebtns = document.querySelectorAll('#like_collection');
//         for (let i = 0; i < likebtns.length; i++){
//             if(rank == i+1) {
//                 likebtn = likebtns[i]
//             }
//         }
//
//         let playbar_title;
//         let playbar_singer;
//         let playbar_likebtn;
//         if(localStorage.getItem('playbar_title')) {
//             playbar_title= localStorage.getItem('playbar_title')
//         } else {
//             playbar_title = ''
//         }
//         if (localStorage.getItem('playbar_singer')) {
//             playbar_singer = localStorage.getItem('playbar_singer')
//         } else {
//             playbar_singer = ''
//         }
//
//         if (like == 1) {
//             likebtn.src = '../static/images/like_icon_hover.png';
//             if (title == playbar_title && singer == playbar_singer) {
//                 playbar_likebtn = document.querySelector('#likebtn');
//                 playbar_likebtn.src = '../static/images/like_icon_hover.png';
//                 console.log('playbar like on')
//             }
//         } else {
//             likebtn.src = '../static/images/like_icon.png';
//             if (title == playbar_title && singer == playbar_singer) {
//                 playbar_likebtn = document.querySelector('#likebtn');
//                 playbar_likebtn.src = '../static/images/like_icon.png';
//                 console.log('playbar like off')
//             }
//         }
//
//         alert(response['msg'])
//     }
//   });
// }

