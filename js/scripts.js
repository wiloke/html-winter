
(function($) {
    "use strict";
    /*==============================
        Is mobile
    ==============================*/
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    }
    var windowWidth = window.innerWidth,
        windowHeight = $(window).height();



    /*==============================
        BLOG GRID
    ==============================*/
    function grid() {
        if ($('.blog-grid').length) {
            setTimeout(function() {
                $('.blog-grid .post-wrapper').masonry({
                    columnWidth: '.grid-item',
                    itemSelector: '.grid-item'
                });
            }, 1);
        }
    }

    function piPlaceholder() {
        var $ph = $('input[type="search"], input[type="text"], input[type="url"], input[type="number"], input[type="email"], textarea');
        $ph.each(function() {
            var value = $(this).val();
            $(this).focus(function() {
                if ($(this).val() === value) {
                    $(this).val('');
                }
            });
            $(this).blur(function() {
                if ($(this).val() === '') {
                    $(this).val(value);
                }
            });
        });
    }

    function timeLine() {
        if ($('.blog-timeline').length) {
            var scrollTop = $(window).scrollTop(),
                windowHeight = $(window).height(),
                lineOffsetTop = $('.blog-timeline .content').offset().top,
                topLine = scrollTop - lineOffsetTop;
            $('.pi-line').css({
                'top': '0',
                '-webkit-transform': 'translateY(' + topLine + 'px)',
                '-o-transform': 'translateY(' + topLine + 'px)',
                '-ms-transform': 'translateY(' + topLine + 'px)',
                '-moz-transform': 'translateY(' + topLine + 'px)',
                'transform': 'translateY(' + topLine + 'px)'
            });

            $('.blog-timeline .post-meta').each(function() {
                var $this = $(this),
                    offsetTop = $this.offset().top,
                    light = offsetTop - (windowHeight / 2);
                if (scrollTop >= light) {
                    $this.addClass('metaLight');
                } else {
                    $this.removeClass('metaLight');
                }
            });
        }
    }

    // READY FUNCTION
    $(document).ready(function() {

        if ($(".featured-slider").length > 0) {
            $(".featured-slider").owlCarousel({
                autoPlay: 20000,
                slideSpeed: 300,
                navigation: true,
                pagination: false,
                items: 5,
                // itemsCustom: [[640, 1], [992, 3], [1000, 4], [1400, 5]],
                navigationText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>']  
            });
        }

        if ($(".twitter-slider").length > 0) {
            $(".twitter-slider").owlCarousel({
                autoPlay: false,
                slideSpeed: 300,
                navigation: true,
                pagination: false,
                singleItem: true,
                autoHeight: true,
                transitionStyle: 'fade',
                navigationText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>']  
            });
        }

        $('.post-share').each(function() {
            $(this).find('.share-toggle').click(function() {
                $(this).toggleClass('toggle-active');
                $(this).siblings('.share').toggleClass('share-active');
            });
        });

        $('.search-box .icon-search').click(function() {
            $(this).toggleClass('active');
            $('.search-box input[type="search"]').toggleClass('fadein');
        });
        $('html').click(function() {
            $('.search-box .icon-search').removeClass('active');
            $('.search-box input[type="search"]').removeClass('fadein');
        });
        $('.search-box').click(function(evt) {
            evt.stopPropagation();
        });


        $(window).load(function() {
            grid();
            piPlaceholder();
        });


        var menuType = $('.pi-navigation').data('menu-responsive');

        $(window).on('load resize', function() {
            /* Page style */
            $('.sidebar-right')
                .closest('.blog-standard')
                .find('.content')
                    .css('margin-right', '100px');

            $('.sidebar-left')
                .closest('.blog-standard')
                .find('.content')
                    .css({
                        'margin-left': '30px',
                        'margin-right': '70px'
                    });

            $('.sidebar-right')
                .closest('.blog-grid, .blog-list, .blog-timeline')
                .find('.content')
                    .css('margin-right', '30px');
            $('.sidebar-left')
                .closest('.blog-grid, .blog-list, .blog-timeline')
                .find('.content')
                    .css('margin-left', '30px');

            $('.sidebar-left')
                .closest('body')
                .find('.col-md-9')
                    .addClass('col-md-push-3');
            $('.sidebar-left')
                .closest('body')
                .find('.col-md-3')
                    .addClass('col-md-pull-9');

            if (window.innerWidth < 992) {
                $('.blog-standard')
                    .find('.content')
                        .css({
                            'margin-left': '0',
                            'margin-right': '0'
                        });
                
            }
            $('.blog-standard .post').each(function() {
                var $this = $(this),
                    $postmeta = $this.find('.post-meta'),
                    $posttitle = $(this).find('.post-title'),
                    $postmedia = $(this).find('.post-media');
                if (window.innerWidth < 992) {
                    $postmeta.insertAfter($posttitle);
                } else {
                    $postmeta.insertAfter($postmedia);
                }
            });

            /* Menu style */
            var menu = $('.pi-navigation'),
                toggleMenu = $('.toggle-menu'),
                menuList = menu.find('.navlist'),
                subMenu = menu.find('.sub-menu'),
                windowWidth = window.innerWidth;
                windowHeight = $(window).height();
            if (window.innerWidth < menuType) {
                toggleMenu.show();
                menuList
                    .addClass('off-canvas')
                    .css('height', windowHeight);
                if ($('.submenu-toggle').length === 0) {
                    $('.menu-item-has-children, .nav > .menu-item-language-current')
                        .children('a')
                        .after(
                                '<span class="submenu-toggle">\
                                    <i class="fa fa-angle-right"></i>\
                                </span>\
                            ');
                    menuList.on('click', '.submenu-toggle', function(evt) {
                        evt.preventDefault();
                        $(this)
                            .siblings('.sub-menu')
                            .addClass('sub-menu-active');
                    });
                }
                subMenu.each(function() {
                    var $this = $(this);
                    if ($('.back-mb').length === 0) {
                        $this
                            .prepend(
                                    '<li class="back-mb">\
                                        <a href="#">\
                                            Back\
                                        </a>\
                                    </li>\
                                ');
                    }
                    menu.on('click', '.back-mb a', function(evt) {
                        evt.preventDefault();
                        $(this)
                            .parent()
                            .parent()
                            .removeClass('sub-menu-active');
                    });
                });
                toggleMenu.click(function() {
                    menuList.toggleClass('off-canvas-active');
                    $(this).toggleClass('toggle-active');
                    $('.sub-menu').removeClass('sub-menu-active');
                });
                $('html').click(function() {
                    menuList.removeClass('off-canvas-active');
                    toggleMenu.removeClass('toggle-active');
                    $('.sub-menu').removeClass('sub-menu-active');
                });
                menu.click(function(evt) {
                    evt.stopPropagation();
                });

            } else {
                toggleMenu.hide();
                menuList
                    .removeClass('off-canvas')
                    .css('height', 'auto');
            }
        });


        



        $('.pi-line').height($(window).height()/2);
        $(window).scroll(function() {
            timeLine();
        });
        

        if (isMobile.any() || window.innerWidth < 1200) {
            $('.post-body').css('text-align', 'justify');
        }

    });
})(jQuery);