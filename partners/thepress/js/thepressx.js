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
var _WORKING_TRIP;
var _TRIPS = {};
var markerRefs = {};

var _Trip = function() {
	
}

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
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

	function getCurrentWorkingTrip() {
		if (localStorage.workingTrip) {
			_WORKING_TRIP = JSON.parse(localStorage.workingTrip);

			$('.dropdown-toggle .tripcount').attr('data-id',_WORKING_TRIP.id);
			$('.dropdown-toggle .tripname').html(_WORKING_TRIP.name);		
			console.log(_TRIPS, _WORKING_TRIP);
			TripRefs = {};
			if (_WORKING_TRIP && _WORKING_TRIP != null) {
				console.log('Master:',_TRIPS[_WORKING_TRIP.id]);
				_WORKING_TRIP.items = (_TRIPS != null && _TRIPS[_WORKING_TRIP.id] != null && _TRIPS[_WORKING_TRIP.id].items != null ? _TRIPS[_WORKING_TRIP.id].items : []);
				_WORKING_TRIP.count = _WORKING_TRIP.items.length;
			}
			$('.dropdown-toggle .tripcount').html(_WORKING_TRIP.count);			
			if (_WORKING_TRIP && _WORKING_TRIP != null && _WORKING_TRIP.items != null) {
				for(i=0;i<_WORKING_TRIP.items.length;i++) {
					key = _WORKING_TRIP.items[i].package_item_element_type+':'+_WORKING_TRIP.items[i].package_item_element_id;
					console.log(key);
					TripRefs[key] = true;
				}				
			}

			$('.trip-item-trigger').each(function(t) {

				itemType = $(this).attr('data-type');
				itemID = $(this).attr('data-id');
				key = itemType+':'+itemID;

				if (TripRefs[key]) {
					$(this).html('Remove From Trip').removeClass('bg-olive').addClass('bg-lightBrown').attr('data-trip-item-type','remove');
				} else {
					$(this).html('Add To Trip').removeClass('bg-brown').addClass('bg-olive').attr('data-trip-item-type','');
				}

			});
		}
	}

	function SetWorkingTrip(id,el) {
		console.log('~~~->',_TRIPS[id]);
		tripCount = ($(el).find('.tripcount').text());
		tripName = $(el).find('.tripname').text();
		$('.dropdown-toggle .tripcount').html(tripCount);
		$('.dropdown-toggle .tripcount').attr('data-id',$(el).attr('data-id'));
		$('.dropdown-toggle .tripname').html(tripName);	

		_WORKING_TRIP = { name: tripName, id: $(el).attr('data-id'), count: tripCount, items: _TRIPS[id].items }	
		localStorage.setItem('workingTrip', JSON.stringify(_WORKING_TRIP));
		getCurrentWorkingTrip();
	}

