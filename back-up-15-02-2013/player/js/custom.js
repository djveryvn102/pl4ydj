/**
 * Custom JS
 * 
 * @package Remix
 * @author Codevz
 * @link http://codevz.com
 */

var j = jQuery, AjaxURL = j('body').data('ajax'), Theme = j('body').data('theme');

function codevzCount(i, k) {
    'use strict';

    j.ajax({ url: AjaxURL, data: {action: 'codevz_counter', id: i, key: k} });
}

function codevzGallery() {
    'use strict';

    var a = '.lightbox,a[href$=".jpg"]:not(.esgbox,.jg-entry),a[href$=".jpeg"]:not(.esgbox,.jg-entry)',
        b = j( 'body' ),
        d = b.data( 'lightGallery' );
    if ( d ) {
        d.destroy( true );
    }
    if ( j.fn.lightGallery ) {
        b.attr( 'data-lightGallery', 1 ).lightGallery({selector: a});
    }
}

function codevzClosest(num, arr) {
    var mid;
    var lo = 0;
    var hi = arr.length - 1;
    while (hi - lo > 1) {
        mid = Math.floor((lo + hi) / 2);
        if (arr[mid] < num) {
            lo = mid;
        } else {
            hi = mid;
        }
    }
    if (num - arr[lo] <= arr[hi] - num) {
        return arr[lo];
    }
    return arr[hi];
}

function codevzSortNumber(a,b) {
    return a - b;
}

function codevzConvertDataImg() {
    'use strict';

    j('img[srcset]').each(function() {
        var srcset = j( this ).attr('srcset').split(', '),
            images = [],
            sizes = [];

        j.each( srcset, function(i) {
            var item   = this.split(' '),
                url    = item[0],
                width  = item[1].match(/\d+/);

            images[ width ] = url;
            sizes.push( width[0] );
        });

        sizes.sort( codevzSortNumber );
        var parent_width = j( this ).parent().width();
        var new_size = codevzClosest( parent_width, sizes );

        j( this ).attr( 'src', images[ new_size ] );
    });
}

function codevzTooltip() {
    'use strict';

    var t = '.tooltip';
    j(t).not(':first').detach();
    j('body').on({
        mouseenter: function () {
            var d = j( this ),
                a = d.attr( 'title' );
            if ( a ) {
                d.data( 'tipText', a ).removeAttr( 'title' );
                if ( ! j( t ).length ) {
                    j( '<p class="tooltip"></p>' ).text( a ).appendTo( 'body' ).fadeIn();   
                }
            }
        },
        mouseleave: function () {
            j( this ).attr( 'title', j( this ).data( 'tipText' ) );
            j( t ).remove();
        },
        mousemove: function (e) {
            var w  = j( t ).width() / 2,
                x = e.pageX - w,
                y = e.pageY + 30;
            j( t ).css( { top: y, left: x } );
        }
    }, '.tip');
}

function codevzScrollIntoView(e) {
    'use strict';

    var t   = j(window).scrollTop(),
        b   = t + j(window).height(),
        et  = j(e).offset().top,
        eb  = et + j(e).height();

    return ( ( eb <= b + 50 ) && ( et >= t ) );
}

function codevzCountdown() {
    'use strict';

    if ( j('[data-countdown]').length ) {
        j( '[data-countdown]' ).each(function() {
            var dis = j( this ), 
                o = dis.data( 'countdown' ), 
                d = new Date( new Date().valueOf() + o.date * 1000 );
            dis.countdown( d ).on( 'update.countdown', function( e ) {
                dis.html(e.strftime(''
                    + '<li><span>%D</span><p>' + o.d + '%!d:' + o.p + ';</p></li>'
                    + '<li><span>%H</span><p>' + o.h + '%!H:' + o.p + ';</p></li>'
                    + '<li><span>%M</span><p>' + o.m + '%!m:' + o.p + ';</p></li>'
                    + '<li><span>%S</span><p>' + o.s + '</p></li>'
                ));
            }).on('finish.countdown', function( e ) {
                dis.html(e.strftime('<li><span>0</span><p>-</p></li><li><span>0</span><p>-</p></li><li><span>0</span><p>-</p></li><li><span>0</span><p>-</p></li>'));
                dis.addClass( 'ended' ).append( '<li class="expired">' + o.ex + '</li>' );
            });
        });
    }
}

function codevzCarousel() {
    'use strict';

    if ( j('.carousel').length ) {
        j( '.carousel' ).each(function() {
            var dis = j(this),
                d = dis.data('carousel'),
                w = dis.parent().width(),
                i = ( w < 400 ) ? 1 : ( w < 500 ) ? 2 : ( w < 800 ) ? 3 : ( w < 900 ) ? 4 : ( w > 1060 ) ? 6 : 5,
                o = {
                    slidesToShow: ( d && d.slidestoshow ) ? j.parseJSON( d.slidestoshow ) : i,
                    slidesToScroll: ( d && d.slidestoscroll ) ? j.parseJSON( d.slidestoscroll ) : i,
                    //rtl: j( '#cd-rtl-css' ).length ? true : false,
                    infinite: ( d && d.infinite ) ? j.parseJSON( d.infinite ) : false,
                    speed: ( d && d.speed ) ? j.parseJSON( d.speed ) : 500,
                    centerMode: ( d && d.centermode ) ? j.parseJSON( d.centermode ) : false,
                    centerPadding: ( d && d.centerpadding ) ? d.centerpadding : '0px',
                    variableWidth: ( d && d.variablewidth ) ? j.parseJSON( d.variablewidth ) : false,
                    autoplay: ( d && d.autoplay ) ? j.parseJSON( d.autoplay ) : false,
                    autoplaySpeed: ( d && d.autoplayspeed ) ? j.parseJSON( d.autoplayspeed ) : 500,
                    prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-chevron-left"></i></button>',
                    nextArrow: '<button type="button" class="slick-next"><i class="fa fa-chevron-right"></i></button>',
                    responsive: [{
                        breakpoint: 1024,
                        settings: {slidesToShow: 4}
                    }, {
                        breakpoint: 800,
                        settings: {slidesToShow: 3}
                    }, {
                        breakpoint: 600,
                        settings: {slidesToShow: 2}
                    }, {
                        breakpoint: 300,
                        settings: {slidesToShow: 1}
                    }]
                };

            dis.slick(o);
        });
    }
}

