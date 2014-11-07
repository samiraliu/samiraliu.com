fullscreenH = parseInt($(window).height());
				$('#hero').height(fullscreenH);
        $('#work, #contact').css("min-height", (fullscreenH - 90));




/***************** Bar Graph ******************/

	$('.bar_graph li').each(function(i){

		$(this).appear(function(){

			var percent = $(this).find('span').attr('data-width');

			$(this).find('span').animate({
				'width' : percent + '%'
			},1700, 'easeOutCirc',function(){
			});

			$(this).find('span strong').animate({
				'opacity' : 1
			},1400);

			////100% progress bar
			if(percent == '100'){
				$(this).find('span strong').addClass('full');
			}

		});

	});

				$( '#carousel' ).elastislide();


//PARALLAX
$(window).scroll(function () {

    scrollPos = $(this).scrollTop();

    $("#header #hero").css({
		"background-position" : "center " + (-scrollPos/24)+"px",
		"opacity" : 1-(scrollPos/1200)
    });

    $(".hero-text").css({
		"top" : +(scrollPos/24)+"px",
		"opacity" : 1-(scrollPos/800)
    });

    $(".hero-link").css({
   		"top" : +(scrollPos/24)+"px",
		"opacity" : 1-(scrollPos/800)
    });

    $(".hero-image, .intro-image ").css({
		"opacity" : 1-(scrollPos/1200)
    });

    $("#mainnav a.nav-logo").css({
    	"opacity": .1+(scrollPos/750)
    	});

    $("body.interior #mainnav a.nav-logo").css({
    	"opacity": 1
    	});

  });


/***************** FILTERABLE ******************/

$(function(){

    $('#grid').mixitup();

});

$(document).ready(function(){

var video = document.getElementById('bgvid');
video.volume = 0.5;

/***************** FANCYBOX ******************/

$(".fancybox").fancybox({
    scrolling: false,
    scrollOutside: false,
    closeClick: true,
    arrows: false,
    enableEscapeButton: true,
    scrolling: 'no'
});

//LAZY LOAD
$("#work a, #project img, #work").unveil();

//STICKY NAV
$(".mainnav").sticky({
	topSpacing: 0,
	className: "fixed"
	});

//SCROLL TO
$(".nav, #hero #hero-link a").onePageNav({
	currentClass: "active",
	changeHash: false,
	easing: "easeInOutExpo",
	filter: ":not(.external)",
	scrollSpeed: 1400,
    scrollOffset: 0,
	scrollThreshold: 0.5,
	begin: false,
	end: false,
	scrollChange: false
	});

$("#hero #hero-link a").on("click", "a", function(e) {
	var currentPos = $(this).parent().prevAll().length;

$(".nav").find("li").eq(currentPos).children("a").trigger("click");
	e.preventDefault();
	});

//FILTERING
$(".filter ul a").click(function(){
	var selector = $(this).attr("data-filter");
	$(this).css("outline","none");
		$(".filter ul li").removeClass("current");
		$(this).parent().addClass("current");

		if(selector == "all") {
			$(".work-thumbs.inactive .thumb").animate({opacity: 1, easing: "easeInOutExpo"}, 300).removeClass("inactive").addClass("active");
			$("a").show();
		} else {
			$(".work-thumbs").each(function() {
				if(! $(this).hasClass(selector)) {
					$(this).removeClass("active").addClass("inactive");
					$(this).find(".thumb").animate({opacity: 0, easing: "easeInOutExpo"}, 300);
					$(this).find("a").hide();
				} else {
					$(this).removeClass("inactive").addClass("active");
					$(this).find(".thumb").animate({opacity: 1, easing: "easeInOutExpo"}, 300);
					$(this).find("a").show();
				}
			});
		}
		if ( ! $(this).hasClass("selected") ) {
			$(this).parents(".filter ul li a").find(".selected").removeClass("selected");
			$(this).addClass("selected");
		}
	return false;
});

//HOVERS CAPTION
$(".work-thumbs .thumb").hover(function() {
	$(this).find(".title").stop(false,true).fadeIn(300);
    },
function() {
	$(this).find(".title").stop(false,true).fadeOut(300);
	});

/***************** NAVIGATION SELECTION ******************/

var $optionSets = $('.filter-menu ul'),
       $optionLinks = $optionSets.find('a');

       $optionLinks.click(function(){
          var $this = $(this);
      // don't proceed if already selected
      if ( $this.hasClass('selected') ) {
          return false;
      }
   var $optionSet = $this.parents('nav.primary ul');
   $optionSet.find('.selected').removeClass('selected');
   $this.addClass('selected');
});


//CONTACT FORM
$('#contactform').submit(function(){

	var action = $(this).attr('action');

	$("#message").animate({opacity: 1, easing: "easeInOutExpo"}, 200, function() {
	$('#message').hide();

	$('#submit')
		.attr('disabled','disabled');

	$.post(action, {
		name: $('#name').val(),
		email: $('#email').val(),
		phone: $('#phone').val(),
		subject: $('#subject').val(),
		comments: $('#comments').val(),
		verify: $('#verify').val()
		},

	function(data){
		document.getElementById('message').innerHTML = data;
		$('#message').fadeIn(300);
		$('#submit').removeAttr('disabled');
		if(data.match('success') != null) $('#contactform').animate({ opacity: 0, easing: "easeInOutExpo"  }, 300);
		});

	});
	return false;

	});

});
