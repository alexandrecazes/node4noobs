const express = require("express");
const dotenv = require('dotenv');

dotenv.config();
const app = express();

async function processData(data) {
    return data;
}

// hard to debug
fetch('https://jsonplaceholder.typicode.com/users/1')
    .then(response => response.json())
    .then(data => processData(data))
    .catch(error => console.error("OPS! Error: ", error));

// easier to debug
async function fetchData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/2');
        //console.log(response)
        return await processData(response);
    } catch (error) {
        console.error("OPS! Error: ", error);
        throw error;
    }
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});