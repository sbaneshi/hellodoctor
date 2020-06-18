"use strict";

var error = false;
$('.toggle').on('click', function () {
  $('.container').stop().addClass('active');
  $('.btn-group').css('bottom', '15px');
});
$('.close').on('click', function () {
  $('.container').stop().removeClass('active');
  $('.btn-group').css('bottom', '0px');
});
$(document).ready(function () {
  $('#login').on('click', loginRequest);
  $('#clear').click(clearForm);
  $('#submit').click(signUpRequest);
  $('#password').blur(function () {
    var password = $('#password').val();

    if (password.length < 8) {
      error = true;
      $('#pass-bar').html('رمز عبور باید بیشتر از 8 حرف باشد.');
      $('#pass-bar').css('background', 'red');
    } else {
      error = false;
      $('#pass-bar').css('background', 'green');
      $('#pass-bar').html('');
    }
  });
  $('#repeat-password').blur(function () {
    var password = $('#password').val();
    var repeatPassword = $('#repeat-password').val();

    if (password !== repeatPassword) {
      error = true;
      $('#rpass-bar').html('عدم تطابق.');
      $('#rpass-bar').css('background', 'red');
    } else {
      error = false;
      $('#rpass-bar').css('background', 'green');
      $('#rpass-bar').html('');
    }
  });
  $("#phone-number").blur(function () {
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
  $("#phone-numberlogin").blur(function () {
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
  $("#mid").blur(function () {
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
  var userInformation = {
    phoneNumber: $('#phone-number').val(),
    password: $('#password').val(),
    expertise: $('#expertise').val(),
    mid: $('#mid').val()
  };
  $.ajax({
    type: 'POST',
    url: 'http://localhost',
    data: JSON.stringify(userInformation),
    success: function success(msg) {
      alert('wow' + msg);
    }
  });
}

function clearForm(e) {
  $('#signup')[0].reset();
}

function loginRequest() {
  var userInformation = {
    phoneNumber: $('#phone-numberlogin').val(),
    password: $('#password-login').val()
  };
  $.ajax({
    type: 'POST',
    url: 'http://localhost',
    data: JSON.stringify(userInformation),
    success: function success(msg) {
      alert('wow' + msg);
    }
  });
}