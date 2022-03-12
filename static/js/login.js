$(document).ready(function() {
    // pw입력 후 Enter누르면 로그인 시도
    $("#pw").keydown(function (key) {
        if (key.keyCode == 13) {
            login();
        }
    });
});

// login 기능
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
