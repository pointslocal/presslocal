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

  // Toggle Search
  $('.toggle-search').on('click', function(e) {
    $(this).addClass('active');
    $('.search-modal').addClass('active');
    setTimeout(function() {
      $('#masterSearch').focus();
    }, 300);
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
    $('.hud').removeClass('noscroll');
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

  // Init Search Popovers
  $(function () {
    $('.directory-header .tools-container a.search').popover({
      html: true,
      content: '<div class="row search-wrapper"><form role="form" method="post" action=""><div class="col-sm-2 text-center"><button type="submit"><i class="fa fa-search"></i></button></div><div class="col-sm-10"><input type="text" name="search" id="search" placeholder="Search Wineries"></div></form></div>'
    });
  });

  // Directory List Header Buttons
  $('.directory-header .tools-container a').on('click', function(e) {
    e.preventDefault();
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

  // Get each scrollable element not masthead scrolls
  function slickyWithIt() {
    $('.scrollable:not(.masthead-scroll)').each(function() {
      var children = $(this).children('.block-container').length;
      $(this).slick({
        dots: false,
        arrows: false,
        infinite: false,
        slide: '.block-container',
        slidesToShow: children,
        responsive: [
          {
            breakpoint: 9999,
            settings: 'unslick'
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              infinite: true,
              dots: true
            }
          }
        ]
      });
    });
  }

  slickyWithIt();

  $(window).resize(function(){
    var $windowWidth = $(window).width();
    $('.scrollable:not(.masthead-scroll)').slick('resize');
  });

  // Masthead Carousels for Single Pages
  $('.masthead-scroll').each(function() {
    var children = $(this).children('.block-container').length;
    $(this).slick({
      dots: true,
      arrows: false,
      infinite: false,
      autoplay: true,
      autoplaySpeed: 4000,
      slide: '.block-container',
      slidesToShow: 1,
    });
  });

})(jQuery);