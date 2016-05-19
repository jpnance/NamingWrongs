// ==UserScript==
// @name           Naming Wrongs
// @namespace      http://coinflipper.org/
// @description    Righting naming wrongs.
// @include        http://espn.go.com/mlb/team/stadium?name=tor
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @version        1.2.3
// ==/UserScript==

var wrongs = {};

(function() {
	function traverse(e) {
		console.log(e);
		if (e.childNodes.length == 0 && e.nodeType == 3) {
			e.nodeValue = e.nodeValue.replace(/Rogers Centre/, 'SkyDome');
		}
		else if (e.childNodes.length > 0) {
			for (var i in e.childNodes) {
				traverse(e.childNodes[i]);
			}
		}
	}

	traverse(document.body);
})();
