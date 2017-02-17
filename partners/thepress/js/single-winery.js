action = getParameterByName('action');
if (action && action == 'opencellarpass') {
  $(document).ready(function() {
      url = $('.cellarpass').attr('data-url');
      if (url) {
        openModal(url+'&iframe=3','Book '+$('h1').text());        
      }

  })

}

;(function($) {

  /*
  * ============================================
  * Single Winery
  * ============================================
  */

  $(document).ready(function() {

    $('.single-content .single-sidebar article').on('click', function(e) {
      $(this).toggleClass('expand');
      e.preventDefault();
    });

  });

})(jQuery);