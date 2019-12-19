const express = require ('express');
const path = require('path');
const app = express();

const Users = require ('./src/Users');
const User = require ('./src/User');
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
    app.user = new User (username, password, []);
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
 * Loads the main page
 * Checks if the username and password is correct
 */
app.post ('/main', function(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    console.log(username);
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
        res.render('main', {
            lines: 1
        });
    }
})

app.get('/main', function (req, res) {
    var u = url.parse(req.url, true);
    //var param = getparams(u.search.substr(1));
    //console.log(u.query["lines"]);
    res.render ('main', {
        lines: u.query["lines"]
    });
})

/*function getparams(paramString) {
    let params = {};
    let splitParam = paramString.split('&');
    for(var i = 0; i < splitParam.length; i ++) {
        let equalSplit = splitParam[i].split('=');
        params[equalSplit[0]] =  equalSplit[1];
    }
    console.log(params);
    return params;
}*/

/**
 * Logs that the server started
 */
app.listen(3000, function () {
    console.log('server started on port 3000');
});

module.exports = app;