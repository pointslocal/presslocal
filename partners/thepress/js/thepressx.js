/*
	gigya
*/
var _AUTH = false;
var _UID = false;
var _Store = {
	messageDismissed: false,
	hasTrips: false,
	tripIDs: []
};


function share(service,message) {

}

function showToast(message) {
  	$('#toast').slideDown(100);
	$('#toast').html(message);
	setTimeout(function() { $('#toast').slideUp(); }, 5000);
}

function updateButtons() {
	$('.trip-button').each(function() {
		thisID = $(this).attr('data-id');
		if (_Store.tripIDs.indexOf(parseInt(thisID)) > -1) {
			$(this).html('Remove From Trip');
			$(this).attr('onclick',"removeTrip({id:'"+thisID+"'})");
		}
	});
}

/*	Sets global vars for _Store */
function updateStore(init) {
	if (mD = localStorage.getItem('messageDismissed')) {
		_Store.messageDismissed = mD;
	}

	if (tr = localStorage.getItem('trips')) {

		if (trj = JSON.parse(tr)) {

			if (trj.length > 0) {
				_Store.hasTrips = true;
				trj.forEach(function(i,t) {
					_Store.tripIDs.push(parseInt(i.id));
				});
			}
		} else {
			_Store.hasTrips = false;
		}

	}

	$(document).ready(function() {
		//	Shows dismissables
		if (!_Store.messageDismissed) {
			$('.dismissable').fadeIn();
		}

		$('#trip-bar-name').on('blur keypress',function(e) {
			if (e.type === 'keypress') {
				if (e.keyCode != 13) {
					return;
				}
				$(this).blur();
			}
			localStorage.setItem('workingTripName',$(this).text());
		});

		updateButtons();
		evalTripBar();
	});

}
	updateStore();

/*	Allows dismiss-able popups */
function dismissDialog(e) {
	$(e).closest('.dismissable').fadeOut();
	localStorage.setItem('messageDismissed',true);
}


function setNav(type) {
	$('.nav-'+type).addClass('active');
}

var videos = [];
function addVideo(u) {
	videos.push(u);
}
function playVideo(vid) {
	$('#video-player').attr('src',"https://www.youtube.com/embed/"+vid);
}
function startVideos() {
	if (videos.length > 0) {
		$('#video-main').html('<iframe id="video-player" width="500" height="315" src="'+videos[0]+'" frameborder="0" allowfullscreen></iframe>');

		videos.forEach(function(v)  {
			vid = v.replace(/.*?embed\/(.*)/,'$1');
			$('#video-list').append('<div style="cursor:pointer;margin-bottom:5px;" onclick="playVideo(\''+vid+'\');"><img style="max-width:100%;" src="https://img.youtube.com/vi/'+vid+'/mqdefault.jpg" /></div>');
		});
	}
}

function openModal(url) {
	$('#modal-background').show();
	$('#modal').html('<iframe src="'+url+'" width=100% height="200"></iframe>');
	$('#modal').show();
	$('#modal-background').click(function() {
		$('#modal').hide();
		$('#modal-background').hide();
	})
}


function gallerySelect(e) {
  $('#gallery-image').html('<img style="max-width:100%;" src="'+$(e).find('img').attr('src').replace(/w=\d+/,'w=700').replace(/h=\d+/,'h=300')+'" />');
}

gigya.accounts.getAccountInfo({callback:onGetAccount});
function setSession(uid,e) {
	$.getJSON('/api.json?method=auth.gigya-resolve&uid='+uid+'&email='+e, function(d) {
		if (d.uid) {
			_AUTH = true;
			_UID = d.uid;
		}
	});
}
function showModal(type) {
	if (type == 'register') {
		$('.modal-dialog.register').show();
		$('.modal-dialog.login').hide();
		$('.modal-dialog.lostpassword').hide();
	} else if (type == 'lostpassword') {
		$('.modal-dialog.login').hide();
		$('.modal-dialog.register').hide();
		$('.modal-dialog.lostpassword').show();
	} else {
		$('.modal-dialog.login').show();
		$('.modal-dialog.register').hide();
		$('.modal-dialog.lostpassword').hide();
		setTimeout(function() {
  		$('#login-email').focus();
		}, 300);
	}
}

