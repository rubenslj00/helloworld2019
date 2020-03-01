(function ($) {
    "use strict";

    jQuery(document).ready(function ($) {


        $(".embed-responsive iframe").addClass("embed-responsive-item");
        $(".carousel-inner .item:first-child").addClass("active");

        if ($.fn.niceSelect) {
            $('select').niceSelect();
        }

        // Hero area Slider
        if ($.fn.owlCarousel) {
            var sliderwrapper = $('.sliderwrapper');
            sliderwrapper.owlCarousel({
                loop: true,
                items: 1,
                margin: 0,
                autoplay: false,
                smartSpeed: 1000,
                touchDrag: false,
                mouseDrag: false,
                dots: true,
                nav: true,
                navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>']
            });

            sliderwrapper.on('translate.owl.carousel', function () {
                $('.slide-content h1').removeClass('bounceIn animated').hide();
                $('.slide-content p').removeClass('fadeIn animated').hide();
                $('.slide-content .slider-btn').removeClass('slideInUp animated').hide();
                $('.slide-images').removeClass('slideInRight animated').hide();
            });

            sliderwrapper.on('translated.owl.carousel', function () {
                $('.slide-content h1').addClass('bounceIn animated').show();
                $('.slide-content p').addClass('fadeIn animated').show();
                $('.slide-content .slider-btn').addClass('slideInUp animated').show();
                $('.slide-images').addClass('slideInRight animated').show();
            });

            $('.course-wrapper').owlCarousel({
                items: 3,
                loop: true,
                nav: true,
                dots: false,
                margin: 30,
                autoplayHoverPause: true,
                navText: ['<i class="fa fa-long-arrow-left" aria-hidden="true"></i>', '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>'],
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    480: {
                        items: 1
                    },
                    768: {
                        items: 3,
                        margin: 20
                    },
                    991: {
                        items: 3
                    }
                }
            });

            //  Client Carousel
            $('.client-wrapper').owlCarousel({
                loop: true,
                items: 6,
                margin: 70,
                autoplay: true,
                smartSpeed: 1000,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 3,
                        margin: 20
                    },
                    480: {
                        items: 4,
                        margin: 20
                    },
                    768: {
                        items: 5,
                        margin: 20
                    },
                    991: {
                        items: 6
                    }
                }
            });

            // Testimonial Carousel
            $('.test-warpper').owlCarousel({
                loop: true,
                items: 1,
                margin: 80,
                autoplay: true,
                smartSpeed: 1000,
                nav: true,
                navText: ['<i class="fa fa-long-arrow-right" aria-hidden="true"></i>', '<i class="fa fa-long-arrow-left" aria-hidden="true"></i>'],
            });
        }

        // Magnific PopUp for image
        if ($.fn.magnificPopup) {
            $('.single-gallary-inner').magnificPopup({
                type: 'image',
                gallery: {
                    enabled: true
                },
            });
        }

        // Plus Isotope    
        if ($.fn.isotope) {
            $('.course-menu ul li').on('click', function () {
                $(".course-menu ul li").removeClass("active");
                $(this).addClass("active");

                var selector = $(this).attr('data-mama');
                $(".isotop-wrapper").isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false
                    }
                });
                return false;
            });
        }


        // Plus Isotope    
        if ($.fn.isotope) {
            $('.course-menu2 ul li').on('click', function () {
                $(".course-menu2 ul li").removeClass("active");
                $(this).addClass("active");

                var selector = $(this).attr('data-filter');
                $(".teacher-wrapper").isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false
                    }
                });
                return false;
            });
        }


        // jQuery for Video open and paused
        if ($('video').length) {
            var video = $('#videof'),
                element = video[0];
            element.addEventListener('ended', function () {
                video.parent().removeClass("playing");
            }, false);
            element.addEventListener('pause', function () {
                video.parent().removeClass("playing");
            }, false);
            element.addEventListener('play', function () {
                video.parent().addClass("playing");
            }, false);
            jQuery(".link-video-icon, .link-pause, .link-video").on('click', function () {
                var _mmVideo = $('#videof')[0];
                if (_mmVideo.paused) {
                    _mmVideo.play();
                } else {
                    _mmVideo.pause();
                }
            });
        }

        // jQuery counter
        if ($.fn.counterUp) {
            $('.counter').counterUp({
                delay: 10,
                time: 1000
            });
        }

        // niceScroll
        if ($.fn.niceScroll) {
            $(".notice-board").niceScroll({
                cursorcolor: "#66b144"
            });
        }
    });


    jQuery(window).load(function () {


        $('#loading').fadeOut(300);

    });


}(jQuery));