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
var _TripsHTML = '';
var markerRefs = {};

var _Trip = function() {
	
}

//	Scroll Listener for maps
function isScrollListener() {
  $(window).scroll(function(e) {
    var anchors = $('.venue-anchor');
    for (var i = 0; i < anchors.length; ++i) {
      id = parseInt($(anchors[i]).attr('data-id'));
      if (id < 1 || isNaN(id) || !markerRefs[id]) {
      	continue;
      }
      console.log(id);
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
}

function isScrolledIntoView(elem) {
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height() + 120;

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}


function share(service,message) {

}

/* Opens toast */
function showToast(message) {
  	$('#toast').slideDown(100);
	$('#toast').html(message);
	setTimeout(function() { $('#toast').slideUp(); }, 5000);
}

/* Updates button language */
function updateButtons() {
	$('.trip-button').each(function() {
		thisID = $(this).attr('data-id');
		if (_Store.tripIDs.indexOf(parseInt(thisID)) > -1) {
			$(this).html('Remove From Trip');
			$(this).attr('onclick',"removeTrip({id:'"+thisID+"'})");
		}
	});
}

/* Finds .trip-receiver elements, adds existing trip dropdowns if they exist */
	function tripReceiverDropdowns(klass,action) {
		hideCurrentTrip = false;
		if (!action) {
			action = 'addItemToTrip';
		} else {
			hideCurrentTrip = true;
		}
		console.log('Updating receivers');
		$.getJSON('/api.json?method=events.packages-user', function(trips) {
			outerElement = '<ul class="dropdown-menu trip-receiver-dropdown --innerclass-- '+klass+'">';
			if (!hideCurrentTrip) {
				outerElement += '<li onclick="addItemToTrip(this, {id:false});">Current Trip</li>';
			}
			
			$(trips.items).each(function() {
				// addTrip({id: {{id}}, type:'venue',name: '{{name}}', lat: {{latitude}}, lon: {{longitude}} }, this);
				outerElement += '<li onclick="'+action+'(this,{id:'+this.package_id+'});">'+this.package_title+'</li>';
			});
			outerElement += '</ul>';
			_TripsHTML = outerElement;
			$('.trip-receiver').each(function() {
				console.log('trip rec')
				if ($(this).has('ul')) {
					$(this).find('ul').remove();
				}
				innerClass = $(this).attr('data-dir');
				element = outerElement;
				if (innerClass) {
					outerElement = outerElement.replace(/--innerclass--/,innerClass)
				}
				$(this).append(outerElement);
			});
		});
	}

	function resetTripReceivers() {
		$('.trip-receiver').each(function() {
			console.log('resetting trip rec')
			$(this).append(_TripsHTML);
		});
		$('.trip-receiver').click(function() {
			console.log('clicked trip rec')
			$(this).toggleClass('active');
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
					console.log('uh?',i);
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

		resetTripReceivers();
		tripReceiverDropdowns();


		$('#trip-bar-name, .editable-input input').on('blur keypress',function(e) {
			if (e.type === 'keypress') {
				$('#editable-title').text($(this).text());
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
	$(e).closest('.dismiss-container').fadeOut();	
	localStorage.setItem('messageDismissed',true);
}

//	Manually sets nav
function setNav(type) {
	$('.nav-'+type).addClass('active');
}

//	Available video display
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


function gallerySelect(e) {
  $('#gallery-image').html('<img style="max-width:100%;" src="'+$(e).find('img').attr('src').replace(/w=\d+/,'w=700').replace(/h=\d+/,'h=300')+'" />');
}

gigya.accounts.getAccountInfo({callback:onGetAccount});

//	Resolves session from API
function setSession(uid,e) {
	$.getJSON('/api.json?method=auth.gigya-resolve&uid='+uid+'&email='+e, function(d) {
		if (d.uid) {
			_AUTH = true;
			_UID = d.uid;
		}
	});
}

//	Opens modal
function openModal(url) {
	$('#modal-background').show();
	$('#modal').html('<iframe src="'+url+'" width=100% height="200"></iframe>');
	$('#modal').show();
	$('#modal-background').click(function() {
		$('#modal').hide();
		$('#modal-background').hide();
	})
}

//	General modal init
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

//	Sets Gigya data ::> login area
function onGetAccount(response) {
	console.log(response);
	if (response.isRegistered && response.isVerified) {
		var nickname = response.profile.nickname;
		if (!nickname) {
			nickname = response.profile.email.split('@')[0];
		}
		$('.auth-required').removeClass('auth-required');
		$('.tools .signin, .fixed-tools .signin').hide();
		$('.tools .login, .fixed-tools .login').removeClass('hidden').show();
		$('.dropdown.login a.dropdown-toggle, .fixed-tools .toggle-signin, .login-name').html(nickname+'<i class=icon-chevron></i>').removeClass('hidden');

		setSession(response.UID,response.profile.email)
	}
}

//	Gigya login callback
function onLogin(response) {
	if (response.errorCode > 0) {
		$('#login-error').text(response.errorMessage);
	} else {

		$('.auth-required').removeClass('auth-required');

		setSession(response.UID,response.profile.email);
		var nickname = response.profile.nickname;
		if (!nickname) {
			nickname = response.profile.email.split('@')[0];
		}
	    $('.modal').modal('hide');
	    // $('nav li.signin').addClass('hidden');

		$('.tools .signin, .fixed-tools .signin').hide();
		$('.tools .login, .fixed-tools .login').removeClass('hidden').show();
		$('.dropdown.login a.dropdown-toggle, .fixed-tools .toggle-signin, .login-name').html(nickname+'<i class="icon-chevron"></i>').removeClass('hidden');
	}
}

//	Gigya register callback
function onRegister(response) {
	console.log('Resp',response)
	if (response.errorCode == 206001) {
		$('#register-error').text('Please verify your email in order to complete your profile. Check your email for a profile verification link. <div>You will not have access to writing comments, managing newsletters or alerts, and updating your profile until you verify your account with the link provided. The verification link in the email will expire in 24 hours.</div>');
	} else {
		$('#register-error').html(response.errorMessage);
	}
}

//	Gigya logout callback
function onLogout(response) {
	location.reload();
}

//	Gigya logout init
function gigyaLogout() {
	gigya.accounts.logout({callback: onLogout});
}

//	Gigya register init
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

//	Gigya login init
function gigyaLogin() {
	e = $('#login-email').val();
	p = $('#login-password').val();
	gigya.accounts.login({loginID: e, password: p, callback: onLogin});
}

//	Determines if trip bar should show based on current/saved items
function evalTripBar() {
	console.log('items:',_Store.tripIDs.length,_Store);
	if (JSON.parse(localStorage.getItem('trips')) && JSON.parse(localStorage.getItem('trips')).length > 0) {
		$('#trip-bar').show();
		lang = 'item';
		if (JSON.parse(localStorage.getItem('trips')).length > 1) {
			lang += 's';
		}
		$('.trip-details span').text(JSON.parse(localStorage.getItem('trips')).length+' '+lang)
		$('.trip-details a.current i').text(JSON.parse(localStorage.getItem('trips')).length);
		if (tname = localStorage.getItem('workingTripName')) {
			$('#trip-bar-name, #editable-title').text(tname);
		}
		$('.trip-receiver').each(function() {
			console.log()
		});
	}

}


var TripTemplate = '<section class="container directory-alt">{{#items}}<div class=row><div class="col-sm-12 directory-list"><div class="row directory-item"><div class="col-sm-12 item-container"><div class=row><div class="hidden-xs col-sm-2 directory-pic"><a href="/place/{{guid}}"><img alt=""src="/image?method=image.icrop&context={{context}}&id={{id}}&w=300&h=-1"></a></div><div class="col-sm-7 directory-info"><h3 class="brown serif"><a href=#>{{{name}}}</a></h3><span style="display:none;" class=partner-badge></span><h4 class="sans-bold orange">{{neighborhood}}</h4><div class=address><p>{{#street}}{{street}},<br>{{/street}}{{#city}}{{city}},{{/city}} {{#state}}{{state}}{{/state}} {{#zip}}{{zip}}{{/zip}}{{#phone}}<br>{{phone}}<br>{{/phone}}<span style="display:none;">10AM-5PM</span> <span class="orange status">Open</span></div></div><div class="hidden-xs col-sm-3 directory-button"><a onclick="removeTrip({id:\'{{id}}\'{{#package_id}},packageID:\'{{package_id}}\'{{/package_id}}},this)" class="sans-bold bg-lightOrange button button-xs">Remove From Trip</a> <a  class="trip-receiver sans-bold bg-lightOrange button button-xs" data-venue_id="{{id}}" data-package-id="{{package_id}}">Move To Trip</a> <a href=# class="sans-bold orange">Website</a> <a href=# class="sans-bold orange"><i class="fa fa-location-arrow"></i> Directions</a></div><div class="col-sm-4 directory-buttons hidden-lg hidden-md hidden-sm"><ul><li><a onclick="removeTrip({id:\'{{id}}\'{{#package_id}},packageID:\'{{package_id}}\'{{/package_id}}},this)" class="sans-bold bg-lightOrange button button-xs">Remove From Trip</a><li><a href=# class="sans-bold orange"><i class="fa fa-map-o"></i> Map</a></ul></div></div></div></div></div></div>{{/items}}</section>';

var TripsTemplate = "<section class='directory container'><div class='col-sm-12 directory-list'>{{#items}}<div id=\"my-trip-{{package_id}}\" class=\"directory-item row\"><div class=\"hidden-xs col-xs-2 directory-button\">{{#package_id}}<img src='/image?method=image.icrop&context=package.items&id={{package_id}}&w=600&h=-1' />{{/package_id}}</div><div class=\"col-xs-6 directory-info\"><h3 class=\"brown serif\"><a href='#' id='' class='editable-trip-title serif brown editable editable-click' style='display: inline-block;'>{{package_title}}</a></h3><h4 style='text-align:left;' class=\"hidden-xs orange sans-bold\">{{date}}</h4><p>{{package_text}}</p><div class=\"hidden-xs address\"><p></div><div class=\"address hidden-lg hidden-md hidden-sm\"><p></div></div><div class=\" col-xs-4 directory-button\"><a href=/my-trip/{{package_guid}} class=\"sans-bold bg-lightOrange button button-xs\">View Trip</a> <a onclick=\"deleteTrip({{package_id}});\" class=\"sans-bold bg-lightOrange button button-xs\">Delete Trip</a></div></div>{{/items}}</div></section>";

var SponsoredTripTemplate = '{{#items}}<a href="/trip/{{guid}}" class="block sponsored" style="background: url(\'image?method=image.crop&context=package&id={{id}}&w=370&h=240\') center center no-repeat; background-size: cover;">            <div class="block-label white no-accent">Sponsored Content</div><div class="block-label white">{{&neighborhood}}</div><div class="block-content vert-center"><h3 class="white"	>{{&title}}</h3></div></a><div class="block-caption hidden-xs"><p>{{subtitle}}</p></div>{{/items}}';

var SponsoredTripTemplateSmall = '{{#items}}          <a href="/trip/{{guid}}" class="block" style="background: url(\'image?method=image.crop&context=package&id={{id}}&w=370&h=240\') center center no-repeat; background-size: cover;"></a><div class="block-content"><span class="partner-badge"></span><h4 class="sans-bold orange"><a href="/trip/{{guid}}">{{&title}}</a></h4></div>{{/items}}';

var SponsoredStoryTemplateSmall = '{{#items}}          <a href="/story/{{guid}}" class="block" style="background: url(\'image?method=image.icrop&context=stories&id={{id}}&w=370&h=240\') center center no-repeat; background-size: cover;"></a><div class="block-label lightBrown no-accent">Sponsored Content</div><div class="block-content"><h4 class="sans-bold orange"><a href="/story/{{guid}}">{{&title}}</a></h4><span class="partner-badge"></span></div>{{/items}}';

var MapItineraryTemplate = '{{#items}}<div class="row itinerary-item ui-sortable-handle"><div class="col-xs-2"><div class="num sans-bold">{{counter}}</div></div><div class="col-xs-8 no-padding"><h4 class="sans-bold olive item-title">{{name}}</h4><p class="address sans black">{{address}}</p></div><div class="col-xs-1 no-padding"><a href="#" onclick="removeTrip({id:{{id}}});updateMapItinerary();" class="remove-item sans-bold lightBeige">×</a></div></div>{{/items}}';

var StoryVenueEventMapTemplate = '{{#items}}<a href="/place/{{guid}}">{{name}}</a>{{/items}}';

function saveFullTrip() {


	trips = localStorage.getItem('trips');
	if (!trips) {
		trips = [];
	} else {
		trips = JSON.parse(trips);
	}


	$('.single-featured').each(function() {
		thisID = parseInt($(this).attr('data-id'))
		for(i=0;i<trips.length;i++) {
			if (trips[i].id == thisID) {
				return;
			}
		}
		trips.push({ id: thisID, type: 'venue', name: $(this).attr('data-name'), lat: parseFloat($(this).attr('data-lat')), lon: parseFloat($(this).attr('data-lon'))});
	});


	$('#toast').html('Saved '+trips.length+' items to <a href="/my-trip">My Trip</a>');
	showToast();
	localStorage.setItem("trips",JSON.stringify(trips));
	evalTripBar();
}

function getExistingTrip(p) {
	$.getJSON('/api.json?method=events.package-user&guid='+p,function(d) {
		$('.header-title h1').text(d.name);
		$('#trip-description').text(d.description);
		console.log('package data::',d);
		getTrip(d.items);

	});
}

function getTrips() {

	$.getJSON('/api.json?method=events.packages-user',function(d) {
		console.log('saved trips:',d);
		$('#mytrips-container').html(Mustache.render(TripsTemplate,d));
		
      $('.editable-trip-title').editable({
        type: 'text',
        title: 'Name your trip',
        success: function(res,newval) {
        	
        }
      });

	});
}


function removeTrip(id,el,reload) {
	console.log('REMOVING:',id)

	//	If part of existing package
	if (id.packageID) {
		console.log(id.id,id.packageID);
		$.getJSON('/api.json?method=events.delete-user-package-item&item_id='+id.id+'&package_id='+id.packageID,function(d) {
			location.reload();
			return false;
		});

	}


	ref = {
		name: '',
		lat: 0,
		lon: 0
	};
	id = parseInt(id.id) || 0;
	console.log('REMOVING',id);
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
			ref.name = trips[t].name;
			ref.lat = trips[t].lat;
			ref.lon = trips[t].lon;
		} else {
			newTrips.push(trips[t]);
		}
	}
	$(el).html('Add to Trip');
	$(el).attr('onclick',"addTrip({id:"+id.id+", type:'venue', name:'"+ref.name+"', lat:"+ref.lat+", lon:"+ref.lon+"},this);");	
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
	evalTripBar();
}

/* Moves item from one trip to another saved trip */
function moveItemToTrip(el,d) {

	pItem = $(el).closest('.trip-receiver').attr('data-venue_id');
	pTo = d.id;
	pFrom = $(el).closest('.trip-receiver').attr('data-package-id');
	$.getJSON('/api.json?method=events.user-package-move&to='+pTo+'&from='+pFrom+'&id='+pItem, function(data) {
		$(el).closest('.item-container').fadeOut();	
		showToast('Moved Venue')
	});
	// 
}

/* Adds to either an existing trip or to working trip */
function addItemToTrip(el,tr) {
	var tid = $(el).closest('.trip-receiver').attr('data-id');
	var name = $(el).closest('.trip-receiver').attr('data-name');
	var type = $(el).closest('.trip-receiver').attr('data-type');
	var lat = $(el).closest('.trip-receiver').attr('data-latitude');
	var lon = $(el).closest('.trip-receiver').attr('data-longitude');
	var addr = $(el).closest('.trip-receiver').attr('data-address');

	if (!tr.id) {
		trips = localStorage.getItem('trips');
		if (!trips) {
			trips = [];
		} else {
			trips = JSON.parse(trips);
		}
		for(i=0;i<trips.length;i++) {
			if (trips[i].id == tid) {
				console.log('already added');
				return;
			}
		}
		trips.push({type: type, name: name, lat: lat, lon: lon, id:tid });
		localStorage.setItem("trips",JSON.stringify(trips));	
		showToast('Added to current trip');		
		evalTripBar();
	} else {
		$.getJSON('/api.json?method=events.add-item-user-package&id='+tr.id+'&type='+type+'&name='+name+'&tid='+tid, function(d) {
			console.log(d);
		});
		showToast('Added to saved trip');
	}
	
	// update receivers
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

function cloneTrip(id) {
	$.getJSON("/api.json?method=events.clone-package&id="+id, function(d) {
		document.location.href = "/my-trips";
	});
}

function saveTrip() {
    trips = (JSON.parse(localStorage.trips));
    venueIDs = [];
    for(k in trips) {
    	if (!trips[k] || !trips[k].id) {
    		continue;
    	}
    venueIDs.push(trips[k].type+':'+trips[k].id);
    }
    var tripName = $('.header-title h1').text();
    if (!tripName) {
    	tripName = localStorage.workingTripName;
    }
    $.ajax({
    	url: '/api.json?method=events.add-user-package',
    	method: 'post',
    	data: { name: tripName, description: $('#trip-description').val(), venues: venueIDs },
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

	  $('#my-trips-save-button').show();

	  if (_AUTH && _UID) {
	  	$('.header-title .hidden').removeClass('hidden');
	  	$('#my-trips-save-button, #my-trips-my-button').show();
	  }

	  if (title = localStorage.getItem('workingTripName')) {
	  	if (typeof package !== 'undefined' && !package) {
	  		$('.header-title h1').text(title);
	  	}
	  	$('#trip-bar-name, #editable-title').text(title);
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

	    eventIDs = [];
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
	    console.log('trip::>',trips[k]);
	    // venueIDs.push(trips[k].id);
	    console.log(trips[k]);
	    if (trips[k].type == "events" || trips[k].type == 'event') {
	    	venueIDs.push('event:'+trips[k].id);
	    } else if (trips[k].type == "venue") {
	    	venueIDs.push('venue:'+trips[k].id);
	    }
	    	//tripMarkers[tripI]
	      x  = new google.maps.Marker({
	          id: count,
	          
	          map: map,
	          icon: {
	            url: '/partners/thepress/img/markers/partner.png',
		          size: new google.maps.Size(30, 36),
		          scaledSize: new google.maps.Size(30, 36),
	          },
	          optimized: false
	        });

        tripMarkers[tripI] = new google.maps.Marker({
          id: count,
          position: { lat: parseFloat(trips[k].lat), lng: parseFloat(trips[k].lon) },
          map: map,

          icon: {
          	anchor: new google.maps.Point(250, 480),
            path: 'M258.5,0C144.7,0,62,79.5,62,166.1c0,52.4,21.7,80.4,50.7,131.1C170.6,398.6,258.5,507,258.5,507 s87.9-108.4,145.8-209.8c29-50.7,50.7-78.7,50.7-131.1C455,79.5,372.3,0,258.5,0',
            scale: .1,
            fillColor: _MARKER_FILL_COLOR,
            fillOpacity: .9,
            size: new google.maps.Size(60, 72),
            scaledSize: new google.maps.Size(30, 36),
            
            origin: new google.maps.Point(0, 0)
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


	        if (trips[k].lat && trips[k].lon) {
	        	points.push( { lat: parseFloat(trips[k].lat), lng: parseFloat(trips[k].lon)  } );
	        }
	        
        	markers.push(tripMarkers[tripI]);
	        addTripMarkers(tripMarkers[tripI],tripWindowData[tripI])
	    }
	    console.log('events',eventIDs,'venues',venueIDs);


	    var venueReq = '/api/v1/elements?ids=' + (venueIDs.join(','));
	    $.getJSON(venueReq,function(d) {
	    	console.log(d);
	    	if (package) {
	    		d.items = d.items.map(function(ti) {
	    			ti.package_id = package;

	    			if (!ti.story_abstract) {
	    				ti.story_abstract = '???';
	    			}
	    			return ti;
	    		});
	    	}
	    		d.items = d.items.map(function(ti) {
	    			ti.package_id = package;
	    			if (ti.type == 'event') {
	    				ti.context = 'event.yield';
	    			}
	    			if (ti.type == 'venue') {
	    				ti.context = 'venue';
	    			}
	    			console.log('type-->',ti.type);
	    			ti['is:'+ti.type] = true;
	    			if (!ti.story_abstract) {
	    				ti.story_abstract = '???';
	    			}
	    			return ti;
	    		});
	    	tripHTML += Mustache.render(TripTemplate, d);

	    	$('#my-trip-data').html(tripHTML);
	    	tripReceiverDropdowns('left','moveItemToTrip');
	    	resetTripReceivers();
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
  console.log('points',points);
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
    console.log('-->',p.lat,p.lng)
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

function setFooterActive() {
	$('footer').addClass('cover');
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
		$('.header-title h1, #trip-bar-name, #editable-title').text($(this).text());
	});

	//	Add gradients
	$('.gradient-cover').css('position','relative').prepend('<div class="gradient-background"></div>');

});