/* Finds .trip-receiver elements, adds existing trip dropdowns if they exist */
	function tripReceiverDropdowns(klass,action) {
		console.log('tripReceiverDropdowns()');
		hideCurrentTrip = false;
		if (!action) {
			action = 'addItemToTrip';
		} else {
			hideCurrentTrip = true;
		}
			tripLength = 0;
		$.getJSON('/api.json?method=events.packages-user', function(trips) {

			dropdownElement = '';
			outerElement = '<ul class="dropdown-menu trip-receiver-dropdown --innerclass-- '+klass+'">';
			if (!hideCurrentTrip) {
				outerElement += '<li onclick="addItemToTrip(this, {id:false});">Current Trip</li>';
			}
			
			tripLength = trips.length;

			$(trips.items).each(function() {
				dropdownElement += '<li><a href="#" data-id="'+this.package_id+'" onclick="SetWorkingTrip('+this.package_id+',this)"><span class="tripcount">'+this.package_length+'</span> <span class="tripname">'+this.package_title+'</span></a></li>';
				outerElement += '<li onclick="'+action+'(this,{id:'+this.package_id+'});">'+this.package_title+'</li>';
				$('.tripcount[data-id="'+this.package_id+'"]').text(this.package_length);
				_TRIPS[this.package_id] = this;



			});
			if (trips.items != null && trips.items.length > 0) {
				dropdownElement += '<li role="separator" class="divider"></li>';
			}			
			if (trips.items == null || trips.items.length < 1) {
				tripLength = 0;
				_WORKING_TRIP = false;
				localStorage.setItem('workingTrip',_WORKING_TRIP);
			}
			dropdownElement += '<li><a href="#" onclick="initNewTrip();"> Create New Trip</a></li> ';
			outerElement += '</ul>';
			_TripsHTML = outerElement;

			$('#dropdown-trip-selector').html(dropdownElement);
			$('.trip-receiver').each(function() {
				/*
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
				*/
			});
			getCurrentWorkingTrip();
			if (!_AUTH || tripLength < 1) {
				$('#tripselect-noauth').show();
				$('.tripselect .dropdown-toggle').hide();
			} else {
				$('#tripselect-noauth').hide();
				$('.tripselect .dropdown-toggle').show();				
			}
				$('#auth-container').show();

		});


	}

	function resetTripReceivers() {
		console.log('resetTripReceivers()');
		$('.trip-item-trigger').click(function() {
			if (!_AUTH) {
				initNewTrip();
				return;
			}
			if (!_WORKING_TRIP) {
				initNewTrip();
				return;
			}
			var triggerType = $(this).attr('trigger-type');
			tid = $(this).attr('data-id');
			type = $(this).attr('data-type');
				if (type == 'venue') {
					type = 'venues';
				}
			action = $(this).attr('data-trip-item-type');

			url = '/api.json?method=events.add-item-user-package&id='+_WORKING_TRIP.id+'&tid='+tid+'&type='+type;
			rurl = '/api.json?method=events.delete-user-package-item&package_id='+_WORKING_TRIP.id+'&item_id='+tid;
			$('.dropdown-toggle > .tripname, .dropdown-toggle > .tripcount').addClass('highlighted');
			setTimeout(function() {
				$('.dropdown-toggle > .tripname, .dropdown-toggle > .tripcount').removeClass('highlighted');
			},1000);
			if (action == 'remove') {
				$.getJSON(rurl, function(d) {
					tripReceiverDropdowns();
				});
			} else {
				$.getJSON(url, function(d) {
					tripReceiverDropdowns();
				});				
			}

		})

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

		setTimeout(function() {
			resetTripReceivers();
			tripReceiverDropdowns();
			getCurrentWorkingTrip();
		},500);


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

function endSession() {
	$.getJSON('/api.json?method=auth.gigya-logout',function(d) {

	});
}

//	Opens modal
function openModal(url,title) {
	$('#modal-background').show();
	$('#modal').html('<div id="modal-title"><svg id="modal-close" onclick="$(\'#modal\').hide();$(\'#modal-background\').hide();$(\'body\').removeClass(\'openmodal\');" width="24" height="24" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"></path></svg><h3>'+title+'</h3></div><iframe frameborder=0 src="'+url+'" width=100% height="100%"></iframe>');
	$('#modal').show();
	$('body').addClass('openmodal');
	$('#modal-background').click(function() {
		$('#modal').hide();
		$('#modal-background').hide();
		$('body').removeClass('openmodal');
	})
}

function openCellarPass(url) {

}

//	General modal init
function showModal(type) {
	if (type == 'register') {
		$('.modal-dialog.trips-register').show();
		$('.modal-dialog.trips-login').hide();
		$('.modal-dialog.trips-lostpassword').hide();
	} else if (type == 'stdlogin') {
		$('.modal-dialog.stdregister').hide();
		$('.modal-dialog.stdlogin').show();
		$('.modal-dialog.stdlostpassword').hide();
	} else if (type == 'stdregister') {
		$('.modal-dialog.stdregister').show();
		$('.modal-dialog.stdlogin').hide();
		$('.modal-dialog.stdlostpassword').hide();		
	} else if (type == 'lostpassword') {
		$('.modal-dialog.trips-login').hide();
		$('.modal-dialog.trips-register').hide();
		$('.modal-dialog.lostpassword').show();
	} else if (type == 'nametrip') {
		$('.modal-dialog.trips-register').hide();
		$('.modal-dialog.trips-login').hide();
		$('.modal-dialog.trips-name').show();		
	}else {
		$('.modal-dialog.trips-login').show();
		$('.modal-dialog.trips-register').hide();
		$('.modal-dialog.trips-lostpassword').hide();
		setTimeout(function() {
  		$('#login-email').focus();
		}, 300);
	}
}

//	Sets Gigya data ::> login area
function onGetAccount(response) {
	console.log('Gigya:',response);
	if (response.isRegistered && response.isVerified) {
		var nickname = response.profile.nickname;
		if (!nickname) {
			nickname = response.profile.email.split('@')[0];
		}
		$('.auth-required').removeClass('auth-required');
		$('.login-status').show();
		$('.login-name').show();
		$('.tools .signin, .fixed-tools .signin').hide();
		$('.tools .login, .fixed-tools .login').removeClass('hidden').show();
		$('.toggle-signin').hide();
		$('.toggle-signout').show();
		$('.dropdown.login a.dropdown-toggle, .fixed-tools .toggle-signout').html('Sign Out').removeClass('hidden');

		setSession(response.UID,response.profile.email)
	} else {
		$('.login-status').hide();
		$('.login-name .toggle-signin').text('Log In');	
		$('.toggle-signout').hide(); // ('hidden');
		$('.nonauth-required').show();
	}

}

//	Gigya login callback
function onLogin(response) {
	if (response.errorCode > 0) {
		$('#login-error').text(response.errorMessage + response.errorCode);
		$('.nonauth-required').show();		
	} else {

		$('.auth-required').removeClass('auth-required');
		$('.nonauth-required').hide();

		setSession(response.UID,response.profile.email);
		var nickname = response.profile.nickname;
		if (!nickname) {
			nickname = response.profile.email.split('@')[0];
		}
	    $('.modal').modal('hide');
	    // $('nav li.signin').addClass('hidden');

		$('.tools .signin, .fixed-tools .signin, .toggle-signin').hide();
		$('.toggle-signout').removeClass('hidden').html('Log Out').show();
		// $('.dropdown.login a.dropdown-toggle, .fixed-tools .toggle-signin, .login-name').html('Log Out').removeClass('hidden');
	}
}

//	Gigya register callback
function onRegister(response) {
	if (response.errorCode > 0) {
		$('#trip-register-error, #register-error').show();
	} else {
		$('#trip-register-error, #register-error').hide();
	}
	if (response.errorCode == 206001) {
		$('#trip-register-error, #register-error').text('A verification email was sent to the email address used to sign up. Please confirm the pending verification to log in to your account.');
	} else if (response.errorCode == 400002) {
		$('#trip-register-error, #register-error').text('Either username or email should be provided');
	} else {
		$('#trip-register-error, #register-error').html(response.errorMessage);
	}
}

//	Gigya logout callback
function onLogout(response) {
	endSession();
	_WORKING_TRIP = {};
	localStorage.setItem('workingTrip',false);
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
		$('#trip-register-error').text('Passwords do not match!');
		return false;
	}
	gigya.accounts.initRegistration({callback: function(r) {
		token = r.regToken
		gigya.accounts.register({email: e, password: p, regToken: token, callback: onRegister, finalizeRegistration: true });
	}});
}

