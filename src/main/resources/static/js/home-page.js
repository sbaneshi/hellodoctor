
// external js: flickity.pkgd.js

let $carousel = $('#doctor-list').flickity({
    wrapAround:false,
    pageDots:true
});
var collapseBtn = document.getElementById("navBtn");
var nav = document.getElementById('nav');



$(document).ready( function(){



    collapseBtn.addEventListener('click', function(e) {
        nav.innerHTML = `
  <button id="navBtn" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
<i class="fa fa-bars text-white"></i>
</button>
<div>
  <a class="navbar-brand navbar-logo btn btn-info" href="#" style=" border-radius:20px; line-height:1;">ورود/ثبت نام</a>
  <a class="navbar-brand navbar-logo mr-auto" href="#">لوگوی دکتر سلام</a>

</div>

<div class="collapse navbar-collapse" id="navbarSupportedContent" style="z-index: 10000; background-color:#212121 ">
<ul class="navbar-nav ml-auto">
    <div class="hori-selector">
        <div class="left"></div>
        <div class="right"></div>
    </div>
    <li class="nav-item active">
        <a class="nav-link" href="javascript:void(0);">خانه</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="javascript:void(0);">رزرو نوبت</a>
    </li>

    <li class="nav-item">
        <a class="nav-link" href="javascript:void(0);">پزشکان</a>
    </li>

    <li>
        <a class="nav-link" href="javascript:void(0);">ارتباط با ما</a>
    </li>
</ul>
</div>
`;
    })
isLogin();
$("#logout").click(logout);
loadDoctor();
$('#nav-login').click(gotologin);

})
function gotologin(){
    window.location="index.html";
}

function isLogin(){
    let token=localStorage.getItem("token");

    if(token!==null) {
        let decode = (atob(token));
        let userInformation = decode.split(':');
         $('#nav-login').css("display","none");

            var settings = {
                url: "http://localhost:8080/api/patient/full",
                method: "GET",
                timeout: 100000,
                cache:false,
                headers: {
                    "Authorization": "Basic " + btoa(userInformation[0] + ":" + userInformation[1])
                }
            };

                $.ajax(settings).done(function (response) {
                    $('#UserName').html(response.firstName + " " + response.lastName);
                });

    }
    else{
        $('#nav-profile').css("display","none");
    }


}

function logout(e) {
    e.preventDefault();
    localStorage.clear();
    window.location.reload();
}

function loadDoctor() {
    var settings = {

        type: "GET",
        url: "http://localhost:8080/doctors",
        status:{
            200:function (response) {
                alert(response);
            }
        }
    };
    $.ajax(settings).done(function (response) {
        let html = '';
        let doctor=response;
        console.log(doctor)
        doctor.forEach(function(dr){
            html = `
                        <div class="card-container">
                        <span class="pro"><i class="fa fa-heartbeat" style="font-size:36px; color:white;"></i></span>
                        <img class="round" src="https://randomuser.me/api/portraits/men/41.jpg" alt="user" />
                        <h4><i class="fa fa-user-md" style="font-size:36px; margin-left:5px;"></i> دکتر ${dr.firstName} ${dr.lastName}</h4>

                        <h6>
                            <span class="fa fa-map-marker" style="padding:7px;  color:black">
                            ${dr.city}
                            </span>
                        </h6>

                        <div class="buttons">
                            <button value="${dr.id}" class="primary ghost hvr-float-shadow">
                        مشاهده
                    </button>
                        </div>
                        <div class="skills">
                            <h6>موارد تخصص</h6>
                            <ul>
                                <li>${dr.expertise}</li>
                            </ul>
                        </div>
                    </div>
                        `;
            $("#doctor-list").flickity('append', $(makeCellHtml(html)));

        });
        // $("#doctor-list").flickity({
        //     wrapAround: true,
        //     pageDots: false
        // });



        //saveToLocalStorage("myPrescriptions" , html)


    });
}

// external js: flickity.pkgd.js




function makeCellHtml(html) {
    return '<div>' + html + '</div>';
}


