var express = require('express');
var router = express.Router();
var collections = require('pycollections');
var sw = require('stopword')

function sortByCount (wordsMap) {

  // sort by count in descending order
  var finalWordsArray = [];
  finalWordsArray = Object.keys(wordsMap).map(function (key) {
    return {
      name: key,
      total: wordsMap[key]
    };
  });

  finalWordsArray.sort(function (a, b) {
    return b.total - a.total;
  });

  return finalWordsArray;

}

ignore = {
    "a": "", "about": "", "above": "", "after": "", "again": "", "against": "", "all": "", "am": "", "an": "", "and": "", "any": "", "are": "",
    "aren't": "", "as": "", "at": "", "be": "", "because": "", "been": "", "before": "", "being": "", "below": "", "between": "", "both": "",
    "but": "", "by": "", "can't": "", "cannot": "", "could": "", "couldn't": "", "did": "", "didn't": "", "do": "", "does": "", "doesn't": "",
    "doing": "", "don't": "", "down": "", "during": "", "each": "", "few": "", "for": "", "from": "", "further": "", "had": "", "hadn't": "",
    "has": "", "hasn't": "", "have": "", "haven't": "", "having": "", "he": "", "he'd": "", "he'll": "", "he's": "", "her": "", "here": "",
    "here's": "", "hers": "", "herself": "", "him": "", "himself": "", "his": "", "how": "", "how's": "", "i": "", "i'd": "", "i'll": "", "i'm": "",
    "i've": "", "if": "", "in": "", "into": "", "is": "", "isn't": "", "it": "", "it's": "", "its": "", "itself": "", "let's": "", "me": "", "more": "",
    "most": "", "mustn't": "", "my": "", "myself": "", "no": "", "nor": "", "not": "", "of": "", "off": "", "on": "", "once": "", "only": "", "or": "",
    "other": "", "ought": "", "our": "", "ours": "", "ourselves": "", "out": "", "over": "", "own": "", "same": "", "shan't": "", "she": "", "she'd": "",
    "she'll": "", "she's": "", "should": "", "shouldn't": "", "so": "", "some": "", "such": "", "than": "", "that": "", "that's": "", "the": "",
    "their": "", "theirs": "", "them": "", "themselves": "", "then": "", "there": "", "there's": "", "these": "", "they": "", "they'd": "", "they'll": "",
    "they're": "", "they've": "", "this": "", "those": "", "through": "", "to": "", "too": "", "under": "", "until": "", "up": "", "very": "", "was": "",
    "wasn't": "", "we": "", "we'd": "", "we'll": "", "we're": "", "we've": "", "were": "", "weren't": "", "what": "", "what's": "", "when": "",
    "when's": "", "where": "", "where's": "", "which": "", "while": "", "who": "", "who's": "", "whom": "", "why": "", "why's": "", "with": "",
    "won't": "", "would": "", "wouldn't": "", "you": "", "you'd": "", "you'll": "", "you're": "", "you've": "", "your": "", "yours": "", "yourself": "",
    "yourselves": ""
}


//show the CRUD interface | GET
router.get('/wordcloud/austin', function(req, res, next){
    //res.json({ message: 'API Initialized!'});
    var result = {}
    var counter = {}
    var ordered = []
    var words = []
    req.getConnection(function(err, conn){
        if (err) return next("Cannot Connect");
        var query = conn.query('SELECT text FROM tweets', function(err, rows){
            if(err) {
                console.log(err);
                return next("Mysql error, check your query");
            }
            //console.log(rows[0]);
            for (var i = 0; i < 600; i++){
                //console.log(rows[i]);
                //console.log(rows[i]['text'].match(/(\b[^\s]+\b)|(#[^\s]+\b)/g));
                words = rows[i]['text'].match(/(\b[^\s]+\b)|(#[^\s]+\b)|(@[^\s]+\b)/g);
                //console.log(words);
                //console.log(words.length);

                for (var j = 0; j < words.length; j++) {
                    //console.log(words[j]);
                    //console.log(counter.mostCommon());
                    if (words[j].toUpperCase() in counter) {
                        counter[words[j].toUpperCase()] += 1;
                    } else if (!(words[j].toLowerCase() in ignore)) {
                        counter[words[j].toUpperCase()] = 1;
                    }
                    //console.log(counter[words[j]]);
                    //console.log(counter['items']());
                }
            }
            var sortedWords = sortByCount(counter);
            //console.log(counter['items']());
            //mostCommon = counter.mostCommon();
            //console.log(mostCommon.length);

            for (var i = 0; i < sortedWords.length; i++) {
                //console.log(mostCommon[0]);
                ordered.push(sortedWords[i]['name']);
            }

            res.json({
            	success: true,
            	words: ordered
            });

            //res.render('user',{title:"RESTful Crud Example",data:rows});
         });
    });

});//route add customer, get n post
/*
router.post('/api/users', function(req, res, next){

    //validation
    req.assert('name','Name is required').notEmpty();
    req.assert('email','A valid email is required').isEmail();
    req.assert('password','Enter a password 6 - 20').len(6,20);

    var errors = req.validationErrors();
    if(errors){
        res.status(422).json(errors);
        return;
    }

    //get data
    var data = {
    	name: req.body.name,
        email: req.body.email,
        password: req.body.password
     };

    //inserting into mysql
    req.getConnection(function (err, conn){
        if (err) return next("Cannot Connect");
        var query = conn.query("INSERT INTO t_user set ? ", data, function(err, rows){
            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }
          	res.json({
                success: true
            });
        });
    });
});
*/
/*------------------------------------------------------
route.all is extremely useful. you can use it to do
stuffs for specific routes. for example you need to do
a validation everytime route /api/user/:user_id it hit.

remove curut2.all() if you dont want it
------------------------------------------------------*/

/*
router.all('/api/users/:user_id', function(req,res,next) {
    console.log(req.params);
    next();
});

//get data to update
router.get('/api/users/:user_id', function(req,res,next){

    var user_id = req.params.user_id;
    req.getConnection(function(err,conn){
        if (err) return next("Cannot Connect");
        var query = conn.query("SELECT * FROM t_user WHERE user_id = ? ",[user_id],function(err,rows){
            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }
            //if user not found
            if(rows.length < 1)
                return res.send("User Not found");
            res.json({
                success: true,
                user: rows
            });
        });
    });
});

router.put('/api/users/:user_id', function(req,res,next){
    var user_id = req.params.user_id;
    //validation
    req.assert('name','Name is required').notEmpty();
    req.assert('email','A valid email is required').isEmail();
    req.assert('password','Enter a password 6 - 20').len(6,20);
    var errors = req.validationErrors();
    if(errors){
        res.status(422).json(errors);
        return;
    }
    //get data
    console.log(req.body.password);
    var data = {
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
     };
    //inserting into mysql
    req.getConnection(function (err, conn){
        if (err) return next("Cannot Connect");
        var query = conn.query("UPDATE t_user set ? WHERE user_id = ? ",[data,user_id], function(err, rows){
           if(err){
                console.log(err);
                return next("Mysql error, check your query");
           }
          res.sendStatus(200);
        });
     });
});

router.delete('/api/users/:user_id', function(req,res,next){
    var user_id = req.params.user_id;
    console.log(user_id);
     req.getConnection(function (err, conn) {
        if (err) return next("Cannot Connect");
        var query = conn.query("DELETE FROM t_user  WHERE user_id = ? ",[user_id], function(err, rows){
             if(err){
                console.log(err);
                return next("Mysql error, check your query");
             }
             res.sendStatus(200);
        });
        //console.log(query.sql);
     });
});
*/
module.exports = router;
