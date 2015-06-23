var express = require('express'),
swig = require('swig');
var app = express();

//Config views
app.engine('html',swig.renderFile);
app.set('view engine','html');
app.set('views','./dist/views');

app.set('port', (process.env.PORT || 5000));
//Static files
app.use(express.static('./dist'));

app.get('/',function(req, res){
  res.render('index');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at http://localhost:" +app.get('port'));
});
