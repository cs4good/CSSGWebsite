import './scss/bootstrap/bootstrap.scss';
import './fonts/ionicons/css/ionicons.min.css';
// import './fonts/law-icons/font/flaticon.css';
import './fonts/fontawesome/css/font-awesome.min.css';
import './scss/slick.scss';
import './scss/slick-theme.scss';
import './scss/helpers.scss';
import './scss/style.scss';
import './scss/landing-2.scss';

import 'jquery';
import 'bootstrap';
import 'slick-carousel';
import './js/jquery.mb.YTPlayer.min.js';
import './js/jquery.waypoints.min.js';
import './js/jquery.easing.1.3.js';
import request from 'superagent';
import {CLIENT_ID, CAL_ID, API_KEY, SCOPES} from './keys.js';

import whiteLogoIcon from './images/logo_whitescale.png';
import logoIcon from './images/logo.png';
import phoneIcon from './images/phone_3.png';

$(document).ready(function($) {

	"use strict";

	var phoneImg = document.getElementById('phone-pic');
	phoneImg.src = phoneIcon;

	var whiteLogo = document.getElementById('white-logo');
	whiteLogo.src = whiteLogoIcon;

	var darkLogo = document.getElementById('dark-logo');
	darkLogo.src = logoIcon;

	var eventsList = document.getElementById('cal-list');

	// get calendar events
	let TIME_MIN = (new Date(2018, 2, 1)).toISOString();
	let url = `https://www.googleapis.com/calendar/v3/calendars/${CAL_ID}/events?key=${API_KEY}&timeMin=${TIME_MIN}`;
	request
    .get(url)
    .end((err, resp) => {
      if (!err) {
				// console.log(resp.text);
        let events = [];
        JSON.parse(resp.text).items.map((event) => {
					if('start' in event && 'end' in event && 'summary' in event){
						let start = ('date' in event.start) ? event.start.date : event.start.dateTime;
						let end = ('date' in event.end) ? event.end.date : event.end.dateTime;
						if (new Date(start) > new Date(TIME_MIN) && events.length < 4) {
							events.push({
								start: start,
								end: end,
								title: event.summary,
							});
							var p = document.createElement('p');
							p.innerHTML = event.summary;
							eventsList.appendChild(p);
						}
					}
				});
				if(events.length === 0) {
					var p = document.createElement('p');
					p.innerHTML = 'No events to show. Check back later!';
					eventsList.appendChild(p);
				}
      }
    });

	var loader = function() {
		
		setTimeout(function() { 
			if($('#pb_loader').length > 0) {
				$('#pb_loader').removeClass('show');
			}
		}, 700);
	};
	loader();

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.pb_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');
					whiteLogo.style.display = 'none';
					darkLogo.style.display = 'inline';
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
					whiteLogo.style.display = 'inline';
					darkLogo.style.display = 'none';
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();
	
	// slick sliders
	var slickSliders = function() {
		$('.single-item').slick({
			slidesToShow: 1,
		  slidesToScroll: 1,
		  dots: true,
		  infinite: true,
		  autoplay: false,
	  	autoplaySpeed: 2000,
	  	nextArrow: '<span class="next"><i class="ion-ios-arrow-right"></i></span>',
	  	prevArrow: '<span class="prev"><i class="ion-ios-arrow-left"></i></span>',
	  	arrows: true,
	  	draggable: false,
	  	adaptiveHeight: true
		});

		$('.single-item-no-arrow').slick({
			slidesToShow: 1,
		  slidesToScroll: 1,
		  dots: true,
		  infinite: true,
		  autoplay: true,
	  	autoplaySpeed: 2000,
	  	nextArrow: '<span class="next"><i class="ion-ios-arrow-right"></i></span>',
	  	prevArrow: '<span class="prev"><i class="ion-ios-arrow-left"></i></span>',
	  	arrows: false,
	  	draggable: false
		});

		$('.multiple-items').slick({
		  slidesToShow: 3,
		  slidesToScroll: 1,
		  dots: true,
		  infinite: true,
		  
		  autoplay: true,
	  	autoplaySpeed: 2000,

		  arrows: true,
		  nextArrow: '<span class="next"><i class="ion-ios-arrow-right"></i></span>',
	  	prevArrow: '<span class="prev"><i class="ion-ios-arrow-left"></i></span>',
	  	draggable: false,
	  	responsive: [
		    {
		      breakpoint: 1125,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 1,
		        infinite: true,
		        dots: true
		      }
		    },
		    {
		      breakpoint: 900,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 2
		      }
		    },
		    {
		      breakpoint: 580,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1
		      }
		    }
		  ]
		});

		$('.js-pb_slider_content').slick({
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  arrows: false,
		  fade: true,
		  asNavFor: '.js-pb_slider_nav',
		  adaptiveHeight: false
		});
		$('.js-pb_slider_nav').slick({
		  slidesToShow: 3,
		  slidesToScroll: 1,
		  asNavFor: '.js-pb_slider_content',
		  dots: false,
		  centerMode: true,
		  centerPadding: "0px",
		  focusOnSelect: true,
		  arrows: false
		});

		$('.js-pb_slider_content2').slick({
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  arrows: false,
		  fade: true,
		  asNavFor: '.js-pb_slider_nav2',
		  adaptiveHeight: false
		});
		$('.js-pb_slider_nav2').slick({
		  slidesToShow: 3,
		  slidesToScroll: 1,
		  asNavFor: '.js-pb_slider_content2',
		  dots: false,
		  centerMode: true,
		  centerPadding: "0px",
		  focusOnSelect: true,
		  arrows: false
		});
	};
	slickSliders();

	// navigation
	var OnePageNav = function() {
		var navToggler = $('.navbar-toggler');
		$(".smoothscroll[href^='#'], #probootstrap-navbar ul li a[href^='#']").on('click', function(e) {
		 	e.preventDefault();
		 	var hash = this.hash;
		 		
		 	$('html, body').animate({

		    scrollTop: $(hash).offset().top
		  }, 700, 'easeInOutExpo', function(){
		    window.location.hash = hash;
		  });
		});
		$("#probootstrap-navbar ul li a[href^='#']").on('click', function(e){
			if ( navToggler.is(':visible') ) {
		  	navToggler.click();
		  }
		});

		$('body').on('activate.bs.scrollspy', function () {
		  console.log('nice');
		})
	};
	OnePageNav();

	var offCanvasNav = function() {
		var toggleNav = $('.js-pb_nav-toggle'),
				offcanvasNav = $('.js-pb_offcanvas-nav_v1');
		if( toggleNav.length > 0 ) {
			toggleNav.click(function(e){
				$(this).toggleClass('active');
				offcanvasNav.addClass('active');
				e.preventDefault();
			});
		}
		offcanvasNav.click(function(e){
			if (offcanvasNav.hasClass('active')) {
				offcanvasNav.removeClass('active');
				toggleNav.removeClass('active');
			}
			e.preventDefault();
		})
	};
	offCanvasNav();

	var ytpPlayer = function() {
		if ($('.ytp_player').length > 0) { 
			$('.ytp_player').mb_YTPlayer();	
		}
	}
	ytpPlayer();


	


});

