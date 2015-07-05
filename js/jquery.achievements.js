/**
 * 
 *
 * @author Miguel Gonzalez <miguel-gonzalez@gmx.de>
 * @since 1.0
 * @version 1.0
 */

 (function($) {

 	$.fn.extend({

 		achievements: function(options) {

 			var defaults = {
                datasource: "/recrutement.json",
                animated: true
            };

            var options = $.extend(true, {}, defaults, options);
            var target = $(this);
            var errorMessage = 'Erfolge k&ouml;nnen leider zurzeit nicht geladen werden.';

            $.when($.ajax({
                type: "GET",
                url: options.datasource + "?callback=?",
                dataType: "json",
                crossDomain: true,
                async: true,
                jsonp: false,
                success: function(data) {
                    target.html(generateContent(data.achievements));
                },
                error: function(error, msg) {
                	target.html(errorMessage);
                }

            }));

            function generateContent(data) {

                data.sort(function(a, b) {
                    return b.date > a.date;
                });

                var result = '';
                
                for (var i = 0; i < data.length; ++i) {
                    result += generateAchievement(data[i]);
                }

                return result;
            }

            function generateAchievement(a) {

                var result = '<a href="' + a.url + '" class="achievement">';

                result += '<div class="table"><div class="row"><div class="cell icon">';
                result += '<img src="' + a.image + '"/>';
                result += '</div><div class="cell">';
                result += '<div class="achievementContent">';
                result += '<div class="title">' + a.name + '</div>';
                result += '<div class="description">' + a.description + '</div>';
                result += '<div class="stats table"><span class="cell author">' + a.author + '</span><span class="cell server">' + a.server + '</span><span class="cell date">' + a.date + '</span></div>';
                result += '</div></div></div></div>';

                return result + '</div>';
            }
        }

    });

})(jQuery);