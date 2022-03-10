$(document).ready(function() {
    $("#pw").keydown(function (key) {
        if (key.keyCode == 13) {
            login();
        }
    });
    $('#banner_btn').click(function (){
        location.href='/regist_page';
    });
    $('#logo img').click(function (){
        location.href='/';
    });
});

function login() {
    let id = $('#id').val()
    let pw = $('#pw').val()
    $.ajax({
        type: 'POST',
        url: '/login',
        data: {'id':id, 'pw':pw},
        success: function (response) {
            let msg = response['msg']
            let id = response['id']
            if(msg == "로그인 성공!"){
                location.href='/';
                alert(msg);
            }else {
                alert(msg);
            }
            }
    });
}
