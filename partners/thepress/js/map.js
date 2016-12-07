var Search = {
  neighborhood: false,
  category: 1,
  latitude: 0,
  longitude: 0,
  radius: 0,
  type: 'winery',
  filterData: {},
  filters: {},
  search: ''
}
var orgSearch = Search;



var Neighborhoods = {
  "Napa": { "items": [
    {"name": "Up Valley", "latitude": 38.492931, "longitude": -122.429105},
    {"name": "Eastern Mountains", "latitude": 38.353064, "longitude": -122.184659},
    {"name": "Western Mountains", "latitude": 38.350910, "longitude": -122.407133},
    {"name": "South Napa", "latitude": 38.236661, "longitude": -122.279416}
  ]},
  "Sonoma": { "items": [
    {"name": "North", "latitude": 38.319979, "longitude": -122.472748 },
    {"name": "East", "latitude": 38.281602 , "longitude": -122.403697 },
    {"name": "South", "latitude": 38.249799, "longitude": -122.458056 },
    {"name": "West County", "latitude": 38.283819, "longitude": -122.5089127 },
    {"name": "Central", "latitude": 38.277319, "longitude": -122.461834 }    
  ]}, 
}

$(document).ready(function() {
  $('#mapSearch').on('keypress',function(e) {
    if (e.keyCode == 13) {
      Search.search = $(this).val();
      $('#mapSearch').toggleClass('active');
      $('#mapSearch').val('');
      $('.map-dropdowns .toggle-map-search').children('i').toggleClass('fa-search').toggleClass('fa-close');

      updateMap();
    }
  });
});

function clearSearch() {
  Search.search = '';
  updateMap();
}

function setSubRegions(reg) {
  var tpl = '{{#items}}<li><a onclick="setMapPos(this);searchSubRegions(\'{{name}}\')" data-latitude="{{latitude}}" data-longitude="{{longitude}}">{{name}}</a></li>{{/items}}';
  $('.subregions').html(Mustache.render(tpl,Neighborhoods[reg]));
  $('#toggle-map-region-label').find('span').html(reg);
  updateMap();
}

function searchSubRegions(reg) {
  $('#toggle-map-subregion-label').find('span').html(reg);
  updateMap();
}

      var count = 1;
      var icon = '';
      var map;
      var markers = [];    
      var searchActive = false;



      function addMarker(myLatLng, icon, data) {
        var marker = new google.maps.Marker({
          id: count,
          position: myLatLng,
          map: map,
          title: name,
          icon: {
            url: '/partners/thepress/img/markers/partner.png',
            size: new google.maps.Size(60, 72),
            scaledSize: new google.maps.Size(30, 36),
          },
          optimized: false
        });
        console.log(myLatLng);
        var contentString = '<div id="poi-window">'+
          '<div style="display:none;" class="poi-image" style="background: url(\'/partners/thepress/img/backgrounds/wine-pour.png\') center center no-repeat; background-size: cover;">'+
          '</div>'+
          '<div class="poi-title">'+
            '<h2 class="serif brown">'+data.name+'</h2>'+
          '</div>'+
          '<div class="poi-content bg-beige">'+
            '<h4 class="sans-bold olive" style="display:none;">Napa</h4>'+
            '<p>'+data.address+'<br> '+data.phone+'<br> </p>'+
          '</div>'+
          '<div class="poi-button">'+
            '<a class="button button-xs sans-bold bg-olive" onclick="addTrip({id:'+data.id+', type:\'venue\',name: \''+data.name+'\', lat: '+data.latitude+', lon: '+data.longitude+' }, this)">Create Trip</a>'+
          '</div>'+
        '</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString,
          pixelOffset: new google.maps.Size(-15, -10)
        });



        markers.push(marker);
        marker.addListener('click', function() {
          // infowindow.open(map, marker);
          console.log('eh?');
          location.hash = "#venue_card_" + data.id;
          searchActive = true;
        });
        google.maps.event.addListener(infowindow,'closeclick',function(){
           searchActive = false;
        });        
      }

function setMapPos(e) {
  lat = parseFloat($(e).attr('data-latitude'));
  lon = parseFloat($(e).attr('data-longitude'));
  map.setCenter({ lat: lat, lng:lon });
  map.setZoom(12);
}

