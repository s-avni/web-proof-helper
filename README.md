# Math Proof Assistant

A website designed to help users make correct proofs, and catch mistakes in real time.

## Getting Started

Install the packages appearing in requirements.txt.
Run the project using `flask run`.

## Resources

* [SymPy: symbolic computing in Python](https://peerj.com/articles/cs-103/) (2017) - gives a clear overview of SymPy's capabilities.
* [Algebraic Simplification - A Guide for the Perplexed](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.137.7024&rep=rep1&type=pdf) (1971) - explains further about inherent limitations of computerized simplifiers. See also [Richardson's Theorem](https://en.wikipedia.org/wiki/Richardson%27s_theorem) (1968).
* Info on [Solveset()](https://docs.sympy.org/latest/modules/solvers/solveset.html) and its comparison to **Solve()**

## Authors

* **Shiri Avni** - *Initial work* - [InquisitiveMuggles](www.inquisitivemuggles.com)
* **Moshe Gordan** - *Initial work* - [InquisitiveMuggles](www.inquisitivemuggles.com)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Todo

1. Change default from complex to reals
2. Change imaginary number from "I" to "i" #perhaps add a 'j' option as well
3. Make parser work with sin(x)/x=1, and then check if x=0 is a solution or not
4. sol for: x= sqrt(-1)*sqrt(-1) //over reals, i expect we wouldn't get a sol. but maybe we do?
5. enable custom error messages to help user. e.g. "your first line has a larger value than your second line".
6. when toggling "real/complex", re-solve equations and provide new correctness feedback
7. finish real/complex toggle:

const is_over_reals = $('#domain-toggle').is(":checked");
console.log({is_over_reals});





