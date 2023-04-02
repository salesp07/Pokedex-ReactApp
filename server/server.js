const express = require("express");
const app = express();
const cors = require('cors');
require('./db');
const bcrypt = require("bcrypt")
const axios = require('axios')
const session = require('express-session');
const dotenv = require("dotenv")
dotenv.config();
require('express-async-errors');
const moment = require('moment');


// Import models
const User = require('./models/User.js')
const Request = require('./models/Request.js')
const error = require('./models/Error.js')


// Middleware
app.use('/', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'GET', 'OPTIONS'],
    credentials: true
}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 600000
    },
    httpOnly: true
}));

function isLoggedIn(req, res, next) {
    if (req.session.isLoggedIn) {
        return next();
    }
    return res.json({ redirect: '/login' })
}

function isAdmin(req, res, next) {
    if (req.session.user.isAdmin) {
        return next();
    }
    return res.json({ errMsg: 'Not an admin' })
}

async function logRequest(req, res, next) {
    await Request.create({
        username: req.session.user.username,
        endpoint: req.originalUrl
    })
    next()
}

// Error handler

async function handleErr(err, req, res, next) {
    await Error.create({
        username: req.session.user.username,
        type: err.name,
        endpoint: req.originalUrl
    })
    console.log(err.message)
    if (err.name == 'MongoServerError') {
        return res.json({ errMsg: 'Username not avaliable' })
    }
    return res.json({ errMsg: String(err) })
}

// Routes

app.get('/logout', (req, res) => {
    req.session.destroy();
    return res.redirect('/login')
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const userWithHashedPassword = { username: username, password: hashedPassword }
    console.log(userWithHashedPassword)
    const user = await User.create(userWithHashedPassword)
    req.session.user = user;
    req.session.isLoggedIn = true;
    return res.json({ redirect: '/' })
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body
    let user = await User.findOne({ username: username })
    if (!user)
        return res.json({ errMsg: 'Incorrect username or password' })
    comp = await bcrypt.compare(password, user.password)
    if (!comp)
        return res.json({ errMsg: 'Incorrect username or password' })
    req.session.user = user;
    req.session.isLoggedIn = true;
    user.isAdmin ? res.json({ redirect: '/admin' }) : res.json({ redirect: '/pokemons' })
})

app.get('/isLoggedIn', (req, res) => {
    res.json({ isLoggedIn: req.session.isLoggedIn })
})

app.get('/isAdmin', (req, res) => {
    res.json({
        isAdmin: req.session.user?.isAdmin,
        isLoggedIn: req.session.isLoggedIn
    })
})

app.get('/pokemons', isLoggedIn, logRequest, async (req, res) => {
    let remoteTypes = await axios.get('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/types.json');
    remoteTypes = remoteTypes.data.map(item => item.english)
    let remotePokes = await axios.get(`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json`);
    remotePokes = remotePokes.data
    res.json({ pokemons: remotePokes, types: remoteTypes })
})

app.get('/topUsers', isLoggedIn, isAdmin, async (req, res) => {
    const data = await Request.aggregate().sortByCount("username").limit(10);
    res.json(data)
})

app.get('/uniqueUsers', async (req, res) => {
    let now = new Date();
    let currentHour = now.getHours();
    let hoursArray = [];

    // Generate the first array
    for (let i = 5; i >= 0; i--) {
        let hour = currentHour - i;
        if (hour < 0) hour += 24;
        let obj = {
            _id: hour,
            count: 0
        };
        hoursArray.push(obj);
    }

    const query = await Request.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: new Date(Date.now() - 6 * 60 * 60 * 1000)
                }
            }
        },
        {
            $project: {
                createdAtVancouver: {
                    $subtract: ["$createdAt", 7 * 60 * 60 * 1000]
                },
                username: 1
            }
        },
        {
            $group: {
                _id: { username: "$username", hour: { $hour: "$createdAtVancouver" } }
            }
        },
        {
            $group: {
                _id: "$_id.hour",
                count: { $sum: 1 }
            }
        }
    ]);

    // Merge the two arrays with priority given to mongoose aggregate array
    let resultArray = hoursArray.reduce((acc, curr) => {
        let matchingObj = query.find(obj => obj._id === curr._id);
        if (matchingObj) newItem = matchingObj;
        else newItem = curr;
        newItem['_id'] = moment(newItem['_id'], 'H').format('hA');
        acc.push(newItem);
        return acc;
    }, []);
    res.json(resultArray)
})

app.get('/recentErrors', isLoggedIn, isAdmin, async (req, res) => {
    const data = await Error.find().sort({ createdAt: -1 }).limit(10);
    res.json(data)
})

app.get('/errorsByEndpoint', isLoggedIn, isAdmin, async (req, res) => {
    const data = await Error.aggregate().sortByCount("endpoint").limit(10);
    res.json(data)
})

app.get('*', (req, res) => {
    res.send('<h1>404 NOT FOUND</h1>')
})

app.use(handleErr)

// Start the server
app.listen(process.env.PORT, () => {
    console.log("Server started on port " + process.env.PORT);
});