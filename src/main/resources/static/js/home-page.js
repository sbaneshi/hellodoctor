$(document).ready(function(){

isLogin();


})
function isLogin(){
    let token=localStorage.getItem("token");

    if(token!==null) {
        let decode = (atob(token));
        let userInformation = decode.split(':');
        // $('#nav-login').css("display","none");
        $('#nav-profile .btn');

    }
    else{
        $('#nav-profile').css("display","none");
    }


}