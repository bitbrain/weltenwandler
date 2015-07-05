/**
 * 
 *
 * @author Miguel Gonzalez <miguel-gonzalez@gmx.de>
 * @since 1.0
 * @version 1.0
 */

 (function($) {

 	$.fn.extend({

 		memberlist: function(options) {

 			var defaults = {
                datasource: "/members.json"
            };

            var options = $.extend(true, {}, defaults, options);
            var target = $(this);
            var errorMessage = 'Mitglieder-Liste zurzeit nicht verf&uuml;gbar.';

            
            $.when($.ajax({
                type: "GET",
                url: options.datasource + "?callback=?",
                dataType: "json",
                crossDomain: true,
                async: false,
                jsonp: false,
                success: function(data) {
                    target.html(generateContent(data));
					configureTipsy();
                },
                error: function(error, msg) {
                	target.html(errorMessage);
                }

            }));

            // Functions

            function generateContent(json) {
                
                if (typeof(json) === 'undefined') {
                    return errorMessage;
                }

                var groups = json.groups;

                if (typeof(groups) === 'undefined' || groups.length < 1) {
                    return errorMessage;
                }

                var result = '';

                for (var i = 0; i < groups.length; ++i) {
                    result += generateGroup(groups[i]);
                }

                return result;
            }

            function generateGroup(group) {
                var result = '<div class="guild_group">';

                result += '<h2>' + group.name + '</h2>';
                result += '<p>' + group.description + '</p>';
                result += generateMemberList(group.members);

                return result + '</div>';
            }

            function generateMemberList(members) {
                var result = '<div class="memberlist table">';

                if (members.length < 1) {
                    return "Diese Gruppe hat zurzeit keine Mitglieder.";
                }

                result += '<div class="row head"><div class="cell name">Name</div><div class="cell race">Rasse</div><div class="cell class">Klasse</div><div class="cell spec">Spezialisierung</div><div class="cell path">Pfad</div></div>';

                for (var i = 0; i < members.length; ++i) {
                    result += generateMemberRow(members[i], i % 2 == 0);
                }               

                return result + '</div>';
            }

            function generateMemberRow(member, lighted) {

                var lightedClass = lighted ? ' lighted' : '';
                var result = '<a class="row" href="http://forum.brutal-dedication.de/memberlist.php?mode=viewprofile&un=' + member.name +'">';

                if (!member.color) {
                    member.color = 'ffffff';
                }

                var style = 'color: #' + member.color + ';';

                result += '<div style="' + style + '" class="cell name' + lightedClass + '">' + member.name + '</div>';
                result += '<div class="cell ' + member.race + lightedClass + '">' + generateMemberRace(member.race) + '</div>';
                result += '<div class="cell ' + member.class + lightedClass + '">' + generateMemberClass(member.class) + '</div>';
                result += '<div class="cell' + lightedClass + ' ' + member.spec + '">' + generateMemberSpec(member.spec) + '</div>';
                result += '<div class="cell ' + member.path + lightedClass + '">' + generateMemberPath(member.path) + '</div>';

                return result + '</a>';
            }

            function generateMemberRace(raceString) {

                var iconPath = '/img/races/' + raceString + '.png';

                return '<img alt="' + raceString + '" src="' + iconPath + '" />';
            }

            function generateMemberClass(classString) {

                var iconPath = '/img/classes/' + classString + '.png';

                return '<img alt="' + classString + '" src="' + iconPath + '" />';
            }

            function generateMemberPath(pathString) {
                
                var iconPath = '/img/paths/' + pathString + '.png';

                return '<img alt="' + pathString + '" src="' + iconPath + '" />';
            }

            function generateMemberSpec(spec) {

                var icon = '<i class="fa fa-gavel"></i>';

                if (spec === 'tank') {
                    icon = '<i class="fa fa-shield"></i>';
                } else if (spec === 'heal') {
                    icon = '<i class="fa fa-plus-square"></i>';
                }

                return icon;
            }

            function correctString(string) {
                return string.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                    return letter.toUpperCase();
                });
            }

            function configureTipsy() {

                var grav = $.fn.tipsy.autoNS;

                // Races

                $('.cassian').tipsy({fallback: "Cassian" , gravity: grav, fade : true});
                $('.chua').tipsy({fallback: "Chua" , gravity: grav, fade : true});
                $('.draken').tipsy({fallback: "Draken" , gravity: grav, fade : true});
                $('.mechari').tipsy({fallback: "Mechari" , gravity: $.fn.tipsy.autoNS, fade : true});

                // Classes

                $('.warrior').tipsy({fallback: "Krieger" , gravity: grav, fade : true});
                $('.esper').tipsy({fallback: "Esper" , gravity: grav, fade : true});
                $('.spellslinger').tipsy({fallback: "Arkanschütze" , gravity: grav, fade : true});
                $('.medic').tipsy({fallback: "Sanitäter" , gravity: grav, fade : true});
                $('.engineer').tipsy({fallback: "Techpionier" , gravity: grav, fade : true});
                $('.stalker').tipsy({fallback: "Meuchler" , gravity: grav, fade : true});

                // Paths

                $('.soldier').tipsy({fallback: "Soldat" , gravity: grav, fade : true});
                $('.settler').tipsy({fallback: "Siedler" , gravity: grav, fade : true});
                $('.explorer').tipsy({fallback: "Kundschafter" , gravity: grav, fade : true});
                $('.scientist').tipsy({fallback: "Wissenschaftler" , gravity: grav, fade : true});

                // Specs

                $('.tank').tipsy({fallback: "Tank" , gravity: grav, fade : true});
                $('.dd').tipsy({fallback: "Damage Dealer" , gravity: grav, fade : true});
                $('.heal').tipsy({fallback: "Heal" , gravity: grav, fade : true});
            }

 		}

 	});

 })(jQuery);