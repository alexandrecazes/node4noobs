function sum(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number')
        throw new Error("OPS! Both arguments must be numbers");

    return a + b;
}

function subtract(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number')
        throw new Error("OPS! Both arguments must be numbers");

    return a - b;
}

function mult(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number')
        throw new Error("OPS! Both arguments must be numbers");

    return a * b;
}

function div(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number')
        throw new Error("OPS! Both arguments must be numbers");

    return a / b;
}

module.exports = { sum, subtract, mult, div };
