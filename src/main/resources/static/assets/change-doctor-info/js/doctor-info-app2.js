var error = false;


$('#phonenumber').blur(function() {
    var regexp = /^(\+98|0098|98|0)?9\d{9}$/;
    var no = $("#phonenumber").val();

    if (!regexp.test(no)) {
        error = true;
        $('.phonevalidate').html(` <i class=" fa fa-exclamation-triangle" style="padding-left: 5px;"></i>` + `شماره تلفن را صحیح وارد کنید`);
        $('#phonenumber').css('border', '1px solid #f96332');
    } else {
        error = false;
        $('.phonevalidate').html('');
        $('#phonenumber').css('border', '1px solid #E3E3E3');

    }
})
$('#pass').blur(function() {
    let password = $('#pass').val();
    if (password.length < 8) {
        error = true
        $('.passvalidate').html(` <i class=" fa fa-exclamation-triangle" style="padding-left: 5px;"></i>` + `گدرواژه باید بیشتر از ۸ کاراکتر باشد`);
        $('#pass').css('border', '1px solid #f96332');
    } else {
        error = false
        $('.passvalidate').html('');
        $('#pass').css('border', '1px solid #E3E3E3');


    }
})
$('#email').blur(function() {
    var regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var em = $("#email").val();

    if (!regexp.test(em)) {
        error = true;
        $('.emailvalidate').html(` <i class=" fa fa-exclamation-triangle" style="padding-left: 5px;"></i>` + `ایمیل را صحیح وارد کنید`);
        $('#email').css('border', '1px solid #f96332');
    } else {
        error = false;
        $('.emailvalidate').html('');
        $('#email').css('border', '1px solid #E3E3E3');

    }
})
var loader;

function loadNow(opacity) {
    if (opacity <= 0) {
        displayContent();
    } else {
        loader.style.opacity = opacity;
        window.setTimeout(function() {
            loadNow(opacity - 0.05);
        }, 50);
    }
}

function displayContent() {
    loader.style.display = 'none';
    // document.querySelector('main-panel').style.display = 'block';
}

document.addEventListener("DOMContentLoaded", function() {
    loader = document.getElementById('loader');
    loadNow(1);
});

$(document).ready(function() {
    setPanel();

    $('.save-btn').click(function() {
        if (!error) {
            e.preventDefault();
            var token = localStorage.getItem("token");
            var decode = (atob(token));
            var userInfo = decode.split(':');
            let userInformation = {
                phoneNumber: $('#phonenumber').val(),
                password: $('#pass').val(),
                insuranceId: $('#insurancetype').val(),
                email: $('#email').val(),
                ostan: $('#ostan').val(),
                city: $('#city').val(),
                address: $('#address').val()
            };

            var settings = {
                url: "http://localhost:8080/api/patient/edit",
                method: "POST",
                timeout: 100000,
                cache: false,
                headers: {
                    "Authorization": "Basic " + btoa(userInfo[0], userInfo[1])
                },
                data: userInformation,
                status: {
                    200: function(response) {
                        alert(response);
                    }
                }
            };

            $.ajax(settings).done(function(response) {
                console.log(response);
                localStorage.setItem("token", btoa(response.phoneNumber + ":" + userInformation.password + ":" + userInformation.name + ":" + response.insuranceId));
                window.location = "home.html";

            });
        } else {

        }
    })
});






function setPanel() {

    var token = localStorage.getItem("token");
    var decode = (atob(token));
    var userInformation = decode.split(':');
    var settings = {
        url: "http://localhost:8080//api/doctor/full",
        method: "GET",
        timeout: 100000,
        cache: false,
        header: {
            "Authorization": "Basic " + btoa(userInformation[0] + ":" + userInformation[1])
        },
        status: {
            200: function(response) {
                alert(response);
            }
        }
    };
    $.ajax(settings).done(function(response) {

        $('#firstname').val(response.firstName);
        $('#lastname').val(response.lastName);
        $('#email').val(response.email);
        $('#city').val(response.city);
        $('#phonenumber').val(response.phoneNumber);
        $('#pass').val(response.password);
        $('#expertise').val(response.expertise);
        $('#ostan').val(response.ostan);
        $('#address').val(response.address);
    })
}