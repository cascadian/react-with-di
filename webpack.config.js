module.exports = {
    
    entry: "./build/index.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    node: {
        process: false
    }
}
