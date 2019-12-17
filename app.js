const express = require ('express');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname + '/public/')));

app.get('/', function (req, res) {
    res.render('home')
})

app.listen(3000, function () {
    console.log('server started on port 3000');
});