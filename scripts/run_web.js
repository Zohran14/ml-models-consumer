const express = require('express');
const path = require('path');

const app = express();
const port = process.env.WEB_PORT || 4200;
const appName = process.argv[2];
// Serve static files generated by Vite
app.use(express.static(path.join(__dirname, 'dist', appName)));

// Handle all routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', appName, 'index.html'));
});

app.listen(port, () => {
  console.log(`Web Server is running on port ${port}`);
});
