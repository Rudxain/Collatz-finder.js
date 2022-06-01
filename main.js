(function(){'use strict';
	const Int = BigInt
	let lim = (1n << 68n) + 1n //already-checked ints +1
	const check = () => {
		let n = lim
		do {
			n *= 3n; n++
			do n >>= 1n; while (!(n & 1n)) //remove all trailing zeros
		} while (n > lim)
		return n == lim
	}

	globalThis.Collatz = {
		search: n => { //find a counterexample, if it exists
			n = Int(n)
			for (let i = 0n; i < n; i++, lim += 2n)
				if (check()) return lim
			return undefined
		}
	}
	Object.defineProperty(Collatz, 'limit', {get: () => lim,
		//ensure it's always odd, and greater than the trivial cycle
		set: x => {if ( !((x = Int(x)) & 1n) ) x--; if (x < 5n) x = 5n; lim = x}
	})
})()
