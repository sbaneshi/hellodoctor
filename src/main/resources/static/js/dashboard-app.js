//variables
$("#prescriptions"),
   $(" #notifications"),
$(" #financials"),
$(" #appointments"),
$("button .removeAll");




//eventlisteners
$(document).ready(function() {
    loadPrescriptions();
    loadFinancials();
    loadAppointments();
    $('#upload').on('change', function() {
        readURL(input);
    });




});
$(" #notifications").click( removeNotif());
//classes








//functions
function setPanel(){
    var PanelName='';
    var token=localStorage.getItem("token");

        var decode = (atob(token));
        var userInformation = decode.split(':');
        $('#nav-login').css("display","none");
        $('#nav-profile .btn').text(`${userInformation[2]}`);


}

function loadPrescriptions() {
    var Prescription = '';
    var html = '';

    $.ajax({

        header: {

        },
        type: 'GET',
        url: 'http://localhost:8080/getPrescriptions',
        success: function(data, msg) {
            if (msg) {
                // localStorage.setItem()
                Prescription = JSON.parse(data);
                html += `
                            <div class="table-responsive" >
                                <table class="table" style="text-align:right; ">
                                <thead class="text-info">
                                    <th>
                                    نام پزشک
                                    </th>
                                    <th>
                                    شهر
                                    </th>
                                    <th>
                                    تخصص
                                    </th>
                                    <th>
                                    تاریخ آپلود نسخه
                                    </th>
                                    
                                </thead>
                                < tbody >
                        `;
                Prescription.forEach(prescriptions => {
                        html += `
                        <tr>
                          <td>
                            ${data.DoctorName}
                          </td>
                          <td>
                            ${data.city}
                          </td>
                          <td>
                            ${data.DoctorExpertise}
                          </td>
                          <td class="text-right">
                            ${data.uploadDate}
                          </td>
                            <td>
                              <button type="button" class="btn btn-info btn-group-xs" style="border-radius:20px;">مشاهده نسخه</button>
                          </td>
                        </tr>
                        
                        `;
                        html += `
                                </tbody>
                            </table>
                         </div>
                         
                         `;

                    })
                    //saveToLocalStorage("myPrescriptions" , html)
                myPrescriptions.appendChild(html);

            } else {
                myPrescriptions.appendChild(document.createTextNode("هنوز نسخه ای برای شما آپلود نشده است"));
            }
        }
    })
}

function loadFinancials() {
    var Financial = '';
    var html = '';

    $.ajax({
        header: {

        },
        type: 'GET',
        url: 'http://localhost:8080/getFinancials',
        success: function(data, msg) {
            if (msg) {
                // localStorage.setItem()
                Prescription = JSON.parse(data);
                html += `
                            <div class=" table-full-width table-responsive"  >
                                <table class="table" style="text-align:right; direction:rtl;">
                                    <thead class=" text-info">
                                    <th>
                                        شناسه پرداخت
                                    </th>
                                    <th>
                                        نام پزشک
                                    </th>
                                    <th>
                                        تخصص
                                    </th>
                                    
                                    <th>
                                        تاریخ پرداخت
                                    </th>
                                    <th>
                                        مبلغ ویزیت
                                    </th>
                                    </thead>
                                    <tbody>
                        `;
                for (var i = 0; i < 4; i++) {
                    html += `
                        <tr>
                                <td>
                                ${data.payId}
                                </td>
                                <td>
                                ${data.DoctorName}
                                </td>
                                <td>
                                ${data.DoctorExpertise}
                                </td>
                                
                                <td>
                                ${data.payDate}
                                </td>
                                <td>
                                ${data.PayCost}
                                </td>
                                <td>
                                <button type="button" class="btn btn-info btn-group-xs " style="border-radius:20px;">جزئیات تراکنش</button>

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
                myFinancials.appendChild(html);

            } else {
                myFinancials.appendChild(document.createTextNode("شما هنوز تراکنشی نداشته اید"));
            }
        }
    })
}

function loadAppointments() {
    var Appointment = '';
    var html = '';

    $.ajax({
        header: {

        },
        type: 'GET',
        url: 'http://localhost:8080/getAppointments',
        success: function(data, msg) {
            if (msg) {
                Prescription = JSON.parse(data);
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
                            ${data.DoctorName}
                          </td>
                          <td>
                            ${data.city}
                          </td>
                          <td>
                            ${data.DoctorExpertise}
                          </td>
                          <td class="text-right">
                            ${data.appointmentDate}
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
                myPrescriptions.appendChild(html);

            } else {
                myPrescriptions.appendChild(document.createTextNode("هنوز نسخه ای برای شما آپلود نشده است"));
            }

        }



    })

}

function removeNotif(event) {
    if (event.target.classList.contains('ui-1_simple-remove')) {
        event.target.parentElement.parentElement.remove();
    };
    if (event.target.classList.contains('removeAll')) {
        const notifAreaBody = $("#notifArea");
        notifAreaBody.remove();
    };
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
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#imageResult')
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}



/*  ==========================================
    SHOW UPLOADED IMAGE NAME
* ========================================== */
var input = document.getElementById('upload');
var infoArea = document.getElementById('upload-label');

input.addEventListener('change', showFileName);

function showFileName(event) {
    var input = event.srcElement;
    var fileName = input.files[0].name;
    infoArea.textContent = 'File name: ' + fileName;
}








//requests