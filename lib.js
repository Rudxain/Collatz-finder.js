(function(){'use strict';
	const
		Float = Number, Int = BigInt,
		//k = 5n,
		//C = [0n], D = [0n],
		f = n => (n & 1n ? 3n * n + 1n : n) >> 1n,
		//remove all trailing zeros
		trim = n => {while (!(n & 1n)) n >>= 1n; return n}

	/*precompute arrays
	for (let b = 1n; b < (1n << k); b++) {
		C[b] = b & 1n
		C[b] += (D[b] = f(b)) & 1n
		for (let i = 1; i < k; i++)
			C[b] += (D[b] = f(D[b])) & 1n
	}
	console.table(C) //C is wrong, not D
	*/

	let limPos = (1n << 68n) | 1n
	let limNeg = (-1n << 32n) | 1n
	let progress = 1 //there's no task pending, so 100% complete

	globalThis.Collatz = {
		search: len => {
			len = Float(len)
			if (len < 0)
				for (let i = 0, n; i > len; i--, limNeg -= 2n) {
					progress = i / len
					n = limNeg
					do n = trim(f(n)); while (n < limNeg)
					if (n == limNeg) return limNeg
				}
			else
				for (let i = 0, n; i < len; i++, limPos += 2n) {
					progress = i / len
					n = limPos
					do n = trim(f(n)); while (n > limPos)
					if (n == limPos) return limPos
				}
			progress = 1 //completed
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
		}
	}
	Object.defineProperty(Collatz, 'limitPos', {
		get: () => limPos,
		set: x => {
			if ( !((x = Int(x)) & 1n) ) x--
			if (x < 5n) x = 5n
			limPos = x
		}
	})
	Object.defineProperty(Collatz, 'limitNeg', {
		get: () => limNeg,
		set: x => {
			if ( !((x = Int(x)) & 1n) ) x++
			if (x > -273n) x = -273n
			limNeg = x
		}
	})
	Object.defineProperty(Collatz, 'progress', {
		get: () => progress,
		set: () => {}
	})
})()
