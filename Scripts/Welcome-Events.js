// JavaScript Document
$(document).ready(function() {
	setTimeout(function() {$('ul.spy').simpleSpy()} , 1500);
});

(function ($) {
    
$.fn.simpleSpy = function (limit, interval) {
    limit = 3;
    interval = 4000;
    
    return this.each(function () {
        // 1. setup
            // capture a cache of all the list items
            // chomp the list down to limit li elements
        var $list = $(this),
            items = [], // uninitialised
            currentItem = limit,
            total = 0, // initialise later on
            width = $list.find('> li:first').width();
			height = $list.find('> li:first').height();
            
        // capture the cache
        $list.find('> li').each(function () {
            items.push('<li>' + $(this).html() + '</li>');
        });
        
        total = items.length;
        

		$list.find('> li').filter(':gt(' + (limit - 1) + ')').remove();
		
		setInterval ( spy, interval );
		
        // 2. effect        
        function spy() {
            // insert a new item with opacity and height of zero
            var $insert = $(items[currentItem]).css({
                width : 5,
				height: 0,
                opacity : 0,
                display : 'none'
            }).prependTo($list);
                        
            // fade the LAST item out
            $insert.animate({ width : width, height : height, opacity : 1 }, 2000, 'easeOutBack');
            setTimeout(function() {$list.find('> li:last').remove();}, 2000);
            
            currentItem++;
            if (currentItem >= total) {
                currentItem = 0;
            }
        }
    });
}
    
})(jQuery);
