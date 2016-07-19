
// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
	"use strict";
    if ($(".navbar").offset().top > 100) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

function buttonUp(){
	"use strict";
		var inputVal = $('.searchbox-input').val();
		inputVal = $.trim(inputVal).length;
		if( inputVal !== 0){
		   // $('.searchbox-icon').css('display','none');
		} else {
			$('.searchbox-input').val('');
			$('.searchbox-icon').css('display','block');
		}
}

$(function() {
	"use strict";
	if ($(".navbar").offset().top > 200) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } 
	// Scrolls to the selected menu item on the page
	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') || location.hostname === this.hostname) {

			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});
	// jQuery for page scrolling feature - requires jQuery Easing plugin
	 $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
	
	// Closes the Responsive Menu on Menu Item Click
	$('.navbar-collapse ul li a').click(function() {
		$('.navbar-toggle:visible').click();
	});
	
	// Closes the sidebar menu
	$("#menu-close").click(function(e) {
		e.preventDefault();
		$("#sidebar-wrapper").toggleClass("active");
	});
	
	// Opens the sidebar menu	
	$("#menu-toggle").click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		$("#sidebar-wrapper").toggleClass("active");
	});
	$('#sidebar-wrapper').click(function(e){
			e.stopPropagation();
		});		
		$(document).click(function(){
			$('#sidebar-wrapper').removeClass("active");
		});

	var submitIcon = $('.searchbox-icon');
	var inputBox = $('.searchbox-input');
	var searchBox = $('.searchbox');
	var isOpen = false;
	submitIcon.click(function(){
		if(isOpen === false){
			searchBox.addClass('searchbox-open');
			inputBox.focus();
			isOpen = true;
		} else {
			searchBox.removeClass('searchbox-open');
			inputBox.focusout();
			isOpen = false;
		}
	});  
	 submitIcon.mouseup(function(){
			return false;
		});
	searchBox.mouseup(function(){
			return false;
		});
	$(document).mouseup(function(){
		if(isOpen === true){
			$('.searchbox-icon').css('display','block');
			submitIcon.click();
		}
	});
	buttonUp();
	// Company Section Carousel		
	var myInterval=false;
	$('.carousel-control').mouseover(function() {
		var ctrl = $(this);
		var interval=6000;
	
		myInterval = setInterval(function(){
			 ctrl.trigger("click");
		},interval);
	});
	$('.carousel-control').mouseout(function(){
		clearInterval(myInterval);
		myInterval = false;
	});
	$('.carousel').carousel({
		interval: 6000 //changes the speed
	});
		
	//Bootstrap tab activation
	$('.tab a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	});
	$('.carousel').carousel({
	  //interval: false
	});
	//Bootstrap Tooltip activation
	$('[data-toggle="tooltip"]').tooltip();
	/*Back to top*/
	// hide #back-top first
	$("#back-top").hide();
	
	$('a.pin-text').click(function(e) {
			e.preventDefault();
				var id = $(this).attr('data-country');
				
				$('.pin').removeClass('active');
				if($(this).hasClass('active')){
					$(this).removeClass('active');
					$(this).next('.popup_box').slideUp();
					$("#"+id).removeClass('active');
				}
				else{
					$(this).addClass('active');
					$(this).next('.popup_box').slideDown();
					$("#"+id).addClass('active');
				}

				$(this).parent('li').siblings().find('.active').removeClass('active');
				$(this).parent('li').siblings().find('.popup_box').slideUp();

 		  		
				return false;
				
			});
			
	// fade in #back-top
	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('#back-top').fadeIn();
			} else {
				$('#back-top').fadeOut();
			}
		});

		// scroll body to 0px on click
		$('#back-top a').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});
	$('.more').hide();
	$('.more-toggle').click(function (ev) {
	   var t = ev.target;
	   $('#info' + $(this).attr('target')).toggle(500, function(){
		  $(t).html($(this).is(':visible')? 'Read less «' : 'Read more »');
	   });
	   return false;
	});
});