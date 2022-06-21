'use strict';
const searchBtn = document.getElementById('searchBtn')

let interval = null
searchBtn.addEventListener('click', () => {
	if (interval !== null) return;
	interval = setInterval(() => {
		document.getElementById('progress').value = Collatz.progress
		if (Collatz.progress == 1) {
			clearInterval(interval)
			interval = null
		}
	}, 1000)
})