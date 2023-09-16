const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "dist" directory where your Vue.js build resides
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all route to serve the Vue.js app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});