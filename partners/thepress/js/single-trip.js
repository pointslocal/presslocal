;(function($) {

  /*
  * ============================================
  * Single Trip
  * ============================================
  */

  $(document).ready(function() {

    /* Reset Nav */
    $('.main-nav li a').removeClass('active');
    $('.main-nav li a[href="/trips"]').addClass('active');

    $('.single-content .single-sidebar article').on('click', function(e) {
      $(this).toggleClass('expand');
      e.preventDefault();
    });

  });

})(jQuery);