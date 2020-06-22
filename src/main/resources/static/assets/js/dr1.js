


loadpatients();
function loadpatients() {
    var html = '';

    var token = localStorage.getItem("token");
    console.log(token);
    var decode = (atob(token));
    var userInformation = decode.split(':');


    var settings = {

        type: "GET",
        headers: {
            "Authorization": "Basic " + btoa('1234:1234')
        },
        url: "http://localhost:8080/api/doctor/full",
        statusCode: {
            200: function(response) {

            }
        }
    };
    //  if (!error) {
    $.ajax(settings).done(function(response) {
        document.querySelector('#my-prof').firstChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText = `دکتر ${response.firstName} ` + `${response.lastName}`;
        document.querySelector('#my-prof').firstChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText = response.expertise;
        document.querySelector('#my-prof').firstChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText = `کدنظام پزشکی: ${response.maCode}`;
        document.querySelector('#mybio p').innerText = response.bio;
        document.querySelector('#doctor-address').innerText = response.address;
        localStorage.setItem('geox' ,response.geoX);
        localStorage.setItem('geoy',response.geoY);
        var Patients = response.visits;
        console.log(response);
        if (Patients.length !== 0) {
            html += `
                     <table  id="recentPatients">
                        <thead>
                          <tr>
                            <th>شماره تماس</th>
                            <th>نام</th>
                            <th>نام خانوادگی</th>
                            <th>تاریخ</th>
                            <th>نمایه</th> </th>
                          </tr>
                        </thead>
                      <tbody>
                        `;
            Patients.forEach(function(patient) {
                console.log(patient)
                html += `
                        <tr>
                          <td>${patient.email}</td>
                          <td>${ patient.firstName }</td>
                          <td>${ patient.lastName }</td>
                          <td>${ patient.Time }</td>
                          <td><button onclick="makethemodal(event)" type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal" data-backdrop="static" data-keyboard="false">
                            مشاهده
                          </button>
                        </td>
                        </tr>

                        `;

            })
            html += `
                                </tbody>
                            </table>

                         `;

            //saveToLocalStorage("myPrescriptions" , html)
            $(".mypatients").append(html);

        } else {console.log('opps')
            html="<p style='text-align: right;margin-right: 10px'>هنوز هیچ بیماری  نوبتی از شما اخذ نکرده است</p>";
            $('.mypatients').html(html);
        }
    });
}














var loader;

