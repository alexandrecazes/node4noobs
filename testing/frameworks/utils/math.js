function sum(x, y) {
    if (typeof x !== 'number' || typeof y !== 'number')
        throw new Error("OPS! Both arguments must be numbers");

    return x + y;
}

function divide(x, y) {
    if (y === 0)
        throw new Error("OPS! Division by zero");

    return x / y;
}

module.exports = { sum, divide };