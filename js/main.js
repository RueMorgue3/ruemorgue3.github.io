
/**
 *
 *  Main JavaScript
 *
 *  @package ohkimur_scripts
 *
 **/

// IIFE - Immediately Invoked Function Expression
(function ($, window, document) {

  // The $ is now locally scoped

  // Listen for the jQuery ready event on the document
  $(function () {

    // The DOM is ready!

    // Global Variables
    var $window = $(window);

    /**
     *  Page Loader
     **/
    setTimeout(function () {
      $('.page-loader').addClass('load-complete');
    }, 1500);

    /**
     *  Parallax with Scrollax.js - Initialization
     **/
    'use strict';
    $.Scrollax();

    /**
     *  Main Menu Navigation
     **/
    var $body = $('body');
    var $nav_menu = $('.navigation-bar');
    var $nav_menu_link = $('#navMenu ul li a');
    var $toggle_menu_button = $('.navTrigger');

    // Navigation Menu Link
    $nav_menu_link.on('click', function () {

      // Select Current Navigation Item
      $nav_menu_link.parent().removeClass('current-menu-item');
      $(this).parent().addClass('current-menu-item');

      // Close Mobile Menu
      $nav_menu.removeClass('active');
      $toggle_menu_button.removeClass('active');
      $body.removeClass('no-scroll');

    });

    // Toggle Mobile Menu
    $toggle_menu_button.on('click', function () {
      $nav_menu.toggleClass('active');
      $body.toggleClass('no-scroll');
      $(this).toggleClass('active');
    });

    // Remove all classes on window resize
    $window.on('resize', function () {
      $nav_menu.removeClass('active');
      $body.removeClass('no-scroll');
      $toggle_menu_button.removeClass('active');
    });

    /**
     *  Portfolio
     **/
    var $filter_menu_item = $('.filter-menu ul li');
    var $portfolio_grid = $('.portfolio-grid');
    var $portfolio_grid_item = $portfolio_grid.children(".item");
    var $overlay = $portfolio_grid.children("#overlay");
    var $img = '<img alt="Portfolio Overlay Image" />';
    var $data_filters = null;

    // Filter Menu
    $filter_menu_item.on('click', function () {

      // Filter Menu
      $filter_menu_item.removeClass('current');
      $(this).addClass('current');

      // Collecting Data Filters
      $data_filters = $(this).data('filter');

      // Hide All Portfolio Items
      if ($data_filters == 'all') {
        $portfolio_grid_item.addClass('visible');
      }
      else { // Show Portfolio Items from filter
        $portfolio_grid_item.removeClass('visible');
        $($data_filters).addClass('visible');
      }

    });

    // Show Image - Lightbox
    $portfolio_grid_item.find(".item-expand").on('click', function (e) {

      // Prevent Default Link Event
      e.preventDefault();

      // Get Image Link
      var $src = $(this).attr("href");

      // Create Image on the DOM
      $overlay.append($img);

      // Show Overlay Image
      $overlay.fadeIn(200).children("img").attr("src", $src);

      // Lock Body Scroll
      $body.toggleClass('no-scroll');

    });

    // Hide Overlay Lightbox
    $overlay.on('click', function () {

      // Hide Overlay Image
      $(this).fadeOut(200);

      // Remove Image from DOM
      $overlay.children("img").remove();

      // Unlock Body Scroll
      $body.toggleClass('no-scroll');

    });

    /**
     *  Scroll Event
     **/
    $window.scroll(function () {

      // Scroll Variables
      var $scrollTop = $window.scrollTop();
      var $windowHeight = $window.height();

      /**
       *  Go to Top Button
       **/
      var $go_top = $('.go-to-top-button');

      if ($scrollTop > 600) {
        $go_top.addClass('active');
      } else {
        $go_top.removeClass('active');
      }

      // Reveal Item on Scroll
      function revealItem($container, $item) {
        if ($scrollTop > ($container.offset().top - $windowHeight / 1.3)) {

          $item.each(function (i) {
            setTimeout(function () {
              $item.eq(i).addClass("is-showing");
            }, 150 * (i + 1));
          });

        }
      }

      // Portfolio Reveal Images
      revealItem($portfolio_grid, $portfolio_grid_item);

    });

    /**
     *  Testimonials Carousel Setup
     **/
    $("#testimonials-carousel").owlCarousel({

      navigation: true, // Show next & prev buttons
      slideSpeed: 300,
      paginationSpeed: 400,
      singleItem: true

    });

        /**
     *  Testimonials Carousel Setup
     **/
         $("#testimonials-carousel2").owlCarousel({

          navigation: true, // Show next & prev buttons
          slideSpeed: 300,
          paginationSpeed: 400,
          singleItem: true
    
        });

    /**
     *  Smooth Scrolling for Links
     **/
    $('a[href*="#"]:not([href="#"])').on('click', function () {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });

  });

}(window.jQuery, window, document));
// The global jQuery object is passed as a parameter

