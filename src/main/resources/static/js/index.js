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
    //$('#clear').click(clearForm);
    $("#clear").click(clearform
        // $.get("http://localhost:8080/api/doctor/full?id=1", function(data, status) {
        //     alert("Data: " + data + "\nStatus: " + status);
        // });
    );
    $('#submit').click(signUpRequest);
    $('#password').blur(function() {
        let password = $('#password').val();
        // if (password.length < 8) {
        //     error = true
        //     $('#pass-bar').html('رمز عبور باید بیشتر از 8 حرف باشد.');
        //     $('#pass-bar').css('background', 'red');
        // } else {
        //     error = false
        //     $('#pass-bar').css('background', 'green');
        //     $('#pass-bar').html('');

        // }
    });
    $('#repeat-password').blur(function() {
        let password = $('#password').val();
        let repeatPassword = $('#repeat-password').val();
        // if (password !== repeatPassword) {
        //     error = true
        //     $('#rpass-bar').html('عدم تطابق.');
        //     $('#rpass-bar').css('background', 'red');
        // } else {
        //     error = false
        //     $('#rpass-bar').css('background', 'green');
        //     $('#rpass-bar').html('');
        // }
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
    // $("#phone-numberlogin").blur(function() {

    //     var regexp = /^(\+98|0098|98|0)?9\d{9}$/;

    //     var no = $("#phone-numberlogin").val();

    //     if (!regexp.test(no)) {
    //         error = true;
    //         $('#ph-login-bar').html('شماره تلفن را صحیح وارد کنید.');
    //         $('#ph-login-bar').css('background', 'red');
    //     } else {
    //         error = false;
    //         $('#ph-login-bar').css('background', 'green');
    //         $('#ph-login-bar').html('');
    //     }

    // });
    $("#mid").blur(function() {

        var regexp = /^[0-9]{1,10}$/;

        var no = $("#mid").val();

        if (!regexp.test(no)) {
            error = true;
            $('#mid-bar').html('شماره نظام پزشکی  را به صورت یک عدد وارد کنید.');
            $('#mid-bar').css('background', 'red');

        } else {
            error = false;
            $('#mid-bar').css('background', 'green');
            $('#mid-bar').html('');
        }

    });

});


function signUpRequest(e) {
    let userInformation = {
        phoneNumber: $('#phone-number').val(),
        password: $('#password').val(),
        expertise: $('#expertise').val(),
        mid: $('#mid').val()
    };

    // $.ajax({
    //     type: 'POST',
    //     url: 'http://localhost',
    //     data: JSON.stringify(userInformation),
    //     success: function(msg) {
    //         alert('wow' + msg);
    //     }
    //
    // });

}

function clearform() {
    console.log($.ajax({
        type: 'GET',
        headers: {"Authorization" : "Basic " + btoa('1234:1234')},
        url: 'http://localhost:8080/api/doctor/full?id=1',
        success: function(msg,st) {
            // console.log('wow' + (msg.responseText));
        }

    }).done(function(msg){
        console.log(msg);
    }));

}





function loginRequest() {
    let userInformation = {
        phoneNumber: $('#phone-numberlogin').val(),
        password: $('#password-login').val()
    };
    // var url = "http://localhost:8080/api/doctor/full?id=1";
    // $.get(url, null, function(data) {
    //     alert(data);
    // });



}