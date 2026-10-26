const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// configure sessions
app.use(session({
secret: process.env.SECRET_KEY,
resave: false,
saveUninitialized: false,
cookie: {
        secure: process.env.NODE_ENV === 'development',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// database test
const users = [
    {
        id: 1, 
        username: 'user1',
        password: 'key123' 
    }
];

// login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (!user)
        return res.status(401).json({ message: 'OPS! Invalid credentials' });

    // store user information in session
    req.session.user = {
        id: user.id,
        username: user.username
    };

    res.json({ message: "WIN! Login successful", user: req.session.user });
});

// protected route
app.get('/profile', (req, res) => {
    
    // check if user is logged
    if (!req.session.user)
        return res.status(401).json({ message: 'OPS! Unauthorized'});

    res.json({ message: 'WINS! Profile accessed', user: req.session.user });
});

// logout route
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err)
            return res.status(500).json({ message: 'OPS! Logout failed'});

        res.json({ message: 'WINS! Logout successful'});
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});