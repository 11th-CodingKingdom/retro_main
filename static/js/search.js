

search_loading('사랑')


// 검색 결과 페이지
function search_loading(word) {
  $.ajax({
    type: 'POST',
    url: '/search',
    data: {
        word_give: word
    },
    success: function (response) {
        // response가 어떤 정보를 가지고있는지 확인하시고 코드 작성하시면 됩니다.
        console.log(response)





        alert(response['msg'])
    }
  });
}