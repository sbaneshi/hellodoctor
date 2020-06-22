let workDay = [];

$(document).ready(function () {
   reservertion();
   getTime();
   $("#submit").click(postRequest);
});


function reservertion() {
    var html = '';

    var token = localStorage.getItem("id");
    var decode = (atob(token));
    var userInformation = decode.split(':');


    var settings = {

        type: "GET",

        url: "http://localhost:8080/doctor/full_by_id",
        data:{
            id:1
        },
        statusCode: {
            200: function(response) {

            }
        }
    };
    //  if (!error) {
    $.ajax(settings).done(function(response) {
        console.log(response)
        $("#name").text("دکتر "+ response.firstName + " " + response.lastName);
        $("#city").text(response.city);
        $("#address").text(response.address);
        $("#bio").text(response.bio);
        $("#expertise").text(response.expertise);
        localStorage.setItem("geox", response.geoX);
        localStorage.setItem("geoy", response.geoY);
    })
}

function getTime(){
    let token = localStorage.getItem('token');
    let id = localStorage.getItem('id');
    var settings = {


        type: "GET",

        url: "http://localhost:8080/api/doctor/available_visit_times",
        headers: {
            "Authorization": "Basic "+ token
        },
        data:{
        id:id
    },
    statusCode: {
        200: function(response) {
            //console.log(response);
        },
        401:function () {
            alert('لطفا ابتدا به سایت وارد شوید.');
        }
    }
};
    $.ajax(settings).done(function(response) {
        let workTime = response;
        workTime.forEach(function (element) {
            var date = new Date(element * 1000);
            var tarikh = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay();
            tarikh = get_year_month_day(tarikh);
            tarikh = tarikh[0] + "/" + tarikh[1] + "/" + tarikh[2];
            var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            let myTime = get_hour_minute_second(time);
            let time1 = myTime[0] + ":" + myTime[1] ;
            let workTime = 'تاریخ: '+ tarikh +"      زمان:     "+time1;
            $("#select").append(`<option value="${element}"> 
                                       ${workTime} 
                                  </option>`);
        });
    });
}


function postRequest(){
    e.preventDefault();
    let token = localStorage.getItem('token');

    let id = localStorage.getItem('id');
    if(token !== null){
    var settings = {


        type: "GET",

        url: "http://localhost:8080/api/doctor/available_visit_times",
        headers: {
            "Authorization": "Basic "+ token
        },
        data:{
            id:id
        },
        statusCode: {
            200: function(response) {
                alert('نوبت شما با موفقیت ثبت شد.')
            },
            401:function () {
                alert('لطفا ابتدا به سایت وارد شوید.');
            }
        }
    };
    $.ajax(settings).done(function(response) {
        if (response === 'ok'){
            alert('نوبت شما با موفقیت ثبت شد.')
        }
    })
    }else {
        alert('لطفا ابتدا به سایت وارد شوید.')
    }

}

function div(a, b) {
    return parseInt((a / b));
}
function gregorian_to_jalali(g_y, g_m, g_d) {
    var g_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var j_days_in_month = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
    var jalali = [];
    var gy = g_y - 1600;
    var gm = g_m - 1;
    var gd = g_d - 1;

    var g_day_no = 365 * gy + div(gy + 3, 4) - div(gy + 99, 100) + div(gy + 399, 400);

    for (var i = 0; i < gm; ++i)
        g_day_no += g_days_in_month[i];
    if (gm > 1 && ((gy % 4 == 0 && gy % 100 != 0) || (gy % 400 == 0)))
    /* leap and after Feb */
        g_day_no++;
    g_day_no += gd;

    var j_day_no = g_day_no - 79;

    var j_np = div(j_day_no, 12053);
    /* 12053 = 365*33 + 32/4 */
    j_day_no = j_day_no % 12053;

    var jy = 979 + 33 * j_np + 4 * div(j_day_no, 1461);
    /* 1461 = 365*4 + 4/4 */

    j_day_no %= 1461;

    if (j_day_no >= 366) {
        jy += div(j_day_no - 1, 365);
        j_day_no = (j_day_no - 1) % 365;
    }
    for (var i = 0; i < 11 && j_day_no >= j_days_in_month[i]; ++i)
        j_day_no -= j_days_in_month[i];
    var jm = i + 1;
    var jd = j_day_no + 1;
    jalali[0] = jy;
    jalali[1] = jm;
    jalali[2] = jd;
    return jalali;
    //return jalali[0] + "_" + jalali[1] + "_" + jalali[2];
    //return jy + "/" + jm + "/" + jd;
}
function get_year_month_day(date) {
    var convertDate;
    var y = date.substr(0, 4);
    var m = date.substr(5, 2);
    var d = date.substr(8, 2);
    convertDate = gregorian_to_jalali(y, m, d);
    return convertDate;
}
function get_hour_minute_second(time) {
    var convertTime = [];
    convertTime[0] = time.substr(0, 2);
    convertTime[1] = time.substr(3, 2);
    convertTime[2] = time.substr(6, 2);
    return convertTime;
}
function convertDate(date) {
    var convertDateTime = get_year_month_day(date.substr(0, 10));
    convertDateTime = convertDateTime[0] + "/" + convertDateTime[1] + "/" + convertDateTime[2] + " " + date.substr(10);
    return convertDateTime;
}
function get_persian_month(month) {
    switch (month) {
        case 1:
            return "فروردین";
            break;
        case 2:
            return "اردیبهشت";
            break;
        case 3:
            return "خرداد";
            break;
        case 4:
            return "تیر";
            break;
        case 5:
            return "مرداد";
            break;
        case 6:
            return "شهریور";
            break;
        case 7:
            return "مهر";
            break;
        case 8:
            return "آبان";
            break;
        case 9:
            return "آذر";
            break;
        case 10:
            return "دی";
            break;
        case 11:
            return "بهمن";
            break;
        case 12:
            return "اسفند";
            break;
    }
}


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