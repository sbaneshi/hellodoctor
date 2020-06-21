




//eventlisteners
$(document).ready(function() {
    setPanel();
    // loadPrescriptions();
    // loadFinancials();
    loadAppointments();





});
 $(" #notifications").click( removeNotif);
 $('.exitaccount').click(exitaccount);
//classes








//functions
function setPanel(){
    var token=localStorage.getItem("token");

        var decode = (atob(token));
        var userInformation = decode.split(':');
        console.log(userInformation)
    var settings = {
        type: "GET",
        headers: {
            "Authorization": "Basic " + btoa(userInformation[0] + ":" + userInformation[1])
        },
        url: "http://localhost:8080/api/patient/full",
        status: {
            200: function(response) {
                alert(response);
            }
        }
    };
    //  if (!error) {
    $.ajax(settings).done(function(response) {

        //  document.querySelector('#my-prof').firstChild.nextElementSibling.nextElementSibling.innerHTML=`<img src="${doctor.image}" class="my-circle" style="height:106px;width:106px" alt="Avatar">`
        $('.card-body .author h5').html(`<i class="fa fa-user" style="margin-left:10px;"></i>${response.firstName}`+" "+`${response.lastName}`);
        console.log(response)

    });



}

// function loadPrescriptions() {
//     var Prescription = '';
//     var html = '';
//
//     var token=localStorage.getItem("token");
//
//     var decode = (atob(token));
//     var userInformation = decode.split(':');
//
//         var settings = {
//             url: "http://localhost:8080//api/pateint/full",
//             method: "GET",
//             timeout: 100000,
//             cache:false,
//             header:{
//                 "Authorization" : "Basic " + btoa(userInformation[0]+ ":"+ userInformation[1])
//             },
//             status:{
//                 200:function (response) {
//                     alert(response);
//                 }
//             }
//         };
//         if (!error) {
//             $.ajax(settings).done(function (response) {
//
//
//                 // localStorage.setItem()
//                 Prescription = JSON.parse(data);
//                 html += `
//                             <div class="table-responsive" >
//                                 <table class="table" style="text-align:right; ">
//                                 <thead class="text-info">
//                                     <th>
//                                     نام پزشک
//                                     </th>
//                                     <th>
//                                     شهر
//                                     </th>
//                                     <th>
//                                     تخصص
//                                     </th>
//                                     <th>
//                                     تاریخ آپلود نسخه
//                                     </th>
//
//                                 </thead>
//                                 < tbody >
//                         `;
//                 Prescription.forEach(prescriptions => {
//                     html += `
//                         <tr>
//                           <td>
//                             ${response.visits.doctor.name}
//                           </td>
//                           <td>
//                             ${response.visits.doctor.city}
//                           </td>
//                           <td>
//                             ${response.visits.doctor.expertise}
//                           </td>
//                           <td class="text-right">
//                             ${response.visits.doctor.name}
//                           </td>
//                             <td>
//                               <button type="button" class="btn btn-info btn-group-xs" style="border-radius:20px;">مشاهده نسخه</button>
//                           </td>
//                         </tr>
//
//                         `;
//                     html += `
//                                 </tbody>
//                             </table>
//                          </div>
//
//                          `;
//
//                 })
//                 //saveToLocalStorage("myPrescriptions" , html)
//                 myPrescriptions.appendChild(html);
//             });
//         }
//              else {
//                 myPrescriptions.appendChild(document.createTextNode("هنوز نسخه ای برای شما آپلود نشده است"));
//             }
// };

