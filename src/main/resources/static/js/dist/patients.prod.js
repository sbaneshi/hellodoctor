"use strict";var error=!1;function signUpRequest(r){var o={phoneNumber:$("#phone-number").val(),password:$("#password").val()};$.ajax({type:"POST",url:"http://localhost",data:JSON.stringify(o),success:function(r){alert("wow"+r)}})}function clearForm(r){$("#signup")[0].reset()}function loginRequest(){var r={phoneNumber:$("#phone-numberlogin").val(),password:$("#password-login").val()};$.ajax({type:"POST",url:"http://localhost",data:JSON.stringify(r),success:function(r){alert("wow"+r)}})}$(".toggle").on("click",function(){$(".container").stop().addClass("active"),$(".btn-group").css("bottom","15px")}),$(".close").on("click",function(){$(".container").stop().removeClass("active"),$(".btn-group").css("bottom","0px")}),$(document).ready(function(){$("#login").on("click",loginRequest),$("#clear").click(clearForm),$("#submit").click(signUpRequest),$("#password").blur(function(){$("#password").val().length<8?(error=!0,$("#pass-bar").html("رمز عبور باید بیشتر از 8 حرف باشد."),$("#pass-bar").css("background","red")):(error=!1,$("#pass-bar").css("background","green"),$("#pass-bar").html(""))}),$("#repeat-password").blur(function(){$("#password").val()!==$("#repeat-password").val()?(error=!0,$("#rpass-bar").html("عدم تطابق."),$("#rpass-bar").css("background","red")):(error=!1,$("#rpass-bar").css("background","green"),$("#rpass-bar").html(""))}),$("#phone-number").blur(function(){var r=$("#phone-number").val();/^(\+98|0098|98|0)?9\d{9}$/.test(r)?(error=!1,$("#phone-bar").css("background","green"),$("#phone-bar").html("")):(error=!0,$("#phone-bar").html("شماره تلفن را صحیح وارد کنید."),$("#phone-bar").css("background","red"))}),$("#phone-numberlogin").blur(function(){var r=$("#phone-numberlogin").val();/^(\+98|0098|98|0)?9\d{9}$/.test(r)?(error=!1,$("#ph-login-bar").css("background","green"),$("#ph-login-bar").html("")):(error=!0,$("#ph-login-bar").html("شماره تلفن را صحیح وارد کنید."),$("#ph-login-bar").css("background","red"))})});