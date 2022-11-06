//@ts-check
'use strict'
const Collatz = (() => {
	/**
	remove all binary trailing zeros
	@param {bigint} n
	*/
	const trim = n => { if (n) while (!(n & 1n)) n >>= 1n; return n }

	/**
	Collatz fn with "extreme shortcut" (removes all TZs)
	@param {bigint} n
	*/
	const f = n => trim(n & 1n ? 3n * n + 1n : n)

	/*// precompute arrays
	const k = 5n, C = [0n], D = [0n]
	for (let b = 1n; b < (1n << k); b++) {
		C[b] = b & 1n
		C[b] += (D[b] = f(b)) & 1n
		for (let i = 1; i < k; i++)
			C[b] += (D[b] = f(D[b])) & 1n
	}
	console.table(C) // C is wrong, not D
	*/

	/** max known inclusive bound */
	let limPos = (1n << 68n) | 1n
	/** min known inclusive bound */
	let limNeg = (-1n << 33n) | 1n

	const C = {
		/**
		Search in a finite range, or up-to `Infinity`.
		Starting from `limitPos` if the input is unsigned, or `limitNeg` if negative.
		@param {number|bigint} count how many odd ints to check
		@return counter-example if found, or `undefined` if not found
		*/
		search: count => {
			if (count != count)
				throw new RangeError('expected `len` to not be `NaN`, but got `NaN`')

			if (count < 0) //negative
				for (; count++ < 0; limNeg -= 2n) {
					let n = limNeg
					do n = f(n); while (n < limNeg)
					if (n == limNeg) return limNeg
				}
			else //unsigned
				for (; count-- > 0; limPos += 2n) {
					let n = limPos
					do n = f(n); while (n > limPos)
					if (n == limPos) return limPos
				}
		},
		/**
		check if `n` doesn't converge (it's a counter-example)
		@param {bigint} n int to test for convergence
		@return `true` if `n` is a CC, `false` if regular
		*/
		check: n => {
			//remember the original
			const m = n = trim(n)

			if (n < 0n) {
				if (n >= limNeg) return false
				do n = f(n); while (n < limNeg)
			}
			else {
				if (n <= limPos) return false
				do n = f(n); while (n > limPos)
			}
			//check if it's a cycle
			return n == m
		},
		get limitPos() { return limPos },
		set limitPos(/**@type {bigint}*/ x) {
			if (!(x & 1n)) x--
			if (x < 5n) x = 5n
			limPos = x
		},
		get limitNeg() { return limNeg },
		set limitNeg(/**@type {bigint}*/ x) {
			if (!(x & 1n)) x++
			if (x > -273n) x = -273n
			limNeg = x
		}
	}
	return C
})()
