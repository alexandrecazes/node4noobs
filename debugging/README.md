# Advanced Debugging

## Introduction to Advanced Debugging

*While console.log() is useful for basic debugging, advanced techniques allow you to diagnose complex issues like memory leaks, performance bottlenecks, and race conditions.*

### Advanced debugging tools provide capabilities like:
- Setting breakpoints and stepping through code execution
- Inspecting variable values at runtime
- Visualizing memory consumption and finding leaks
- Profiling CPU usage to identify performance bottlenecks
- Analyzing asynchronous call stacks

## Debugging with DevTools

*Node.js includes built-in support for the Chrome/Edge DevTools debugging protocol, allowing you to use the powerful Chrome/Edge DevTools interface to debug your Node.js applications.*

### Debug Mode

```
node --inspect app.js
```
*This starts your app normally but enables the inspector on port 9229.*

```
node --inspect-brk app.js
```
*This pauses execution at the first line of code, allowing you to set up breakpoints before execution begins.*

```
node --inspect=127.0.0.1:9222 app.js
```
*This uses a custom port for the inspector.*

### Connecting to the Debugger

- [https://nodejs.org/learn/getting-started/debugging](https://nodejs.org/learn/getting-started/debugging)

*Once connected, you can use the full power of Chrome/Edge DevTools:*

- **Sources Panel:** Set breakpoints, step through code, and watch variables
- **Call Stack:** View the current execution stack, including async call chains
- **Scope Variables:** Inspect local and global variables at each breakpoint
- **Console:** Evaluate expressions in the current context
- **Memory Panel:** Take heap snapshots and analyze memory usage

*Tip: Use the Sources panel's "Pause on caught exceptions" feature (the pause button with curved lines) to automatically break when an error occurs.*

## Debugging in VS Code

*Visual Studio Code provides excellent built-in debugging capabilities for Node.js applications.*

### Setting Up Node.js Debugging in VS Code

*You can start debugging your Node.js application in VS Code in several ways:*

- **launch.json Configuration:** Create a ```.vscode/launch.json``` file to define how VS Code should launch or attach to your application.
- **Auto-Attach:** Enable auto-attach in VS Code settings to automatically debug any Node.js process started with the ```--inspect``` flag.
- **JavaScript Debug Terminal:** Use the JavaScript Debug Terminal in VS Code to automatically debug any Node.js process started from that terminal.

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "program": "${workspaceFolder}/app.js",
      "skipFiles": ["<node_internals>/**"]
    },
    {
      "type": "node",
      "request": "attach",
      "name": "Attach to Process",
      "port": 9229
    }
  ]
}
```

### VS Code Debugging Features

*VS Code provides powerful debugging capabilities:*

- **Breakpoints:** Set, disable, and enable breakpoints by clicking in the gutter of your code editor.
- **Conditional Breakpoints:** Right-click on a breakpoint to set a condition that must be true for the breakpoint to trigger.
- **Logpoints:** Add logging without modifying code by setting logpoints that print messages to the console when hit.
- **Watch Expressions:** Monitor the value of variables and expressions as you step through code.
- **Call Stack:** View and navigate the call stack, including asynchronous frames.

*Tip: VS Code can also debug TypeScript files directly, with source maps enabling debugging of the original TypeScript code rather than the transpiled JavaScript.*

## Using the Debug Module

*The debug module is a lightweight debugging utility that allows you to add conditional logging to your Node.js applications without cluttering your code with console.log statements.*

### Installing the Debug Module

```
npm install debug
```

### Enabling Debug Output

*To see the debug output, set the DEBUG environment variable to a comma-separated list of namespace patterns:*

*Enable All Debug Output*

```
DEBUG=app:* node app.js
```

*Enable Specific Namespaces*

```
DEBUG=app:server,app:auth node app.js
```
*Enable All but Exclude Some*

```
DEBUG=app:*,-app:database node app.js
```

### Debug Output Features

- Each namespace has a unique color for easy visual identification
- Timestamps show when each message was logged
- Supports formatted output similar to console.log
- Shows the difference in milliseconds from the previous log of the same namespace

*Tip: Use specific namespaces for different components of your application to make it easier to filter debug output based on what you're currently troubleshooting.*

## Finding and Fixing Memory Leaks

*Memory leaks in Node.js applications can cause performance degradation and eventual crashes.
Detecting and fixing memory leaks is a crucial debugging skill.*

### Common Causes of Memory Leaks in Node.js

- **Global Variables:** Objects stored in global scope that are never cleaned up
- **Closures:** Functions that maintain references to large objects or variables
- **Event Listeners:** Listeners that are added but never removed
- **Caches:** In-memory caches that grow without bounds
- **Timers:** Timers (setTimeout/setInterval) that aren't cleared
- **Promises:** Unhandled promises or promise chains that never resolve

### Take Heap Snapshots with Chrome DevTools

*Heap snapshots provide a detailed view of memory allocation:*

- Start your app with node ```--inspect app.js```
- Connect with Chrome/Edge DevTools
- Go to the Memory tab
- Take heap snapshots at different points
- Compare snapshots to find objects that are growing in number or size

### Use Memory Profiling Tools

- **clinic doctor:** Identify memory issues in your application
- **clinic heap:** Visualize heap memory usage
- **memwatch-next:** Library to detect memory leaks

## CPU Profiling and Performance

*CPU profiling helps identify performance bottlenecks in your Node.js application by showing which functions consume the most CPU time.*

### Chrome DevTools CPU Profiler

- Start your app with node ```--inspect app.js```
- Connect with Chrome/Edge DevTools
- Go to the Performance tab
- Click Record
- Perform the actions you want to profile
- Stop the recording
- Analyze the flame chart

### Third-Party Profiling Tools

**clinic flame:** Generate flame graphs for CPU profiling
**0x:** Flamegraph generation tool
**v8-profiler:** Programmatically collect V8 CPU profiles

### Optimizing CPU-Intensive Code

*Common techniques for optimizing CPU-intensive Node.js code include:*

- **Avoid Recursion:** Use iterative approaches for better performance
- **Memoization:** Cache results of expensive function calls
- **Offload to Worker Threads:** Move CPU-intensive work to separate threads
- **Use Native Modules:** For very performance-critical code, consider C++ addons
- **Avoid Blocking the Event Loop:** Break large tasks into smaller chunks