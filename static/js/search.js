$(document).ready(function () {
    $('#searchbox').attr('value', search_word);
})


let search_word;
if(localStorage.getItem('search_word')){
    search_word = localStorage.getItem('search_word')
}
else{
    search_word = ''
}

if (search_word && search_word != '') {
    search_loading(search_word);
} else {
    search_loading('@@@@@@');
}

function search_self(target) {
  if (window.event.keyCode == 13) {
    // 엔터키를 누르면
    search_word = target.value;
    console.log(search_word);

    localStorage.setItem('search_word', search_word);
    if(search_word && search_word != '') {
        search_loading(search_word);
    } else {
        search_loading('@@@@@@');
    }

  }
}

// 검색 결과를 보여주는 기능
function search_loading(word) {
    let userID = sessionStorage.getItem('id')
  $.ajax({
    type: 'POST',
    url: '/search',
    data: {
        word_give: word,
        userID_give: userID
    },
    success: function (response) {
        // response가 어떤 정보를 가지고있는지 확인하시고 코드 작성하시면 됩니다.
        console.log(response);
        let music_list = response['music_list'];
        $('#song-list-wrap').empty()
        for(let i =0; i < music_list.length; i++) {
            let albumImageUrl = music_list[i]['albumImageUrl']
            let singer = music_list[i]['singer']
            let title = music_list[i]['title']
            let albumtitle = music_list[i]['albumtitle']
            let songID = music_list[i]['songID']
            let rank = i + 1
            let year = music_list[i]['year']
            let like = music_list[i]['like']
            let temp_html = ``
            if (like == 0){
             temp_html = `<div class="song-list-line">
                              <div class="line-song">
                                <div class="song-left">
                                  <img src="${albumImageUrl}" alt="">
                                </div>
                                <div class="song-right">
                                  <div class="song-title">${title}</div>
                                  <div class="album-title">${albumtitle}</div>
                                </div>
                              </div>
                              <div class="line-artist">${singer}</div>
                              <div class="line-play">
                                <img onclick="main_playing_active(${songID})" src="../static/images/playbn_icon_black.png" alt="">
                              </div>
                              <div class="line-like">
                                <img src="../static/images/like_icon.png" id="like_search" onclick="likeclick_search('${userID}', '${title}', '${singer}', '${rank}')"/>
                              </div>
                            </div>`
        }
            else {
            temp_html = `<div class="song-list-line">
                              <div class="line-song">
                                <div class="song-left">
                                  <img src="${albumImageUrl}" alt="">
                                </div>
                                <div class="song-right">
                                  <div class="song-title">${title}</div>
                                  <div class="album-title">${albumtitle}</div>
                                </div>
                              </div>
                              <div class="line-artist">${singer}</div>
                              <div class="line-play">
                                <img onclick="main_playing_active(${songID})" src="../static/images/playbn_icon_black.png" alt="">
                              </div>
                              <div class="line-like">
                                <img src="../static/images/like_icon_hover.png" id="like_search" onclick="likeclick_search('${userID}', '${title}', '${singer}', '${rank}')"/>
                              </div>
                            </div>`
        }
            $('#song-list-wrap').append(temp_html);
        }
        if (search_word) {
            $('.search-txt').text("\'"+search_word+"\'" + ' 검색결과')
        } else {
            $('.search-txt').text(' 검색결과')
        }

        //alert(response['msg'])
    }
  });
}

function likeclick_search(userID, title, singer, rank) {
  $.ajax({
    type: 'POST',
    url: '/search/likeclick',
    data: {
        id_give: userID,
        title_give: title,
        singer_give: singer
    },
    success: function (response) {
        let like = response['like']
        let likebtn;
        let likebtns = document.querySelectorAll('#like_search');
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