function onGetAccount(response) {
	console.log(response);
	if (response.isRegistered && response.isVerified) {
		var nickname = response.profile.nickname;
		if (!nickname) {
			nickname = response.profile.email.split('@')[0];
		}
		$('.tools .signin, .fixed-tools .signin').hide();
		$('.tools .login, .fixed-tools .login').removeClass('hidden').show();
		$('.dropdown.login a.dropdown-toggle, .fixed-tools .toggle-signin, .login-name').html(nickname).removeClass('hidden');

		setSession(response.UID,response.profile.email)
	}
}

function onLogin(response) {
	if (response.errorCode > 0) {
		$('#login-error').text('Email Address or Password is incorrect.');
	} else {
		setSession(response.UID,response.profile.email);
		var nickname = response.profile.nickname;
		if (!nickname) {
			nickname = response.profile.email.split('@')[0];
		}
	    $('.modal').modal('hide');
	    // $('nav li.signin').addClass('hidden');

		$('.tools .signin, .fixed-tools .signin').hide();
		$('.tools .login, .fixed-tools .login').removeClass('hidden').show();
		$('.dropdown.login a.dropdown-toggle, .fixed-tools .toggle-signin, .login-name').html(nickname).removeClass('hidden');

	}
}

function onRegister(response) {
	if (response.errorCode == 206001) {
		$('#register-error').text('Please verify your email in order to complete your profile. Check your email for a profile verification link. <div>You will not have access to writing comments, managing newsletters or alerts, and updating your profile until you verify your account with the link provided. The verification link in the email will expire in 24 hours.</div>');
	} else {
		$('#register-error').html(JSON.stringify(response));
	}
}

function onLogout(response) {
	location.reload();
}

function gigyaLogout() {
	gigya.accounts.logout({callback: onLogout});
}

function gigyaRegister() {
	e = $('#register-email').val();
	p = $('#register-password').val();
	p2 = $('#register-password2').val();
	if (p !== p2) {
		$('#register-error').text('Passwords do not match!');
		return false;
	}
	gigya.accounts.initRegistration({callback: function(r) {
		token = r.regToken
		gigya.accounts.register({email: e, password: p, regToken: token, callback: onRegister, finalizeRegistration: true });
	}});

}

function gigyaLogin() {
	e = $('#login-email').val();
	p = $('#login-password').val();
	gigya.accounts.login({loginID: e, password: p, callback: onLogin});
}


function evalTripBar() {
	console.log('items:',_Store.tripIDs.length,_Store);
	if (JSON.parse(localStorage.getItem('trips')) && JSON.parse(localStorage.getItem('trips')).length > 0) {
		$('#trip-bar').show();
		lang = 'item';
		if (JSON.parse(localStorage.getItem('trips')).length > 1) {
			lang += 's';
		}
		$('.trip-details span').text(JSON.parse(localStorage.getItem('trips')).length+' '+lang)
		if (tname = localStorage.getItem('workingTripName')) {
			$('#trip-bar-name').text(tname);
		}
	}

}


