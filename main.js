(function(){'use strict';
	const Int = BigInt,
		Mersenne = n => ~(-1n << n),
		isMersenne = n => !(n & (n + 1n))
	let lim = Mersenne(68n) //upper bound of already-checked ints
	const check = () => {
		let n = lim
		const seen = new Set
		do {
			seen.add(n)
			if (isMersenne(n *= 3n)) break //discard future power of 2
			n++
			do n >>= 1n; while ( !(n & 1n) ) //remove all trailing zeros
			if (seen.has(n)) return false //found counterexample by cycle recognition
		} while (n >= lim)
		return true
	}

	globalThis.Collatz = {
		search: n => { //find a counterexample, if it exists
			for (n = Int(n) + lim; lim < n; lim += 2n)
				if (!check()) return lim
			return undefined
		}
	}
	Object.defineProperty(globalThis.Collatz, 'limit', {get: () => lim,
		//ensure it's always odd, and greater than the trivial cycle
		set: x => {if ( !((x = Int(x)) & 1n) ) x--; if (x < 5n) x = 5n; lim = x}
	})
})()
