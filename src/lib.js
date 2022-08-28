'use strict'
const Collatz = (() => {
	const Float = Number, Int = BigInt

	/**@param {bigint} n*/
	const f = n => (n & 1n ? 3n * n + 1n : n) >> 1n

	/**
	remove all trailing zeros
	@param {bigint} n
	*/const trim = n => { if (n) while (!(n & 1n)) n >>= 1n; return n }

	/*precompute arrays
	const k = 5n, C = [0n], D = [0n]
	for (let b = 1n; b < (1n << k); b++) {
		C[b] = b & 1n
		C[b] += (D[b] = f(b)) & 1n
		for (let i = 1; i < k; i++)
			C[b] += (D[b] = f(D[b])) & 1n
	}
	console.table(C) //C is wrong, not D
	*/

	let limPos = (1n << 68n) | 1n
	let limNeg = (-1n << 33n) | 1n

	const Collatz = {
		search: len => {
			len = Float(len)
			if (len < 0)
				for (let i = 0, n; i > len; i--, limNeg -= 2n) {
					n = limNeg
					do n = trim(f(n)); while (n < limNeg)
					if (n == limNeg) return limNeg
				}
			else
				for (let i = 0, n; i < len; i++, limPos += 2n) {
					n = limPos
					do n = trim(f(n)); while (n > limPos)
					if (n == limPos) return limPos
				}
		},
		test: n => {
			const m = n = trim(Int(n))
			if (n < 0n) {
				if (n >= limNeg) return false
				do n = trim(f(n)); while (n < limNeg)
			}
			else {
				if (n <= limPos) return false
				do n = trim(f(n)); while (n > limPos)
			}
			return n == m
		},
		get limitPos() { return limPos },
		set limitPos(x) {
			if (!((x = Int(x)) & 1n)) x--
			if (x < 5n) x = 5n
			limPos = x
		},
		get limitNeg() { return limNeg },
		set limitNeg(x) {
			if (!((x = Int(x)) & 1n)) x++
			if (x > -273n) x = -273n
			limNeg = x
		}
	}
	return Collatz
})()