/*
	When the bandcamp link is pressed, stop all propagation so AmplitudeJS doesn't
	play the song.
*/
let bandcampLinks = document.getElementsByClassName('bandcamp-link');

for( var i = 0; i < bandcampLinks.length; i++ ){
	bandcampLinks[i].addEventListener('click', function(e){
		e.stopPropagation();
	});
}


let songElements = document.getElementsByClassName('song');

for( var i = 0; i < songElements.length; i++ ){
	/*
		Ensure that on mouseover, CSS styles don't get messed up for active songs.
	*/
	songElements[i].addEventListener('mouseover', function(){
		this.style.backgroundColor = '#00A0FF';

		this.querySelectorAll('.song-meta-data .song-title')[0].style.color = '#FFFFFF';
		this.querySelectorAll('.song-meta-data .song-artist')[0].style.color = '#FFFFFF';

		if( !this.classList.contains('amplitude-active-song-container') ){
			this.querySelectorAll('.play-button-container')[0].style.display = 'block';
		}

		this.querySelectorAll('img.bandcamp-grey')[0].style.display = 'none';
		this.querySelectorAll('img.bandcamp-white')[0].style.display = 'block';
		this.querySelectorAll('.song-duration')[0].style.color = '#FFFFFF';
	});

	/*
		Ensure that on mouseout, CSS styles don't get messed up for active songs.
	*/
	songElements[i].addEventListener('mouseout', function(){
		this.style.backgroundColor = '#FFFFFF';
		this.querySelectorAll('.song-meta-data .song-title')[0].style.color = '#272726';
		this.querySelectorAll('.song-meta-data .song-artist')[0].style.color = '#607D8B';
		this.querySelectorAll('.play-button-container')[0].style.display = 'none';
		this.querySelectorAll('img.bandcamp-grey')[0].style.display = 'block';
		this.querySelectorAll('img.bandcamp-white')[0].style.display = 'none';
		this.querySelectorAll('.song-duration')[0].style.color = '#607D8B';
	});

	/*
		Show and hide the play button container on the song when the song is clicked.
	*/
	songElements[i].addEventListener('click', function(){
		this.querySelectorAll('.play-button-container')[0].style.display = 'none';
	});
}

