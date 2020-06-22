var state = document.getElementById('state');
var stateCategory = document.getElementById('state-category');
var expertise = document.getElementById('expertise');
var expertiseCategory = document.getElementById('expertise-category');
let stateItem = [];
let expertiseItem = [];
const st = $('#st');

const doctorList = $('#doctor-list');


$(document).ready(() => {

    doctorList.click(bookAppointment);
    isLogin();
    if(!hasExpertise() && !hasState()){
        loadDoctor();
    }
    if(hasExpertise() && hasState()){
        let expertise = localStorage.getItem("expertise");
        let state = localStorage.getItem("province");
        $('#province option').each(function () {
            if ($(this).text() == state) {
                this.selected = true;
                return;
            } });
        $('#expertiseSelect').val(expertise);
        loadDoctorByBoth(expertise, state);
    }
    if(hasState() && !hasExpertise()){
        let state = localStorage.getItem("province");
        $('#province option').each(function () {
            if ($(this).text() == state) {
                this.selected = true;
                return;
            } });
        loadDoctorByProvince(state);
    }
    if(!hasState() && hasExpertise()){
        let expertise = localStorage.getItem("expertise");
        $('#expertiseSelect').val(expertise);
        loadDoctorbyExpertise(expertise);
    }
    $(window).resize(function() {

        if ($(this).width() < 760) {

            $('.search').show();

        } else {

            $('.search').hide();

        }

    });

    $("#logout").click(logout);
})

function isLogin(){
    let token=localStorage.getItem("token");

    if(token!==null) {
        let decode = (atob(token));
        let userInformation = decode.split(':');
        $('#nav-login').css("display","none");

    }
    else{
        $('#nav-profile').css("display","none");
    }


}

function bookAppointment(e) {
    e.preventDefault();
    if(e.target.classList.contains('btn')){
        let id = e.target.id;
        console.log(id);
        localStorage.setItem('id', id);
        window.location = '';
    }
}

function logout(e) {
    e.preventDefault();
    localStorage.clear();
    window.location.reload();
}
function hasExpertise() {
    let expertise = localStorage.getItem("expertise");
    if(expertise === null)
        return false;
    else
        return true;
}

function hasState() {
    let state = localStorage.getItem("province");
    if(state === null)
        return false;
    else
        return true;
}
function loadDoctor() {
    var settings = {

        type: "GET",
        url: "http://localhost:8080/doctors",
        statusCode:{
            200:function (response) {
            }
        }
    };
    $.ajax(settings).done(function (response) {
        let html = '';
        let doctor = response;
        console.log(doctor);
        console.log(doctor.length )
        if(doctor.length === 0){
            html = `<h2 class="text-center">دکتری یافت نشد</h2>`;
            $("#doctor-list").append(html)
        }else {
            doctor.forEach(dr => {
                html = `<div  class="arrow card mb-3 " style="transition: top ease 0.5s;">
                        <div class="row no-gutters align-items-center">

                            <a class="col-3 col-md-3 text-center">
                                <img src="https://randomuser.me/api/portraits/men/41.jpg" class="card-img rounded-circle img-fluid img-card img-responsive" data-holder-rendered="true" alt="100x100" ;>
                            </a>
                            <div class=" col-9 col-md-9 ">
                                <div class="card-body ">
                                    <h5 class="card-title "><i class="fa fa-user-md" style="font-size: 36px; margin-left: 5px; color: black;"></i>دکتر ${dr.firstName} ${dr.lastName}</h5>
                                    <p class="card-text ">تخصص: ${dr.expertise}</p>
                                    <p class="card-text ">استان: ${dr.state}</p>
                                </div>

                            </div>

                        </div>
                        <div id="" class="row no-gutters skill">

                            <div class="col-12">
                                <button id="${dr.id}" type="button" class="btn btn-outline-primary float-left mt-2 ml-3 top" style="margin-bottom: 5px; border: 2px solid #007bff;">نوبت دهی</button>
                            </div>
                        </div>
                    </div>
                    `;
                $("#doctor-list").append(html);
            });
        }
    });

}

