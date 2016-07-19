var scope = function(){
	"use strict";
	
	var articlesWrapper = $('.cd-articles');
	var articles = articlesWrapper.find('.serviceSection');
	var aside = $('.cd-read-more');
	var	scrolling = false;
	var	windowHeight, articleSidebarLinks, asideHeight, mq, svgCircleLength, sidebarAnimation = false,
			resizing = false;
jQuery(document).ready(function($){		

	if( articlesWrapper.length > 0 ) {
		// cache jQuery objects
		windowHeight = $(window).height();
		
		articleSidebarLinks = aside.find('li');
		asideHeight= $('.cd-read-more').height()+20;	
		
		mq = checkMQ();
		svgCircleLength = parseInt(Math.PI*(articleSidebarLinks.eq(0).find('circle').attr('r')*2));
		
		// check media query and bind corresponding events
		if( mq === 'desktop' ) {
			$(window).on('scroll', checkRead);
			$(window).on('scroll', checkSidebar);
		}
			
		$(window).on('resize', resetScroll);
		
		updateArticle();
		updateSidebarPosition();

		/*aside.on('click', 'a', function(event){
			event.preventDefault();
			var selectedArticle = articles.eq($(this).parent('li').index()),
				selectedArticleTop = selectedArticle.offset().top;

			$(window).off('scroll', checkRead);

			$('body,html').animate(
				{'scrollTop': selectedArticleTop + 2}, 
				300, function(){
					checkRead();
					$(window).on('scroll', checkRead);
				}
			); 
	    });*/
		
	}

	setAsideLeft();	
});

function setAsideLeft(){
	var ssleft = $(".serviceSection .col-sm-9:eq(0)").position().left;
	var ssWidth = $(".serviceSection .col-sm-9:eq(0)").width();
	var defaultSpace = 30;	
	aside.css("left", ssleft+ssWidth+defaultSpace + "px");
}


function checkRead() {
	if( !scrolling ) {
		scrolling = true;
		(!window.requestAnimationFrame) ? setTimeout(updateArticle, 300) : window.requestAnimationFrame(updateArticle);
	}
}

function checkSidebar() {
	if( !sidebarAnimation ) {
		sidebarAnimation = true;
		(!window.requestAnimationFrame) ? setTimeout(updateSidebarPosition, 300) : window.requestAnimationFrame(updateSidebarPosition);
	}
}

function resetScroll() {
	if( !resizing ) {
		resizing = true;
		(!window.requestAnimationFrame) ? setTimeout(updateParams, 300) : window.requestAnimationFrame(updateParams);			
	}
	setAsideLeft();
}

function updateParams() {
	windowHeight = $(window).height();
	mq = checkMQ();
	$(window).off('scroll', checkRead);
	$(window).off('scroll', checkSidebar);
	
	if( mq === 'desktop') {
		$(window).on('scroll', checkRead);
		$(window).on('scroll', checkSidebar);
	}
	resizing = false;
}

function updateArticle() {
	var scrollTop = $(window).scrollTop() ;

	articles.each(function(){
		var article = $(this),
			articleTop = article.offset().top - 120,
			articleHeight = article.outerHeight() - 100,
			articleSidebarLink = articleSidebarLinks.eq(article.index()).children('.cd-item');

		//if( article.is(':last-of-type') ) { articleHeight = articleHeight - windowHeight; }

		if( articleTop > scrollTop) {
			articleSidebarLink.removeClass('read reading');
		} else if( scrollTop >= articleTop && articleTop + articleHeight > scrollTop) {
			var dashoffsetValue = svgCircleLength*( 1 - (scrollTop - articleTop)/articleHeight);
			articleSidebarLink.addClass('reading').removeClass('read').find('circle').attr({ 'stroke-dashoffset': dashoffsetValue });			
		} else {
			articleSidebarLink.removeClass('reading').addClass('read');
		}
	});
	scrolling = false;
}

function updateSidebarPosition() {
	var articlesWrapperTop = articlesWrapper.offset().top,
		articlesWrapperHeight = articlesWrapper.outerHeight(),
		scrollTop = $(window).scrollTop();


	if( scrollTop < articlesWrapperTop) {			
		aside.removeClass('fixed').css('top', '50px');
	//} else if( scrollTop >= articlesWrapperTop && scrollTop < articlesWrapperTop + articlesWrapperHeight - windowHeight) {
	} else if( scrollTop >= articlesWrapperTop && scrollTop <= articlesWrapperTop + articlesWrapperHeight - asideHeight) {
		aside.addClass('fixed').css('top', '50px');
	} else {
		var articlePaddingTop = Number(articles.eq(1).css('padding-top').replace('px', ''));
		if( aside.hasClass('fixed') ){ aside.removeClass('fixed').css('top', articlesWrapperHeight + articlePaddingTop - windowHeight + 'px');}  
	}
	sidebarAnimation =  false;
}

function changeUrl(link) {
	var pageArray = location.pathname.split('/'),
		actualPage = pageArray[pageArray.length - 1];

	if( actualPage !== link && history.pushState ) {window.history.pushState({path: link},'',link);}
}

function checkMQ() {
	return window.getComputedStyle(articlesWrapper.get(0), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
}
}();