function gigyaTripsRegister() {
	e = $('#trip-register-email').val();
	p = $('#trip-register-password').val();
	p2 = $('#trip-register-password2').val();
	if (p !== p2) {
		$('#trip-register-error').text('Passwords do not match!');
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

function gigyaTripsLogin() {
	e = $('#trip-login-email').val();
	p = $('#trip-login-password').val();	
	gigya.accounts.login({loginID: e, password: p, callback: onTripsLogin});
}

function onTripsLogin(response) {
	if (response.errorCode > 0) {
		if (response.errorCode == 403042) {
			// incorrect pw
		}
	} else {
		setSession(response.UID,response.profile.email);
		var nickname = response.profile.nickname;
		if (!nickname) {
			nickname = response.profile.email.split('@')[0];
		}
	    //$('.modal').modal('hide');
	    // $('nav li.signin').addClass('hidden');

		//$('.tools .signin, .fixed-tools .signin').hide();
		//$('.tools .login, .fixed-tools .login').removeClass('hidden').show();
		$('.toggle-signout').html('Log Out');
		$('.toggle-signout').show();
		$('.toggle-signin').hide();		
		showModal('nametrip')
	}
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

''


var TripTemplate = '<section class="container directory-alt"><div class="row"><div class="col-sm-12 single-toolbar"><ul><li class="social-label lightBrown hidden-xs">share</li><li class="social"><a href="https://twitter.com/home?status=57ea88bcb96ef:%20http://events.sfgate.com/trip/{{guid}}" class="orange sans-bold"><i class="fa fa-twitter"></i></a></li><li class="social"><a href="http://www.facebook.com/sharer.php?u=http://events.sfgate.com.com/trip/{{guid}}" class="orange sans-bold"><i class="fa fa-facebook-square"></i></a></li></ul></div></div>{{#items}}<div class=row><div class="col-sm-12 directory-list"><div class="row directory-item"><div class="col-sm-12 item-container"><div class=row><div class="hidden-xs col-sm-2 directory-pic"><a href="/place/{{venue_guid}}"><img alt=""src="/image?method=image.icrop&context={{context}}&id={{id}}&w=300&h=-1" style="margin-bottom:5px;"></a></div><div class="col-sm-7 directory-info"><h3 class="brown serif"><a href="/place/{{venue_guid}}">{{{name}}}</a></h3><span style="display:none;" class=partner-badge></span><h4 class="sans-bold orange">{{neighborhood}}</h4><div class=address><p>{{#street}}{{street}},<br>{{/street}}{{#city}}{{city}},{{/city}} {{#state}}{{state}}{{/state}} {{#zip}}{{zip}}{{/zip}}{{#phone}}<br>{{phone}}<br>{{/phone}}<span style="display:none;">10AM-5PM</span> <span class="orange status" style="display:none;">Open</span></div></div><div class="hidden-xs col-sm-3 directory-button"><a onclick="removeTrip({id:\'{{id}}\'{{#package_nid}},packageID:\'{{package_nid}}\'{{/package_nid}}},this)" class="sans-bold bg-lightOrange button button-xs">Remove From Trip</a> <a  class="trip-receiver sans-bold bg-lightOrange button button-xs" data-venue_id="{{id}}" data-package-id="{{package_id}}" style="display:none;">Move To Trip</a> <a href=# class="sans-bold orange" style="display:none;">Website</a> <a href=# class="sans-bold orange" style="display:none;"><i class="fa fa-location-arrow"></i> Directions</a></div><div class="col-sm-4 directory-buttons hidden-lg hidden-md hidden-sm"><ul><li><a onclick="removeTrip({id:\'{{id}}\'{{#package_id}},packageID:\'{{package_id}}\'{{/package_id}}},this)" class="sans-bold bg-lightOrange button button-xs">Remove From Trip</a><li><a href=# class="sans-bold orange"><i class="fa fa-map-o"></i> Map</a></ul></div></div></div></div></div></div>{{/items}}</section>';

var TripsTemplate = "<section class='directory container'><div class='col-sm-12 directory-list'>{{^items}} <h3 style='text-align:center;'>You haven’t created anything yet!</h3> <p>Create your first Trip. Visit the map page and use the filters to sort through over 200 Napa and Sonoma wineries. <p> <p>Make sure you log in or create an account to access and customize The Press Trip Planner: Name and save your trip, add places and events, and access your trip map and driving directions right from your mobile device.</p> {{/items}}{{#items}}<div id=\"my-trip-{{package_id}}\" class=\"directory-item row\"><div class=\"col-xs-9 directory-info mytrips-item\"><h3 class=\"brown serif\"><a href='/my-trip/{{package_guid}}' id='' class='editable-trip-title serif brown ' style='display: inline-block;'>{{package_title}}</a></h3><div class=\"mytrips-meta\"><h4 style='text-align:left;' class=\"hidden-xs orange sans-bold\">{{date}}</h4> <h4>{{package_length}} items</h4></div> <div class=\"mytrips-actions\"><a class='button button-sm bg-clear actions'>View Trip</a> <a class='button button-sm bg-red actions'>Remove Trip</a></div><p>{{package_text}}</p><div class=\"hidden-xs address\"><p></div><div class=\"address hidden-lg hidden-md hidden-sm\"><p></div></div><div class=\"hidden-xs col-xs-3 directory-button\">{{#package_id}}<a href='/my-trip/{{package_guid}}'><img src='/image?method=image.icrop&context=package.items&id={{package_id}}&w=600&h=-1&noimg=/partners/thepress/img/thepress-default.png' /></a>{{/package_id}}</div></div>{{/items}}</div></section>";

var o0TripsTemplate = "<section class='directory container'><div class='col-sm-12 directory-list'>{{^items}} <h3 style='text-align:center;'>You haven’t created anything yet!</h3> <p>Create your first Trip. Visit the map page and use the filters to sort through over 200 Napa and Sonoma wineries. <p> <p>Make sure you log in or create an account to access and customize The Press Trip Planner: Name and save your trip, add places and events, and access your trip map and driving directions right from your mobile device.</p> {{/items}}{{#items}}<div id=\"my-trip-{{package_id}}\" class=\"directory-item row\"><div class=\"col-xs-6 directory-info\"><h3 class=\"brown serif\"><a href='/my-trip/{{package_guid}}' id='' class='editable-trip-title serif brown ' style='display: inline-block;'>{{package_title}}</a></h3><h4 style='text-align:left;' class=\"hidden-xs orange sans-bold\">{{date}}</h4><p>{{package_text}}</p><div class=\"hidden-xs address\"><p></div><div class=\"address hidden-lg hidden-md hidden-sm\"><p></div></div><div class=\"hidden-xs col-xs-3 directory-button\">{{#package_id}}<a href='/my-trip/{{package_guid}}'><img src='/image?method=image.icrop&context=package.items&id={{package_id}}&w=600&h=-1&noimg=/partners/thepress/img/thepress-default.png' /></a>{{/package_id}}</div><div class=\" col-xs-4 directory-button\"><a href=/my-trip/{{package_guid}} class=\"sans-bold bg-lightOrange button button-xs\" style=\"display:none\">View Trip</a> <a onclick=\"deleteTrip({{package_id}});\" class=\"sans-bold bxg-lightOrange xbutton bxutton-xs\"><svg width=\"30\" height=\"30\" viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z\"></path></svg></a></div></div>{{/items}}</div></section>";

var SponsoredTripTemplate = '{{#items}}<a href="/trip/{{guid}}" class="block sponsored" style="background: url(\'image?method=image.crop&context=package&id={{id}}&w=370&h=240\') center center no-repeat; background-size: cover;">            <div class="block-label white no-accent">Sponsored Content</div><div class="block-label white">{{&neighborhood}}</div><div class="block-content vert-center"><h3 class="white"	>{{&title}}</h3></div></a><div class="block-caption hidden-xs"><p>{{subtitle}}</p></div>{{/items}}';

var SponsoredTripTemplateSmall = '{{#items}}          <a href="/trip/{{guid}}" class="block" style="background: url(\'image?method=image.crop&context=package&id={{id}}&w=370&h=240\') center center no-repeat; background-size: cover;"></a><div class="block-content"><span class="partner-badge"></span><h4 class="sans-bold orange"><a href="/trip/{{guid}}">{{&title}}</a></h4></div>{{/items}}';

var SponsoredStoryTemplateSmall = '{{#items}}          <a href="/story/{{guid}}" class="block" style="background: url(\'image?method=image.icrop&context=stories&id={{id}}&w=370&h=240\') center center no-repeat; background-size: cover;"></a><div class="block-label lightBrown no-accent">Sponsored Content</div><div class="block-content"><h4 class="sans-bold orange"><a href="/story/{{guid}}">{{&title}}</a></h4><span class="partner-badge"></span></div>{{/items}}';

var MapItineraryTemplate = '{{#items}}<div class="row itinerary-item ui-sortable-handle"><div class="col-xs-2"><div class="num sans-bold">{{counter}}</div></div><div class="col-xs-8 no-padding"><h4 class="sans-bold olive item-title">{{name}}</h4><p class="address sans black">{{address}}</p></div><div class="col-xs-1 no-padding"><a href="#" onclick="removeTrip({id:{{id}}});updateMapItinerary();" class="remove-item sans-bold lightBeige">×</a></div></div>{{/items}}';

var StoryVenueEventMapTemplate = '{{#items}}<a href="/place/{{guid}}">{{name}}</a>{{/items}}';


function initNewTrip() {
	$("#tripBuildModal").modal();
	if (_AUTH) {
		showModal('nametrip');
	}
}

function createNewTrip() {
	var tripName = $('#new-trip-name').val();
	$.getJSON('/api.json?method=events.packages-create&name='+tripName, function(d) {
		tripReceiverDropdowns();
		_WORKING_TRIP = { name: d.name, id: d.id, count: 0, items: [] };
		localStorage.setItem('workingTrip', JSON.stringify(_WORKING_TRIP));
		$('#tripBuildModal').modal('hide');
				$('#tripselect-noauth').hide();
				$('.tripselect .dropdown-toggle').show();		
		getCurrentWorkingTrip();
	});
}

function saveFullTrip() {


	$('.trip-item-trigger').trigger('click');
	return;
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
				d.guid = 'foooo';
		$('.header-title h1').text(d.name);
		$('#trip-description').text(d.description);
		console.log('package data::',d);
		getTrip(d.items);

	});
}

function getTrips() {

	$.getJSON('/api.json?method=events.packages-user',function(d) {
		console.log('saved trips?????:',d);
		$('#mytrips-info').text(d.items.length+' trip'+(d.items.length > 1 ? 's' : '') );
		$('#mytrips-container').html(Mustache.render(TripsTemplate,d));
	
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
		setTimeout(function() {
			resetTripReceivers();
			tripReceiverDropdowns();
			getCurrentWorkingTrip();
		},500);		
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
    	url: '/api.json?method=events.update-user-package',
    	method: 'post',
    	data: { name: tripName, description: $('#trip-description').val(), id: package },
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
		console.log('this trip: ',tr);
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

	    if (localStorage.trips != null) {
	    	trips = (JSON.parse(localStorage.trips));
	    }
	    
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
	            '<a class="sans-bold bg-lightOrange button button-xs" onclick="removeTrip({id:\''+trips[k].id+'\''+(package ? ',packageID:\''+package+'\'' : '')+'},this)">Remove From Trip</a>'+
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


	    var venueReq = '/api/v1/elements?package='+package+'&ids=' + (venueIDs.join(','));
	    $.getJSON(venueReq,function(d) {
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
	    	if (package && package != null) {
	    		d.guid = package;
	    	}
	    	tripHTML += Mustache.render(TripTemplate, d);

	    	$('#my-trip-data').html(tripHTML);
	    	// tripReceiverDropdowns('left','moveItemToTrip');
	    	//resetTripReceivers();
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
  console.log('start...',routePoints.start, 'end', routePoints.end, 'way', routePoints.waypoints, 'waypoints',waypoints);
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
    console.log('res::',response);
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
    console.log('UGH',time);
    $('#itinerary-details-distance').text(Math.round(miles));
    $('#itinerary-details-time').text(Math.round(time.value));
  }




	 });




}





//	Date/time functions
function secondsToTime(sec) {
	console.log('seconds ...',sec)
	if (sec < 60) {
		return { 'lang': sec + ' seconds', 'fmt': 'seconds', 'value': sec }
	} else if (sec < 3600) {

		return { 'lang': sec/60 + ' minutes', 'fmt': 'min', 'value': sec/60 }
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