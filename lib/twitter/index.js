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
var config = require('../config');

app.get('/api/search/',function(req, res){
  var cleanHashtag = req.query.hashtag;
  cleanHashtag = cleanHashtag.replace(/ /g,"");
  cleanHashtag = cleanHashtag.replace(/#/g,"");
  cleanHashtag = '#'+cleanHashtag;

  var paginator = 0;
  try{
    paginator = req.query.since_id;
  }catch(err){paginator = 0;}
  //get tweets with hashtag
  client.get('search/tweets', {q:cleanHashtag,since_id:paginator}, function(error, tweets, response){
    if (!error){
      config.getLogger("Completed in "+tweets.search_metadata.completed_in+"s",cleanHashtag+" searched property");
      var questions = [];

      tweets.statuses.forEach(function(item, index) {
        if(item.id != paginator && item.retweeted_status === undefined){
          //Clean tweet
          var question ={
            "name" : "",
            "img" : "",
            "url" : "",
            "color" : "",
            "id" : 0,
            "tweet" : {
              "text" : "",
              "date" : 0,
              "favorites" : 0,
              "retweets" : 0
            }
          };
          var date = new Date(item.created_at);

          question.name = item.user.name;
          question.img = item.user.profile_image_url;
          question.url = "https://twitter.com/"+item.user.screen_name;
          question.color = "#"+item.user.profile_link_color;
          question.id = item.id;

          question.tweet.text = item.text;
          question.tweet.date = date.getTime();
          question.tweet.favorites = item.favorite_count;
          question.tweet.retweets = item.retweet_count;

          questions.push(question);
        }
      });

      questions.reverse();

      res.status(200)
      .set('Content-Type','application/json')
      .json(questions);
    }else{
      config.getLogger(response,error);
    }
  });
});

module.exports = app;
