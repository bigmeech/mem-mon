let count = 1;
setInterval(() => {
    const snapshot = process.memoryUsage();
    process.send(snapshot);
}, 1000);