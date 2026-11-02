// Helper function to generate API keys
function generateApiKey() {
    return [...Array(32)]
        .map(() => Math.floor(Math.random() * 16).toString())
        .join('');
}

module.exports = { generateApiKey }