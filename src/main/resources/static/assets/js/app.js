let workTime = [];
$('#myModal0 .evening-checkbox').change(function(){
  $("#myModal0 .evening .row").slideToggle();
  });
  $('#myModal0 .afternoon-checkbox').change(function(){
    $("#myModal0 .afternoon .row").slideToggle();
    });

$('#myModal1 .evening-checkbox').change(function(){
  $("#myModal1 .evening .row").slideToggle();
  });
  $('#myModal1 .afternoon-checkbox').change(function(){
    $("#myModal1 .afternoon .row").slideToggle();
    });

$('#myModal2 .evening-checkbox').change(function(){
  $("#myModal2 .evening .row").slideToggle();
  });
  $('#myModal2 .afternoon-checkbox').change(function(){
    $("#myModal2 .afternoon .row").slideToggle();
    });

$('#myModal3 .evening-checkbox').change(function(){
  $("#myModal3 .evening .row").slideToggle();
  });
  $('#myModal3 .afternoon-checkbox').change(function(){
    $("#myModal3 .afternoon .row").slideToggle();
    });

$('#myModal4 .evening-checkbox').change(function(){
  $("#myModal4 .evening .row").slideToggle();
  });
  $('#myModal4 .afternoon-checkbox').change(function(){
    $("#myModal4 .afternoon .row").slideToggle();
    })
$('#myModal5 .evening-checkbox').change(function(){
  $("#myModal5 .evening .row").slideToggle();
  });
  $('#myModal5 .afternoon-checkbox').change(function(){
    $("#myModal5 .afternoon .row").slideToggle();
    });

$('#myModal6 .evening-checkbox').change(function(){
  $("#myModal6 .evening .row").slideToggle();
  });
  $('#myModal6 .afternoon-checkbox').change(function(){
    $("#myModal6 .afternoon .row").slideToggle();
    });

// change hour 
document.querySelectorAll('.choice').forEach(element=> {element.addEventListener('click' , ()=>{
  if(element.classList.contains('active')){
    element.nextElementSibling.disabled=true;
    var val=(element.firstElementChild.value);
    console.log(workTime.length);
    // workTime.forEach((element1,index) =>{
    //   if(element1.dayOfWeek === val.toUpperCase() && workTime[index + 1].dayOfWeek ===  val.toUpperCase()){
    //     workTime.splice(index,2);
    //     console.log('hey')
    //     // console.log(workTime);
    //   }else if(element1.dayOfWeek === val.toUpperCase()){
    //     workTime.splice(index,1);
    //   }
      
    //  });
    workTime = workTime.filter(function (work, index) {
        return work.dayOfWeek !== val.toUpperCase();
    });
     console.log(workTime);
}

else{
  element.nextElementSibling.disabled=false;
}
});
});
document.querySelectorAll('.setday').forEach(element =>{ element.addEventListener('click' , validateTime )})
//