function loadDoctorByBoth(expertise, province) {
    var settings = {

        type: "GET",
        url: "http://localhost:8080/doctors",
        data: {
            expertise: expertise,
            city : province
        },
        status:{
            200:function (response) {
            }
        }
    };
    $.ajax(settings).done(function (response) {
        let html = '';
        let doctor = response;
        if(doctor.length === 0){
            html = `<div class="text-center">دکتری یافت نشد</div>`;
            $("doctor-list").append(html)
        }else {
            doctor.forEach(dr => {
                html = `<div  class="arrow card mb-3 " style="transition: top ease 0.5s;">
                        <div class="row no-gutters align-items-center">

                            <a class="col-3 col-md-3 text-center">
                                <img src="https://randomuser.me/api/portraits/men/41.jpg" class="card-img rounded-circle img-fluid img-card img-responsive" data-holder-rendered="true" alt="100x100" ;>
                            </a>
                            <div class=" col-9 col-md-9 ">
                                <div class="card-body ">
                                    <h5 class="card-title ">دکتر ${dr.firstName} ${dr.lastName}</h5>
                                    <p class="card-text ">تخصص: ${dr.expertise}</p>
                                    <p class="card-text ">استان: ${dr.state}</p>
                                </div>

                            </div>

                        </div>
                        <hr>
                        <div id="" class="row no-gutters">

                            <div class="col-12">
                                <button id="${dr.id}" type="button" class="btn btn-outline-primary float-left mb-3 ml-3 top">نوبت دهی</button>
                            </div>
                        </div>
                    </div>
                    `;
                $("#doctor-list").append(html);
            });
        }
    });

}

function loadDoctorByProvince(province) {
    var settings = {

        type: "GET",
        url: "http://localhost:8080/doctors",
        data:{
            city: province
        },
        status:{
            200:function (response) {
            }
        }
    };
    $.ajax(settings).done(function (response) {
        let html = '';
        let doctor = response;
        if(doctor.length === 0){
            html = `<div class="text-center">دکتری یافت نشد</div>`;
            $("doctor-list").append(html)
        }else {
            doctor.forEach(dr => {
                html = `<div  class="arrow card mb-3 " style="transition: top ease 0.5s;">
                        <div class="row no-gutters align-items-center">

                            <a class="col-3 col-md-3 text-center">
                                <img src="https://randomuser.me/api/portraits/men/41.jpg" class="card-img rounded-circle img-fluid img-card img-responsive" data-holder-rendered="true" alt="100x100" ;>
                            </a>
                            <div class=" col-9 col-md-9 ">
                                <div class="card-body ">
                                    <h5 class="card-title ">دکتر ${dr.firstName} ${dr.lastName}</h5>
                                    <p class="card-text ">تخصص: ${dr.expertise}</p>
                                    <p class="card-text ">استان: ${dr.state}</p>
                                </div>

                            </div>

                        </div>
                        <hr>
                        <div id="" class="row no-gutters">

                            <div class="col-12">
                                <button id="${dr.id}" type="button" class="btn btn-outline-primary float-left mb-3 ml-3 top">نوبت دهی</button>
                            </div>
                        </div>
                    </div>
                    `;
                $("#doctor-list").append(html);
            });
        }
    });

}


function loadDoctorbyExpertise(expertise) {
    var settings = {
        type: "GET",
        url: "http://localhost:8080/doctors",
        data:{
            expertise: expertise
        },
        status:{
            200:function (response) {
            }
        }
    };
    $.ajax(settings).done(function (response) {
        let html = '';
        let doctor = response;
        if(doctor.length === 0){
            html = `<div class="text-center">دکتری یافت نشد</div>`;
            $("doctor-list").append(html)
        }else {
            doctor.forEach(dr => {
                html = `<div  class="arrow card mb-3 " style="transition: top ease 0.5s;">
                        <div class="row no-gutters align-items-center">

                            <a class="col-3 col-md-3 text-center">
                                <img src="https://randomuser.me/api/portraits/men/41.jpg" class="card-img rounded-circle img-fluid img-card img-responsive" data-holder-rendered="true" alt="100x100" ;>
                            </a>
                            <div class=" col-9 col-md-9 ">
                                <div class="card-body ">
                                    <h5 class="card-title ">دکتر ${dr.firstName} ${dr.lastName}</h5>
                                    <p class="card-text ">تخصص: ${dr.expertise}</p>
                                    <p class="card-text ">استان: ${dr.state}</p>
                                </div>

                            </div>

                        </div>
                        <hr>
                        <div id="" class="row no-gutters">

                            <div class="col-12">
                                <button id="${dr.id}" type="button" class="btn btn-outline-primary float-left mb-3 ml-3 top">نوبت دهی</button>
                            </div>
                        </div>
                    </div>
                    `;
                $("#doctor-list").append(html);
            });
        }
    });

}



