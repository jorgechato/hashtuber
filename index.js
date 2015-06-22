var express = require('express');
var app = express();

//app.http();

app.set('port', (process.env.PORT || 5000));
//Static files
app.use(express.static('./dist/views'));

app.get('/',function(req, res){
  res.render('index');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" +app.get('port'));
});
