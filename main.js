(function(){'use strict';
	let lim = ~(-1n << 68n) //upper bound of already-checked ints
	const Int = BigInt, isMersenne = n => !(n & (n + 1n)), proven = new Set,
	check = n => {
		const seen = new Set
		while (n >= lim){
			if (proven.has(n)) break
			if (n & 1n) {
				seen.add(n) //we only care about odd ints
				if (isMersenne(n *= 3n)) break //discard future power of 2
				n++; n >>= 1n //immediate div
			}
			else do n >>= 1n; while ( !(n & 1n) ) //remove all trailing zeros
			if (seen.has(n)) return false //found counterexample by cycle recognition
		}
		for (const x of seen) proven.add(x), seen.delete(x)
		return true
	}

	globalThis.Collatz = {
		search: n => { //find a counterexample, if it exists
			for (n = Int(n) + lim; lim < n; lim += 2n) {if (!check(lim)) return lim; proven.delete(lim)}
			return undefined
		}
	}
	Object.defineProperty(globalThis.Collatz, 'limit', {get: () => lim,
		//ensure it's always odd, and greater than the trivial cycle
		set: x => {if ( !((x = Int(x)) & 1n) ) x--; if (x < 5n) x = 5n; lim = x}
	})
})()
