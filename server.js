const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'views', 'about.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'views', 'contact.html')));
app.get('/blog', (req, res) => res.sendFile(path.join(__dirname, 'views', 'blog.html')));

// Debugging: Check if posts.json exists
const postsFilePath = path.join(__dirname, 'data', 'posts.json');
if (!fs.existsSync(postsFilePath)) {
    console.error("❌ posts.json file is missing! Ensure it exists in the 'data' folder.");
}

// API route to serve blog posts
app.get('/api/blog', (req, res) => {
    fs.readFile(postsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading posts.json:", err);
            return res.status(500).json({ error: "Could not load blog posts" });
        }
        res.json(JSON.parse(data));
    });
});

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
