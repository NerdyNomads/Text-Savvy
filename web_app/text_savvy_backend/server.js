const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// GET method to test connection
app.get('/api', (req, res) => {
    res.send({ message: 'Express backend connected!' });
});

// console.log that the server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));