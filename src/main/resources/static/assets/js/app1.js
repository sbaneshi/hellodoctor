var mylat=32.648625783736726;
var mylng=51.64672851562501;


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
          'marker-description': 'توضیح',
        },
        en: {
          'marker-title': 'Title',
          'marker-description': 'Description',
        },
      },
      locale: 'en',
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
        lat: mylat,
        lng: mylng
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
          console.log(marker._latlng);
        },
        contextmenu: function() {
          console.log('Contextmenu callback');
        },
      },
    });
  });
     