var TripTemplate = '{{#items}}<section class="container no-padding single-featured my-trip-container" data-lat=38.4771 data-lon=-122.401><div class="row featured-title hidden-lg hidden-md hidden-sm"><div class=num-divider><span>1</span></div><div class=col-sm-12><div class="sans-bold orange featured-label"></div><h1 class="brown serif">{{name}}</h1><div class="sans-bold brown featured-address">{{address}}</div><span style="display:none" class=partner-badge></span></div></div><div class="row featured-image"><div class=col-sm-12>{{#image_id}}<img src="http://imagecdn-sfgate.pointslocal.com/image?method=image.icrop&context=venue&id={{id}}&w=1200&h=-1">{{/image_id}}</div></div><div class="row hidden-lg hidden-md hidden-sm featured-toolbar"><div class=col-sm-12><ul><li><a class="sans-bold bg-lightOrange button button-xs"href=#>Remove from Trip</a><li><a class="sans-bold orange"href=#>Website</a><li><a class="sans-bold orange"href=#><i class="fa fa-location-arrow"></i> Directions</a></ul></div></div><div class="row featured-title hidden-xs"><div class="col-sm-9 title-container"><div class="sans-bold orange featured-label"style=display:none>Spring Mountain District</div><h1 class="brown serif">{{name}}</h1><span class=partner-badge></span><div class="sans-bold brown featured-address">{{address}}</div></div><div class="col-sm-3 featured-button"><a class="sans-bold bg-lightOrange button button-xs"onclick=removeTrip({id:\'{{id}}\'{{#package_id}},packageID:\'{{package_id}}\'{{/package_id}}},this)>Remove from Trip</a></div></div><div class="row featured-content"><div class="col-sm-8 featured-container"><p class="brown sans"><br><br></div><div class="hidden-xs col-sm-4 featured-map"><div class=venue-map></div><div class="row related-stories"style=display:none><div class=col-sm-12><div class=related-title><h3 class="serif lightBrown">Related Stories</h3></div><ul><li><a class="sans-bold orange"href=#>A Guide to Yountville Hotels & Inns</a><li><a class="sans-bold orange"href=#>...</a><li><a class="sans-bold orange"href=#>A Guide to Yountville Hotels & Inns</a></ul></div></div></div></div></section>{{/items}}';

var TripsTemplate = "<section class='directory container'><div class='col-sm-12 directory-list'>{{#items}}<div id=\"my-trip-{{package_id}}\" class=\"directory-item row\"><div class=\"hidden-xs col-xs-2 directory-button\">{{#package_id}}<img src='/image?method=image.icrop&context=package.items&id={{package_id}}&w=600&h=-1' />{{/package_id}}</div><div class=\"col-xs-7 directory-info\"><h3 class=\"brown serif\"><a href=/my-trip/{{package_guid}}>{{package_title}}</a></h3><h4 style='text-align:left;' class=\"hidden-xs orange sans-bold\">{{date}}</h4><div class=\"hidden-xs address\"><p></div><div class=\"address hidden-lg hidden-md hidden-sm\"><p></div></div><div class=\"hidden-xs col-xs-3 directory-button\"><a href=/my-trip/{{package_guid}} class=\"sans-bold bg-lightOrange button button-xs\">View Trip</a> <a onclick=\"deleteTrip({{package_id}});\" class=\"sans-bold bg-lightOrange button button-xs\">Delete Trip</a></div></div>{{/items}}</div></section>";

var SponsoredTripTemplate = '{{#items}}<a href="/trip/{{guid}}" class="block sponsored" style="background: url(\'image?method=image.crop&context=package&id={{id}}&w=370&h=240\') center center no-repeat; background-size: cover;">            <div class="block-label white no-accent">Sponsored Content</div><div class="block-label white">{{&neighborhood}}</div><div class="block-content vert-center"><h3 class="white"	>{{&title}}</h3></div></a><div class="block-caption hidden-xs"><p>{{subtitle}}</p></div>{{/items}}';

var SponsoredTripTemplateSmall = '{{#items}}          <a href="/trip/{{guid}}" class="block" style="background: url(\'image?method=image.crop&context=package&id={{id}}&w=370&h=240\') center center no-repeat; background-size: cover;"></a><div class="block-label lightBrown no-accent">Sponsored Content</div><div class="block-content"><h4 class="sans-bold orange"><a href="/trip/{{guid}}">{{&title}}</a></h4><span class="partner-badge"></span></div>{{/items}}';

var SponsoredStoryTemplateSmall = '{{#items}}          <a href="/story/{{guid}}" class="block" style="background: url(\'image?method=image.icrop&context=stories&id={{id}}&w=370&h=240\') center center no-repeat; background-size: cover;"></a><div class="block-label lightBrown no-accent">Sponsored Content</div><div class="block-content"><h4 class="sans-bold orange"><a href="/story/{{guid}}">{{&title}}</a></h4><span class="partner-badge"></span></div>{{/items}}';

