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
            if(msg == "로그인 성공!"){
                sessionStorage.setItem('id',response['userinfo']['id'])
                sessionStorage.setItem('email',response['userinfo']['email'])
                sessionStorage.setItem('name',response['userinfo']['name'])
                sessionStorage.setItem('preferenceResult',response['userinfo']['preferenceResult'])
                location.href='/';
                alert(msg);
            }else {
                alert(msg);
            }
            }
    });
}
