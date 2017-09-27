(function($) {
// définitions des points de passage Skel
 skel.breakpoints({
  xxlarge: '(max-width: 1920px)',
  xlarge: '(max-width: 1680px)',
  large: '(max-width: 1280px)',
  medium: '(max-width: 1000px)',
  small: '(max-width: 736px)',
  xsmall: '(max-width: 480px)',
 });

//début personalisation des fonctions
 $(function() {

  let $window = $(window),
   $body = $('body'),
   $header = $('#header'),
   $all = $body.add($header);

   $window.scroll(function() {
           if ($(this).scrollTop() > 550) {
               $header.fadeIn(500);
           } else {
               $header.fadeOut(500);
           }
         });

   $window.ready(function () {
    $window.on('scroll', onScroll);

    //smoothscroll et ajout classe
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $('a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');

        let target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
});
    // selection selon l'attribut href, position déterminée par rapport au top et selon la hauteur
    function onScroll(event){
        let scrollPos = $(document).scrollTop();
        $('nav a').each(function () {
            let currLink = $(this);
            let refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('nav ul li a').removeClass("active");
                currLink.addClass("active");
            }
            else{
                currLink.removeClass("active");
            }
        });
    }



  // retire animations/transition pendant que la page se charge
   $body.addClass('is-loading');

   $window.on('load', function() {
    window.setTimeout(function() {
     $body.removeClass('is-loading');
    }, 0);
   });

  // mode tactile
   skel.on('change', function() {

    if (skel.vars.mobile || skel.breakpoint('small').active)
     $body.addClass('is-touch');
    else
     $body.removeClass('is-touch');

   });

  // Fix: Placeholder polyfill.
   $('form').placeholder();

  // Fix: IE flexbox fix.
   if (skel.vars.IEVersion <= 11
   && skel.vars.IEVersion >= 10) {

    let $main = $('.main.fullscreen'),
     IEResizeTimeout;

    $window
     .on('resize.ie-flexbox-fix', function() {

      clearTimeout(IEResizeTimeout);

      IEResizeTimeout = setTimeout(function() {

        let wh = $window.height();

        $main.each(function() {

        let $this = $(this);

        $this.css('height', '');

        if ($this.height() <= wh)
         $this.css('height', (wh - 50) + 'px');

       });

      });

     })
     .triggerHandler('resize.ie-flexbox-fix');

   }

  // Prioritize "important" elements on small.
   skel.on('+small -small', function() {
    $.prioritize(
     '.important\\28 small\\29',
     skel.breakpoint('small').active
    );
   });

  // gallerie.
   $window.on('load', function() {

     let $gallery = $('.gallery');

    $gallery.poptrox({
      baseZIndex: 10001,
      useBodyOverflow: false,
      usePopupEasyClose: false,
      overlayColor: '#1f2328',
      overlayOpacity: 0.65,
      usePopupDefaultStyling: false,
      usePopupCaption: true,
      popupLoaderText: '',
      windowMargin: 50,
      usePopupNav: true
      });

    // Hack: Adjust margins when 'small' activates.
     skel
      .on('-small', function() {
       $gallery.each(function() {
        $(this)[0]._poptrox.windowMargin = 50;
       });
      })
      .on('+small', function() {
       $gallery.each(function() {
        $(this)[0]._poptrox.windowMargin = 5;
       });
      });

   });

  // Section transitions.
   if (skel.canUse('transition')) {

    var on = function() {

     // Galleries.
      $('.gallery')
       .scrollex({
        top:  '30vh',
        bottom:  '30vh',
        delay:  50,
        initialize: function() { $(this).addClass('inactive'); },
        terminate: function() { $(this).removeClass('inactive'); },
        enter:  function() { $(this).removeClass('inactive'); },
        leave:  function() { $(this).addClass('inactive'); }
       });

     // sections
      $('.main.style1')
       .scrollex({
        mode:  'middle',
        delay:  100,
        initialize: function() { $(this).addClass('inactive'); },
        terminate: function() { $(this).removeClass('inactive'); },
        enter:  function() { $(this).removeClass('inactive'); },
        leave:  function() { $(this).addClass('inactive'); }
       });

      $('.main.style2')
       .scrollex({
        mode:  'middle',
        delay:  100,
        initialize: function() { $(this).addClass('inactive'); },
        terminate: function() { $(this).removeClass('inactive'); },
        enter:  function() { $(this).removeClass('inactive'); },
        leave:  function() { $(this).addClass('inactive'); }
       });

     // Contact.
      $('#contact')
       .scrollex({
        top:  '50%',
        delay:  50,
        initialize: function() { $(this).addClass('inactive'); },
        terminate: function() { $(this).removeClass('inactive'); },
        enter:  function() { $(this).removeClass('inactive'); },
        leave:  function() { $(this).addClass('inactive'); }
       });

    };

    var off = function() {

     // Galleries.
      $('.gallery')
       .unscrollex();

     // sections.
      $('.main.style1')
       .unscrollex();

      $('.main.style2')
       .unscrollex();

     // Contact.
      $('#contact')
       .unscrollex();

    };

    skel.on('change', function() {

     if (skel.breakpoint('small').active)
      (off)();
     else
      (on)();

    });

   }

  // Events.
   let resizeTimeout, resizeScrollTimeout;

   $window
    .resize(function() {

     // empeche animation transition
      $body.addClass('is-resizing');

     window.clearTimeout(resizeTimeout);

     resizeTimeout = window.setTimeout(function() {

      // mise a jour scroll sur liens
       $('a[href^="#"]').scrolly({
        speed: 1500,
        offset: $header.outerHeight() - 1
       });

      // Ré-active animations et transitions
       window.setTimeout(function() {
        $body.removeClass('is-resizing');
        $window.trigger('scroll');
       }, 0);

     }, 100);

    })
    .load(function() {
     $window.trigger('resize');
    });

 });

})(jQuery);
