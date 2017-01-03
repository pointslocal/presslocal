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
var markerRefs = {};
var windowRefs = {};
var mapMarkerBounds;

function stripTags(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

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

function updateMapItinerary() {
      tripsJSON = localStorage.trips;
      // console.log(tripsJSON);
      trips = (JSON.parse(tripsJSON));
      counter = 1;
      trips = trips.map(function(t) {
        t.counter = counter;
        counter++;
        return t;
      });
      $('.itinerary-list').html(Mustache.render(MapItineraryTemplate,{items:trips}));
      $('.itinerary-list').show();
}

function scrollDown() {
          var y = $(window).scrollTop();
          $(window).scrollTop(y-150);
}

function isScrolledIntoView(elem) {
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height() + 120;

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function resetMapBounds() {
    var bounds = new google.maps.LatLngBounds();
    for (ob in markerRefs) {
        bounds.extend(markerRefs[ob].getPosition());
        console.log('position:',markerRefs[ob].getPosition());
    }
    //map.setCenter(bounds.getCenter());
    // map.fitBounds(bounds);
}

$(document).ready(function() {

  /*
    Detects scrolls at anchor points, highlights corresponding map points
  */
  console.log('Setup');
  $(window).scroll(function(e) {
    var anchors = $('.venue-anchor');
    for (var i = 0; i < anchors.length; ++i) {
      id = ($(anchors[i]).attr('data-id'));
      if (isScrolledIntoView(anchors[i])){
          //markerRefs[id].setAnimation(google.maps.Animation.BOUNCE);
          m = markerRefs[id].getIcon()
          m.fillColor = _MARKER_HIGHLIGHT_FILL_COLOR;
          m.strokeColor = _MARKER_HIGHLIGHT_BORDER_COLOR;
          m.strokeWeight = 4;
          markerRefs[id].setIcon(m)
      } else {
          m = markerRefs[id].getIcon()        
          m.fillColor = _MARKER_FILL_COLOR;
          markerRefs[id].setIcon(m)          
      }
    }
  });


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
        var marker = new MarkerWithLabel({
          id: count,
          position: myLatLng,
          map: map,
          title: name,
          labelContent: data.counter,
          labelClass: "dynamicMapMarker",
          labelAnchor: new google.maps.Point(0, -5),
          icon: {
            path: _MAP_PATH,
            scale: .1,
            fillColor: _MARKER_FILL_COLOR,
            fillOpacity: .9,
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
            '<h2 class="serif brown"><a href="/place/"'+data.guid+'">'+data.name+'</a></h2>'+
          '</div>'+
          '<div class="poi-content bg-beige">'+
            '<h4 class="sans-bold olive" style="display:none;">Napa</h4>'+
            '<p>'+data.address+'<br> '+data.phone+'<br> </p>'+
          '</div>'+
          '<div class="poi-button">'+
            '<a class="button button-xs sans-bold bg-olive trip-receiver trip-receiver-'+data.id+'" onclick="addTrip({id:'+data.id+', type:\'venue\',name: \''+data.name+'\', lat: '+data.lat+', lon: '+data.lng+' }, this)">'+(_Store.hasTrips ? 'Add To Trip' : 'Create A Trip')+'</a>'+
          '</div>'+
        '</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString,
          pixelOffset: new google.maps.Size(-15, -10)
        });


        markerRefs[data.id] = marker;
        windowRefs[data.id] = infowindow;
        markers.push(marker);
        marker.addListener('click', function() {
          for (ob in windowRefs) {
            windowRefs[ob].close();
          }
          //infowindow.open(map, marker);
          console.log('eh?');
          location.hash = "#venue_card_" + data.id;
          scrollDown();
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

      markerRefs = {};
      if (searchActive) {
        return;
      }

      req = [];
      req.push('count=50');
      for (k in Search) {
        if (k == 'filterData') {
          continue;
        }
        if (Search[k]) {
          req.push(k+'='+Search[k]);
        }
      }
      req.push('sort=tier')
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
              d.itemClass = 'venue-anchor';
              d.items[ri].counter = d.items[ri].counter + 1;
              d.items[ri].story_text = stripTags(d.items[ri].story_text);
              d.items[ri].story_text = d.items[ri].story_text.split(/\n/);
              d.items[ri].story_text = d.items[ri].story_text[0].replace(/^([\s\S]{230}[^\s]*).*/mg, "$1");
          }

        }
        mD = localStorage.getItem('messageDismissed')
        d.quicktip = (mD != null && mD ? false : true );
        d.items = d.items.map(function(f) {
          console.log('F===',f);
          f['tier:1-2'] = ( (f.feature_level == 1 || f.feature_level) == 2 ? true : false);
          f['tier:3'] = (f.feature_level == 3 ? true : false);
          if (!f['tier:1-2'] && !f['tier:3']) {
            f['tier:none'] = true;
          }
          f.trip_item_message = ( _Store.hasTrips ? 'Add To Trip' : 'Create A Trip');
          f.addclass = 'venue-anchor';

          return f;
        });
        $('#map-search-results-'+resultsTarget).html(Mustache.render(template,d));
          console.log('....??');
          $(d.items).each(function(i,v) {

            results.push({ id: v.id, guid: v.guid, lat: v.latitude, lng: v.longitude, icon: '/partners/thepress/img/markers/partner.png', activeIcon: '/partners/thepress/img/markers/winery.png' });
        var myLatLng = {
          lat: parseFloat(v.latitude),
          lng: parseFloat(v.longitude)
        };

        addMarker(myLatLng, icon, v);
      });
      resetTripReceivers();
      resetMapBounds();
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
        /*
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
        }); */
        var marker = new MarkerWithLabel({
          id: count,
          position: myLatLng,
          map: map,
          title: name,
          labelContent: data[i].counter,
          labelClass: "dynamicMapMarker",
          labelAnchor: new google.maps.Point(0, -5),
          icon: {
            path: 'M258.5,0C144.7,0,62,79.5,62,166.1c0,52.4,21.7,80.4,50.7,131.1C170.6,398.6,258.5,507,258.5,507 s87.9-108.4,145.8-209.8c29-50.7,50.7-78.7,50.7-131.1C455,79.5,372.3,0,258.5,0',
            scale: .1,
            fillColor: _MARKER_FILL_COLOR,
            fillOpacity: .9,
            size: new google.maps.Size(60, 72),
            scaledSize: new google.maps.Size(30, 36),

          },
          optimized: false,
          vid: data[i].id
        });

        var contentString = '<div id="poi-window">'+
          '<div style="display:none;" class="poi-image" style="background: url(\'/partners/thepress/img/backgrounds/wine-pour.png\') center center no-repeat; background-size: cover;">'+
          '</div>'+
          '<div class="poi-title">'+
            '<h2 class="serif brown"><a href="/place/'+data[i].guid+'">'+data[i].name+'</a></h2>'+
          '</div>'+
          '<div class="poi-content bg-beige">'+
            '<h4 class="sans-bold olive" style="display:none;">Napa</h4>'+
            '<p>'+data[i].address+'<br> '+data[i].phone+'<br> </p>'+
          '</div>'+
          '<div class="poi-button">'+
            '<a class="button button-xs sans-bold bg-olive" onclick="addTrip({id:'+data[i].id+', type:\'venue\',name: \''+data[i].name+'\', lat: '+data[i].lat+', lon: '+data[i].lng+' }, this)">'+(_Store.hasTrips ? 'Add To Trip' : 'Create A Trip')+'</a>'+
          '</div>'+
        '</div>';
        markerRefs[data[i].id] = marker;
        var infowindow = new google.maps.InfoWindow({
          content: contentString,
          pixelOffset: new google.maps.Size(-15, -10)
        });
        windowRefs[data[i].id] = infowindow;
        // Marker Click listener
        marker.addListener('click', function() {
          for (ob in windowRefs) {
            windowRefs[ob].close();
          }
           location.hash = "#venue_card_" + marker.vid;
           scrollDown();
          //infowindow.open(map, marker);
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
      $.getJSON("/api/v1/venues?category=1&count=50&references=1&sort=tier",function(d) {
        mD = localStorage.getItem('messageDismissed')

        mD = localStorage.getItem('messageDismissed')
        d.quicktip = (mD != null && mD ? false : true );

        for(ti=0;ti<d.items.length;ti++) {
          d.items[ti].trip_item_message = ( _Store.hasTrips ? 'Add To Trip' : 'Create a Trip');
          d.items[ti].addclass = 'venue-anchor';
          d.items[ti].counter = d.items[ti].counter + 1;        
          d.items[ti].quicktip = true;


          d.items[ti].story_text = stripTags(d.items[ti].story_text);
          d.items[ti].story_text = d.items[ti].story_text.split(/\n/);
          d.items[ti].story_text = d.items[ti].story_text[0].replace(/^([\s\S]{180}[^\s]*).*/mg, "$1") + ' ... '; 
          if (d.items[ti].story_abstract) {
            d.items[ti].story_text = d.items[ti].story_abstract;
          }         
          d.items[ti]['tier:1-2'] = ( (d.items[ti].feature_level == 1 || d.items[ti].feature_level) == 2 ? true : false);
          d.items[ti]['tier:3'] = (d.items[ti].feature_level == 3 ? true : false);       
          if (!d.items[ti]['tier:1-2'] && !d.items[ti]['tier:3']) {
            d.items[ti]['tier:none'] = true;
          }
          if (d.items[ti].story_guid && !d.items[ti]['tier:3']) {
            d.items[ti]['tier:1-2'] = false;
            d.items[ti]['tier:story'] = true;
          }
        }
        $('#map-search-results-winery').html(Mustache.render(template,d));
        updateStore()
          $(d.items).each(function() {

            results.push({ id: this.id, counter: this.counter, guid: this.guid, name: this.name, address: this.address, phone: this.phone, lat: this.latitude, lng: this.longitude, icon: '/partners/thepress/img/markers/partner.png', activeIcon: '/partners/thepress/img/markers/partner-active.png' });

          });

        initMap(results);

      });




      // Enable Editable Text
      $.fn.editable.defaults.mode = 'inline';
      $('#editable-title').editable({
        type: 'text',
        title: 'Name your trip',
        success: function(res,newval) {
          $('#trip-bar-name').text(newval);
          localStorage.setItem('workingTripName',newval);
        }
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
      // $('.map-dropdowns .trip-toggles a.dropdown-toggle').html('Wineries' + ' <i class="fa fa-angle-down"></i>');
      //$('.mobile-nav a').removeClass('active');
      $('.hud-winery').addClass('inactive');
      $('.hud-trips').addClass('inactive');
      $('.hud-itinerary').addClass('active');
      updateMapItinerary();
      //$('.map-filters').addClass('inactive');
      // $('.filter-controls').removeClass('active');
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

    $('.mobile-filters').on('click', '.filter-section', function() {
      $(this).find('.filter-section-controls').toggleClass('active');
    });

    // Toggle Huge Filters Popup
    $('.toggle-filters').on('click', function(e) {
      $('.mobile-dropdown').removeClass('active');
      $('.hud').toggleClass('noscroll');
      $(this).toggleClass('active');
      $('.filter-controls').toggleClass('active');
      e.preventDefault();
    });

    // Hide filter controls on dropdown toggle
    $('.map-dropdowns').on('click', '.dropdown-toggle', function (e) {
      $('.toggle-filters').removeClass('active');
      $('.filter-controls').removeClass('active');
      e.preventDefault();
    })

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