function codevzAjaxSearch() {
    'use strict';

    var time = false;

    j( '.search_opt' ).on( 'click', function() {
        j( '.post_types' ).slideToggle();
        j( '.ajax_search_results' ).slideUp();
    });

    j( '#search [name="s"]' ).on( 'keyup', function() {
        clearTimeout( time );
        var form    = j( this ).parent(),
            results = form.next( '.ajax_search_results' );

        if ( j( this ).val().length < 3 ) {
            j( '.ajax_search_results' ).slideUp();
            j( '.fa-search', form ).removeClass( 'fa-spinner fa-pulse' );
            return;
        }

        j( '.post_types' ).slideUp();
        j( '.fa-search', form ).addClass( 'fa-spinner fa-pulse' );

        time = setTimeout(
            function() {
                j.ajax({
                    type: "GET",
                    url: AjaxURL,
                    data: "action=ajax_search&" + form.serialize(),
                    success: function( data ) {
                        results.html( data ).slideDown();
                        czLazyload();
                        j( '.fa-search', form ).removeClass( 'fa-spinner fa-pulse' );

                        /* Ajaxify new links */
                        if ( j.fn.ajaxify ) {
                            j( '.ajax_search_results' ).ajaxify();
                        }
                    },
                    error: function( xhr, status, error ) {
                        results.html( '<h5>' + error + '</h5>' ).slideDown();
                        j( '.fa-search', form ).removeClass( 'fa-spinner fa-pulse' );
                        console.log( xhr, status, error );
                    }
                });
            },
            500
        );
    });

    j( '.search, .ajax_search_results' ).on( 'click', function(e) {
        e.stopPropagation();
    });
    
    j( 'body' ).on( 'click', function(e) {
        j( '.post_types, .ajax_search_results' ).slideUp();
    });

    j( '.search' ).on( 'click', '[name="s"]', function(e) {
        if ( j( this ).val() ) {
            j( '.ajax_search_results' ).slideDown();
        }
    });
}

function codevzMasonry() {
    'use strict';
    j( '.modern .posts' ).each(function(){
        var dis = j( this );

        /* Gap */
        var gap = dis.closest('.def-block').data( 'gap' ),
            pW = dis.closest('.def-block').width();
        if ( gap ) {    
            j( 'head' ).append('<style type="text/css">' +
                '.modern .posts { margin: 0 0 0 -' + gap + 'px }' +
                '.modern .ajax-item { margin: 0 0 ' + gap + 'px }' +
                '.modern .ajax-item > div { margin: 0 0 0 ' + gap + 'px }' +
            '</style>');
        }

        /* Custom size */
        var bigger = '0,' + dis.find('.ajax-item').data('bigger');
        var biggers = bigger.split(',');
        for ( var i = 0; i < biggers.length; i++ ) {
            var item = dis.find('.ajax-item')[biggers[i] - 1];
            j( item ).addClass( 'bigger' );
        }

        /* Check title */
        dis.find('.ajax-items').each(function( i ) {
            if ( j('.after_cover_mas').length ) {
                j( 'h3', this ).appendTo( j( this ) );
            }
        });

        /* Run */
        dis.masonry({
            itemSelector: '.ajax-item',
            columnWidth: '.ajax-item:not(.bigger)',
            percentPosition: true,
            originLeft: j( '#cd-rtl-css' ).length ? false : true,
            isAnimated: true,
            animationOptions: {
                duration: 800,
                easing: 'swing',
                queue: true
            }
        });
        dis.imagesLoaded().progress( function() {
            dis.masonry( 'layout' );
        });
    });
}

function codevzPopup() {
    'use strict';

    if ( window.location.search.indexOf( 'login' ) > -1 ) {
        setTimeout(function() {
            j( 'a[href="#login"]' ).trigger( 'click' );
        }, 100 );
    }

    j( 'body' ).on( 'click', '.popup_link', function() {
        var d   = j( this ),
            p   = j( this ).next('.popup'),
            w   = j( window ).width(),
            h   = j( window ).height(),
            css = {
                'top': h / 2 - p.height() / 2,
                'left': w / 2 - p.width() / 2
            };

        j( '.popup_bg' ).remove();
        p.after( '<div class="popup_bg" />' );
        if ( ! p.find( '.popup_close' ).length ) {
            p.append( '<div class="popup_close"><i class="fa fa-close" /></div>' );
        }
        p.css( css ).fadeIn().next('.popup_bg').css( { height: w, opacity: 0.7 } ).fadeIn();

        j( '.popup_close' ).on( 'click', function() { 
            p.fadeOut().next('.popup_bg').fadeOut( 'fast', function() { j( this ).remove(); });
        });

        j( window ).on( 'resize', function(){
            var w = j( window ).width(),
                h = j( window ).height();
            p.css({
                'top': h / 2 - p.height() / 2,
                'left': w / 2 - p.width() / 2
            });
        });

        return false;
    });

    j( 'body' ).on( 'click', '.popup', function(e) {
        e.stopPropagation();
    });
    
    j( 'body' ).on( 'click', function(e) {
        j( '.popup' ).fadeOut().next('.popup_bg').fadeOut( 'fast', function() { j( this ).remove(); });
    });
}

