$(document).ready(function () {
setPanel();




})
function setPanel(){
    var token=localStorage.getItem("token");

    var decode = (atob(token));
    var userInformation = decode.split(':');
    $('.card-body .author h5').html(`<i class="fa fa-user" style="margin-left:10px;"></i>${userInformation[2]}`);


}
function loadAppointments() {
    var html = '';

    var token=localStorage.getItem("token");

    var decode = (atob(token));
    var userInformation = decode.split(':');

    var settings = {
        url: "http://localhost:8080//api/pateint/full",
        method: "GET",
        timeout: 100000,
        cache:false,
        header:{
            "Authorization" : "Basic " + btoa(userInformation[0]+ ":"+ userInformation[1])
        },
        status:{
            200:function (response) {
                alert(response);
            }
        }
    };
    if (!error) {
        $.ajax(settings).done(function (response) {

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
            for (var i = 0; i < 4; i++) {
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
                html += `
                                </tbody>
                            </table>
                         </div>
                         
                         `;
            }
            //saveToLocalStorage("myPrescriptions" , html)
            $(" #appointments").append(html);

        });
    }
    else {
        $(" #appointments").append(document.createTextNode("هنوز نسخه ای برای شما آپلود نشده است"));
    }
};









