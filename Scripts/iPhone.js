window.addEventListener('load', init, false);

function init () {
	window.addEventListener('orientationchange', updateOrientation, false);
	Photos.addEventListener('touchstart', touch_started, false);
	Photos.addEventListener('touchmove', touch_moved, false);
	Photos.addEventListener('touchend', touch_ended, false);
	document.getElementsByTagName("ul")[0].style.left=0;
	//document.getElementById('body').style.height = innerWidth*1.5;
	//console.log(screen.availHeight);
	//console.log(screen.availWidth);
    updateOrientation();
}

var start;
var end;
var touch;
var touches;
var currentImg = 0;

function touch_started (event) {

	event.preventDefault();
	
	touch = event.targetTouches[0];
	touches = event.targetTouches;
	
	start = touch.screenX;
	
	//console.log(touches.length);
	
}

function touch_moved (event) {
	event.preventDefault();
    
     //if (event.targetTouches.length != 1)
     	// return false;
    
    //document.getElementsByTagName("ul")[0].style.left= (parseInt(document.getElementsByTagName("ul")[0].style.left)-(touch-start));
    
    //console.log(parseInt(document.getElementsByTagName("ul")[0].style.left)-(touch.screenX-start));
}

function touch_ended (event) {
	event.preventDefault();
	
	if (touches.length != 1){
		return false;
		console.log("touches");
	}
	
	end = touch.screenX;
	
	if(end == start)
		return;
	
	//console.log(-(window.innerWidth*(event.target.name+1)));
	//console.log((event.target.name));
	//console.log(1+ parseInt(event.target.name));
	//console.log(document.getElementsByTagName("li")[(1+ parseInt(event.target.name))].offsetLeft);
	
	if(end > start) {
		document.getElementsByTagName("ul")[0].style.left= -document.getElementsByTagName("li")[(parseInt(event.target.name)-1)].offsetLeft;
		currentImg = (parseInt(event.target.name)-1);
	} else {
		document.getElementsByTagName("ul")[0].style.left= -document.getElementsByTagName("li")[(1+ parseInt(event.target.name))].offsetLeft;
		currentImg = (1+ parseInt(event.target.name));
	}
}

function updateOrientation(){
	window.scrollTo(0, 0);
	var imgs;
	imgs = document.getElementsByTagName("img")
	if( window.orientation != 0 ) {
		for(i=0;  i < imgs.length; i++)
		{
			imgs[i].style.padding = 0;
			if(imgs[i].className == 'portrait'){
				imgs[i].setAttribute("class", "portraitRotated");
			}
			if(imgs[i].className == 'landscape'){
				imgs[i].setAttribute("class", "landscapeRotated");
			}
			imgs[i].style.paddingTop = ((window.innerHeight/2)-(imgs[i].height/2));
			imgs[i].style.paddingBottom = ((window.innerHeight/2)-(imgs[i].height/2));
			imgs[i].style.paddingLeft = ((window.innerWidth/2)-(imgs[i].width/2));
			imgs[i].style.paddingRight = ((window.innerWidth/2)-(imgs[i].width/2));
			
		}
	} else {
		for(i=0;  i < imgs.length; i++)
		{	
			if(imgs[i].className == 'portraitRotated'){
				imgs[i].setAttribute("class", "portrait");
			}
			if(imgs[i].className == 'landscapeRotated'){
				imgs[i].setAttribute("class", "landscape");
			}
			imgs[i].style.paddingTop = ((window.innerHeight/2)-(imgs[i].height/2));
			imgs[i].style.paddingBottom = ((window.innerHeight/2)-(imgs[i].height/2));
			imgs[i].style.paddingLeft = ((window.innerWidth/2)-(imgs[i].width/2));
			imgs[i].style.paddingRight = ((window.innerWidth/2)-(imgs[i].width/2));
			
		}
	}
	
	document.getElementsByTagName("ul")[0].style.left= -document.getElementsByTagName("li")[currentImg].offsetLeft;
	window.scrollTo(0, 0);
}
