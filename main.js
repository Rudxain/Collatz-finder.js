'use strict'
const
	DOC = document,
	searchBtn = DOC.getElementById('searchBtn')

let running = false

searchBtn.addEventListener('click', () => {
	if (running) return
	running = true
	let inp
	try {inp = BigInt(DOC.getElementById('inp').value)}
	catch (e) {alert('invalid input')}
	Collatz.search(inp)

	running = false
})
