/**
 * Javascript Concepts Demonstration Utility
 * Demonstrates: Event loop, Promises vs callbacks, Hoisting, async/await, Closures
 */

// 1. Hoisting
// Hoisting concept implemented: This function can be called before it's declared in the code.
// Variables declared with var are hoisted with undefined, while let/const are in the Temporal Dead Zone.
demonstrateHoisting();

function demonstrateHoisting() {
    console.log("Hoisting: Function called successfully before declaration in the file.");
}

// 2. Closures
// Closures concept implemented: The inner function retains access to 'counter' from the outer lexical scope.
function createTimerClosure() {
    let counter = 0;
    return function increment() {
        counter++;
        return counter;
    };
}
const timerTick = createTimerClosure();

// 3. Promises vs callbacks
// Promises vs callbacks concept implemented: We wrap a callback-based API into a Promise-based API.
const fs = require('fs');
const path = require('path');

// Callback approach
function readFileCallback(filePath, cb) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return cb(err);
        cb(null, data);
    });
}

// Promise approach
function readFilePromise(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

// 4. async/await & Event Loop
// async/await and Event loop concept implemented: Demonstrating macrotasks (setTimeout) and microtasks (Promises)
async function demonstrateEventLoop() {
    console.log("Event Loop: Start execution (Synchronous)");

    // Macrotask (Event Loop)
    setTimeout(() => {
        console.log("Event Loop: Macrotask executed (setTimeout callback)");
    }, 0);

    // Microtask (Promise)
    Promise.resolve().then(() => {
        console.log("Event Loop: Microtask executed (Promise.then)");
    });

    // async/await (pauses execution, yields to event loop)
    const data = await Promise.resolve("Event Loop: Async/Await resolved");
    console.log(data);

    console.log("Event Loop: End execution (Synchronous)");
}

module.exports = {
    demonstrateHoisting,
    timerTick,
    readFileCallback,
    readFilePromise,
    demonstrateEventLoop
};
