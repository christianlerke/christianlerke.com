$(document).ready(function () {
	
    var $container = $('#Photos ul');
    var $links = $('#Links ul');
	var width1 = 1085;
	var imgnum = 7;
	var $nav = $('#Navigation');
	var $navlink = $('#Navigation ul li > a');
	var timer = 0;
	
	$nav.css({height: 0, top: 450});
	$container.css({top: 0});
	
	do {
	var randnum = Math.random();
	num = Math.round((imgnum - 1) * randnum);
	} while (num == 0);
	
	var i = width1*num;
	$container.css({left: (i*-1)});
	$links.css({left: (i*-1)});
	
	timer = setInterval ( spy, 5000 );
	
	function spy() {
		if(i >= width1*(imgnum -1)){i = 0}
		else{i += width1}
		$container.stop().animate({left: (i*-1)}, 2000, 'easeInOutQuart');
		$links.stop().animate({left: (i*-1)}, 2000, 'easeInOutQuart');
    }
    
    function spyup() {
		if(i >= width1*(imgnum -1)){i = 0}
		else{i += width1}
		$container.stop().animate({left: (i*-1), top: -28}, 2000, 'easeInOutQuart');
		$links.stop().animate({left: (i*-1)}, 2000, 'easeInOutQuart');
    }
    
    $('#Portfolio').hover(function() {
		clearInterval ( timer );
		timer = setInterval ( spyup, 4000 );
		$container.stop().animate({top: -28, left: (i*-1)}, 1000, 'easeInOutQuart');
		$nav.stop().animate({height: 30, top: 432}, 1000, 'easeInOutQuart');
	}, function() {
		clearInterval ( timer );
		$nav.stop().animate({height: 0, top: 450}, 1000, 'easeInOutQuart');
		$container.stop().animate({top: 0, left: (i*-1)}, 1000, 'easeInOutQuart');
		clearInterval ( timer );
		timer = setInterval ( spy, 5000 );
	});
	
	$navlink.hover(function() {
		clearInterval ( timer );
		i = width1*(this.name-1);
		$container.stop().animate({left: (width1*(this.name-1)*-1), top: -28}, 800, 'easeInOutQuart');
		$links.stop().animate({left: (width1*(this.name-1)*-1)}, 800, 'easeInOutQuart');
	}, function() {
		clearInterval ( timer );
		timer = setInterval ( spyup, 4000 );
	});
});