var collapseBtn = document.getElementById("navBtn");
var nav = document.getElementById('nav');

collapseBtn.addEventListener('click', function(e) {
    e.preventDefault();
    nav.innerHTML = `
  <button id="navBtn" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
<i class="fa fa-bars text-white"></i>
</button>
<div>
  <a class="navbar-brand navbar-logo btn btn-info" href="#" style=" border-radius:20px; line-height:1;">ورود/ثبت نام</a>
  <a class="navbar-brand navbar-logo mr-auto" href="#">لوگوی دکتر سلام</a>

</div>

<div class="collapse navbar-collapse" id="navbarSupportedContent" style="z-index: 11111; background-color: #212121">
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

function changeExpertise() {
    let expertise = $("#expertiseSelect option:selected").val();
    if (expertise == 0){
        localStorage.removeItem('expertise');
        location.reload();
    }else {
    localStorage.setItem("expertise", expertise);
    location.reload();
    }
}

function changeProvince() {
    let province = $( "#province option:selected" ).text();
    if (province == 'انتخاب استان'){
        localStorage.removeItem('province');
        location.reload()
    }else {
        localStorage.setItem("province", province);
        location.reload();
    }

    // if (stateItem.length !== 0) {
    //     stateItem.forEach(element => {
    //     var settings = {
    //
    //         type: "GET",
    //         url: "http://localhost:8080/doctors",
    //         data:{
    //             state: element
    //         },
    //         status:{
    //             200:function (response) {
    //                 alert(response);
    //             }
    //         }
    //     };
    //     $.ajax(settings).done(function (response) {
    //         let html = '';
    //         let doctor = response;
    //         if(doctor.length === 0){
    //             html = `<div class="text-center">دکتری یافت نشد</div>`;
    //             $("doctor-list").append(html)
    //         }else {
    //             doctor.forEach(dr => {
    //                 html = `<div  class="arrow card mb-3 " style="transition: top ease 0.5s;">
    //                     <div class="row no-gutters align-items-center">
    //
    //                         <a class="col-3 col-md-3 text-center">
    //                             <img src="https://randomuser.me/api/portraits/men/41.jpg" class="card-img rounded-circle img-fluid img-card img-responsive" data-holder-rendered="true" alt="100x100" ;>
    //                         </a>
    //                         <div class=" col-9 col-md-9 ">
    //                             <div class="card-body ">
    //                                 <h5 class="card-title ">دکتر ${dr.firstName} ${dr.lastName}</h5>
    //                                 <p class="card-text ">تخصص: ${dr.expertise}</p>
    //                                 <p class="card-text ">استان: ${dr.state}</p>
    //                             </div>
    //
    //                         </div>
    //
    //                     </div>
    //                     <hr>
    //                     <div id="" class="row no-gutters">
    //
    //                         <div class="col-12">
    //                             <button id="${dr.id}" type="button" class="btn btn-outline-primary float-left mb-3 ml-3 top">نوبت دهی</button>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 `;
    //                 $("#doctor-list").append(html);
    //             });
    //         }
    //     });
    //     })
    // }



}




state.addEventListener('click', function(e) {
    e.preventDefault();
    $("#state-category").slideToggle();
})

expertise.addEventListener('click', function(e) {
    e.preventDefault();
    $("#expertise-category").slideToggle();

})