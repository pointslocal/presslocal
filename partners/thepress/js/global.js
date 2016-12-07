;(function($) {


    $('[data-cache="background"]').each(function() {
      var bg = ($(this).css('background-image'));
      var time = Math.floor(Date.now() / 1000);
      bg = bg.replace(/(.*?)"\)/,'$1&time='+time+'")');
      $(this).css('background-image',bg);
    });
  /*
  * ============================================
  * Global
  * ============================================
  */

/*
  $(document).on('ready', function() {
    var myScroll = new IScroll('.three-column', {
      mouseWheel: true
    });

    var myScroll = new IScroll('.quad-columns', {
      mouseWheel: true
    });
  });
*/

  // Toggle Search
  $('.toggle-search').on('click', function(e) {
    $(this).addClass('active');
    $('.search-modal').addClass('active');
    e.preventDefault();
  });

  // Close Search
  $('.search-modal .close-button').on('click', function(e) {
    $('.toggle-search').removeClass('active');
    $('.search-modal').removeClass('active');
    e.preventDefault();
  });

  // Toggle Mobile Nav
  $('.toggle-nav').on('click', function(e) {
    $('.filter-controls').removeClass('active');
    $('.mobile-dropdown').toggleClass('active');
    $('.toggle-nav .fa-bars').toggle();
    $('.toggle-nav .fa-close').toggleClass('hidden');
    e.preventDefault();
  });

  // Hide Mobile Menu on Modal Show
  $('.modal').on('show.bs.modal', function () {
    $('.filter-controls').removeClass('active');
    $('.mobile-dropdown').removeClass('active');
    $('.toggle-nav .fa-bars').toggle();
    $('.toggle-nav .fa-close').addClass('hidden');
  });

  // Login Mockup
  $('.modal').on('click', 'button[type="submit"]', function (e) {
    /*
    $('.modal').modal('hide');
    $('nav li.signin').addClass('hidden');
    $('nav li.login').removeClass('hidden');
    e.preventDefault();
    */
  });

})(jQuery);