/* Script to load data from twitter and show it in the mediagallery */

function loadMediaGallery() {

	function urlify(text) {
	    var urlRegex = /(https?:\/\/[^\s]+)/g;
	    return text.replace(urlRegex, function(url) {
		return '';
	    })
	}

	var t = $('#mediagallery');
	var columns = 4;
	var index = 0;

	t.css('display', 'table');
	t.css('width', '100%');
	$(this).twttrfy({
		onLoadTweet : function(obj, target) {
			if (obj.entities.media != undefined) {
				var thumb = $('<a data-title="' + urlify(obj.text) + '" data-lightbox="mediagallery" href="' + obj.entities.media[0].media_url + 
				':large"><img src="' + obj.entities.media[0].media_url + 
				':thumb" title="' + urlify(obj.text) + '" /></a>');
				thumb.css({
					display: 'table-cell',
					padding: '10px'
				});

				thumb.css('opacity', '0.6');
				thumb.hover(function() {
					thumb.stop(false, true).animate({
						opacity : '1.0'
					}, 300);
				}, function() {
					thumb.stop(false, true).animate({
						opacity : '0.6'
					}, 500);
				});

				thumb.hide();
				t.append(thumb);
				index++;
				
				if (index % columns == 0) {
					t.append('<div style="display:table-row"></div>');
					index = 0;
				}

				thumb.fadeIn(2000);
			}
		},
		onComplete : function() {
			
		},
		onError : function(error, msg) {
			gallery.html(msg);
		}
	});	
}

loadMediaGallery();