function loadNow(opacity) {
    if (opacity <= 0) {
        displayContent();
    } else {
        loader.style.opacity = opacity;
        window.setTimeout(function() {
            loadNow(opacity - 0.01);
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


//load data from json

function setPanel() {
    var settings = {
        type: "GET",
        headers: {
            "Authorization": "Basic " + btoa(userInformation[0] + ":" + userInformation[1])
        },
        url: "http://localhost:8080/api/doctor/full",
        status: {
            200: function(response) {

            }
        }
    };
    //  if (!error) {
    $.ajax(settings).done(function(response) {

        //  document.querySelector('#my-prof').firstChild.nextElementSibling.nextElementSibling.innerHTML=`<img src="${doctor.image}" class="my-circle" style="height:106px;width:106px" alt="Avatar">`
        document.querySelector('#my-prof').firstChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText = `دکتر ${response.firstName} ` + `${response.lastName}`;
        document.querySelector('#my-prof').firstChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText = response.city;
        document.querySelector('#my-prof').firstChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText = `کدنظام پزشکی: ${response.maCode}`;
        document.querySelector('#mybio p').innerText = response.biography;
        document.querySelector('.myoffice p').innerText = response.address;


    });

}



//setDay 
var radioBtn = document.querySelector('#radiobtn'),
    resignBtn = document.querySelector('#resignbtn');

radioBtn.addEventListener('change', function() {
    if (this.checked) {
        resignBtn.disabled = false;
        resignBtn.classList.remove('btn-outline-danger');
        resignBtn.classList.add('btn-danger');
    } else {
        resignBtn.disabled = true;
        resignBtn.classList.remove('btn-danger');
        resignBtn.classList.add('btn-outline-danger');
    }
})

//validate setday    

var start = document.getElementById('start-time');
var finish = document.getElementById('finish-time');
start.addEventListener('blur', print);
finish.addEventListener('blur', print2);

function print() {
    if (this.value.indexOf(':') != -1) {
        this.style.borderColor = 'green';
    } else {
        this.style.borderColor = 'red';
    };
}

function print2() {
    if (this.value.indexOf(':') != -1) {
        this.style.borderColor = 'green';
    } else {
        this.style.borderColor = 'red';
    };

    if (finish.value < start.value) {
        finish.style.borderColor = 'red';
    }
}

document.querySelector('#doctor-day').addEventListener('click', senddatatoserver);

function senddatatoserver(e) {
    e.preventDefault();
    if (start.value === "" || finish.valye === "") {
        alert("لطفا ساعات را پر کنید")
    } else if (start.value > finish.value) {
        alert("ساعت شروع نمیتواند دیر تر از ساعت پایان باشد")
    } else {
        var totalHour = (parseInt(finish.value.slice(0, 3)) * 60 + parseInt(finish.value.slice(3, 5))) - (parseInt(start.value.slice(0, 3)) * 60 + parseInt(start.value.slice(3, 5)));
        var totalPatient = (totalHour / parseInt(document.querySelector('#minute').value));
        var canReserve = totalPatient - parseInt(document.querySelector('#telephone-count').value);
        console.log(canReserve);
    }
}

//last patients
var modal = document.querySelector('#myModal .modal-body');

//
// myBtn.forEach(function (value) { value.addEventListener('click', makethemodal) } )

 function makethemodal (event) {

console.log(event);
    var name = event.path[2].firstElementChild.nextElementSibling.innerText;
    var family = event.path[2].firstElementChild.nextElementSibling.nextElementSibling.innerText;
    var date = event.path[2].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerText;
   var  phone = event.path[2].firstElementChild.innerText;
    // var div=document.createElement('div');
    // div.classList.add("row justify-content-center");
    var detail = document.createElement('div');
    detail.classList.add("card");
    detail.style.width = "300px";
    detail.style.display = "block";
    detail.style.textAlign = "center";
    detail.style.margin = "0 auto";
    detail.innerHTML = `<img src="assets/patient.jpg" style="width:300px; border-radius:100px;">
                            <hr style="width:70%; border-style:dotted ; margin: 0 auto;">
                            <p>نام: ${name}</p>
                            <p>نام خانوادگی : ${family}</p>
                            <p> تاریخ مراجعه: ${date} </p>
                            <p>شماره بیمار :${phone} </p>  
        
        `
    modal.appendChild(detail);
    // modal.appendChild(div);  
};

function deleteChild() {
    document.querySelector('.modal-body div').remove();
}



//clock picker 
jQuery('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>').insertAfter('.quantity input');

jQuery('.quantity').each(function() {

    var spinner = jQuery(this),

        input = spinner.find('input[type="number"]'),

        btnUp = spinner.find('.quantity-up'),

        btnDown = spinner.find('.quantity-down'),

        min = input.attr('min'),

        max = input.attr('max');

    btnUp.click(function() {

        var oldValue = parseFloat(input.val());

        if (oldValue >= max) {

            var newVal = oldValue;

        } else {

            var newVal = oldValue + 1;

        }

        spinner.find("input").val(newVal);

        spinner.find("input").trigger("change");

    });

    btnDown.click(function() {

        var oldValue = parseFloat(input.val());

        if (oldValue <= min) {

            var newVal = oldValue;

        } else {

            var newVal = oldValue - 1;

        }

        spinner.find("input").val(newVal);

        spinner.find("input").trigger("change");

    });

});

// mapp
// document.getElementById('doctor-address').innerText = doctor.address;

$(document).ready(function() {
    var app = new Mapp({
        element: '#app',
        presets: {
            latlng: {
                lat: 32,
                lng: 52,
            },
            zoom: 12
        },
        apiKey: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImMzODk4ZDZiMmM0NDdkMzI5NWJkZWFjYTU2YThmNzQzMWM0ZDg3NTgyZDM2MmM5M2RjZjIwYmMyNzk2MDRmMTljZDM3MjY5MzEzZjlmOWRkIn0.eyJhdWQiOiI5NTA2IiwianRpIjoiYzM4OThkNmIyYzQ0N2QzMjk1YmRlYWNhNTZhOGY3NDMxYzRkODc1ODJkMzYyYzkzZGNmMjBiYzI3OTYwNGYxOWNkMzcyNjkzMTNmOWY5ZGQiLCJpYXQiOjE1OTEzNTc2NzgsIm5iZiI6MTU5MTM1NzY3OCwiZXhwIjoxNTkzOTQ5Njc4LCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.D_Hap2gq3KMxHzCmwIqTdOg_LJpVzXV6vaaMYVVCc3jcNyGJuKphl7sKsbth2ssE8TjdiWUYpRwPluCGs2pAS8no0zJd9PXS1tb_D1Ds6KtUUDeABfB8NCl4PaPJk4AEOfjZu2bUER3YmMBlS9PAAKZrA7sr2VGxHadZDJaHKWOs7VC_Ua0hirvAQNfmoZqIrX7lL6RZ45ffcxup1DSeYprHPdEOqt6868qi2_tyKzzAcXipMT7bE_RB338LIFw6SSkXve76g-IBen06gSUOK_183L5LREAqIIYoYsOFr9x8YnbASjvnFs504kzjzFD_hjrLZlO4iOl9MLDGyOnefw'
    });
    app.addLayers();
    app.addMarker({
        name: 'basic-marker',
        latlng: {
            lat: localStorage.getItem('geox'),
            lng: localStorage.getItem('geoy'),
        },
        popup: {
            title: {
                html: 'Basic Marker Title',
            },
            description: {
                html: 'Basic marker description',
            },
            open: true,
        },
    });
});
//     var app = new Mapp({
//         element: '#app',
//         presets: {
//             latlng: {
//                 lat: 32,
//                 lng: 52,
//             },
//             zoom: 12
//         },
//         i18n: {
//             fa: {
//                 'marker-title': 'مطب شما',
//                 'marker-description': 'بروی نقشه',
//             },
//             en: {
//                 'marker-title': 'helloo',
//                 'marker-description': doctor.address,
//             },
//         },
//         locale: 'en',
//         apiKey: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImMzODk4ZDZiMmM0NDdkMzI5NWJkZWFjYTU2YThmNzQzMWM0ZDg3NTgyZDM2MmM5M2RjZjIwYmMyNzk2MDRmMTljZDM3MjY5MzEzZjlmOWRkIn0.eyJhdWQiOiI5NTA2IiwianRpIjoiYzM4OThkNmIyYzQ0N2QzMjk1YmRlYWNhNTZhOGY3NDMxYzRkODc1ODJkMzYyYzkzZGNmMjBiYzI3OTYwNGYxOWNkMzcyNjkzMTNmOWY5ZGQiLCJpYXQiOjE1OTEzNTc2NzgsIm5iZiI6MTU5MTM1NzY3OCwiZXhwIjoxNTkzOTQ5Njc4LCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.D_Hap2gq3KMxHzCmwIqTdOg_LJpVzXV6vaaMYVVCc3jcNyGJuKphl7sKsbth2ssE8TjdiWUYpRwPluCGs2pAS8no0zJd9PXS1tb_D1Ds6KtUUDeABfB8NCl4PaPJk4AEOfjZu2bUER3YmMBlS9PAAKZrA7sr2VGxHadZDJaHKWOs7VC_Ua0hirvAQNfmoZqIrX7lL6RZ45ffcxup1DSeYprHPdEOqt6868qi2_tyKzzAcXipMT7bE_RB338LIFw6SSkXve76g-IBen06gSUOK_183L5LREAqIIYoYsOFr9x8YnbASjvnFs504kzjzFD_hjrLZlO4iOl9MLDGyOnefw'
//
//     });
//     app.addLayers();
//     var marker = app.addMarker({
//         name: 'advanced-marker',
//         latlng: {
//             lat: mylat,
//             lng: mylng
//         },
//         icon: app.icons.red,
//         popup: {
//             title: {
//                 i18n: 'marker-title',
//             },
//             description: {
//                 i18n: 'marker-description',
//             },
//             // custom: 'Custom popup',
//             class: 'marker-class',
//             open: true,
//         },
//         pan: true,
//         draggable: true,
//         history: false,
//         on: {
//             click: function() {
//                 console.log(marker._latlng);
//             },
//             contextmenu: function() {
//                 console.log('Contextmenu callback');
//             },
//         },
//     });
// });