// function loadFinancials() {
//     var Financial = '';
//     var html = '';
//
//     $.ajax({
//         header: {
//
//         },
//         type: 'GET',
//         url: 'http://localhost:8080/getFinancials',
//         success: function(data, msg) {
//             if (msg) {
//                 // localStorage.setItem()
//                 Prescription = JSON.parse(data);
//                 html += `
//                             <div class=" table-full-width table-responsive"  >
//                                 <table class="table" style="text-align:right; direction:rtl;">
//                                     <thead class=" text-info">
//                                     <th>
//                                         شناسه پرداخت
//                                     </th>
//                                     <th>
//                                         نام پزشک
//                                     </th>
//                                     <th>
//                                         تخصص
//                                     </th>
//
//                                     <th>
//                                         تاریخ پرداخت
//                                     </th>
//                                     <th>
//                                         مبلغ ویزیت
//                                     </th>
//                                     </thead>
//                                     <tbody>
//                         `;
//                 for (var i = 0; i < 4; i++) {
//                     html += `
//                         <tr>
//                                 <td>
//                                 ${data.payId}
//                                 </td>
//                                 <td>
//                                 ${data.DoctorName}
//                                 </td>
//                                 <td>
//                                 ${data.DoctorExpertise}
//                                 </td>
//
//                                 <td>
//                                 ${data.payDate}
//                                 </td>
//                                 <td>
//                                 ${data.PayCost}
//                                 </td>
//                                 <td>
//                                 <button type="button" class="btn btn-info btn-group-xs " style="border-radius:20px;">جزئیات تراکنش</button>
//
//                                 </td>
//                         </tr>
//
//                         `;
//                     html += `
//                                 </tbody>
//                             </table>
//                          </div>
//
//                          `;
//                 }
//                 //saveToLocalStorage("myPrescriptions" , html)
//                 myFinancials.appendChild(html);
//
//             } else {
//                 myFinancials.appendChild(document.createTextNode("شما هنوز تراکنشی نداشته اید"));
//             }
//         }
//     })
// }

function loadAppointments() {
    var html = '';

    var token = localStorage.getItem("token");
    console.log(token);
    var decode = (atob(token));
    var userInformation = decode.split(':');


    var settings = {

        type: "GET",
        headers: {
            "Authorization": "Basic " + btoa(userInformation[0]+":"+userInformation[1])
        },
        url: "http://localhost:8080/api/patient/full",
        status: {
            200: function (response) {
                alert(response);
            }
        }
    };
    //  if (!error) {
    $.ajax(settings).done(function (response) {
        var Appointment = response.visits;
        console.log(Appointment);
        if (Appointment) {
            html += `
                            <div class="table-responsive" >
                                <table class="table" style="text-align:right; direction:rtl;">
                                    <thead class=" text-info">
                                    <th>
                                        نام پزشک
                                    </th>
                                    <th>
                                        شهر
                                    </th>
                                    <th>
                                        تخصص
                                    </th>
                                    <th class="text-right">
                                        تاریخ اخذ نوبت
                                    </th>
                                    </thead>
                                    <tbody>
                        `;
            Appointment.forEach(function (appointment) {
                html += `
                        <tr>
                          <td>
                            ${appointment.doctor.name}
                          </td>
                          <td>
                            ${appointment.doctor.city}
                          </td>
                          <td>
                            ${appointment.doctor.expertise}
                          </td>
                          <td class="text-right">
                            ${appointment.doctor.name}
                          </td>
                            <td>
                              <button type="button" class="btn btn-info btn-group-xs" style="border-radius:20px;">لغو نوبت</button>
                          </td>
                        </tr>
                        
                        `;

            })
            html += `
                                </tbody>
                            </table>
                         </div>

                         `;

            //saveToLocalStorage("myPrescriptions" , html)
            $(" #appointments").append(html);
        } else {
            $(" #appointments p").append(document.createTextNode("شما هنو نوبتی رزرو نکرده اید"));
        }
    });
}
function removeNotif(event) {
    if (event.target.classList.contains('fa-times')) {
        event.target.parentElement.parentElement.remove();
        localStorage.removeItem("notif");
    };

}
function  exitaccount() {
    localStorage.clear();
    window.location="home.html";
}



function saveToLocalStorage(key, item) {
    let items = getFromLocalStorage(key);
    items.push(item);
    localStorage.setItem(key, JSON.stringify(items));
}

function getFromLocalStorage(key) {
    let items;
    if (localStorage.getItem(key) === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem(`${key}`));

    }
    return items;
}

//---------------------------------------------


//requests