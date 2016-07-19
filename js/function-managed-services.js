$(document).ready(function(){
	"use strict";
	$('.tab-header').click(function() {
		var current=$('.tab-active').attr('data-target');
		var target=$(this).attr('data-target');

		if(current!==target) {
			$('.tab-header').removeClass('tab-active');
			$(this).addClass('tab-active');
			if($(window).width()>767) {
				$('.desktop-tab').hide();
				$('#'+target).fadeIn();
				
			}
			else {
				$('.mobile-tab').hide();
				$('#mobile-'+target).fadeIn(100,function() {
					$('html,body').animate({
					scrollTop: $("#mobile-"+target).offset().top-120}, 'slow');
				});
			}
		}
		
	});
	 $(window).resize(function(){
			autoAdjust();
							   
	});
	 autoAdjust();
});
function autoAdjust(){
	
       if($(window).width()>767) {
		   $('.mobile-tab').hide();
		   var current=$('.tab-active').attr('data-target');
		  // console.log(current);
		   $('#'+current).fadeIn();
	   }
	   if($(window).width()<767) {
		   $('.desktop-tab').hide();
		   var current=$('.tab-active').attr('data-target');
		   $("#mobile-"+current).fadeIn();

	   }
    
}