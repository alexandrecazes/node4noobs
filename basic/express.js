const express = require('express');
const app = express();

app.get('/', (req, res) => res.send("Hello, NOdeJs!!!"));

app.listen(8080, () => {
    console.log("Server running...");
});