function codevzPreloader() {
    'use strict';
    var p = j( '.pageloader' );
    if ( p.length ) {
        j(window).resize(function(){
            var w = j( window ).width(),
                h = j( window ).height(),
                ih = j( 'img', p ).height(),
                iw = j( 'img', p ).width();
            j( 'img', p ).css({
                "top": h / 2 - ih / 2 - 50,
                "left": w / 2 - iw / 2 - 50
            });
        }).resize();
        j(window).load(function() {
            p.fadeOut( 'slow', 'swing', function(){
                //j( this ).remove();
            });
        });
        setTimeout( function(){
            p.fadeOut( 'slow', 'swing', function(){
                //j( this ).remove();
            });
        }, p.data( 'time' ) );
    }
}

function codevzPlayer( o ) {
    'use strict';

    var i       = j( '#' + o.attr( 'id' ) ),
        cover   = j( '.has_cover', i ),
        data    = o.data( 'player' ),
        history_interval, history_timer,
        tracks  = data ? Object.keys( data.tracks ).map(function( n ){
            return data.tracks[ n ];
        }) : Object,
        nitro = function() {
            /* Cover */
            var p = j( '.jp-jplayer img', i ).removeAttr( 'style' ).clone();
            cover.find('span:first-child').html( p );
            if ( ! j( '.player_popup' ).length ) {
                j.each( myPlaylist.playlist, function ( n, obj ) {
                    if ( n == myPlaylist.current && obj.poster_big ) {
                        j( p ).wrap(function() {
                            obj.title = obj.title ? obj.title.replace(/\"/g, "'") : '';
                            return '<a data-sub-html="<h3>' + obj.title + '</h3>" class="cdEffect" href="' + obj.poster_big + '" />'
                        });
                        j( p ).parent().append( '<i class="fa fa-expand"></i>' );
                    }
                });
            }
            codevzGallery();

            /* Responsive */
            j(window).resize(function(){
                if ( cover.length ) {
                    j( '.has_cover_content', i ).css( { "width": cover.parent().width() - cover.width() - 20 } );
                }
                j( '.jp-progress', i ).css( 'width', j( '.jp-audio', i ).width() - 204 );
                j( '.jp-playlist li', i ).each(function() {
                    var newWidth = j( this ).width() - j( '.buytrack', this ).width();
                    j( '.jp-playlist-item', this ).css( 'width', newWidth - 20 );
                });
                j( '.inline_tracks' ).each(function() {
                    j( 'li', this ).each(function() {
                        var newWidth = j( this ).width() - j( '.buytrack', this ).width();
                        j( 'a', this ).css( 'width', newWidth - 10 );
                    });
                });
            }).resize();
        },
        history = function( type, history ) {
            j( '#history', i ).slideDown().html( '<div style="display: block;position: relative;left: 40%" class="preloader mt mb clr"><span class="is_loading"><img style="display: block;" src="' + Theme + '/img/loading.gif" /></span></div>' );
            j.ajax({
                url: AjaxURL,
                data: {action: 'new_nonce'},
                success: function( nonce ) {
                    j.ajax({
                        url: AjaxURL,
                        data: {
                            action: "radio_history",
                            type: type,
                            history: history,
                            nonce: nonce
                        },
                        success: function( msg ) {
                            if ( msg !== "-1" ) {
                                j( '#history', i ).html( msg );

                                j( '#history', i ).prepend( '<div class="update_history">125s</div>' );
                                clearInterval( history_timer );
                                history_timer = setInterval(function() {
                                    j( '.update_history' ).html( ( parseInt( j( '.update_history' ).html() ) - 1 ) + 's' );
                                }, 1000 );

                                //j( ".update_history", i ).on('click', function() {
                                //    j( ".update_history i", i ).addClass("fa-spin");
                                //    history( type, history );
                                //});

                                j( '#history table', i  ).animate( {opacity: 1}, "slow" );
                                j( '#history', i  ).slideDown();
                                j( ".update_history i", i ).removeClass("fa-spin");
                                j( '#history td' ).each(function(i) {
                                    var now_playing = j( this ).html();
                                    if ( i === 3 ) {
                                        j( '.played .played span' ).html( ' - ' + now_playing );
                                        j( '.ajax_current_title' ).html( '<i class="fa fa-play mi"></i> ' + now_playing );
                                        return false;
                                    }
                                });
                            } else {
                                j( '#history', i  ).html( 'Error, Please reload track or page.' ).slideDown();
                            }
                        }
                    });
                }
            });
        }, 
        CookiePlay = function( n ) {
            if ( ! GetCookiePlay( n ) ) {
                var d = new Date();
                d.setTime( d.getTime() + 10000 );
                var expires = "expires=" + d.toUTCString();
                document.cookie = n + "=" + '1' + "; " + expires;
            }
        },
        GetCookiePlay = function( n ) {
            var name = n + "=";
            var ca = document.cookie.split(';');
            for ( var ii=0; ii<ca.length; ii++ ) {
                var c = ca[ii];
                while ( c.charAt(0) == ' ' ) {
                    c = c.substring(1);
                }
                if ( c.indexOf(name) == 0 ) {
                    //return c.substring(name.length,c.length);
                    return name;
                }
            }
            return '';
        },
        options = {
            playlistOptions: {
                autoPlay: j.parseJSON( data ? data.autoplay : true )
            },
            swfPath: Theme + '/js',
            supplied: "mp3, oga",
            wmode: "window",
            loop: j.parseJSON( data ? data.repeat : true ),
            smoothPlayBar: true,
            volume: data.volume || 1,
            ready: function() {
                j( '.preloader', i ).fadeOut();
                j( '.has_cover, .has_cover_content, .full_player', i ).css( 'opacity', 1 );
                nitro();
                codevzNiceScroll();

                /* Volume */
                j('.volume', i).on({
                    mouseenter: function() {
                        j('.vol', this).fadeIn();
                    },
                    mouseleave: function() {
                        j('.vol', this).fadeOut();
                    }
                });

                /* Downloads */
                j( '.download_track' ).on('click', function() {
                    var link = document.createElement('a');
                    var id = j( this ).data( 'id' ) || j( this ).closest('.player').data( 'id' );
                    link.href = j( this ).attr( 'href' );
                    link.download = link.href;
                    link.click;
                    codevzCount( id, 'downloads' );
                });

                /* Timer */
                j('[role="timer"]').on('click', function() {
                    j('[role="timer"]').fadeToggle();
                });

                j( '.toggle_playlist' ).on('click', function() {
                    j( '.ajax_player .jp-playlist' ).slideToggle();
                    return false;
                });

                j( '.toggle_player' ).on('click', function() {
                    i.slideToggle();

                    if ( i.is(':visible') ) {
                        j( '.footer-last' ).toggleClass('mbs');
                    }

                    return false;
                });
                    
                /* Bak to music */
                j( '.original_player' ).on('click', function() {
                    window.open( j( this ).attr( 'href' ) ).focus();
                    window.close();
                    return false;
                });

                /* Popup play */
                if ( j( '.player_popup' ).length ) {
                    j( '.jp-jplayer' ).jPlayer( 'play' );
                }
            },
            play: function () {
                nitro();
                var cur  = myPlaylist.current,
                    list = myPlaylist.playlist;

                /* Scroll to played */
                var ajax_p = j( '.ajax_player' );
                if ( j( 'li.jp-playlist-current', ajax_p ).length ) {
                    j( '.scroll', ajax_p ).animate({
                        scrollTop: j(".jp-playlist-current").position().top - j( ".scroll > ul", ajax_p ).position().top - (j( ".scroll", ajax_p ).height()/2) + (j(".jp-playlist-current").height()/2) + 10,
                    }, 200 );
                }

                /* Track info */
                j.each( list, function ( n, obj ) {
                    if ( n === cur ) {
                        if ( ! j( '.ajax_current_title' ).length ) {
                            j( '.ajax_player .jp-type-playlist' ).append('<span class="ajax_current_title"></span>');
                        }
                        j( '.ajax_player .ajax_current_title' ).html( obj.title + '<span>' + ( obj.artists ? obj.artists.replace(/(<([^>]+)>)/ig,"") : '' ) + '</span>' );
                        j( '.artist b', i ).html( obj.artists );
                        j( '.plays b', i ).html( obj.plays );
                        if ( obj.type && obj.history ) {
                            history( obj.type, obj.history );
                            clearInterval( history_interval );
                            history_interval = setInterval(function() {
                                history( obj.type, obj.history );
                            }, 120000 );
                        } else {
                            j( "#history", i ).slideUp();
                            clearInterval( history_interval );
                        }

                        return false;
                    }
                });

                /* Played-Paused */
                j( '.jp-playlist li', i ).removeClass( 'played' ).addClass( 'paused' );
                j( '.jp-playlist-current', i ).removeClass( 'paused' ).addClass( 'played' );

                /* Count Plays */
                if ( ! GetCookiePlay( 'cd_' + cur ) ) {
                    codevzCount( o.data( 'id' ), 'plays' );

                    /* If is playlist */
                    j.each( list, function ( n, obj ) {
                        if ( n === cur && ! j('.single-songs').length && ! j('.single-podcasts').length ) {
                            codevzCount( obj.track_id, 'plays' );
                        }
                    });

                    CookiePlay( 'cd_' + cur );
                }

                /* Popup links */
                if ( j( '.player_popup' ).length ) {
                    j( 'a' ).attr('target', 'blank');
                }
            },
            pause: function () {
                j( '.jp-playlist li', i ).removeClass( 'played' ).addClass( 'paused' );
                j( '#history', i ).slideUp();
                clearInterval( history_interval );
                clearInterval( history_timer );
            }
        };

        var myPlaylist = new jPlayerPlaylist({
            jPlayer: ( '#' + o.attr( 'id' ) ) + ' .jp-jplayer',
            cssSelectorAncestor: ( '#' + o.attr( 'id' ) ) + ' .jp-audio'
        }, tracks, options );

    return myPlaylist;
}

function codevzRunPlayer() {
    'use strict';

    j( '.player' ).each(function() {
        if ( j( '.ajax_player' ).length ) {
            j( '.footer-last' ).addClass('mbs');
            return false;
        }
        codevzPlayer( j( this ) );
    });

    /* Popup */
    j( '.popup_player' ).on('click', function() {
        var pop_parent = j( this ).closest( '.inline_tracks, .player' );
        j( '.jp-jplayer', pop_parent ).jPlayer( 'stop' );
        window.open( j( this ).attr( 'href' ), "null", "height=" + ( pop_parent.height() + 50 ) + ", width=800, top=200, left=200" ).focus();
        return false;
    });

    /* Share player */
    j( '.share_player, .close-share' ).on('click', function() {
        var parent = j( this ).closest( '.inline_tracks, .player' );
        j( '.share_dialog', parent ).fadeToggle();
        return false;
    });
    j( '.jp-socials a' ).on('click', function() {
        window.open( j( this ).attr( 'href' ), "null", "height=300, width=600, top=200, left=200" );
        return false;
    });

    /* Inline tracks */
    j( '.inline_tracks li' ).each(function() {
        var data = j( 'a', this ).data( 'title' );
        j( this ).append( j( data ).filter( '.buytrack' ) );
    });
    j( '.inline_tracks' ).each(function() {
        var c   = j( '.has_cover', this ),
            cn  = j( '.has_cover_content', this );

        j(window).resize(function(){
            if ( c.length ) {
                cn.css( { "width": c.parent().width() - c.width() - 5 } );
            }
            j( '.jp-playlist li', this ).each(function() {
                var nw = j( this ).width() - j( '.buytrack', this ).width();
                j( '.current_title', this ).css( 'width', nw );
            });
        }).resize();
    });
}

/* Ajax posts */
function codevzAjaxPosts( o ) {
    'use strict';

    var s       = '#listing_' + o.ajax_id,
        dis     = j( s ),
        items   = dis.find( '.ajax-item' ).length, 
        requestRunning = true,
        action  = { action: 'ajax_query' },
        param   = j.extend({}, action, o),
        offset  = param['offset'] ? param['offset'] : 0;

    param['offset'] = offset + items;
    dis.find( '.load_more a' ).addClass( 'is_loading' );

    j.ajax({
        type: "GET",
        url: AjaxURL,
        dataType: 'html',
        data: ( param ),
        success: function( data ) {
            if ( data == '-11' || data.replace(/(\r\n|\n|\r)/gm,"") == '-11' ) {
                dis.find('.load_more a span').html('No more');
                dis.find('.load_more').addClass( 'no_more' ).html( o.no_more );
            } else {

                if ( o.layout == 'modern' ) {
                    var moreBlocks = j( data ),
                        msnry = j( s + ' .modern .posts' );
                    msnry.append( moreBlocks );
                    msnry.masonry( 'appended', moreBlocks );
                    //codevzConvertDataImg();
                    msnry.imagesLoaded().progress( function() {
                        msnry.masonry('layout');
                        setTimeout( function() {
                            msnry.masonry('layout');
                        }, 1500 );
                    });
                } else {
                    j( data ).hide().appendTo( s + ' .posts' ).slideDown();
                }
                
                czLazyload();
                dis.find('.load_more a').removeClass('is_loading');
            }

            /* Ajaxify new links */
            if ( j.fn.ajaxify ) {
                j( s ).ajaxify();
            }
        }
    });
}

/* Nicescroll */
function codevzNiceScroll() {
    'use strict';

    if ( j('.scroll').length ) {
        j( '.scroll' ).each(function() {
            j( this ).niceScroll({
                railalign: j( '#cd-rtl-css' ).length ? 'left' : 'right',
                cursorborder: 'inherit',
                cursorcolor: '#999',
                cursorwidth: '8px',
                cursoropacitymin: 0.2
            });
        });
    }
}

function codevzAjaxLoaded() {
    'use strict';

    return j( 'body' ).hasClass( 'ajax_loaded' );
}

function czLazyload() {
    'use strict';

    j( '[data-src]' ).each(function() {
        if ( j( this ).data( 'src' ) && codevzScrollIntoView( j( this ) ) ) {
            j( this ).attr( 'src', j( this ).data( 'src' ) ).attr( 'srcset', j( this ).attr( 'old' ) ).removeAttr('data-src old').addClass('lazyloaded');
        }
    });
}

function czOpacityOneByOne( e, s ) {
    'use strict';

    e.css({opacity: 0,marginLeft: -20}).each(function( i ) {
        j( this ).delay( s * i ).animate({opacity: 1,marginLeft: 0});
    });
}

j(document).ready(function() {
    'use strict';

    // Lazyload
    if ( j( '[data-src]' ).length ) {
        j(window).scroll(function() {
            czLazyload();
        });
    }
    czLazyload();

    // Init
    codevzTooltip();
    codevzGallery();
    codevzPreloader();
    codevzCarousel();
    codevzMasonry();
    //codevzConvertDataImg();
    codevzRunPlayer();
    codevzPopup();
    codevzCountdown();
    codevzNiceScroll();

    if ( ! codevzAjaxLoaded() ) {
        codevzAjaxSearch();
    }

    /* Videos view counter */
    if ( j('.single-videos').length ) {
        codevzCount( j('article.videos').attr('id'), 'views' );
    }
    if ( j('.lightbox').length ) {
        j('.lightbox').on('click', function() {
            var id = j( this ).parent().attr('id');
            id = id ? id.replace('post-', '') : 0;
            if ( id ) {
                codevzCount( id, 'views' );
            }
        });
    }

    /* Menu */
    var nav = j( '.sf-menu' );
    if ( nav.length ) {
        nav.superfish({
            delay: 100,
            onBeforeShow: function() {
                if ( ! j( this ).is(':visible') ) {
                    czOpacityOneByOne( j( '> li', this ), 100 );
                }
            },
            onInit: function() {
                var currents = j( '> .current-menu-item, > .parent_menu_item, > .current-menu-parent', nav );
                if ( currents.length ) {
                    currents.addClass('selectedLava');
                } else if ( j( '.current_page_parent', nav ).length ) {
                    j( '.current_page_parent', nav ).closest('.menu-item-has-children').addClass('selectedLava');
                } else {
                    j( '> li:first-child', nav ).addClass('selectedLava');
                }
                nav.lavaLamp({
                    target:'> li:not(.child_menu_item)', 
                    setOnClick: false,
                    click: function() {
                        return true;
                    }
                });
                j( '.sf-with-ul' ).each(function(){
                    if ( ! j( 'i', this ).length ) {
                        if ( j( '.sub', this ).length ) {
                            j( '.sub', this ).before( '<i class="fa fa-angle-down"></i>' )
                        } else {
                            j( this ).append( '<i class="fa fa-angle-down"></i>' );
                        }
                    }
                });
                j( 'ul ul .fa-angle-down' ).addClass('fa-angle-right').removeClass('fa-angle-down');
                setTimeout( function() {
                     j( nav ).addClass( 'cd_no_sub' );
                    if ( j('.sf-menu > li a span').length ) {
                        var h = j('.sf-menu li a span').parent().height();
                        if ( h ) {
                            j( nav ).removeClass( 'cd_no_sub' );
                            j( 'li a', nav ).css( 'height', h );
                            j( 'li li a', nav ).css( 'height', 'inherit' );
                        }
                    } else {
                        j( 'li a', nav ).css( 'padding', '0 40px 20px 0' );
                        j( 'li li a', nav ).css( 'padding', '8px 15px' );
                        j( 'li ul', nav ).css( 'top', '21px' );
                    }
                }, 1000 );
                setTimeout( function() {
                    if ( j( '> li.selectedLava', nav ).length ) {
                        var l = Math.round( j( '> li.selectedLava', nav ).offset().left - nav.offset().left );
                        j( '.left', nav ).css( 'width', j( '> li.selectedLava', nav ).width() );
                        j( '.back', nav ).css( 'width', j( '> li.selectedLava', nav ).width() );
                        j( '.back', nav ).css( 'left', l );
                    }
                }, 1000 );
            }
        });
    }

    /* MobileMenu */
    if ( ! j( "header .mobile" ).length ) {
        j( 'header' ).prepend( '<div class="row"><a class="mobile" href="#"><i class="fa fa-remove fa-bars"></i></a><div class="mobile_nav"></div></div>' );
        j( '.mobile_nav' ).html( j( '#mobile' ).clone().html() );
        j( '.mobile_nav li, .mobile_nav ul, .mobile_nav a' ).removeClass();
        j( '.mobile_nav li' ).removeAttr( 'id' );
        j( '.mobile_nav .fa-angle-right' ).addClass( 'fa-angle-down' ).removeClass( 'fa-angle-right' );
        j( '.mobile_nav .fa-angle-down' ).wrap(function() {
            return '<a href="#" class="openUl" />';
        });
        j( '.mobile_nav .openUl' ).parent().after( j( '.openUl' ) );
        j( '.mobile_nav .openUl' ).next('.openUl').remove();

        j( '.mobile' ).on('click', function() {
            j( '.mobile_nav' ).slideToggle().toggleClass( 'isOpen' );
            j( 'i', this ).toggleClass( 'fa-bars' );
            return false;
        });
        j( '.mobile_nav .openUl' ).on('click', function() {
            j( this ).next().slideToggle();
            return false;
        });

        j( '.mobile_nav' ).on( 'click', function(e) {
            e.stopPropagation();
        });
        
        j( 'body, .mobile_nav a' ).on( 'click', function(e) {
            if ( e.target.className == 'fa fa-angle-down' ) {
                return;
            }
            j( '.mobile_nav' ).slideUp();
            j( '.mobile i' ).addClass( 'fa-bars' );
        });
        if ( j.fn.ajaxify ) {
            j( '.mobile_nav' ).ajaxify();
        }
    }

    /* Fullscreen menu */
    var menu_fullscreen = j( '.fullscreen_menu' );
    var head_full = menu_fullscreen.closest('#header');
    if ( head_full.length ) {
        j( '.full_menu, .fullscreen_menu_on, .full_menu', head_full ).detach();
        j( '.headdown .row', head_full ).append( '<i class="fa fa-remove fa-bars full_menu"></i><div class="fullscreen_menu_on"><div class="fullmenu_inner clr"></div></div>' );

        if ( j( '.social', head_full ).length ) {
            var social4 = j( '.social', head_full )[0].outerHTML,
                sf4 = j( '#mobile', head_full )[0].outerHTML;

            j( '.fullmenu_inner' ).html( sf4 + social4 );
            j( '.fullmenu_inner .sf-menu li li, .fullmenu_inner .sf-with-ul > i' ).remove();
            j( '.fullmenu_inner .sf-with-ul' ).removeClass();
        }

        j( '.full_menu, .fullscreen_menu_on', head_full ).on('click', function(e) {
            j( '.full_menu', head_full ).toggleClass( 'fa-bars' );
            j( '.fullscreen_menu_on' ).fadeToggle();

            j( '.fullmenu_inner .sf-menu > li' ).css({opacity: 0,marginLeft: -40}).each(function(i) {
                j( this ).delay( 200 * i ).animate({opacity: 1,marginLeft: 30}).animate({marginLeft: 0});
            });
        });

        j( '.fullmenu_inner', head_full ).on('click', function(e) {
            e.stopPropagation();
        });

        j( '.fullscreen_menu_on .sub-menu' ).prev('a').on('click', function(e) {
            if ( e.target === this ) {
                j( this ).next( '.sub-menu' ).slideToggle();
            }
            e.preventDefault();
        });

        // Ajax re-call
        if ( j.fn.ajaxify ) {
            var History = window.History;
            if ( !History.enabled ) {
                return false;
            } else {
                j( '.fullscreen_menu_on li:not(.menu-item-has-children) a' ).on('click', function( e ) {
                    var $t = j(this),
                        url = $t.attr('href'),
                        title = $t.attr('title') || null;

                    /* Continue as normal for cmd clicks etc */
                    if ( e.which == 2 || e.metaKey ) { return true; }

                    History.pushState( null, title, url );
                    e.preventDefault();

                    /* Fix Nicescroll */
                    j( '.nicescroll-rails' ).detach();

                    j( '.fullscreen_menu_on' ).fadeOut();
                    j( '.full_menu', head_full ).toggleClass( 'fa-bars' );
                    return false;
                });
            }
            j( '.fullscreen_menu_on .fa-angle-down' ).detach();
        }
    }

    /* Likes */
    if ( j('.likes_dislikes').length ) {
        j( '.likes_dislikes a' ).on( 'click', function() {
            var t = j( this ).data('type'),
                p = j( this ).parent(),
                i = p.data('id'),
                c = p.data('cm'),
                n = p.data('nonce');

            p.append( '<div class="cd_doing"><span></span></div>' );
            j( 'b', this ).html( '...' );

            j.ajax({
                type: 'POST',
                url: AjaxURL,
                data: 'action=likes_dislikes&type='+ t +'&cm='+ c +'&nonce='+ n +'&id='+i,
                success: function( m ) {
                    var o = j.parseJSON( m );
                    if ( o.message !== 'Rated' ) {
                        j('[ data-id=' + i + ']').append('<div class="error"></div>');
                        j('[ data-id=' + i + '] .error').html( o.message ).fadeIn().delay(2000).queue(function(){
                            j( this ).fadeOut().dequeue();
                        });
                        return;
                    }

                    j( '.like', p ).removeClass( 'liked' )
                        .addClass( o.like_class )
                        .attr( 'title', o.like )
                        .attr( 'original-title', o.like )
                        .find( 'b' ).html( o.likes );

                    j( '.dislike', p ).removeClass( 'disliked' )
                        .addClass( o.dislike_class )
                        .attr( 'title', o.dislike )
                        .attr( 'original-title', o.dislike )
                        .find( 'b' ).html( o.dislikes );

                    j( '.cd_doing', p ).remove();
                }
            });

            return false;
        });
    }

    /* Ajax load more */
    var requestRunning = false;
    if ( j('.load_more').length ) {
        j('.load_more a').on('click', function(e){
            if ( requestRunning ) {
                e.preventDefault();
                return;
            }
            codevzAjaxPosts( j( this ).parent().parent().data( 'param' ) );
            return false;
        });
    }

    /* Ajax posts by scroll */
    if ( j('.type_scroll').length ) {
        j(window).scroll(function(){
            if ( !requestRunning && !j('.no_more').length && !j('.load_more .is_loading').length && codevzScrollIntoView( j('.type_scroll').parent().find('.load_more a') ) ) {
                codevzAjaxPosts( j( '.type_scroll' ).parent().data( 'param' ) );
            }
        }); 
    }

    /* Slider position */
    var header_height = j('#header').height();
    j('.overlay_header').css('top', - header_height + 'px').css('margin-bottom', - header_height + 'px');
    j('#header .logo img').on('load', function(){
        var header_height = j( '#header' ).height();
        j('.overlay_header').css('top', - header_height + 'px').css('margin-bottom', - header_height + 'px');
    });

    /* iframes size */
    var $iframes = j( '.cd_iframe, object, embed, .textwidget iframe' ).not('.wp-embedded-content');
    if ( $iframes.length ) {
        $iframes.each(function() {
            j( this ).attr( 'data-aspectRatio', this.height / this.width ).removeAttr( 'height width' );
        });
        j(window).resize(function() {
            $iframes.each(function() {
                var newWidth = j( this ).parent().width();
                var $el = j( this );
                $el.width( newWidth ).height( newWidth * $el.attr( 'data-aspectRatio' ) );
            });
        }).resize();
    }

    /* Extra */
    if ( j('.tagcloud').length ) {
        j( '.tagcloud' ).addClass( 'clr' ).find( 'a' ).prepend( '<i class="fa fa-tag mi"></i>' );
    }
    j( '#toTop' ).on( 'click', function() {
        j( 'body, html' ).animate( { scrollTop: 0 }, 800, 'swing' );
    });

    /* Tabs */
    if ( j('.tabs').length ) {
        j( '.tabs' ).each(function() {
            j( '.tabs-nav a:first', this ).addClass( 'active' );
            j( '.tab:first', this ).addClass( 'active' ).siblings().hide().removeClass( 'active' );
            j( '.tabs-nav a', this ).click(function (e) {
                var tabs = j( this ).parent().prop('className'),
                    hash = j( this ).attr( 'href' );
                if ( hash.charAt( 0 ) === '#' ) {
                    e.preventDefault();
                    j( this ).closest( '.tabs' ).find( '.tabs-nav a' ).removeClass( 'active' );
                    j( this ).addClass('active');
                    j( this ).closest( '.tabs' ).find( hash ).show().addClass('active scaleIn').siblings().hide().removeClass('active');
                }
            });
        });
    }

    /* Gallery */
    if ( j('.tp-grid').length ) {
        j( '.tp-grid' ).each(function() {
            var fix = function() {
                    j( 'li', this ).each(function(){
                        if( j( this ).css( 'opacity' ) == 1 ) {
                            j( this ).addClass( 'inview_item' ).fadeIn();
                            var h = j( 'a', this ).data( 'href' );
                            j( 'a', this ).attr( 'href', h );
                        } else {
                            j( this ).removeClass( 'inview_item' ).fadeOut();
                        }
                    });
                },
                parent  = j( this ).parent().parent(),
                name    = j( '.tt', parent ),
                oldname = j( '.tt', parent ).html(),
                close   = j( '#close', parent ),
                loader  = j( '<div class="loader"><i></i><i></i><i></i><i></i><i></i><i></i><span>Loading...</span></div>' ).insertBefore( j( this ) ),
            stapel = j( this ).stapel({
                randomAngle : true,
                delay : 100,
                gutter : 0,
                pileAngles : 3,
                onLoad : function() {
                    loader.remove();
                },
                onAfterOpen : function( pileName ) {
                    name.html( pileName );
                    close.show();
                    j( '.page-numbers', parent ).slideUp();
                    fix();
                    codevzGallery();
                }
            });
            close.on( 'click', function() {
                close.hide();
                j( '.page-numbers', parent ).slideDown();
                name.html( oldname );
                stapel.closePile();
                fix();
                j( '.tp-grid', parent ).find( 'a' ).attr( 'href', '#' );
                codevzGallery();
            });
        });
    }

    /* Login form */
    if ( j('#login form').length ) {
        j( '#login form' ).each(function() {
            var form = j( this ), 
                check = false, 
                inputs = form.find( 'input' );

            form.submit(function() {
                /* Check inputs */
                inputs.each(function() {
                    if ( ! j( this ).val() ) {
                        j( this ).select();
                        check = false;
                        return check;
                    } else {
                        check = true;
                    }
                });

                if ( j( '.cd_doing', form ).length ) {
                    return false;
                }

                if ( check ) {
                    var btn = form.find( '.submit' ),
                        btnHTML = btn.html();
                    btn.attr( 'disabled', 'disabled' ).html( ' ... <div class="cd_doing"><span></span></div>');
                    form.find( '.error' ).slideUp( 100 );

                    j.post( AjaxURL, form.serialize(), function( msg ) {
                        if ( msg ) {
                            form.find( '.error' ).html( msg ).slideDown( 100 );
                            btn.html( btnHTML );
                        } else {
                            window.location.reload( true );
                        }
                        form.find( '.submit' ).removeAttr( 'disabled' );
                    });
                }

                return false;
            });
        }).find( '.submit' ).click(function() {
            j( this ).parent('form').submit();
            return false;
        });
    }

    /* Sticky */
    if ( j('.is_sticky').length ) {
        j( '.is_sticky' ).each(function() {
            var dis = j( this ),
                divHeight = dis.height(),
                stickyNavTop = dis.offset().top,
                lastScrollTop = 0,
                stickyNav = function () {
                    var scrollTop = j(window).scrollTop();
                    if ( scrollTop > stickyNavTop ) {
                        dis.addClass('ONsticky');
                        j('.Corpse_Sticky').css('height', divHeight + 'px');

                        /* Fix logo and sticky size */
                        j('.headdown').height( j('.Corpse_Sticky').height() );
                        var headdownH = j('.headdown').height(),
                            logoH = j('.logo').height(),
                            logoM = j('.logo').css('marginTop').replace('px', '');
                        //j( '.logo' ).css( 'margin-top', headdownH / 2 - logoH / 2 );
                    } else {
                        dis.css('height', 'auto');
                        j('.Corpse_Sticky').css('height', 'auto');
                        dis.removeClass('ONsticky');
                        j( '.logo' ).removeAttr( 'style' );
                    }
                };

            /* Add corpse */
            if ( ! j( '.Corpse_Sticky' ).length ) {
                dis.before( '<div class="Corpse_Sticky"></div>' );
            }

            /* Scrolled */
            j(window).scroll(function(e){
                var divHeight = dis.height();
                stickyNav();
                dis.toggleClass( 'hasScrolled', j(document).scrollTop() >= 250 );
                var st = j(this).scrollTop();
                var wind_scr = j(window).scrollTop();
                var window_width = j(window).width();
                if( wind_scr > 300 ){
                    if (st > lastScrollTop){
                        j('.ONsticky').addClass('T_off').css({'top' : '-' + divHeight + 'px'});
                    } else {
                        j('.ONsticky').removeClass('T_off').css({'top' : '0'});
                    }
                    lastScrollTop = st;
                }
            });

            /* On resize */
            j(window).resize(function(){
                var divHeight = dis.height();
                var window_width = j(window).width();
                if ( window_width <= 959 ) {
                    if(dis.hasClass('ONsticky')){
                        dis.removeClass('ONsticky');
                        dis.stop(true).animate({opacity : 0}, 200, function(){
                            dis.removeClass('ONsticky');
                            dis.stop(true).animate({opacity : 1}, 200);
                            j('.Corpse_Sticky').css('height', 'auto');
                        });
                    }
                }
            }).resize();
        });
    }

    /* OnePage */
    if ( j( '.page-template-page-onepage' ).length ) {
        var m = j( '.sf-menu, .mobile_nav' );
        j( 'a', m ).click(function() {
            if ( location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname ) {
                var t = j( this.hash );
                t = t.length ? t : j('[id="' + this.hash + '"]');
                if ( t.length ) {
                    j( 'html, body' ).animate( { scrollTop: t.offset().top - 20 }, 1500, 'swing' );
                    return false;
                }
            }
        });

        // Fix
        j( '.sf-menu li' ).removeClass('selectedLava');

        j(window).scroll(function(){
            var h = m.outerHeight() + 15,
                i = j( "a[href*='#']", m ),
                s = i.map(function(){
                    var a = j( j( this ).attr( 'href' ) );
                    if ( a.length ) { return a; }
                }),
                t = j( this ).scrollTop() + h,
                c = s.map(function(){
                    if ( j(this).offset().top < t ) {
                        return this;
                    }
                });

            c = c[c.length-1];
            var id = c && c.length ? c[0].id : '';
            j( 'li', m ).removeClass( "current" );
            j("[href='#" + id + "']").parent().addClass( "current" );
        });
    }

    /* SoundManager 2 */
    var sm = j( '.sm_player' );
    if ( sm.length ) {
        var data = sm.data('sm-player'),
            id = sm.data('id');

        soundManager.setup({
            url: Theme + '/js/sm/swf',
            onready: function() {}
        });

        var onplay360 = threeSixtyPlayer.events.play;
        var myOnplay = function(){
            codevzCount( id, 'plays' );
            onplay360.apply(this);
        };
        threeSixtyPlayer.events.play = myOnplay;

        threeSixtyPlayer.config = {
            playNext: false,
            autoPlay: j.parseJSON( data ? data.autoplay : false ),
            allowMultiple: false,
            loadRingColor: data.loadringcolor || '#ddd',
            playRingColor: data.playringcolor || '#ff0078',
            backgroundRingColor: 'none',
            circleDiameter: 256,
            circleRadius: 128,
            animDuration: 400,
            animTransition: Animator.tx.bouncy,
            showHMSTime: true,

            useWaveformData: true,
            waveformDataColor: data.waveformdatacolor || '#ccc',
            waveformDataDownsample: 3,
            waveformDataOutside: false,
            waveformDataConstrain: false,
            waveformDataLineRatio: 0.4,

            useEQData: true,
            eqDataColor: data.eqdatacolor || '#7F1949',
            eqDataDownsample: 1,
            eqDataOutside: true,
            eqDataLineRatio: 1.08,

            usePeakData: true,
            peakDataColor: data.peakdatacolor || '#ff33ff',
            peakDataOutside: true,
            peakDataLineRatio: 0.5,

            scaleArcWidth: 1,
            useAmplifier: true
        }

        if (threeSixtyPlayer.config.useWaveformData) {
            soundManager.flash9Options.useWaveformData = true;
        }
        if (threeSixtyPlayer.config.useEQData) {
            soundManager.flash9Options.useEQData = true;
        }
        if (threeSixtyPlayer.config.usePeakData) {
            soundManager.flash9Options.usePeakData = true;
        }
        if (threeSixtyPlayer.config.useWaveformData || threeSixtyPlayer.flash9Options.useEQData || threeSixtyPlayer.flash9Options.usePeakData) {
            soundManager.preferFlash = true;
        }
        if (window.location.href.match(/hifi/i)) {
            threeSixtyPlayer.config.useFavIcon = true;
        }
        if (window.location.href.match(/html5/i)) {
            soundManager.useHTML5Audio = true;
        }
    }

});