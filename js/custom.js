/**
 * Custom script for animations and general configuration
 *
 * @author Miguel Gonzalez <miguel-gonzalez@gmx.de>
 * @since 1.0
 * @version 1.0
 */

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function checkMessages() {

	var error = getUrlVars()['error'];
	var success = getUrlVars()['success'];
	var info = getUrlVars()['info'];
	var container = $('.messages');

	// Show error message
	container.append(generateMessage(error, 'error', 'fa-exclamation'));
	// Show success
	container.append(generateMessage(success, 'success', 'fa-check'));

	// Show info message
	container.append('<a href="/forum/viewforum.php?f=5">' + generateMessage(info, 'info', 'fa-envelope') + '</a>');
}

function generateMessage(msg, cssClass, icon) {
	if (typeof(msg) !== 'undefined') {
		msg = msg.split('%20').join(' ');
		return '<div class="message ' + cssClass + '"><i class="fa ' + icon +'"></i>' + msg + '</div>';
	} else {
		return '';
	}
}

// Author: Smarath :)
function generateCountdown() {

	var element = $('.countdown');
	var jahr=2014, monat=5, tag=31, stunde=03, minute=59, sekunde=01; // Ziel-Datum in MEZ
	var zielDatum = new Date(jahr,monat-1,tag,stunde,minute,sekunde);
	element.html("0 Tage,  0 Stunden,  0 Minuten  und  0 Sekunden");

		startDatum = new Date();
		//startDatum = zielDatum;
		// Countdown berechnen und anzeigen, bis Ziel-Datum erreicht ist
		if(startDatum<zielDatum)  {

			var jahre=0, monate=0, tage=0, stunden=0, minuten=0, sekunden=0;			

			// Tage
			while(startDatum.getTime()+(24*60*60*1000)<zielDatum) {
				tage++;
				startDatum.setTime(startDatum.getTime()+(24*60*60*1000));
			}

			// Stunden
			stunden=Math.floor((zielDatum-startDatum)/(60*60*1000));
			startDatum.setTime(startDatum.getTime()+stunden*60*60*1000);

			// Minuten
			minuten=Math.floor((zielDatum-startDatum)/(60*1000));
			startDatum.setTime(startDatum.getTime()+minuten*60*1000);

			// Sekunden
			sekunden=Math.floor((zielDatum-startDatum)/1000);

			// Anzeige formatieren
			//(monate!=1)?monate=monate+" Monate,  ":monate=monate+" Monat,  ";
			(tage!=1)?tage=tage+" Tage,  ":tage=tage+" Tag,  ";
			(stunden!=1)?stunden=stunden+" Stunden,  ":stunden=stunden+" Stunde,  ";
			(minuten!=1)?minuten=minuten+" Minuten  und  ":minuten=minuten+" Minute  und  ";
			if(sekunden<10) sekunden="0"+sekunden;
			(sekunden!=1)?sekunden=sekunden+" Sekunden":sekunden=sekunden+" Sekunde";
			element.html(tage+stunden+minuten+sekunden);
			setTimeout('generateCountdown()',200);
		}
		// Anderenfalls alles auf Null setzen
		else {

			// Play sound!

			if (startDatum.getYear() === zielDatum.getYear() &&
				startDatum.getMonth() === zielDatum.getMonth() &&
				startDatum.getDay() === zielDatum.getDay() &&
				startDatum.getHours() === zielDatum.getHours() &&
				startDatum.getMinutes() === zielDatum.getMinutes() &&
				startDatum.getSeconds() === zielDatum.getSeconds()) {

				 function play() {
     
            		if (window.HTMLAudioElement) {
              			var snd = new Audio("");

              			if(snd.canPlayType("audio/mp3")) {
              			    snd = new Audio("http://brutal-dedication.de/audio/jingle.mp3");
              			}

              			snd.play();
	            	}
	            }
	            play();
			}

			element.html('Wir sind auf Nexus gelandet!');
			element.attr('href', '/live');
			element.css({
				backgroundImage: 'url("/img/menu_hover.png")',
				backgroundSize: '100% 100%',
				boxShadow:'0px 0px 50px #770000',				
				color:'#ff7800',
				textShadow:'0px 0px 10px red',
				fontSize:'24px',
				width: '30%'
			});

			element.hover(function() {
				element.css({
					boxShadow:'0px 0px 130px #992200',
					textShadow:'0px 0px 30px #ff2200',
					color:'#ff9900'
				});
			}, function() {
				element.css({
					boxShadow:'0px 0px 50px #770000',
					textShadow:'0px 0px 10px red',
					color:'#ff7800'
				});
			});
		}
}

$(document).ready(new function() {

	$('.header').ice();
	checkMessages();
	$('.left').hide();
	$('.left').fadeIn(500);

	var excluded = $('.message.info');
	$('.message').not(excluded).css('opacity', '0.0');
	$('.message').not(excluded).animate({
		opacity : 1.0
	}, 2000).delay(5000).animate({
		opacity : 0.0,
		height : "0px",
		lineHeight : "0px",
		paddingTop : "0px",
		paddingBottom : "0px",
		margin: "0px"
	}, 300);

	//generateCountdown();

	$('.header').hide();
	$('.header').fadeIn(2500);
	
	//$('select').customSelect();
});

