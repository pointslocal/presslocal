;(function($) {

  /*
  * ============================================
  * Single Trip
  * ============================================
  */

  $(document).ready(function() {
    if ($('body.my-trip').length > 0) {

      if (Modernizr.mq('only screen and (max-width: 768px)')) {
        $('.scrollable').each(function (index) {
          $(this).wrapInner( "<div class='scroller'></div>");

          var count = $('.scrollable .block-container').length;
          var width = ($(window).width() + 30) * count;

          $('.scroller').css('width', width);
          $('.scrollable .block-container').css({
            'width': $(window).width() + 30,
            'float': 'left'
           });

          new IScroll('#' + $(this).attr('id'), {
            eventPassthrough: true,
            scrollX: true,
            scrollY: false,
            preventDefault: false,
            snap: true,
            momentum: false
          });
        });
      }

      // jQuery UI Sortable List
      $("#sortable").sortable();
      $("#sortable").disableSelection();

    }

  });

})(jQuery);