function validateTime(e){
  var day= e.path[2].firstElementChild.id;
 var btn=e.path[0];
    var error=false;
   var evening=(e.path[2].firstElementChild.nextElementSibling.firstElementChild );
   var afternoon=e.path[2].firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling;
   var afternoonCheckbox=afternoon.firstElementChild.nextElementSibling;
   var eveningCheckbox = evening.firstElementChild.nextElementSibling;
   var startEvening=evening.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild;
   var endEvening=evening.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild;
  var startAfternoon=afternoon.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild;
  var endAfternoon=afternoon.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild;
  
   if(eveningCheckbox.checked)
   {
 
     if(parseInt(startEvening.value) >= parseInt(endEvening.value) ){
      btn.removeAttribute("data-dismiss");
       alert('ساعت اتمام نمیتواند زودتر از ساعت شروع باشد')
     }
     else{
      btn.setAttribute("data-dismiss", "modal")
       let today = {
         start24 : parseInt(startEvening.value),
         end24 : parseInt(endEvening.value),
         dayOfWeek : day.toUpperCase()
       };
       let error = false;
       workTime.forEach((element, index) => {
         if( element.dayOfWeek === day.toUpperCase() && (element.end24 < 16 && parseInt(endEvening.value) < 16)){
            
            today = {
              start24 : parseInt(startEvening.value),
              end24 : parseInt(endEvening.value),
              dayOfWeek : day.toUpperCase()
            };
            workTime.splice(index,1,today);
            error = true;
         }
       });
       if(!error){
        btn.setAttribute("data-dismiss", "modal");
         workTime.push(today);
         console.log('1');
       }
     }
     
   }else{
     workTime.forEach((element,index)=>{
       if(element.dayOfWeek==day.toUpperCase() && element.end24 < 16){
        workTime.splice(index,1)
       }
     }

     )

   }
   if(afternoonCheckbox.checked)
   {
 
     if(parseInt(startAfternoon.value) >= parseInt(endAfternoon.value) ){
      btn.removeAttribute("data-dismiss");
      alert('ساعت اتمام نمیتواند زودتر از ساعت شروع باشد')
     }else{  btn.setAttribute("data-dismiss", "modal")
      let today = {
        start24 : parseInt(startAfternoon.value),
        end24 : parseInt(endAfternoon.value),
        dayOfWeek : day.toUpperCase()
      };
      let error1 = false;
      workTime.forEach((element, index) => {
        if(element.dayOfWeek === day.toUpperCase() && (14 <element.end24 && element.end24 < 25 && 14< parseInt(endAfternoon.value) && parseInt(endAfternoon.value) < 25)){
           
           today = {
             start24 : parseInt(startAfternoon.value),
             end24 : parseInt(endAfternoon.value),
             dayOfWeek : day.toUpperCase()
           };
           workTime.splice(index,1,today);
           error1 = true;
        }
      });
      if(!error1){
        
        workTime.push(today);
        console.log('qqq');
      }
    }
   }else{
    workTime.forEach((element,index)=>{
      if(element.dayOfWeek==day.toUpperCase() && element.start24 >= 14){
       workTime.splice(index,1)
      }
    }

    )

  }
   console.log(workTime);
  }

 

  



var mylat;
var mylng;


