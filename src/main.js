//@ts-check
'use strict'
const
	DOC = document,
	searchBtn = DOC.getElementById('searchBtn'),
	input = DOC.getElementById('inp')

/** semaphore */
let running = false

searchBtn.addEventListener('click', () => {
	if (running) return
	running = true

	let v = 0n
	try {v = BigInt(input.value)}
	catch (e) {alert('invalid input')}
	const out = Collatz.search(v)

	running = false
})
