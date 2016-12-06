var wrongs = [
	// Football Stadiums
	[ /Sports Authority Field at Mile High/i, 'Mile High Stadium' ],
	[ /Jones AT&T Stadium/i, 'Jones Stadium' ],
	[ /BB&T Field/i, 'Groves Stadium' ],
	[ /FirstEnergy Stadium/i, 'Cleveland Browns Stadium' ],
	[ /Mercedes-Benz Superdome/i, 'Superdome' ],
	[ /Qualcomm Stadium/i, 'Jack Murphy Stadium' ],
	[ /AT&T Stadium/i, 'Cowboys Stadium' ],
	[ /O\.co Coliseum/i, 'Oakland Coliseum' ],
	[ /Hard Rock Stadium/i, 'Joe Robbie Stadium' ],
	[ /New Era Field/i, 'Rich Stadium' ],

	// Baseball Stadiums
	[ /Progressive Field/i, 'Jacobs Field' ],
	[ /Guaranteed Rate Field/i, 'Comiskey Park' ],
	[ /UFCU Disch-Falk Field/i, 'Disch-Falk Field' ],
	[ /Globe Life Park/i, 'The Ballpark in Arlington' ],
	[ /US Cellular Field/i, 'Comiskey Park' ],
	[ /Rogers Centre/i, 'SkyDome' ],
	[ /Rogers Center/i, 'SkyDome' ],

	// Basketball Stadiums
	[ /Moda Center/i, 'Rose Garden' ],
	[ /BMO Harris Bradley Center/i, 'Bradley Center' ],
	[ /Oracle Arena/i, 'Oakland Coliseum Arena' ],
	[ /Quicken Loans Arena/i, 'Gund Arena' ],
	[ /Smoothie King Center/i, 'New Orleans Arena' ],
	[ /Amalie Arena/i, 'The Ice Palace' ],
	[ /Bridgestone Arena/i, 'Nashville Arena' ],
	[ /Gila River Arena/i, 'Glendale Arena' ],
	[ /PNC Arena/i, 'Raleigh Entertainment & Sports Arena' ],
	[ /Scotiabank Saddledome/i, 'Olympic Saddledome' ],
	[ /SAP Center/i, 'San Jose Arena' ],
	[ /SAP Center at San Jose/i, 'San Jose Arena' ],
	[ /Scottrade Center/i, 'Kiel Center' ],

	// College Bowl Games
	[ /Air Force Reserve Celebration Bowl/i, 'Celebration Bowl' ], // *
	[ /Gildan New Mexico Bowl/i, 'New Mexico Bowl' ],
	[ /Las Vegas Bowl presented by Geico/i, 'Las Vegas Bowl' ],
	[ /Raycom Media Camellia Bowl/i, 'Camellia Bowl' ], // *
	[ /AutoNation Cure Bowl/i, 'Cure Bowl' ], // *
	[ /R\+L Carriers New Orleans Bowl/i, 'New Orleans Bowl' ],
	[ /San Diego County Credit Union Poinsettia Bowl/i, 'Poinsettia Bowl' ],
	[ /Famous Idaho Potato Bowl/i, 'Humanitarian Bowl' ],
	[ /Popeyes Bahamas Bowl/i, 'Bahamas Bowl' ], // *
	[ /Lockheed Martin Armed Forces Bowl/i, 'Armed Forces Bowl' ],
	[ /Dollar General Bowl/i, 'Mobile Alabama Bowl' ], // *
	[ /Quick Lane Bowl/i, 'Motor City Bowl' ], // *
	[ /Camping World Independence Bowl/i, 'Independence Bowl' ],
	[ /Zaxby's Heart of Dallas Bowl/i, 'Heart of Dallas Bowl' ],
	[ /Military Bowl Presented by Northrop Grumman/i, 'Military Bowl' ],
	[ /National Funding Holiday Bowl/i, 'Holiday Bowl' ],
	[ /Motel 6 Cactus Bowl/i, 'Cactus Bowl' ],
	[ /New Era Pinstripe Bowl/i, 'Pinstripe Bowl' ],
	[ /Russell Athletic Bowl/i, 'Tangerine Bowl' ], // *
	[ /Foster Farms Bowl/i, 'San Francisco Bowl' ], // *
	[ /AdvoCare V100 Texas Bowl/i, 'Texas Bowl' ],
	[ /Belk Bowl/i, 'Queen City Bowl' ],
	[ /Valero Alamo Bowl/i, 'Alamo Bowl' ],
	[ /AutoZone Liberty Bowl/i, 'Liberty Bowl' ],
	[ /Hyundai Sun Bowl/i, 'Sun Bowl' ],
	[ /Franklin American Mortgage Music City Bowl/i, 'Music City Bowl' ],
	[ /Nova Home Loans Arizona Bowl/i, 'Arizona Bowl' ],
	[ /Capital One Orange Bowl/i, 'Orange Bowl' ],
	[ /Buffalo Wild Wings Citrus Bowl/i, 'Citrus Bowl' ],
	[ /TaxSlayer Bowl/i, 'Gator Bowl' ],
	[ /Outback Bowl/i, 'Hall of Fame Bowl' ],
	[ /Goodyear Cotton Bowl Classic/i, 'Cotton Bowl' ],
	[ /Rose Bowl Game presented by Northwestern Mutual/i, 'Rose Bowl' ],
	[ /Allstate Sugar Bowl/i, 'Sugar Bowl' ],
	[ /Chick-fil-A Peach Bowl/i, 'Peach Bowl' ],
	[ /PlayStation Fiesta Bowl/i, 'Fiesta Bowl' ],

	// Old College Bowl Games
	[ /BattleFrog Fiesta Bowl/i, 'Fiesta Bowl' ],
	[ /Royal Purple Las Vegas Bowl/i, 'Las Vegas Bowl' ]
];

function rightTheWrongs(root) {
	var iterator = document.createNodeIterator(
		root,
		NodeFilter.SHOW_TEXT,
		{
			acceptNode: function(node) {
				if (node.nodeValue.match(/(Arena|Bowl|Center|Centre|Coliseum|Field|Park|Saddledome|Stadium|Superdome)/i)) {
					return NodeFilter.FILTER_ACCEPT;
				}
			}
		}
	);

	var node;

	while (node = iterator.nextNode()) {
		for (var i = 0; i < wrongs.length; i++) {
			var wrong = wrongs[i];

			if (node.nodeValue.match(wrong[0])) {
				node.nodeValue = node.nodeValue.replace(wrong[0], wrong[1]);
			}
		}
	}

	delete iterator;
}

var observer = new MutationObserver(function(mutations, observer) {
	mutations.forEach(function(mutation) {
		rightTheWrongs(mutation.target);
	});
});

observer.observe(document.body, { childList: true, subtree: true });

rightTheWrongs(document.body);
