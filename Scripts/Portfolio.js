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
	var currentImg = 1;
	
	var browserName=navigator.appName; 
	if (browserName=="Microsoft Internet Explorer") {
		
		movePhotos(currentImg, 0);
		$("#All").css({top: -600});
		$('#buttons #Bottom a img').css({opacity: 1});
		
		function slideshowM() {
			if(currentImg >= 20){currentImg = 1}
			else{currentImg++}
			movePhotos(currentImg, 1);
		}
		
		timer = setInterval ( slideshowM, 5000 );
		
		function nextM() {
			if(currentImg >= 20){currentImg = 1}
			else{currentImg++}
			movePhotos(currentImg, 1);
		}
		
		function previousM() {
			if(currentImg > 1){currentImg--}
			else{currentImg = 20}
			movePhotos(currentImg, 1);
		}
		
		$next.click(function () {
			if( gridon == 0) {
				pauseSlideshowM();
				next();
			}
			return false;
		});
		$prev.click(function () {
			if(gridon == 0) {
				pauseSlideshowM();
				previous();
			}
			return false;
		});
		
		$play.click(function () {
			if( gridon == 0) {
				if( slideshowrunning == 1) {
					pauseSlideshowM();
				} else {
					resumeSlideshow()
				}
			}
			return false;
		});
		
		function pauseSlideshowM() {
			clearInterval ( timer );
			slideshowrunning = 0;
			document.MyImage.src='../images/Buttons/Play.png';
		}
		
		function resumeSlideshowM() {
			timer = setInterval ( slideshowM, 5000 );
			slideshowrunning = 1;
			document.MyImage.src='../images/Buttons/Pause.png';
			//$('#buttons #play img').css({src: ('../images/Buttons/Pause.png')});
		}
		
		$grid.click(function () {
			if( gridon == 1) {
				hideGridM();
			} else {
				showGridM();
			}
			return false;
		});
		
		function showGridM() {
			gridon = 1;
			pauseSlideshow();
			$("#All").stop().animate({top: 20}, 1000, 'easeInOutQuart');
			$container.stop().animate({paddingTop: 600}, 1000, 'easeInOutQuart');
		}
		
		function hideGridM() {
			movePhotos(currentImg, 0);
			resumeSlideshow();
			$("#All").stop().animate({top: -600}, 1000, 'easeInOutQuart');
			$container.stop().animate({paddingTop: 0}, 1000, 'easeInOutQuart');
			gridon = 0;
		}
		
		$('#All-Container #All ul li a').click(function() {
			currentImg = parseInt(this.name);
			movePhotos(currentImg, 0);
			hideGridM();
			return false;
		});
	
	} else {
		
		movePhotos(currentImg, 0);
		$("#All").css({top: -600});
		
		function slideshow() {
			if(currentImg >= 20){currentImg = 1}
			else{currentImg++}
			movePhotos(currentImg, 1);
		}
		
		timer = setInterval ( slideshow, 5000 );
		
		function next() {
			if(currentImg >= 20){currentImg = 1}
			else{currentImg++}
			movePhotos(currentImg, 1);
		}
		
		function previous() {
			if(currentImg > 1){currentImg--}
			else{currentImg = 20}
			movePhotos(currentImg, 1);
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
			movePhotos(currentImg, 0);
			resumeSlideshow();
			$("#All").stop().animate({top: -600}, 1000, 'easeInOutQuart');
			$container.stop().animate({paddingTop: 0}, 1000, 'easeInOutQuart');
			gridon = 0;
		}
		
		$('#All-Container #All ul li a').click(function() {
			currentImg = parseInt(this.name);
			movePhotos(currentImg, 0);
			hideGrid();
			return false;
		});
	}
	
	//Moves the photostrip target is the image to deiplay starting at 1 for the first picture 
	//animation decides if it animates or just jumps to position
	function movePhotos(target, animation) {
		
		var position = document.getElementById('Photos').getElementsByTagName("li")[target-1].offsetLeft;
		
		if(target == 1){position = 0;}
		
		if(animation) {
			$container.stop().animate({left: -position}, 2500, 'easeInOutQuart');
		} else {
			$container.stop().css({left: -position});
		}
	}
	
});