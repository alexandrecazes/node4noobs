console.log("1");
process.nextTick(() => console.log("2. Next tick"));
Promise.resolve().then(() => console.log("3. Promise"));
setTimeout(() => console.log("4. Timeout"), 0);
setImmediate(() => console.log("5. Immediate"));
console.log("6");
