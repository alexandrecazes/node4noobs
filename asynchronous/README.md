# Node.js Asynchronous Programming

*In Node.js, asynchronous operations let your program do other work while waiting for tasks like file I/O or network requests to complete.
This non-blocking approach enables Node.js to handle thousands of concurrent connections efficiently.*

## Sync vs Async: Key Differences

### Synchronous

- Blocks execution until complete
- Simple to understand
- Can cause delays

### Asynchronous

- Non-blocking execution
- Better performance
- More complex to handle
- Uses callbacks, promises, or async/await

## Promises

*Promises in Node.js provide a cleaner way to handle asynchronous operations compared to traditional callbacks.
Promises represent the completion (or failure) of an asynchronous operation and its result.*

### Promise States

- Pending: Initial state, operation not completed
- Fulfilled: Operation completed successfully
- Rejected: Operation failed

*Once a promise is settled (either fulfilled or rejected), its state cannot change.*

## Async/Await

*Async/await is a modern way to handle asynchronous operations in Node.js, building on top of Promises to create even more readable code. Introduced in Node.js 7.6 and standardized in ES2017.*

*Async/await is basically Promises with a more readable syntax. Async/await makes asynchronous code look and more feel like synchronous code. It does not block the main thread, but is easy to follow and understand.*

### Syntax 

- async: Used to declare an asynchronous function that returns a Promise
- await: Used to pause execution until a Promise is resolved, can only be used inside async functions

### Best Practices

- Remember that async functions always return Promises
- When operations can run in parallel, use Promise.all() to improve performance
- Use try/catch blocks or chain a .catch() to the async function call
- Avoid mixing async/await with callbacks
- Keep async functions focused on a single responsibility

