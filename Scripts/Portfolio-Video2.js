$(document).ready(function () {
	
    var $container = $('#Photos ul');
	var width1 = 1085;
	var imgnum = 3;
	var $next = $('#buttons #next');
	var $prev = $('#buttons #prev');
	var $play = $('#buttons #play');
	var $grid = $('#buttons #grid');
	var gridon = 0;
	var MovieStatus = 0;
	var myVideo = new Array();
	for(var x = 0; x < imgnum; x++)
	{
		myVideo[x] = document.getElementsByTagName('video')[x];
	}
	
	do {
		var randnum = Math.random();
		num = Math.round((imgnum - 1) * randnum);
	} while (num == 0);
	
	var i = width1*num;
	$container.css({left: (i*-1)});
	$("#All").css({top: -600});
	
	function slideshow() {
		if(i >= width1*(imgnum -1)){i = 0}
		else{i += width1}
		$container.stop().animate({left: (i*-1)}, 2500, 'easeInOutQuart');
	}
	
	function next() {
		pauseMovie(i/width1);
		if(i >= width1*(imgnum -1)){i = 0}
		else{i += width1}
		$container.stop().animate({left: (i*-1)}, 1000, 'easeInOutQuart');
		playMovieWhenReady(i/width1);
	}
	
	function previous() {
		pauseMovie(i/width1);
		if(i > 0){i -= width1}
		else{i = width1*	(imgnum -1)}
		$container.stop().animate({left: (i*-1)}, 1000, 'easeInOutQuart');
		playMovieWhenReady(i/width1);
	}
	
	$next.click(function () {
		if( gridon == 0) {
			next();
		}
		return false;
	});
	$prev.click(function () {
		if(gridon == 0) {
			previous();
		}
		return false;
	});
	
	$play.click(function () {
		if( gridon == 0) {
			if (MovieStatus == 1)
			{
				pauseMovie(i/width1);
			}	
			else
			{
				playMovie(i/width1);
			}
		}
		return false;
	});
	
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
			playMovieWhenReady(i/width1);
		} else {
			showGrid();
			pauseMovie(i/width1);
		}
		return false;
	});
		
	$('#All-Container #All ul li a').click(function() {
		i = width1*(this.name -1)
		$container.css({left: (i*-1)});
		hideGrid();
		playMovieWhenReady(i/width1);
		return false;
	});
		
		
	function showGrid() {
		gridon = 1;
		$("#All").stop().animate({top: 20}, 1000, 'easeInOutQuart');
		$container.stop().animate({paddingTop: 600}, 1000, 'easeInOutQuart');
	}
	
	function hideGrid() {
		$container.css({left: (i*-1)});
		$("#All").stop().animate({top: -600}, 1000, 'easeInOutQuart');
		$container.stop().animate({paddingTop: 0}, 1000, 'easeInOutQuart');
		gridon = 0;
	}
	
	
	//Progress Bar
	
	function showProgress() {
	
		while(myVideo[i/width1].loadedmetadata == 0)
		{
			wait(1000);
		}
		var soFar = parseInt(((myVideo[i/width1].buffered.end(0) / myVideo[i/width1].duration) * 100));
		$("#loadBar").stop().animate({width: ((1044/100)*soFar)});
		var position = parseInt(((100000 / myVideo[i/width1].duration) * myVideo[i/width1].currentTime));
		$("#progressBar").stop().animate({width: ((1044/100000)*position)});
		$("#scrubber").stop().css({'left': ((1044/100000)*position) - 6});
		if(soFar == 100)
			$("#loadBar").css({'-webkit-border-bottom-right-radius': '5px', '-webkit-border-top-right-radius': 0});
		else
			$("#loadBar").css({'-webkit-border-bottom-right-radius': '2px', '-webkit-border-top-right-radius': '2px'});
		if(position == 100000)
			$("#progressBar").css({'-webkit-border-bottom-right-radius': '5px', '-webkit-border-top-right-radius': 0});
		else
			$("#progressBar").css({'-webkit-border-bottom-right-radius': '2px', '-webkit-border-top-right-radius': '2px'});
	}
	
	AddListeners();
	function AddListeners() {
		for(var x = 0; x < imgnum; x++)
		{
			myVideo[x].addEventListener('progress',showProgress,false);
			myVideo[x].addEventListener('timeupdate',showProgress,false);
			myVideo[x].addEventListener('pause',function(){document.MyImage.src='../images/Buttons/Play.png';},false);
			myVideo[x].addEventListener('play',function(){document.MyImage.src='../images/Buttons/Pause.png';},false);
		}
	}
	
	function playMovieWhenReady(movie) {
		for(var x = 0; x < imgnum; x++)
		{
			myVideo[x].removeEventListener('canplaythrough',playMovie,false);
		}
		myVideo[movie].addEventListener('canplaythrough',playMovie(movie),false);
	}
	
	function playMovie(movie) {
		myVideo[movie].play();
		MovieStatus = 1;
		showProgress();
		myVideo[movie].addEventListener('ended',next,false);
	}
	
	function pauseMovie(movie) {
		myVideo[movie].pause();
		MovieStatus = 0;
		showProgress();
	}
		
		
	$("#scrubber").css({opacity: 0.0});
	$("#progressBar").css({opacity: 0.5});
	$("#loadBar").css({opacity: 0.2});

	$('#VideoControls').hover(function() {
		$("#scrubber").stop().animate({opacity: 0.5}, 500);
		$("#progressBar").stop().animate({opacity: 0.7}, 500);
		$("#loadBar").stop().animate({opacity: 0.4}, 500);
	}, function() {
		$("#scrubber").stop().animate({opacity: 0.0}, 300);
		$("#progressBar").stop().animate({opacity: 0.5}, 300);
		$("#loadBar").stop().animate({opacity: 0.2}, 300);
	});
	
	$('#scrubber').hover(function() {
		$(this).stop().animate({opacity: 1}, 300);
	}, function() {
		$(this).stop().animate({opacity: 0.5}, 200);
	});
	
	$('#scrubber-range', '#VideoControls').slider({
		min: 0,
		max: 100,
		handle: '#scrubber',
		stop: function (event, ui) {
			myVideo[i/width1].currentTime = (myVideo[i/width1].duration/100)*ui.value;
		}, 
		slide: function (event, ui) {
			myVideo[i/width1].currentTime = (myVideo[i/width1].duration/100)*ui.value;
		}
	});
});