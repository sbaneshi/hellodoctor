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
    getTime();
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
    $("#phone-numberlogin").blur(function() {

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

function  getTime() {
    var settings = {

        type: "GET",
        url: "http://localhost:8080/api/doctor/available_visit_times?id=1",
        headers:{
            "Authorization": "Basic " + btoa( "8765:1234")
        },

        status:{
            200:function (response) {
                alert(response);
            }
        }
    };
    $.ajax(settings).done(function (response) {
        console.log(response);

    })
}


function signUpRequest(e) {
    e.preventDefault();
    let userInformation = {
        phoneNumber: $('#phone-number').val(),
        password: $('#password').val(),
        expertise: $('#expertiseSelect').val(),
        maCode: parseInt($('#mid').val())
    };
    var settings = {
        url: "http://localhost:8080/signup/doctor",
        method: "POST",
        timeout: 100000,
        cache:false,
        data: userInformation,
        statusCode:{
            200:function (response) {
            }
        }
    };
    if (!error) {
        $.ajax(settings).done(function (response) {
            console.log(response);
            localStorage.setItem("token", btoa(response.phoneNumber + ":" + userInformation.password )) ;
            window.location="continue.html";

        })
            .error(function () {

            })
    }else{
        nowuiDashboard.showNotification('top', 'left')
    }

}
nowuiDashboard = {
    misc: {
        navbar_menu_visible: 0
    },

    showNotification: function(from, align) {
        color = 'danger';

        $.notify({
            icon: "fa fa-bell ",
            message: "اطلاعات وارد شده صحیح نمی باشد."

        }, {
            type: color,

            placement: {
                from: from,
                align: align
            }
        });
    }


};

function clearform() {

    $('#signup')[0].reset();

    // console.log($.ajax({
    //     type: 'GET',
    //     headers: {"Authorization" : "Basic " + btoa('1234:1234')},
    //     url: 'http://localhost:8080/api/doctor/full?id=1',
    //     success: function(msg,st) {
    //         // console.log('wow' + (msg.responseText));
    //     }
    //
    // }).done(function(msg){
    //     console.log(msg);
    // }));

}

function loginRequest(e) {
    e.preventDefault();
    let password = $("#password-login").val();
    let pho = $("#phone-numberlogin").val();
    var settings = {


        // prevent jQuery from automatically transforming the data into a query string

        url: "http://localhost:8080/login/doctor",
        method: "POST",
        timeout: 100000,
        cache:false,
        data: {
            phoneNumber:pho,
            password: password
        },
        statusCode:{
            200:function (response) {
            }
        }
    };
    if (!error) {
        $.ajax(settings).done(function (response) {
            localStorage.setItem("token", btoa(response.phoneNumber + ":" + password ));
            console.log(response);
            window.location="dr1.html";
        });
    }else{
        nowuiDashboard.showNotification('top','left');
    }

    }




