module.exports = {
    target: "webworker",
    entry: "./index.js",
    mode: "production",
    externals: {
        "./jszip": "jszip"
    }
}