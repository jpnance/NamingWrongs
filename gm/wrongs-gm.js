// ==UserScript==
// @name           Naming Wrongs
// @namespace      http://coinflipper.org/
// @description    Righting naming wrongs.
// @include        http://www.espn.com/*
// @include        http://www.coinflipper.org/*
// @version        1.0
// ==/UserScript==

var wrongs = [
	// Football Stadiums
	[ /AT&T Stadium/i, 'Cowboys Stadium' ],
	[ /Sports Authority Field at Mile High/i, 'Mile High Stadium' ],
	[ /Jones AT&T Stadium/i, 'Jones Stadium' ],
	[ /BB&T Field/i, 'Groves Stadium' ],
	[ /FirstEnergy Stadium/i, 'Cleveland Browns Stadium' ],
	[ /Mercedes-Benz Superdome/i, 'The Superdome' ],
	[ /Qualcomm Stadium/i, 'Jack Murphy Stadium' ],

	// Baseball Stadiums
	[ /Citi Field/i, 'Shea Stadium' ],
	[ /US Cellular Field/i, 'Comiskey Park' ],
	[ /Progressive Field/i, 'Jacobs Field' ],
	[ /Guaranteed Rate Field/i, 'Jacobs Field' ],
	[ /UFCU Disch-Falk Field/i, 'Disch-Falk Field' ],
	[ /Globe Life Park/i, 'The Ballpark in Arlington' ],

	// Basketball Stadiums
	[ /Moda Center/i, 'Rose Garden' ],
	[ /Alaska Airlines Arena at Hec Edmundson Pavilion Hec Edmundson Pavilion/i ],
	[ /Oracle Arena/i, 'The Arena' ],

	// College Bowl Games
	[ /Rose Bowl Game presented by Northwestern Mutual/i, 'Rose Bowl' ],
	[ /Chick-fil-A Peach Bowl/i, 'Peach Bowl' ],
	[ /Capital One Orange Bowl/i, 'Orange Bowl' ],
	[ /Allstate Sugar Bowl/i, 'Sugar Bowl' ],
	[ /Goodyear Cotton Bowl Classic/i, 'Cotton Bowl' ],
	[ /BattleFrog Fiesta Bowl/i, 'Fiesta Bowl' ],
	[ /Hyundai Sun Bowl/i, 'Sun Bowl' ],
	[ /Buffalo Wild Wings Citrus Bowl/i, 'Citrus Bowl' ],
	[ /AutoZone Liberty Bowl/i, 'Liberty Bowl' ],
	[ /Camping World Independence Bowl/i, 'Independence Bowl' ],
	[ /National Funding Holiday Bowl/i, 'Holiday Bowl' ],
	[ /Royal Purple Las Vegas Bowl/i, 'Las Vegas Bowl' ],
	[ /Valero Alamo Bowl/i, 'Alamo Bowl' ],
	[ /San Diego County Credit Union Poinsettia Bowl/i, 'Poinsettia Bowl' ]
];

(function() {
	setInterval(function() {
		var walker = document.createTreeWalker(
			document.body,
			NodeFilter.SHOW_TEXT,
			{
				acceptNode: function(node) {
					for (var i = 0; i < wrongs.length; i++) {
						var wrong = wrongs[i];

						if (node.nodeValue.match(wrong[0])) {
							return NodeFilter.FILTER_ACCEPT;
						}
					}
				}
			},
			false
		);

		var node;

		while (node = walker.nextNode()) {
			for (var i = 0; i < wrongs.length; i++) {
				var wrong = wrongs[i];

				if (node.nodeValue.match(wrong[0])) {
					node.nodeValue = node.nodeValue.replace(wrong[0], wrong[1]);
				}
			}
		}
	}, 5000);
})();