var StoryVenueEventMapTemplate = '{{#items}}<a href="/place/{{guid}}">{{name}}</a>{{/items}}';

function saveFullTrip() {


	trips = localStorage.getItem('trips');
	if (!trips) {
		trips = [];
	} else {
		trips = JSON.parse(trips);
	}

	console.log(trips);


	$('.single-featured').each(function() {
		trips.push({ id: parseInt($(this).attr('data-id')), type: 'venue', name: $(this).attr('data-name'), lat: parseFloat($(this).attr('data-lat')), lon: parseFloat($(this).attr('data-lon'))});
	});


	$('#toast').html('Saved '+trips.length+' items to <a href="/my-trip">My Trip</a>');
	showToast();
	localStorage.setItem("trips",JSON.stringify(trips));
}

function getExistingTrip(p) {
	$.getJSON('/api.json?method=events.package-user&guid='+p,function(d) {
		$('.header-title h1').text(d.name);
		getTrip(d.items);
	});
}

function getTrips() {

	$.getJSON('/api.json?method=events.packages-user',function(d) {
		console.log('saved trips:',d);
		$('#mytrips-container').html(Mustache.render(TripsTemplate,d));
	});
}


function removeTrip(id,el,reload) {


	//	If part of existing package
	if (id.packageID) {
		console.log(id.id,id.packageID);
		$.getJSON('/api.json?method=events.delete-user-package-item&item_id='+id.id+'&package_id='+id.packageID,function(d) {
			location.reload();
			return false;
		});

	}

	$(el).html('Add to Trip');
	$(el).attr('onclick',"addTrip("+id.id+",this);");

	id = parseInt(id.id) || 0;
	trips = localStorage.getItem('trips');
	if (!trips) {
		trips = [];
	} else {
		trips = JSON.parse(trips);
	}
	newTrips = [];
	for(t in trips) {
		console.log(id, trips[t]);
		if (trips[t].id == id) {
			console.log('remove!');
		} else {
			newTrips.push(trips[t]);
		}
	}
	localStorage.setItem("trips",JSON.stringify(newTrips));
	if (el) {
		$(el).closest('.my-trip-container').fadeOut();
	}
	updateStore();
	if (reload) {
		location.reload();
	} else {
		getTrip();
	}

}

function addToTrip(el,del) {
	trips = localStorage.getItem('trips');
	if (!trips) {
		trips = [];
	} else {
		trips = JSON.parse(trips);
	}
	$('.trip-button').text('Add to Trip');
	trips.push(el);
	localStorage.setItem("trips",JSON.stringify(trips));
	$(del).attr('onclick',"removeTrip({id:"+el.id+"},this);");
	$(del).html('Remove From Trip');
	updateStore();
}

function deleteTrip(id) {
	$.getJSON("/api.json?method=events.delete-user-package&id="+id,function(d) {
		$('#my-trip-'+id).fadeOut();
	})
}

function saveTrip() {
    trips = (JSON.parse(localStorage.trips));
    venueIDs = [];
    for(k in trips) {
    	if (!trips[k] || !trips[k].id) {
    		continue;
    	}
    venueIDs.push(trips[k].id);
    }

    $.ajax({
    	url: '/api.json?method=events.add-user-package',
    	method: 'post',
    	data: { name: $('.header-title h1').text(), venues: venueIDs },
    	success: function(d) {
    		clearTrip();
    		document.location.href = '/my-trips';
    	}

    });

    localStorage.setItem('workingTripName','');
}


function addTripMarkers(marker, secretMessage) {
	var infowindow = new google.maps.InfoWindow({
	  content: secretMessage
	});

	marker.addListener('click', function() {
	  infowindow.open(marker.get('map'), marker);
	});
}

function clearTrip() {
	localStorage.setItem('workingTripName','')
	localStorage.setItem('trips',JSON.stringify([]));
	location.reload();
}

