module.exports = {
    apps: [
        {
            name: 'polfury',
            script: './index.js',
            interpreter: 'deno',
            interpreterArgs: 'run --allow-net --allow-read --allow-write --allow-env --allow-sys --allow-import'
        }
    ]
};
