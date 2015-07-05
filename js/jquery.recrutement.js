/**
 * 
 *
 * @author Miguel Gonzalez <miguel-gonzalez@gmx.de>
 * @since 1.0
 * @version 1.0
 */

 (function($) {

 	$.fn.extend({

 		recrutement: function(options) {

 			var defaults = {
                datasource: "/recrutement.json",
                animated: true
            };

            var options = $.extend(true, {}, defaults, options);
            var target = $(this);
            var errorMessage = 'Rekrutierung zurzeit nicht verf&uuml;gbar.';

            $.when($.ajax({
                type: "GET",
                url: options.datasource + "?callback=?",
                dataType: "json",
                crossDomain: true,
                async: false,
                jsonp: false,
                success: function(data) {
                    target.html(generateContent(data));
                },
                error: function(error, msg) {
                	target.html(errorMessage);
                }

            }));

            function generateContent(data) {

                var result = '<div class="table classes">';

                result += generateTable(data.recrutement);

                result += '</div>';
                result += '<div class="legend">Legende: <span class="low">gering</span><span class="normal">normal</span><span class="high">hoch</span></div>';

                return result;
            }

            function generateTable(classes) {

                var result = '<div class="head row"><span class="cell">Klasse</span><span class="cell status">Bedarf</span></div>';

                for (var i = 0; i < classes.length; ++i) {
                    
                    var element = classes[i];

                    result += '<a class="row ' + element.name + '" href="/apply#paragraph">';
                    result += '<span class="name cell value">' + translateClass(element.name) + '</span>';
                    result += '<span class="status cell value">' + generatePriority(element.specs) + '</span>';
                    result += '</a>';
                }

                return result;
            }


            function generatePriority(specs) {

                var priority = '';

                for (var i = 0; i < specs.length; ++i) {

                    var spec = specs[i];

                    if (priority) {
                        priority += ' / ';
                    }

                    priority += '<span class="' + spec.name + ' ' + spec.priority +'">' + translateSpec(spec.name) + '</span>';
                }

                return priority;
            }

            function translateSpec(spec) {
                switch (spec) {

                    case 'dd':      return 'DD';
                    case 'tank':        return 'Tank';
                    case 'heal': return 'Heal';
                }

                return 'unknown';
            }


            function translateClass(name) {

                switch (name) {

                    case 'warrior':      return 'Krieger';
                    case 'esper':        return 'Esper';
                    case 'spellslinger': return 'Arkansch&uuml;tze';
                    case 'stalker':      return 'Meuchler';
                    case 'medic':        return 'Sanit&auml;ter';
                    case 'engineer':     return 'Techpionier';
                }

                return 'unknown';
            }
        }

    });

})(jQuery);