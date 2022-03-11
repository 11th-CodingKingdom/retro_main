$(document).ready(function() {
    $('#logo img').click(function () {
        location.href = '/';
    });
    $("#pwCheck").keydown(function (key) {
        if (key.keyCode == 13) {
            regist();
        }
    });
});

function regist() {
    let id = $('#id').val()
    let pw = $('#pw').val()
    let pwCheck = $('#pwCheck').val()
    let name = $('#name').val()
    let email = $('#email').val()

    $.ajax({
        type: 'POST',
        url: '/regist',
        data: {'id':id, 'pw':pw, 'pwCheck':pwCheck,'name':name,'email':email},
        success: function (response) {
            let msg = response['msg']
            if(msg == "회원가입 완료!"){
                location.href='/login_page';
                alert(msg);
            }else {
                alert(msg);
            }
            }
    });
}
