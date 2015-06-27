var express = require('express'),
swig = require('swig'),
cors = require('cors'),
bodyParser = require('body-parser');

var app = express();

//Config views
app.engine('html',swig.renderFile);
app.set('view engine','html');
app.set('views','./dist/views');

app.set('port', (process.env.PORT || 5005));

//Cors and init json Middleware
var corsOptions = {
  origin: 'http://google.com'
};
app.use(bodyParser.json('application/json'));
app.use(cors(corsOptions));

//Static files
app.use(express.static('./dist'));

var config = require('./lib/config');
app.use(config);

app.get('/',function(req, res){
  res.render('index');
  //config.getLogger('test','hola test');
});

var twitter = require('./lib/twitter');
app.use(twitter);

app.use(function(req, res){
  res.sendFile(__dirname+'/dist/views/index.html');
  //res.render('index');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at http://localhost:" +app.get('port'));
});
