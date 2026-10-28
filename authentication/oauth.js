const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const { isAuthenticated } = require('./middleware/authenticate');

dotenv.config();

const app = express();
const SECRET_KEY = process.env.SECRET_KEY;

// configure sessions for OAuth 2.0
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// configure Google OAuth 2.0 strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8081/auth/google/callback'
},
    (accessToken, refreshToken, profile, done) => {
        const user = {
            id: profile.id,
            name: profile.name,
            email: profile.emails[0].value,
            provider: 'google'
        };
        return done(null, user);
    }
));

// serialize user for session
passport.serializeUser((user, done) => {
    done(null, user);
});

// deserialize user from session
passport.deserializeUser((user, done) => {
    done(null, user);
});

// route for google OAuth
app.get('/auth/google', passport.authenticate('google', { scope: ['profile, email'] }));

app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }), 
    (req, res) => {
        res.redirect('/profile');
    }
);

app.get('/profile', isAuthenticated, (req, res) => {
    res.json({ user: req.user });
});

app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err)
            return next(err);
    });
    res.redirect('/');
});

app.get('/', (req, res) => {
    res.send('<h1>Hello Node.js</h1>');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});