$(document).ready(function() {
    var app = new Mapp({
      element: '#app',
      presets: {
        latlng: {
          lat: 32,
          lng: 52,
        },
        zoom: 15
      },
      i18n: {
        fa: {
          'marker-title': 'عنوان',
          'marker-description': 'برای تایید موقعیت برروی مارکر کلیک کنید',
        },
      },
      locale: 'fa',
        apiKey: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImMzODk4ZDZiMmM0NDdkMzI5NWJkZWFjYTU2YThmNzQzMWM0ZDg3NTgyZDM2MmM5M2RjZjIwYmMyNzk2MDRmMTljZDM3MjY5MzEzZjlmOWRkIn0.eyJhdWQiOiI5NTA2IiwianRpIjoiYzM4OThkNmIyYzQ0N2QzMjk1YmRlYWNhNTZhOGY3NDMxYzRkODc1ODJkMzYyYzkzZGNmMjBiYzI3OTYwNGYxOWNkMzcyNjkzMTNmOWY5ZGQiLCJpYXQiOjE1OTEzNTc2NzgsIm5iZiI6MTU5MTM1NzY3OCwiZXhwIjoxNTkzOTQ5Njc4LCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.D_Hap2gq3KMxHzCmwIqTdOg_LJpVzXV6vaaMYVVCc3jcNyGJuKphl7sKsbth2ssE8TjdiWUYpRwPluCGs2pAS8no0zJd9PXS1tb_D1Ds6KtUUDeABfB8NCl4PaPJk4AEOfjZu2bUER3YmMBlS9PAAKZrA7sr2VGxHadZDJaHKWOs7VC_Ua0hirvAQNfmoZqIrX7lL6RZ45ffcxup1DSeYprHPdEOqt6868qi2_tyKzzAcXipMT7bE_RB338LIFw6SSkXve76g-IBen06gSUOK_183L5LREAqIIYoYsOFr9x8YnbASjvnFs504kzjzFD_hjrLZlO4iOl9MLDGyOnefw'
       
    });
    app.addLayers();
    app.addGeolocation({
      history: true,
      onLoad: true,
      onLoadCallback: function(){
          console.log(app.states.user.latlng);
      },
  });

    var marker = app.addMarker({
      name: 'advanced-marker',
      latlng: {
        lat: 32.648625783736726,
        lng: 51.64672851562501
      },
      icon: app.icons.red,
      popup: {
        title: {
          i18n: 'marker-title',
        },
        description: {
          i18n: 'marker-description',
        },
        // custom: 'Custom popup',
        class: 'marker-class',
        open: true,
      },
      pan: true,
      draggable: true,
      history: false,
      on: {
        click: function() {
          mylat=marker._latlng.lat;
          mylng=marker._latlng.lng;
        },
        contextmenu: function() {
          console.log('Contextmenu callback');
        },
      },
    });
   
  });
     document.querySelector('#submit').addEventListener('click' ,validateAddress)


     function validateAddress(e) {
         e.preventDefault();
         let error = false;
         var ostan = document.querySelector('#province');
         var shahr = document.querySelector('#city');
         var loc = document.querySelector('#loc');
         if (shahr.value == 0 && ostan.value == 0 && loc.value == "") {
             error = true
             ostan.previousElementSibling.style.color = "red";
             shahr.previousElementSibling.style.color = "red";
             loc.previousElementSibling.style.color = "red";
         }
         else if (shahr.value == 0 && loc.value == "") {
             error = true;
             shahr.previousElementSibling.style.color = "red";
             loc.previousElementSibling.style.color = "red";
             ostan.previousElementSibling.style.color = '#AAAAAA';
         }
         else if (loc.value == "") {
             error = true;
             loc.previousElementSibling.style.color = "red";
             ostan.previousElementSibling.style.color = '#AAAAAA';
             shahr.previousElementSibling.style.color = '#AAAAAA';
         }

         else {
             error = false;
             loc.previousElementSibling.style.color = '#AAAAAA';
             ostan.previousElementSibling.style.color = '#AAAAAA';
             shahr.previousElementSibling.style.color = '#AAAAAA';
         }
         if (workTime.length == 0) {
             alert("لطفا ساعات حضور در مطب را وارد کنید")
             error = true;
         }
         if (!error) {
             let doctorInf = {
                 phoneNumber: "5678",
                 firstName: document.querySelector('#name').value,
                 lastName: document.querySelector('#family').value,
                 email: document.querySelector('#email').value,
                 bio:document.querySelector('#bio').value,
                 province: ostan.options[ostan.selectedIndex].text,
                 city: shahr.options[shahr.selectedIndex].text,
                 address: document.querySelector('#loc').value,
                 geoX: mylat,
                 geoY: mylng
             };

let head=localStorage.getItem('token');
             var settings = {
                 url: "http://localhost:8080/api/doctor/edit",
                 method: "POST",
                 timeout: 100000,
                 headers: {"Authorization": "Basic " + head},
                 cache: false,
                 data: doctorInf,
                 statusCode: {
                     200: function (response) {

                     }
                 }
             };
             $.ajax(settings).done(function (response) {
                 console.log(response);
             });

             workTime.forEach(function (element,index) {
                 var settings1 = {
                     url: "http://localhost:8080/api/doctor/worktime",
                     method: "POST",
                     timeout: 100000,
                     headers: {"Authorization": "Basic " + head},
                     cache: false,
                     data: element,
                     statusCode: {
                         200: function () {

                         }
                     }
                 };
                 $.ajax(settings1).done(function (response) {
                     console.log(response);
                     window.location="dr1.html"
                 })


             })


         }
     }
    
    //  () =>{
    
    //  let doctorInf={
    //   name:document.querySelector('#name').value,
    //   family:document.querySelector('#family').value,
    //   email:document.querySelector('#email').value,
    //   workdays:workTime,
    //   timeforpatient: document.querySelector('#minute').value,
    //   city: document.querySelector('#city'),
    //   province:document.querySelector('#province'),
      
    //  }; 
    //  console.log(doctorInf);
    //  })