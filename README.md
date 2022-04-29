# Intro
The purpose of this mini-library is to allow any human or program to aid in the seacrh for a counterexample to disprove the Collatz Conjecture, and settle this infamous but interesting problem once and for all.

# What is the Collatz Conjecture?
[Wikipedia has a good article](https://en.wikipedia.org/wiki/Collatz_conjecture) about it. Also [Numberphile has a video](https://youtu.be/5mFpVDpKX70) on it, and [Veritasium too](https://youtu.be/094y1Z2wpJg). [This video](https://youtu.be/i4OTNm7bRP8) is also very underrated

# Why JS?
It's a high-level lang in very familiar with, and it's available to use without installing 3rd party software (for most, but not all users), so even if it's slower than C++ and Rust, it's moderately fast. I'm considering turning this into a GitHub Pages site, to allow anyone to try it out without opening the dev console (this is good for mobile users), and if I do so, I would add a timer to make it easier to benchmark CPUs using the website. Maybe I could use `WebWorker`s to improve performance even more on multi-core CPUs.

# How to use the API
You can use a script tag in your HTML files with its `src` attribute set to the path of your downloaded copy of the `main.js` file. I recommend you change the name to something like `Collatz-finder.js` or `Collatz_checker.js`. Another option is to copy-paste the text contents of the file into the browser console, then run the line. After that, you can call `Collatz.search` method within other scripts in your HTML or in the console.

`Collatz.search` takes an argument that must be coercible by the [`BigInt`](https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-bigint-constructor) constructor, so avoid invalid values or it'll throw an error. The only input argument must be the number of integers you want to check, starting from `Collatz.limit`. If any of those integers is detected to be a counterexample, the method will let you know by returning that int, if no counterexample is found it returns `undefined`.

You can replace the value of `Collatz.limit` if you want to skip to higher ints, or double-check small ints. But be aware that your input value will be coerced by `BigInt` and forced to be odd instead of even, it'll also have a minimum value of 5 (because the {4, 2, 1} cycle is trivial, and there's no support for negatives, and false positives would be found, lol)

# Some algebra
If `n` is a Natural that when tripled and incremented becomes a power of 2 then it's of the form `3n + 1 = 2^m`, thus equivalent to `n = Mersenne(m) / 3`. Therefore, `m = 2k`, because `bitlen(3) = 2`, where `bitlen(x) = ilb(x) + 1`, so `n = (2^(2k) - 1) / 3`. This means that `3n+1` is a **perfect square power of 2**, because it has an even number of binary trailing zeros.

An optimization based on this https://math.stackexchange.com/a/2285699 , states (if I understood correctly) that an int of the form `2^a + n`, where `n` is a number already checked and `2^a >= n`, could be discarded if the length of the hailstone sequence is small enough to preserve at least 1 of the zeros of the most significant slice (the zeros that were added by the power of 2). So a binary numeral like `10000000000000011` can be discarded because the hailstone length of 3 is small, however a numeral like `10111` must be processed because the hailstone length of 7 is too long to preserve the only zero available
