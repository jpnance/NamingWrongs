var updatingData = false;

var sitePatterns = [
	/espn.com/,
	/si.com/,
	/foxsports.com/,
	/sports.yahoo.com/,
	/nbcsports.com/,
	/cbssports.com/,
	/sportsline.com/,
	/sportingnews.com/,
	/bleacherreport.com/,
	/deadspin.com/,
	/sbnation.com/,
	/ftw.usatoday.com/,
	/mlb.com/,
	/www.nfl.com/,
	/www.nhl.com/,
	/www.nba.com/,
	/www.ncaa.com/
];

function rightTheWrongs(root, wrongs) {
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function(data) {
		if (xhr.readyState == 4) {
			var data = JSON.parse(xhr.responseText);
			var wrongs;

			if (data.wrongs) {
				wrongs = data.wrongs;

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
						var regex = new RegExp(wrong[0]);

						if (node.nodeValue.match(regex)) {
							node.nodeValue = node.nodeValue.replace(regex, wrong[1]);
						}

						delete regex;
					}
				}

				delete iterator;
			}
		}
	};

	var url = chrome.extension.getURL('/wrongs.json');
	xhr.open('GET', url, true);
	xhr.send();
}

function matchesHref(pattern) {
	if (window.location.href.match(pattern)) {
		return true;
	}
}

if (sitePatterns.some(matchesHref)) {
	var observer = new MutationObserver(function(mutations, observer) {
		mutations.forEach(function(mutation) {
			rightTheWrongs(mutation.target);
		});
	});

	observer.observe(document.body, { childList: true, subtree: true });

	rightTheWrongs(document.body);
}
