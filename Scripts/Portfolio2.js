$(document).ready(function () {
	
    var $container = $('#Photos ul');
	var width1 = 1085;
	var imgnum = 20;
	var timer = 0;
	var $next = $('#buttons #next');
	var $prev = $('#buttons #prev');
	var $play = $('#buttons #play');
	var $grid = $('#buttons #grid');
	var slideshowrunning = 1;
	var gridon = 0;
	
	do {
	var randnum = Math.random();
	num = Math.round((imgnum - 1) * randnum);
	} while (num == 0);
	
	var i = width1*num;
	$container.stop().animate({scrollLeft: i});
	$("#All").css({top: -600});
	
	function slideshow() {
		if(i >= width1*(imgnum -1)){i = 0}
		else{i += width1}
		$container.stop().animate({scrollLeft: i}, 2500, 'easeInOutQuart');
	}
	
	timer = setInterval ( slideshow, 5000 );
	
	function next() {
		if(i >= width1*(imgnum -1)){i = 0}
		else{i += width1}
		$container.stop().animate({scrollLeft: i}, 1000, 'easeInOutQuart');
	}
	
	function previous() {
		if(i > 0){i -= width1}
		else{i = width1*	(imgnum -1)}
		$container.stop().animate({scrollLeft: i}, 1000, 'easeInOutQuart');
	}
	
	$next.click(function () {
		if( gridon == 0) {
			pauseSlideshow();
			next();
		}
		return false;
	});
	$prev.click(function () {
		if(gridon == 0) {
			pauseSlideshow();
			previous();
		}
		return false;
	});
	
	$play.click(function () {
		if( gridon == 0) {
			if( slideshowrunning == 1) {
				pauseSlideshow();
			} else {
				resumeSlideshow()
			}
		}
		return false;
	});
	
	function pauseSlideshow() {
		clearInterval ( timer );
		slideshowrunning = 0;
		document.MyImage.src='../images/Buttons/Play.png';
	}
	
	function resumeSlideshow() {
		timer = setInterval ( slideshow, 5000 );
		slideshowrunning = 1;
		document.MyImage.src='../images/Buttons/Pause.png';
		//$('#buttons #play img').css({src: ('../images/Buttons/Pause.png')});
	}
	
	//change opacity when on hover
	$('#buttons #Bottom a img').hover(function() {
		$(this).stop().animate({opacity: 1}, 300);
	}, function() {
		$(this).stop().animate({opacity: 0.5}, 200);
	});
	
	$('#buttons #Top div a img').hover(function() {
		$(this).stop().animate({opacity: 1}, 300);
	}, function() {
		$(this).stop().animate({opacity: 0.5}, 200);
	});
	
	$grid.click(function () {
		if( gridon == 1) {
			hideGrid();
		} else {
			showGrid();
		}
		return false;
	});
	
	function showGrid() {
		gridon = 1;
		pauseSlideshow();
		$("#All").stop().animate({top: 20}, 1000, 'easeInOutQuart');
		$container.stop().animate({paddingTop: 600}, 1000, 'easeInOutQuart');
	}
	
	function hideGrid() {
		resumeSlideshow();
		$("#All").stop().animate({top: -600}, 1000, 'easeInOutQuart');
		$container.stop().animate({paddingTop: 0, scrollLeft: i}, 1000, 'easeInOutQuart');
		gridon = 0;
	}
	
	$('#All-Container #All ul li a').click(function() {
		i = width1*(this.name -1)
		hideGrid();
		return false;
	});
});