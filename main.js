(function(){'use strict';
	const
		Float = Number, Int = BigInt,
		k = 5n,
		C = [0n], D = [0n],
		f = n => (n & 1n ? 3n * n + 1n : n) >> 1n,
		//remove all trailing zeros
		trim = n => {while (!(n & 1n)) n >>= 1n; return n}

	//precompute arrays
	for (let b = 1n; b < (1n << k); b++) {
		C[b] = b & 1n
		C[b] += (D[b] = f(b)) & 1n
		for (let i = 1; i < k; i++)
			C[b] += (D[b] = f(D[b])) & 1n
	}
	//console.table(C) //C is wrong, not D

	let limPos = (1n << 68n) | 1n //already-checked positives +1
	let limNeg = (-1n << 16n) | 1n //tested negatives

	globalThis.Collatz = {
		search: len => { //find a counterexample, if it exists
			len = Float(len)
			if (len < 0)
				for (let i = 0, n; i > len; i--, limNeg -= 2n) {
					n = limNeg
					do n = trim(f(n)); while (n < limNeg)
					if (n == limNeg) return limNeg //detect any cycle
				}
			else
				for (let i = 0, n; i < len; i++, limPos += 2n) {
					n = limPos
					do n = trim(f(n)); while (n > limPos)
					if (n == limPos) return limPos //detect any cycle
				}
		},
		test: n => {
			n = trim(Int(n))
			if (n < 0n) {
				if (n >= limNeg) return false
				do n = trim(f(n)); while (n < limNeg)
			}
			else {
				if (n <= limPos) return false
				do n = trim(f(n)); while (n > limPos)
			}
		}
	}
	Object.defineProperty(Collatz, 'limitPos', {get: () => limPos,
		//ensure it's always odd, and greater than the trivial cycle
		set: x => {
			if ( !((x = Int(x)) & 1n) ) x--
			if (x < 5n) x = 5n
			limPos = x
		}
	})
	Object.defineProperty(Collatz, 'limitNeg', {get: () => limNeg,
		//ensure it's always odd, and greater than the trivial cycle
		set: x => {
			if ( !((x = Int(x)) & 1n) ) x++
			if (x > -273n) x = -273n
			limNeg = x
		}
	})
})()
