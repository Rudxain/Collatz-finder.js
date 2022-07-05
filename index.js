'use strict';
const getByID = document.getElementById
const searchBtn = getByID('searchBtn')

let interval = null
searchBtn.addEventListener('click', () => {
	if (interval !== null) return

	//Collatz.search(getByID('inp').value)
	interval = setInterval(() => {
		getByID('mainprog').value = Collatz.progress
		if (Collatz.progress == 1) {
			clearInterval(interval)
			interval = null

		}
	}, 1000)
})
