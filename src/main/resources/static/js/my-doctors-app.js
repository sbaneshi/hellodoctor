$(document).ready(function() {
    setPanel();
    // var app = new Mapp({
    //     element: '#app',
    //     presets: {
    //         latlng: {
    //             lat: 32,
    //             lng: 52,
    //         },
    //         zoom: 6,
    //     },
    //     apiKey: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjM2Yzc4ZjlhNjJhOTY4ZTA0ZGNjMzM1ZjRhZDUyNWI2N2UyZDRlMGVhMDBmZThkYWQyNjQ2YjVkNTZlYzU4YTZmYmI3NDM1MDQzZjAxNzBkIn0.eyJhdWQiOiI5NzQ3IiwianRpIjoiMzZjNzhmOWE2MmE5NjhlMDRkY2MzMzVmNGFkNTI1YjY3ZTJkNGUwZWEwMGZlOGRhZDI2NDZiNWQ1NmVjNThhNmZiYjc0MzUwNDNmMDE3MGQiLCJpYXQiOjE1OTI2NDMyNjQsIm5iZiI6MTU5MjY0MzI2NCwiZXhwIjoxNTk1MjM1MjY0LCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.F0av3yZI6AilPjdukWNTbgH5ffiCBF6nws7xsCq1G4hHfb_mZ7Cl3kQdB5kSM9NnqDOyUx3O5-g1JlIlqkyRcUuaRU9RQg560OLfatlBmDhedrc-XuGhMuSx2ixXXbYClFS0g-oPcYWb6kD1cUjrJRTJYh_VCo5q4Z8FNUtEo-Fxj6waLoY3uI1RsxvplTvWSwiehiEBEWbx41qCnXgG8NR6Or3FXAjcYiZWJsrzcuMTOl43aFjONgPqJZDYu0-kDTqgyoBvEAWnn_cROfVcGwSw3UJuAxQm_LYjtqHhOdYUgrzijoeyS5j4vYU2RtRfgnDHYmddp7Ahx_j8SfP1hQ'
    // });
    // app.addLayers();




});
$('.exitaccount').click(exitaccount);

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

function loadAppointments() {
    var html = '';

    var token = localStorage.getItem("token");

    var decode = (atob(token));
    var userInformation = decode.split(':');

    var settings = {
        url: "http://localhost:8080//api/pateint/full",
        method: "GET",
        timeout: 100000,
        cache: false,
        headers: {
            "Authorization": "Basic " + btoa(userInformation[0] + ":" + userInformation[1])
        },
        status: {
            200: function(response) {
                alert(response);
            }
        }
    };
    $.ajax(settings).done(function(response) {
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
            Appointment.forEach(function(appointment) {
                html += `
                        <tr>
                          <td>
                            ${response.visits.doctor.name}
                          </td>
                          <td>
                            ${response.visits.doctor.city}
                          </td>
                          <td>
                            ${response.visits.doctor.expertise}
                          </td>
                          <td class="text-right">
                            ${response.visits.time}
                          </td>

                        </tr>

                        `;
            })
            html += `
                                </tbody>
                            </table>
                         </div>

                         `;

            $(" #appointments").append(html);


        } else {
            $(" #appointments p").append(document.createTextNode("شما هنوز پزشکی را ملاقات نکرده اید"));
        }
    });
}
function  exitaccount() {
    localStorage.clear();
    window.location="home.html";
}
