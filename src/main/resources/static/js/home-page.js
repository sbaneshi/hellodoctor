$(document).ready(function(){

isLogin();
$("#logout").click(logout);
loadDoctor();


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
        console.log(doctor);
        // doctor.forEach(function(dr){
        //     html += `
        //                 <div class="card-container">
        //                 <span class="pro"><i class="fa fa-heartbeat" style="font-size:36px; color:white;"></i></span>
        //                 <img class="round" src="https://randomuser.me/api/portraits/women/79.jpg" alt="user" />
        //                 <h4><i class="fa fa-user-md" style="font-size:36px; margin-left:5px;"></i>دکتر +`${dr.firstName} ${dr.lastName}`</h4>
        //
        //                 <h6>
        //                     <span class="fa fa-map-marker" style="padding:7px;  color:black">
        //                     `${dr.city}`
        //                     </span>
        //                 </h6>
        //
        //                 <div class="buttons">
        //                     <button value="`${dr.id}`" class="primary ghost hvr-float-shadow">
        //                 مشاهده
        //             </button>
        //                 </div>
        //                 <div class="skills">
        //                     <h6>موارد تخصص</h6>
        //                     <ul>
        //                         <li>`${dr.experise}`</li>
        //                     </ul>
        //                 </div>
        //             </div>
        //
        //                 `;
        //
        // })


        //saveToLocalStorage("myPrescriptions" , html)
       // $(" #doctor-list").append(html);

    });
}