function getTrip(tr,tripID) {

	$(document).ready(function() {

	  var map;
	  var markers = [];
	  var points = [];

	  if (_AUTH && _UID) {
	  	$('.header-title .hidden').removeClass('hidden');
	  	$('#my-trips-save-button, #my-trips-my-button').show();
	  }

	  if (title = localStorage.getItem('workingTripName')) {
	  	if (!package) {
	  		$('.header-title h1').text(title);
	  	}
	  	$('#trip-bar-name').text(title);
	  }

	    var options = {
	      center: {lat: 38.4404, lng: -122.7141},
	      zoom: 7,
	      scrollwheel: false,
	      mapTypeControl: false,
	      draggable: true,
	      streetViewControl: false,
	    }

	    trips = (JSON.parse(localStorage.trips));
	    if (tr && tr.length > 0) {
	    	trips = tr;
	    }
	    if (trips.length < 1) {
	    	console.log('No trips',tr);
	    	return;
	    }

	    map = new google.maps.Map(document.getElementById('my-trip-map'), { options });

	    markers = [];
	    tripHTML = '';



	    venueIDs = [];
	    var tripI = 0;
	    var tripWindowData = [];
	    var tripWindows = [];
	    var tripMarkers = [];
	    for(k in trips) {
	    	if (!trips[k] || !trips[k].id) {
	    		continue;
	    	}
	    tripI++;
	    console.log('trip::>',trips[k].id);
	    venueIDs.push(trips[k].id);

	      tripMarkers[tripI] = new google.maps.Marker({
	          id: count,
	          position: { lat: parseFloat(trips[k].lat), lng: parseFloat(trips[k].lon) },
	          map: map,
	          icon: {
	            url: '/partners/thepress/img/markers/partner.png',
		          size: new google.maps.Size(30, 36),
		          scaledSize: new google.maps.Size(30, 36),
	          },
	          optimized: false
	        });

	        tripWindowData[tripI] = '<div id="poi-window">'+
	          '<div class="poi-image" style="background: url(\'/partners/thepress/img/backgrounds/wine-pour.png\') center center no-repeat; background-size: cover;">'+
	          '</div>'+
	          '<div class="poi-title">'+
	            '<h2 class="serif brown"><a href="/place/'+trips[k].guid+'">'+trips[k].name+'</a></h2>'+
	          '</div>'+
	          '<div class="poi-content">'+
	            '<a class="sans-bold bg-lightOrange button button-xs" onclick="removeTrip({id:\''+trips[k].id+'\''+(package ? ',packageID:\''+package+'\'' : '')+'},this)">Remove from Trip</a>'+
	          '</div>'+
	          '<div class="poi-button">'+
	            ''+
	          '</div>'+
	        '</div>';



	        points.push( { lat: parseFloat(trips[k].lat), lng: parseFloat(trips[k].lon)  } );
        	markers.push(tripMarkers[tripI]);
	        addTripMarkers(tripMarkers[tripI],tripWindowData[tripI])
	    }

	    console.log(venueIDs);

	    var venueReq = '/api/v1/venues?ids=' + (venueIDs.join(','));
	    $.getJSON(venueReq,function(d) {
	    	console.log(d);
	    	if (package) {
	    		d.items = d.items.map(function(ti) {
	    			ti.package_id = package;
	    			return ti;
	    		});
	    	}
	    	console.log(d);
	    	tripHTML += Mustache.render(TripTemplate, d);

	    	$('#my-trip-data').html(tripHTML);
	    });

        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < markers.length; i++) {
          // Get all the visible markers on the map and set position
          if (markers[i].getVisible()) {
            bounds.extend(markers[i].getPosition());
          }
        }
        map.fitBounds(bounds);




  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: points,
      destinations: points,
      travelMode: 'DRIVING',
      drivingOptions: {
    departureTime: new Date(Date.now() + 1000),  // for the time N milliseconds from now.
    trafficModel: 'optimistic'
  },
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      avoidHighways: false,
      avoidTolls: false,
    }, dcallback);

  // Draw path
  var routePoints = getMaxDistance(points);

  var waypoints = [];
  for (ob in routePoints.waypoints) {
    p = routePoints.waypoints[ob]
    waypoints.push({'location': new google.maps.LatLng(p.lat,p.lng), 'stopover': true })
  }
  waypoints = waypoints.slice(0,7);
  console.log('start',routePoints.start, 'end', routePoints.end, 'way', routePoints.waypoints, 'waypoints',waypoints);
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
  directionsDisplay.setMap(map);
  directionsService.route({
    origin: routePoints.start,
    destination: routePoints.end,
    optimizeWaypoints: true,
    waypoints: waypoints,
    travelMode: 'DRIVING'
  }, function(response, status) {
    console.log(response);
    directionsDisplay.setDirections(response);
  });

  function dcallback(response, status) {
    meters = 0;
    seconds = 0;
    for(i=0;i<response.rows.length;i++) {
      if ((i+1) < response.rows[i].elements.length) {
        meters += response.rows[i].elements[i+1].distance.value;
        seconds += response.rows[i].elements[i+1].duration.value;
      }

    }
    miles = meters / 1609.34;
    time = secondsToTime(seconds);
    $('#itinerary-details-distance').text(Math.round(miles));
    $('#itinerary-details-time').text(Math.round(time.value));
  }




	 });




}





