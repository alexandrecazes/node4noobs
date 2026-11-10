// inefficient recursive fibonacci function
function fibonacci1(n) {
    if (n <= 1)
        return n;

    return fibonacci1(n - 1) + fibonacci1(n - 2);
}

// efficient iterative fibonacci function
function fibonacci2(n) {
    if (n <= 1)
        return n;

    let a = 0, b = 1, temp;

    for (let i = 2; i <= n; i++) {
        temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}

// compare the performance
function comparePerfomance(n) {
    console.log(`Calculating Fibonacci(${n})`);

    const inefficientStart = process.hrtime.bigint();
    const inefficientResult = fibonacci1(n);
    const inefficientEnd = process.hrtime.bigint();
    const inefficientTime = Number(inefficientEnd - inefficientStart) / 1_000_000;

    const efficientStart = process.hrtime.bigint();
    const efficientResult = fibonacci2(n);
    const efficientEnd = process.hrtime.bigint();
    const efficientTime = Number(efficientEnd - efficientStart) / 1_000_000;

    console.log(`Inefficient: ${inefficientResult} (${inefficientTime.toFixed(2)}ms)`);
    console.log(`Efficient: ${efficientResult} (${efficientTime.toFixed(2)}ms)`);
    console.log(`Speedup: ${Math.round(inefficientTime / efficientTime)}x`)
}

comparePerfomance(25);