function unsetMarkers() {
  for (i in markers) {
    markers[i].setMap(null);
  }
}

function updateMap(opts) {
$('.filter-controls').removeClass('active');
console.log(Search);
var bounds = map.getBounds();

var center = bounds.getCenter();
var ne = bounds.getNorthEast();

// r = radius of the earth in statute miles
var r = 3963.0;  

// Convert lat or lng from decimal degrees into radians (divide by 57.2958)
var lat1 = center.lat() / 57.2958; 
var lon1 = center.lng() / 57.2958;
var lat2 = ne.lat() / 57.2958;
var lon2 = ne.lng() / 57.2958;

// distance = circle radius from center to Northeast corner of bounds
var dis = r * Math.acos(Math.sin(lat1) * Math.sin(lat2) + 
  Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1));

  Search.latitude = center.lat();
  Search.longitude = center.lng();
  Search.near = Search.latitude+','+Search.longitude;
  Search.radius = dis;

Search.filterData = {};
$('.search-option:checked').each(function() {
  type = $(this).attr('data-type');
  if (!Search.filterData[type]) {
    Search.filterData[type] = [];
  }
  Search.filterData[type].push($(this).attr('data-value'))
})

console.log(Search);
Search.filters = JSON.stringify(Search.filterData);
console.log(Search);


      if (searchActive) {
        return;
      }

      req = [];
      req.push('count=30');
      for (k in Search) {
        if (k == 'filterData') {
          continue;
        }
        if (Search[k]) {
          req.push(k+'='+Search[k]);
        }
      }
      req.push('references=1');
      req = req.join('&');
      if (req){
        req = '&'+req;
      }

      request = "/api/v1/venues?"+req;
      searchActive = true;
      template = $('#search-result').html();
      results = [];  

      var resultsTarget;
      switch(Search.category) {
        case 1:
          resultsTarget = 'winery';
          icon = 'winery.png';
          break;
        case 2: 
          resultsTarget = 'restaurant';
          icon = 'trip.png';
          break;
        case 3:
          resultsTarget = 'lodging';
          icon = 'lodging.png';          
          break;
        case 5:
          resultsTarget = 'activities';
          icon = 'activities.png';          
          break;
        default:
          resultsTarget = 'winery';
          icon = 'winery.png';          
      }

      searchActive = false;
      $.getJSON(request,function(d) {
      unsetMarkers();
      // console.log('#map-search-results-'+resultsTarget);
        for (var ri = 0; ri < d.items.length; ri++ ) {
          if (d.items[ri].story_text) {
              d.items[ri].story_text = d.items[ri].story_text.split(/\n/);
              d.items[ri].story_text = d.items[ri].story_text[0].replace(/^([\s\S]{230}[^\s]*).*/mg, "$1"); 
          }
          
        }
        d.items = d.items.map(function(f) {
          f.trip_item_message = ( _Store.hasTrips ? 'Add To Trip' : 'Create A Trip');
          return f;
        });
        $('#map-search-results-'+resultsTarget).html(Mustache.render(template,d));
          console.log('....??');
          $(d.items).each(function(i,v) {

            results.push({ id: v.id, lat: v.latitude, lng: v.longitude, icon: '/partners/thepress/img/markers/partner.png', activeIcon: '/partners/thepress/img/markers/winery.png' });    
        var myLatLng = {
          lat: parseFloat(v.latitude),
          lng: parseFloat(v.longitude)
        };

        addMarker(myLatLng, icon, v);
      });
      console.log('ok can search again');

      });

}