//	Date/time functions
function secondsToTime(sec) {
	if (sec < 60) {
		return { 'lang': sec + ' seconds', 'fmt': 'seconds', 'value': sec }
	} else if (sec < 3600) {
		return { 'lang': sec/60 + ' minutes', 'fmt': 'minutes', 'value': sec/60 }
	} else if (sec < 86400) {
		return { 'lang': sec/3600 + ' hours', 'fmt': 'hours', 'value': sec/3600 }
	} else {
		return { 'lang': sec/86400 + ' days', 'fmt': 'hours', 'value': sec/86400 }
	}
}


//	Geo functions
function distance(p1, p2, unit) {
	lat1 = p1.lat;
	lon1 = p1.lng;
	lat2 = p2.lat;
	lon2 = p2.lng;

	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	if (unit=="K") { dist = dist * 1.609344 }
	if (unit=="N") { dist = dist * 0.8684 }
	return dist
}

function getMaxDistance(points) {
	maxDis = 0;
	pointA = false;
	pointB = false;
	start = false;
	end = false;
	waypoints = [];
	for (var i = 0; i < points.length; i++) {
		for (var j = 0; j < points.length; j++) {
			if (j != i) {
				dist = distance(points[i],points[j]);
				if (dist > maxDis) {
					start = i;
					end = j;
					maxDis = dist;
				}
			}
		}
	}
	for (i=0;i<points.length;i++) {
		if (i == start || i == end) {
			continue;
		} else {
			waypoints.push(points[i]);
		}
	}
	start = points[start];
	end = points[end];

	return { start: start, end: end, waypoints: waypoints }
}



/*
	Sponsorships
*/
function getSponsoredTrip() {
  $.getJSON('/api/v1/packages?sponsored=1&',function(d) {
  	d1  = { items: d.items.slice(0,1)};
  	d2 = {items:d.items.slice(1,2)};
    $('#trip-teaser-sponsored').html(Mustache.render(SponsoredTripTemplate,d1));
    $('.trip-teaser-sponsored-small').html(Mustache.render(SponsoredTripTemplateSmall,d2));
  });
}

function getSponsoredStory() {
  $.getJSON('/api/v1/stories?sponsored=1&count=1',function(d) {
    $('.story-teaser-sponsored-small').html(Mustache.render(SponsoredStoryTemplateSmall,d));

  });
}

$(document).ready(function() {

	$('.tooltip-container').each(function() {
		console.log('tooltip');
		$(this).append('<div class="tooltip-text">'+$(this).attr('data-tooltip')+'<span></span></div>');
	});

	$(".header-title h1, #trip-bar-name").keypress(function(e){ return e.which != 13; });

	$('.header-title h1, #trip-bar-name').blur(function() {
		$('.header-title h1, #trip-bar-name').text($(this).text());
	});

	//	Add gradients
	$('.gradient-cover').css('position','relative').prepend('<div class="gradient-background"></div>');

});