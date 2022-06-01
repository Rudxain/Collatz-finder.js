(function(){'use strict';
	const Int = BigInt, Mersenne = n => ~(-1n << n)
	let lim = Mersenne(68n) //bound of already-checked ints
	const check = () => {
		let n = lim
		do {
			n *= 3n; n++
			do n >>= 1n; while (!(n & 1n)) //remove all trailing zeros
			if (n == lim) return true //found counterexample by cycle recognition
		} while (n > lim)
		return false
	}

	globalThis.Collatz = {
		search: n => { //find a counterexample, if it exists
			for (n = Int(n) + lim; lim < n; lim += 2n)
				if (check()) return lim
			return undefined
		}
	}
	Object.defineProperty(Collatz, 'limit', {get: () => lim,
		//ensure it's always odd, and greater than the trivial cycle
		set: x => {if ( !((x = Int(x)) & 1n) ) x--; if (x < 5n) x = 5n; lim = x}
	})
})()
