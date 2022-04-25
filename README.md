# Intro
The purpose of this mini-library is to allow any human or program to aid in the seacrh for a counterexample to disprove the Collatz Conjecture, and settle this infamous but interesting problem once and for all.

# What is the Collatz Conjecture?
[Wikipedia has a good article](https://en.wikipedia.org/wiki/Collatz_conjecture) about it. Also [Numberphile has a video](https://youtu.be/5mFpVDpKX70) on it, and [Veritasium too](https://youtu.be/094y1Z2wpJg)

# Why JS?
It's a high-level lang in very familiar with, and it's available to use without installing 3rd party software (for most, but not all users), so even if it's slower than C++ and Rust, it's moderately fast. I'm considering turning this into a GitHub Pages site, to allow anyone to try it out without opening the dev console (this is good for mobile users), and if I do so, I would add a timer to make it easier to benchmark CPUs using the website. Maybe I could use `WebWorker`s to improve performance even more on multi-core CPUs.

# How to use the API
You can use a script tag in your HTML files with its `src` attribute set to the path of your downloaded copy of the `main.js` file. I recommend you change the name to something like `Collatz-finder.js` or `Collatz_checker.js`. Another option is to copy-paste the text contents of the file into the browser console, then run the line. After that, you can call `Collatz.search` method within other scripts in your HTML or in the console.

`Collatz.search` takes an argument that must be coercible by the [`BigInt`](https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-bigint-constructor) constructor, so avoid invalid values or it'll throw an error. The only input argument must be the number of integers you want to check, starting from `Collatz.limit`. If any of those integers is detected to be a counterexample, the method will let you know by returning that int, if no counterexample is found it returns `undefined`.

You can replace the value of `Collatz.limit` if you want to skip to higher ints, or double-check small ints. But be aware that your input value will be coerced by `BigInt` and forced to be odd instead of even, it'll also have a minimum value of 5 (because the {4, 2, 1} cycle is trivial, and there's no support for negatives)