;(function($) {

  /*
  * ============================================
  * Map
  * ============================================
  */

  if ($('body.map').length > 0) {


    // EXAMPLE MARKER DATA
    var exampleWineryData = [

    ];

    var exampleTripData = [

    ];


    var options = {
      center: {lat: 38.4404, lng: -122.7141},
      zoom: 7,
      maxZoom: 15,
      scrollwheel: false,
      mapTypeControl: false,
      draggable: true,
      streetViewControl: false,
    }

    function initMap(data) {

      map = new google.maps.Map(document.getElementById('map'), { options });

      map.addListener('resize', function() {
        updateMap();
      });

      map.addListener('center_changed', function() {

      });

      map.addListener('bounds_changed', function() {
        //updateMap();
      }); 
      
      map.addListener('dragend', function() {
        console.log('????');
        updateMap();
      });             

      var count = 1;
      for (var i = 0; i < data.length; i++) {
        var icon = data[i].icon; // Icon
        // Retrieve lng and lat
        var myLatLng = {
          lat: parseFloat(data[i].lat),
          lng: parseFloat(data[i].lng)
        };

        addMarker(myLatLng, icon);
        count++;
      }

      // Make the marker
      function addMarker(myLatLng, icon) {
        var marker = new google.maps.Marker({
          id: count,
          position: myLatLng,
          map: map,
          icon: {
            url: icon,
            size: new google.maps.Size(60, 72),
            scaledSize: new google.maps.Size(30, 36),
          },
          optimized: false,
          vid: data[i].id
        });

        console.log("DATA-->",data[i]);

        var contentString = '<div id="poi-window">'+
          '<div style="display:none;" class="poi-image" style="background: url(\'/partners/thepress/img/backgrounds/wine-pour.png\') center center no-repeat; background-size: cover;">'+
          '</div>'+
          '<div class="poi-title">'+
            '<h2 class="serif brown">'+data[i].name+'</h2>'+
          '</div>'+
          '<div class="poi-content bg-beige">'+
            '<h4 class="sans-bold olive" style="display:none;">Napa</h4>'+
            '<p>'+data[i].address+'<br> '+data[i].phone+'<br> </p>'+
          '</div>'+
          '<div class="poi-button">'+
            '<a class="button button-xs sans-bold bg-olive" onclick="addTrip({id:'+data[i].id+', type:\'venue\',name: \''+data[i].name+'\', lat: '+data[i].latitude+', lon: '+data[i].longitude+' }, this)">'+(_Store.hasTrips ? 'Add To Trip' : 'Create a Trip')+'</a>'+
          '</div>'+
        '</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString,
          pixelOffset: new google.maps.Size(-15, -10)
        });

        // Marker Click listener
        marker.addListener('click', function() {
          console.log(marker);
           location.hash = "#venue_card_" + marker.vid;         
            // infowindow.open(map, marker);
          searchActive = true;
        });
        google.maps.event.addListener(infowindow,'closeclick',function(){
           searchActive = false;
        });    

        markers.push(marker);
      }

      // Get bounds and reset zoom
      var getBounds = function() {
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < markers.length; i++) {
          // Get all the visible markers on the map and set position
          if (markers[i].getVisible()) {
            bounds.extend(markers[i].getPosition());
          }
        }
        map.fitBounds(bounds);
        if (!Modernizr.mq('only screen and (max-width: 768px)')) {
          map.panBy(-250, -50);
        }
      }

      getBounds();





    }

    $(document).ready(function() {


      var results = [];


      template = $('#search-result').html();
      $.getJSON("/api/v1/venues?category=1&count=30&references=1",function(d) {
        for(ti=0;ti<d.items.length;ti++) {
          d.items[ti].trip_item_message = ( _Store.hasTrips ? 'Add To Trip' : 'Create a Trip');
        }
        $('#map-search-results-winery').html(Mustache.render(template,d));
        updateStore()
          $(d.items).each(function() {

            results.push({ id: this.id, name: this.name, address: this.address, phone: this.phone, lat: this.latitude, lng: this.longitude, icon: '/partners/thepress/img/markers/partner.png', activeIcon: '/partners/thepress/img/markers/partner-active.png' });    

          });

        initMap(results);

      });




      // Enable Editable Text
      $.fn.editable.defaults.mode = 'inline';
      $('#editable-title').editable({
        type: 'text',
        title: 'Name your trip'
      });

      // Rename Text Button
      $('.toggle-rename').on('click', function(e) {
        if ($(this).text() != 'cancel') {
          $(this).text('cancel');
        } else {
          $(this).text('rename');
        }
        e.stopPropagation();
        $('#editable-title').editable('toggle');
      });

      // Change text on hidden
      $('#editable-title').on('hidden', function(e, reason) {
        $('.toggle-rename').text('rename');
      });

      // jQuery UI Sortable List
      $("#sortable").sortable();
      $("#sortable").disableSelection();

      // initMap(exampleWineryData);
    });

    // Scroll to top of page
    var scrollUp = function() {
      setTimeout(function() {
        $('html, body').animate({
          scrollTop: $('*').offset().top
        }, 200);
      }, 200);
    };

    // Toggle Itinerary and hide HUD
    $('.toggle-itinerary').on('click', function(e) {
      $('.map-dropdowns .trip-toggles a.dropdown-toggle').html('Wineries' + ' <i class="fa fa-angle-down"></i>');
      $('.mobile-nav a').removeClass('active');
      $('.hud-winery').addClass('inactive');
      $('.hud-trips').addClass('inactive');
      $('.hud-itinerary').addClass('active');
      $('.map-filters').addClass('inactive');
      $('.filter-controls').removeClass('active');
      scrollUp();
      e.preventDefault();
    });

    // Hide itinerary and toggle HUD
    $('.back-button').on('click', function(e) {
      $('.mobile-nav a').removeClass('active');
      $(this).addClass('active');
      $('.hud-winery').removeClass('inactive');
      $('.hud-trips').addClass('inactive');
      $('.hud-itinerary').removeClass('active');
      $('.map-filters').removeClass('inactive');
      scrollUp();
      e.preventDefault();
    });

    // Toggle winery HUD only from dropdown menu (similar functionality to back button)
    $('.toggle-winery').on('click', function(e) {
      var selectedText = $(this).text();
      $(this).parent().closest('ul').siblings('.dropdown-toggle').html(selectedText + ' <i class="fa fa-angle-down"></i>');
      $('.mobile-nav a').removeClass('active');
      $(this).addClass('active');
      $('.hud-winery').removeClass('inactive');
      $('.hud-trips').addClass('inactive');
      $('.hud-itinerary').removeClass('active');
      $('.map-filters').removeClass('inactive');
      Search.category = 1;
      scrollUp();
      updateMap();
      e.preventDefault();
    });

    // Toggle Map and hide both HUDs
    $('.toggle-map').on('click', function(e) {
      $('.mobile-nav a').removeClass('active');
      $('.hud-winery').addClass('inactive');
      $('.hud-trips').addClass('inactive');
      $('.hud-itinerary').removeClass('active');
      $('#map').removeClass('hidden-xs');
      $('.filter-controls').removeClass('active');
      $(this).addClass('active');
      scrollUp();
      e.preventDefault();
    });

    // Toggle Huge Filters Popup
    $('.toggle-filters').on('click', function(e) {
      $('.mobile-nav a').removeClass('active');
      $('.mobile-dropdown').removeClass('active');
      $('body, html').toggleClass('noscroll');
      $(this).toggleClass('active');
      $('.filter-controls').toggleClass('active');
      e.preventDefault();
    });

    // Toggle Trips Module
    $('.map-dropdowns .trip-toggles ul.dropdown-menu a:not(.toggle-winery)').on('click', function(e) {
      var selectedText = $(this).text();
      var categoryID = $(this).attr('data-category');
      Search.category = parseInt(categoryID);
      console.log(Search);
      $(this).parent().closest('ul').siblings('.dropdown-toggle').html(selectedText + ' <i class="fa fa-angle-down"></i>');
      $('.mobile-nav a').removeClass('active');
      $('.hud-trips').removeClass('inactive');
      $('.hud-winery').addClass('inactive');
      $('.hud-itinerary').removeClass('active');
      $('#map').removeClass('hidden-xs');
      $('.filter-controls').removeClass('active');

      $('.map-search-results-bucket').addClass('inactive');
      $('.map-search-results-bucket-'+categoryID).removeClass('inactive');

      $(this).addClass('active');
      scrollUp();
      // initMap(exampleTripData);
      updateMap();
      e.preventDefault()
    });


    $('.map-dropdowns .toggle-map-search').on('click', function(e) {
      $(this).children('i').toggleClass('fa-search').toggleClass('fa-close');
      $('#mapSearch').toggleClass('active');
      setTimeout(function() {
        $('#mapSearch').focus();
      }, 100);
      e.preventDefault();
    });


  }

})(jQuery);