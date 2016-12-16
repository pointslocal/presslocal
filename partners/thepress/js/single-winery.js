

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