let error = false;


$('.toggle').on('click', function() {

    $('.container').stop().addClass('active');
    $('.btn-group').css('bottom', '15px');
});

$('.close').on('click', function() {
    $('.container').stop().removeClass('active');
    $('.btn-group').css('bottom', '0px');

});
$(document).ready(function() {
    $('#login').on('click', loginRequest);
    $('#clear').click(clearForm);
    $('#submit').click(signUpRequest);
    $('#password').blur(function() {
        let password = $('#password').val();
        if (password.length < 8) {
            error = true
            $('#pass-bar').html('رمز عبور باید بیشتر از 8 حرف باشد.');
            $('#pass-bar').css('background', 'red');
        } else {
            error = false
            $('#pass-bar').css('background', 'green');
            $('#pass-bar').html('');

        }
    });
    $('#repeat-password').blur(function() {
        let password = $('#password').val();
        let repeatPassword = $('#repeat-password').val();
        if (password !== repeatPassword) {
            error = true
            $('#rpass-bar').html('عدم تطابق.');
            $('#rpass-bar').css('background', 'red');
        } else {
            error = false
            $('#rpass-bar').css('background', 'green');
            $('#rpass-bar').html('');
        }
    });
    $("#phone-number").blur(function() {

        var regexp = /^(\+98|0098|98|0)?9\d{9}$/;

        var no = $("#phone-number").val();

        if (!regexp.test(no)) {
            error = true;
            $('#phone-bar').html('شماره تلفن را صحیح وارد کنید.');
            $('#phone-bar').css('background', 'red');
        } else {
            error = false;
            $('#phone-bar').css('background', 'green');
            $('#phone-bar').html('');
        }

    });
    $("#phone-numberlogin").blur(function(e) {
        e.preventDefault();
        var regexp = /^(\+98|0098|98|0)?9\d{9}$/;

        var no = $("#phone-numberlogin").val();

        if (!regexp.test(no)) {
            error = true;
            $('#ph-login-bar').html('شماره تلفن را صحیح وارد کنید.');
            $('#ph-login-bar').css('background', 'red');
        } else {
            error = false;
            $('#ph-login-bar').css('background', 'green');
            $('#ph-login-bar').html('');
        }

    });

});


function signUpRequest(e) {
    e.preventDefault();
    let userInformation = {
        phoneNumber: $('#phone-number').val(),
        password: $('#password').val(),
        insuranceId: $('#insurance').val()
    };

    var settings = {
        url: "http://localhost:8080/signup/patient",
        method: "POST",
        timeout: 100000,
        cache:false,
        data: userInformation,
        status:{
            200:function (response) {
                alert(response);
            }
        }
    };
    if (!error) {
        $.ajax(settings).done(function (response) {
            console.log(response);
        });
        localStorage.setItem("token", btoa(response.phoneNumber + ":" + userInformation.password + ":" + response.name ));

    }

}

function clearForm(e) {
    $('#signup')[0].reset();

}


async function loginRequest(e) {
    e.preventDefault();
    let userInformation = {
        phoneNumber: $('#phone-numberlogin').val(),
        password: $('#password-login').val()
    };

    var settings = {
        url: "http://localhost:8080/login/patient",
        method: "POST",
        timeout: 100000,
        cache:false,
        data: userInformation
    };
    if (!error) {
          $.ajax(settings).done(function (response) {
            localStorage.setItem("token", btoa(response.phoneNumber + ":" + userInformation.password + ":" + response.name ));
            window.location = "home.html";
        });

    }

}