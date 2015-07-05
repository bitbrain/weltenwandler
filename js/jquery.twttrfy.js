/* twttrfy, jquery plugin to fetch twitter data on the fly
 * 
 * Author: Miguel Gonzalez <miguel-gonzalez@gmx.de>
 * Version: 1.0
 * Since: 1.0
 */

 (function($) {

 	$.fn.extend({

 		twttrfy: function(options) {

 			var defaults = {
                user: "bdguild",
                datasource: "/proxy.php?url=http://brutal-dedication.de/tweets.php?user=" + this.user,
                onLoadTweet: function(obj, target) {},
                onError: function(error, msg) {},
                onComplete: function() {}
            };

            var options = $.extend(true, {}, defaults, options);
            var target = $(this);

            $.when(
				$.ajax({
		            type: "GET",
		            url: options.datasource,
		            dataType: "json",
		            crossDomain: true,
		            async: true,
		            jsonp: false,
		            success: function(data) {
		                for (var i = 0; i < data.length; ++i) {
		                	options.onLoadTweet(data[i], target);
		                }
					},
		            error: function(error, msg) {
		                options.onError(error, msg);
		            }

		        })
	        ).done(function() {
	        	options.onComplete();
	        });
 		}
 	});

})(jQuery);