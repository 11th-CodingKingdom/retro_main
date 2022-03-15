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

search_loading(search_word);



function search_self(target) {
  if (window.event.keyCode == 13) {
    // 엔터키를 누르면
    search_word = target.value;
    console.log(search_word);

    localStorage.setItem('search_word', search_word);
    search_loading(search_word);
  }
}


function search_loading(word) {
  $.ajax({
    type: 'POST',
    url: '/search',
    data: {
        word_give: word
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
          let year = music_list[i]['year']
          let like = music_list[i]['like']

          let temp_html = ``
          if(title.includes(word)) {
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
                            <img src="../static/images/playbn_icon_black.png" alt="">
                          </div>
                          <div class="line-like">
                            <img src="../static/images/like_icon.png" id="likebtn">
                          </div>
                        </div>`;
          }
          $('#song-list-wrap').append(temp_html);
        }
        $('.search-txt').text('\''+search_word+'\' 검색결과')
        alert(response['msg'])
    }
  });
}