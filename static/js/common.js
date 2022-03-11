// 로그인 상태 업데이트
function loginStatus() {
    $.ajax({
        type: 'GET',
        url: '/login_status',
        data: {},
        success: function (response) {
            userID = response['id']
            $('#nav_right').empty()
            if (userID === "") {
                login_mypage = "로그인"
                regist_logout = "회원가입"
                href_login_mypage = "/login_page"
                href_regist_logout = "/regist_page"
            }
            else{
                login_mypage = "마이페이지"
                regist_logout = "로그아웃"
                href_login_mypage = "/mypage"
                href_regist_logout = "/logout"
            }
            let login_html = `<ul>
                                <li><a href="#">RE:TRO 소개</a></li>
                                <li><a href=${href_login_mypage}>${login_mypage}</a></li>
                                <li><a href=${href_regist_logout}>${regist_logout}</a></li>
                              </ul>`
            $('#nav_right').append(login_html)
        }
    });

}
