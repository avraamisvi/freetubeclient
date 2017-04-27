var express = require('express');
var request = require('request');

var router = express.Router();

var SERVER = 'http://localhost:4000/graphql';

/* GET home page. */
router.get('/list/:text', function(req, res, next) {

 let query = {
    query: `query ListVideos($text: String!){
            
                listVideosByfullTextSearch(text:$text, pag:{
                    offset: 0
                    limit: 20
                    server: 0    
                }){
                    id
                    title
                    description
                    sentDate
                    thumbUrl
                }
            }`,
    variables: {
        text: req.params.text
    }
 };

let options = {
  url: SERVER,
  method: 'POST',
  json: query
};

  request(options, function(err, httpResponse, body){
    res.render('videos_list', { videos:  body.data.listVideosByfullTextSearch});
  });
  
});


router.get('/list', function(req, res, next) {

 let query = {
    query: `query ListVideos{
                listVideos(pag: {
                    offset: 0
                    limit: 20
                    server: 0
                }) {
                    id
                    title
                    description
                    sentDate
                    thumbUrl
                    hash
                }
            }`
 };

let options = {
  url: SERVER,
  method: 'POST',
  json: query
};

  request(options, function(err, httpResponse, body){
    res.render('videos_list', { videos:  body.data.listVideos});
  });
  
});

router.get('/watch/:hash', function(req, res, next) {

 let query = {
    query: `query GetVideoByHash($hash: String!){
                getVideoByHash(hash:$hash) {
                    id
                    title
                    magnetUri
                    description
                    thumbUrl
                    user {
                        id
                        name
                    }                    
            }
        }`,
        variables: {
            hash: req.params.hash
        }
 };

let options = {
  url: SERVER,
  method: 'POST',
  json: query
};

  request(options, function(err, httpResponse, body){
    res.render('watch', { video:  body.data.getVideoByHash});
  });
  
});

module.exports = router;