/*
	Initializes AmplitudeJS
*/
Amplitude.init({
	continue_next: true,
	callbacks: {
		song_change: function(){
		}
	},
  "default_album_art": "../images/AllWorkAndNoPlayMakesJackADullBoy.jpg",
	"songs": [
		{
			"name": "01 Summer Of Love",
			"artist": "The Autumn Almanacs",
			"album": "As far as the eye can see",
			"url": "../audio/Summer Of Love.mp3",
			"cover_art_url": "../images/portfolio/A.jpg",
		},
		{
			"name": "02 Deep End",
			"artist": "The Autumn Almanacs",
			"album": "As far as the eye can see",
			"url": "../audio/Deep End.mp3",
			"cover_art_url": "../images/portfolio/A.jpg",
		},
		{
			"name": "03 Horror Movie",
			"artist": "The Autumn Almanacs",
			"album": "As far as the eye can see",
			"url": "../audio/Horror Movie.mp3",
			"cover_art_url": "../images/portfolio/A.jpg",
		},
		{
			"name": "04 The Market",
			"artist": "The Autumn Almanacs",
			"album": "As far as the eye can see",
			"url": "../audio/The Market.mp3",
			"cover_art_url": "../images/portfolio/A.jpg",
		},
		{
			"name": "05 The Zodiac",
			"artist": "The Autumn Almanacs",
			"album": "As far as the eye can see",
			"url": "../audio/The Zodiac.mp3",
			"cover_art_url": "../images/portfolio/A.jpg",
		},
		{
			"name": "06 The Fall",
			"artist": "The Autumn Almanacs",
			"album": "As far as the eye can see",
			"url": "../audio/The Fall.mp3",
			"cover_art_url": "../images/portfolio/A.jpg",
		},
		{
			"name": "07 Alice Should Go",
			"artist": "The Autumn Almanacs",
			"album": "As far as the eye can see",
			"url": "../audio/Alice Should Go.mp3",
			"cover_art_url": "../images/portfolio/A.jpg",
		},
		{
			"name": "08 Flowers In Our Hair",
			"artist": "The Autumn Almanacs",
			"album": "As far as the eye can see",
			"url": "../audio/Flowers In Your Hair -mp3-new.mp3",
			"cover_art_url": "../images/portfolio/A.jpg",
		},
		{
			"name": "09 Belfast Boy",
			"artist": "The Autumn Almanacs",
			"album": "As far as the eye can see",
			"url": "../audio/Belfast Boy.mp3",
			"cover_art_url": "../images/portfolio/A.jpg",
		},
		{
			"name": "10 Harry Bay",
      "artist": "The Autumn Almanacs",
			"album": "As far as the eye can see",
			"url": "../audio/Harry Bay.mp3",
			"cover_art_url": "../images/portfolio/A.jpg",
		},
		{
			"name": "11 Apocalypse",
			"artist": "The Autumn Almanacs",
			"album": "As far as the eye can see",
			"url": "../audio/Apocalypse.mp3",
			"cover_art_url": "../images/portfolio/A.jpg",
		},
    {
			"name": "01 Getting Closer",
			"artist": "The Autumn Almanacs",
			"album": "All Work And No Play Makes Jack A Dull Boy",
			"url": "../audio/Getting Closer.mp3",
      "cover_art_url": "../images/AllWorkAndNoPlayMakesJackADullBoy.jpg"
		},
    {
			"name": "02 The Witches From The Wood",
			"artist": "The Autumn Almanacs",
			"album": "All Work And No Play Makes Jack A Dull Boy",
			"url": "../audio/Witches.mp3",
      "cover_art_url": "../images/AllWorkAndNoPlayMakesJackADullBoy.jpg"
		},
    {
			"name": "03 No Way",
			"artist": "The Autumn Almanacs",
			"album": "All Work And No Play Makes Jack A Dull Boy",
			"url": "../audio/Way.mp3",
      "cover_art_url": "../images/AllWorkAndNoPlayMakesJackADullBoy.jpg"
		},
    {
			"name": "04 Weekend",
			"artist": "The Autumn Almanacs",
			"album": "All Work And No Play Makes Jack A Dull Boy",
			"url": "../audio/Weekend.mp3",
      "cover_art_url": "../images/AllWorkAndNoPlayMakesJackADullBoy.jpg"
		},
    {
			"name": "05 Golden Girl",
			"artist": "The Autumn Almanacs",
			"album": "All Work And No Play Makes Jack A Dull Boy",
			"url": "../audio/Girl.mp3",
      "cover_art_url": "../images/AllWorkAndNoPlayMakesJackADullBoy.jpg"
		},
    {
			"name": "06 All Work And No Play Makes Jack A Dull Boy",
			"artist": "The Autumn Almanacs",
			"album": "All Work And No Play Makes Jack A Dull Boy",
			"url": "../audio/NoWork.mp3",
      "cover_art_url": "../images/AllWorkAndNoPlayMakesJackADullBoy.jpg"
		}
	]
});