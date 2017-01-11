var _STORIESLASTID;

var MoreStoriesTemplate = `      <div class="row">
      {{#stories}}
        <div class="col-sm-4 the-column">
          <a href="/story/{{guid}}" class="block gradient-cover" style="background: url('/image?method=image.icrop&context=stories&id={{id}}&w=500&h=-1') center center no-repeat; background-size: cover;"></a>
          <div class="block-label lightBrown">{{category}}{{category_name}}</div>
          <div class="block-content">
            <h4 class="sans-bold red"><a href="/story/{{guid}}">{{title}}</a></h4>
            <span class="date darkOlive">{{date}}</span>
          </div>
        </div>

     {{/stories}}

      </div>`;

// Gets additional stories from API
function storiesLoadMore() {
	$.getJSON('/api/v1/stories?count=3&lastid='+_STORIESLASTID,function(d) {
		$(Mustache.render(MoreStoriesTemplate,{stories:d.items})).insertBefore($('#stories-receiver'));
		$(d.items).each(function(di) {
			_STORIESLASTID = d.items[di].package_id;
		});
	})
}


;(function($) {

  /*
  * ============================================
  * Stories
  * ============================================
  */

})(jQuery);