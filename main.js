

// To run, use `node main.js`
// https://nodejs.org/api/wasi.html

async function main() {
    const fs = require('fs')
    const code = fs.readFileSync('add.wasm')
    const module = await WebAssembly.compile(code);
    const instance = await WebAssembly.instantiate(module);

    const memory = new WebAssembly.Memory({ initial: 2 }); // Size is in pages.
    const arrayBuffer = memory.buffer;
    const buffer = new Uint8Array(arrayBuffer);

    // const wasi = new WASI();
    // wasi.start(instance);

    console.time("add")
    for (let i = 0; i < 60; i++) {
        instance.exports.add(1, 2);
    }
    console.timeEnd("add")
}


main()
