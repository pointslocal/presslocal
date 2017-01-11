var _TRIPSLASTID;

var MoreTripsTemplate = `      <div class="row">
      {{#packages}}
        <div class="col-sm-4 the-column">
          <a href="/trip/{{guid}}" class="block" data-cache="background" style="background: url('http://imagecdn-sfgate.pointslocal.com//image?method=image.icrop&context=package&id={{id}}&w=600&h=-1') center center no-repeat; background-size: cover;"></a>
          <div class="block-label lightBrown">Sonoma</div>
          <div class="block-content">
            <h4 class="sans-bold orange"><a href="/trip/{{guid}}">{{title}}</a></h4>
          </div>
        </div>
     {{/packages}}

      </div>`;

// Gets additional stories from API
function tripsLoadMore() {
	console.log(_TRIPSLASTID);
	$.getJSON('/api/v1/packages?count=3&nouser=1&lastid='+_TRIPSLASTID,function(d) {
		$(Mustache.render(MoreTripsTemplate,{packages:d.items})).insertBefore($('#more-trips-receiver'));
		$(d.items).each(function(di) {
			_TRIPSLASTID = d.items[di].id;
		});
	})
}

;(function($) {


  /*
  * ============================================
  * Trips
  * ============================================
  */


})(jQuery);