/* Script to load data from twitter and show it in the slideshow */

function loadSlideshow() {

	function urlify(text) {
	    var urlRegex = /(https?:\/\/[^\s]+)/g;
	    return text.replace(urlRegex, function(url) {
		return '';
	    })
	}

	var slideShow = $('#slideshow');
	slideShow.height(300);
	slideShow.css('width', '100%');
	var images = $(document.createElement('ul'));


	$(this).twttrfy({
		onLoadTweet : function(obj, target) {
			if (obj.entities.media != undefined) {
				images.append('<li><img width="1024" src="' + obj.entities.media[0].media_url + ':large" title="' + urlify(obj.text) + '" /></li>');
			}
		},
		onComplete : function() {
			slideShow.html(images);
			slideShow.craftyslide({
				'width':"100%",
				'pagination': false,
				'fadetime': 1000,
				'delay': 8000
			});
		},
		onError : function(error, msg) {
			slideShow.html(msg);
		}
	});	
}

loadSlideshow();
