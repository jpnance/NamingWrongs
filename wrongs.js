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

function updateTheWrongs(root) {
	var timestamp;
	var storageArea = chrome.storage.sync || chrome.storage.local;

	storageArea.get(['timestamp', 'wrongs'], function(item) {
		var firstUpdate = false;

		if (!item.timestamp) {
			timestamp = Date.now();
			firstUpdate = true;
		}
		else {
			timestamp = item.timestamp;
		}

		var timeSinceLastUpdate = (Date.now() - timestamp) / 1000;

		if (timeSinceLastUpdate > 30 || firstUpdate) {
			storageArea.set({ timestamp: Date.now() }, function() {
				if (!updatingData) {
					updatingData = true;

					var xhr = new XMLHttpRequest();
					xhr.onreadystatechange = function(data) {
						if (xhr.readyState == 4) {
							if (xhr.status == 200) {
								var data = JSON.parse(xhr.responseText);

								if (data.wrongs) {
									storageArea.set({ wrongs: data.wrongs }, function() {
										rightTheWrongs(root, data.wrongs);
										updatingData = false;
									});
								}
							}
						}
					};

					var url = 'http://www.coinflipper.org/~jpnance/wrongs.json?_=' + Math.random();
					xhr.open('GET', url, true);
					xhr.send();
				}
				else {
					console.log('already updating');
				}
			});
		}
		else if (item.wrongs) {
			rightTheWrongs(root, item.wrongs);
		}
	});
}

function rightTheWrongs(root, wrongs) {
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

function matchesHref(pattern) {
	if (window.location.href.match(pattern)) {
		return true;
	}
}

if (sitePatterns.some(matchesHref)) {
	var observer = new MutationObserver(function(mutations, observer) {
		mutations.forEach(function(mutation) {
			updateTheWrongs(mutation.target);
		});
	});

	observer.observe(document.body, { childList: true, subtree: true });

	updateTheWrongs(document.body);
}
