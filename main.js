'use strict'
const
	DOC = document,
	searchBtn = DOC.getElementById('searchBtn')

let running = false

searchBtn.addEventListener('click', () => {
	if (running) return
	running = true

	const inp = DOC.getElementById('inp').value
	Collatz.search(inp)

	running = false
})
