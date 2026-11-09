function logMemoryUsage() {
    const memoryUsage = process.memoryUsage();
    console.log(`RSS: ${Math.round(memoryUsage.rss / 1024 / 1024)}MB`);
    console.log(`Heap total: ${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`);
    console.log(`Heap Used: ${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`);
}

// log memory usage every 20 seconds
setInterval(logMemoryUsage, 20000);