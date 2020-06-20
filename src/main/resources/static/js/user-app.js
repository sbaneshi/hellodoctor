$('#phonenumber').blur(function () {
    var regexp = /^(\+98|0098|98|0)?9\d{9}$/;
    var no = $("#phonenumber").val();

    if (!regexp.test(no)) {
        error = true;
        $('.phonevalidate').html(` <i class=" fa fa-exclamation-triangle" style="padding-left: 5px;"></i>` +  `شماره تلفن را صحیح وارد کنید` );
        $('#phonenumber').css('border', '1px solid #f96332');
    } else {
        error = false;
        $('.phonevalidate').html('');
    }
})
$('#pass').blur(function () {
    let password = $('#pass').val();
    if (password.length < 8) {
        error = true
        $('.passvalidate').html(` <i class=" fa fa-exclamation-triangle" style="padding-left: 5px;"></i>` +  `گدرواژه باید بیشتر از ۸ کاراکتر باشد` );
        $('#pass').css('border', '1px solid #f96332');
    } else {
        error = false
        $('.passvalidate').html('');

    }
})
$('#email').blur(function () {
    var regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var em = $("#email").val();

    if (!regexp.test(em)) {
        error = true;
        $('.emailvalidate').html(` <i class=" fa fa-exclamation-triangle" style="padding-left: 5px;"></i>` +  `ایمیل را صحیح وارد کنید` );
        $('#email').css('border', '1px solid #f96332');
    } else {
        error = false;
        $('.emailvalidate').html('');
    }
})

$(document).ready(function() {
        setPanel();

    $('.save-btn').click(function () {
        e.preventDefault();
        var token=localStorage.getItem("token");
        var decode = (atob(token));
        var userInfo = decode.split(':');
        let userInformation = {
            phoneNumber: $('#phonenumber').val(),
            password: $('#pass').val(),
            insuranceId: $('#insurancetype').val(),
            email:$('#email').val(),
            ostan:$('#ostan').val(),
            city:$('#city').val(),
            address:$('#address').val()
        };

        var settings = {
            url: "http://localhost:8080/api/patient/edit",
            method: "POST",
            timeout: 100000,
            cache:false,
            headers: {"Authorization" : "Basic " + btoa(userInfo[0],userInfo[1])},
            data: userInformation,
            status:{
                200:function (response) {
                    alert(response);
                }
            }
        };

            $.ajax(settings).done(function (response) {
                console.log(response);
                localStorage.setItem("token", btoa(response.phoneNumber + ":" + userInformation.password + ":"+userInformation.name +":" + response.insuranceId)) ;
                window.location = "home.html";

            });
        })
});


// function setPanel(){
//     var token=localStorage.getItem("token");
//
//     var decode = (atob(token));
//     var userInformation = decode.split(':');
//     $('.card-body .author h5').html(`<i class="fa fa-user" style="margin-left:10px;"></i>${userInformation[2]}`);
//     $('#phonenumber').value=userInformation[];
//     $('#firstname').value=userInformation[];
//     $('#lastname').value=userInformation[];
//     $('#pass').value=userInformation[];
//     $('#insurancetype').value=userInformation[];
//
//
// }
