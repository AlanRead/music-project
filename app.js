const express = require ('express');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname + '/public/')));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
  }));

/**
 * Loads the login page
 */
app.get('/', function (req, res) {
    res.render('login')
})

/**
 * Loads the create account page
 */
app.get('/create', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/create.html'));
})

/**
 * Loads the main page
 */
app.post ('/main', function(req, res) {
    var username = req.body.username;
    res.render('main', {
        username: username
    });
})

app.listen(3000, function () {
    console.log('server started on port 3000');
});