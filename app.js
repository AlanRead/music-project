const express = require ('express');
const path = require('path');
const app = express();

const Users = require ('./src/Users');
const User = require ('./src/User');
const Songs = require('./src/Songs');
const url = require('url');

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname + '/public/')));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

//Creates a single list of Users to store
app.users = new Users();

/**
 * Loads the login page on initial start up
 */
app.get('/', function (req, res) {
    let error = "";
    res.render('login', {
        error: error
    })
})

/**
 * Post back to login page after creating a new account
 * Shows error if username already exists
 */
app.post('/', function(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let error = "";
    app.song = new Songs ();
    app.user = new User (username, password, app.song);
    if(!app.users.alreadyExists(username)) {
        app.users.addUser(app.user);
        res.render('login', {
            error: error
        });
    } else {
        let error = "Username already exists."
        res.render('create', {
            error: error
        });
    }
})

/**
 * Loads the create account page
 */
app.get('/create', function (req, res) {
    let error = "";
    res.render ('create', {
        error: error
    })
})

/**
 * Loads the home page
 */
app.get('/home', function(req, res) {
    let u = url.parse(req.url, true);
    res.render('home', {
        username: u.query["username"]
    })
})

/**
 * Loads the home page
 * Checks if the username and password is correct
 */
app.post ('/home', function(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let user = app.users.getUserByName(username);
    let error1 = "Username does not exist";
    let error2 = "Username or password is incorrect";

    if (user == null) {
        res.render ('login', {
            error: error1
        })
    } else if (user.getPassword() != password) {
        res.render ('login', {
            error: error2
        })
    } else {
        res.render('home', {
            username: username
        })
    }
})

/**
 * Loads users setting input from the home page
 */
app.get('/build', function (req, res) {
    let u = url.parse(req.url, true);
    res.render ('build', {
        username: u.query["username"],
        songname: u.query["songname"],
        lines: u.query["lines"],
        sheet: ""
    });
})

app.post('/build', function (req, res) {
    let username = req.body.username;
    let songname = req.body.song;
    let user = app.users.getUserByName(username);
    res.render ('build', {
        sheet: user.getSheet(songname),
        username: username,
        lines: 0,
        songname: songname
    })
})

/**
 * Loads the songs page and accesses the users current songs
 */
app.get('/songs', function (req, res) {
    let u = url.parse(req.url, true);
    let username = u.query["username"];
    let user = app.users.getUserByName(username);
    let songname = user.getSongs();
    res.render ('songs', {
        username: username,
        song: songname
    })
})

/**
 * Saves the song and loads the save song page
 */
app.post('/songs', function (req, res) {
    let username = req.body.username;
    let songname = req.body.songname;
    let sheet = req.body.song;
    let user = app.users.getUserByName(username);
    user.addSong(songname, sheet);

    //store the sheet music in a dictionary, only display the name of the song
    res.render('songs', {
        username: username,
        song: songname
    })
})

/**
 * Logs that the server started
 */
app.listen(3000, function () {
    console.log('server started on port 3000');
});

module.exports = app;