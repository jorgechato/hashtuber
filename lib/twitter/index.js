var express = require('express'),
Twitter = require('twitter');

if(process.env.consumer_key === undefined){
  var config = require('../../config.json');
}

var client = new Twitter({
  consumer_key: process.env.consumer_key || config.env.consumer_key,
  consumer_secret: process.env.consumer_secret || config.env.consumer_secret,
  access_token_key: process.env.access_token || config.env.access_token,
  access_token_secret: process.env.access_token_secret || config.env.access_token_secret
});

var app = express();

app.get('/api/search/:hashtag',function(req, res){
  var cleanHashtag = req.params.hashtag;
  cleanHashtag = cleanHashtag.replace(/ /g,"");
  cleanHashtag = cleanHashtag.replace(/#/g,"");
  cleanHashtag = '#'+cleanHashtag;
  //get tweets with hashtag
  client.get('search/tweets', {q:cleanHashtag}, function(error, tweets, response){
    if (!error){
      res.status(200)
      .set('Content-Type','application/json')
      .json({
        "tweets" : tweets
      });
    }
  });
});

module.exports = app;
