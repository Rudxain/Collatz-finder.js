# Intro
The purpose of this is to allow any human or program to aid in the search for a counterexample to disprove the Collatz Conjecture, and settle this infamous but interesting problem once and for all. The **website is not finished**, but the library is done. I'll add backwards-compatibility and apply minification after the basic parts are ready

# What is the Collatz Conjecture?
[Wikipedia has a good article](https://en.wikipedia.org/wiki/Collatz_conjecture) about it. Also [Numberphile has a video](https://youtu.be/5mFpVDpKX70) on it, and [Veritasium too](https://youtu.be/094y1Z2wpJg). [This video](https://youtu.be/i4OTNm7bRP8) is also very underrated

# How to use the library API
You can use a script tag in your HTML files with its `src` attribute set to the path of your downloaded copy of the `lib.js` file. I recommend you rename it to something like `Collatz-finder.js`. Another option is to copy-paste the text contents of the file into the browser console, then run it. After that, you can call `Collatz.search` method within other scripts in your HTML or in the console.

`Collatz.search` takes an argument that must be coercible by the [`BigInt`](https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-bigint-constructor) constructor, so avoid invalid values or it'll throw an error. The only input argument must be the number of integers you want to check, starting from `Collatz.limitPos` if the input is positive or `limitNeg` if negative. If any of those ints is detected to be a counterexample, the method will let you know by returning that int, if no counterexample is found it returns `undefined`.

You can replace the value of `Collatz.limit*` if you want to skip to bigger ints, or double-check small ints. But be aware that your input value will be coerced by `BigInt` and forced to be odd instead of even, it'll also have a minimum value equal to the greatest term in the trivial cycle +-1 (depends on input sign).

You can get the computation progress of `search` by accessing the `progress` property, the number is a ratio in the interval [0, 1]

# Some algebra
If `n` is a Natural that when tripled and incremented becomes a power of 2 then it's of the form `3n + 1 = 2^m`, thus equivalent to `n = Mersenne(m) / 3`. Therefore, `m = 2k`, because `bitlen(3) = 2`, where `bitlen(x) = ilb(x) + 1`, so `n = (2^(2k) - 1) / 3`. This means that `3n+1` is a **perfect square power of 2**, because it has an even number of binary trailing zeros.

An optimization based on this https://math.stackexchange.com/a/2285699 , states (if I understood correctly) that an int of the form `2^a + n`, where `n` is a number already checked and `2^a >= n`, could be discarded if the length of the hailstone sequence is small enough to preserve at least 1 of the zeros of the most significant slice (the zeros that were added by the power of 2). So a binary numeral like `10000000000000011` can be discarded because the hailstone length of 3 is small, however a numeral like `10111` must be processed because the hailstone length of 7 is too long to preserve the only zero available
