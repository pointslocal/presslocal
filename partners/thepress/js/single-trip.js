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

    if ($('body.single-trip').length > 0) {

      $('.scrollable').each(function (index) {
        if (index === 0) {
          $(this).wrapInner( "<div class='scroller'></div>");

          var count = $('.scrollable .block-container').length;
          var width = ($(window).width() + 30) * count;

          $('.scroller').css('width', width);
          $('.scrollable .block-container').css({
            'width': $(window).width() + 30,
            'float': 'left'
          });

          var scroller1 = new IScroll('#' + $(this).attr('id'), {
            eventPassthrough: true,
            scrollX: true,
            scrollY: false,
            preventDefault: false,
            mouseWheel: true,
            snap: true,
            momentum: false,
            keyBindings: true,
            indicators: {
              el: document.getElementById('indicator'),
            resize: false
            }
          });
        }
      });

      if (Modernizr.mq('only screen and (max-width: 768px)')) {
        $('.scrollable2').wrapInner( "<div class='scroller2'></div>");

        var count = $('.scrollable2 .block-container').length;
        var width = ($(window).width() + 30) * count;

        $('.scroller2').css('width', width);
        $('.scrollable2 .block-container').css({
          'width': $(window).width() + 30,
          'float': 'left'
        });

        var scroller2 = new IScroll('#scroll2', {
          eventPassthrough: true,
          scrollX: true,
          scrollY: false,
          preventDefault: false,
          mouseWheel: true,
          snap: true,
          momentum: false,
          keyBindings: true,
          indicators: {
            el: document.getElementById('indicator'),
          resize: false
          }
        });
      }

      $('.single-content .single-sidebar article').on('click', function(e) {
        $(this).toggleClass('expand');
        e.preventDefault();
      });

    }

  });

})(jQuery);