var express = require('express');
var router = express.Router();
var collections = require('pycollections');

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
    "IS": "", "BY": "", "IN": "", "TO": "", "A": "", "AT": "", "FOR": "", "THE": "", "AND": "", "OF": "",
    "OUR": "", "ON": "", "I": "", "YOU": "", "THIS": "", "BE": "", "I'M": "", "ST": "", "YOU": "", "OUT": "", 
    "IF": "", "I'LL": "", "IT": "", "SO": "", "AN": "", "WE": "", "ME": "", "HOW": "", "NOW": "", "MY": "",
    "IT'S": "", "HIS": "", "WAS": "", "BUT": "", "THAT": "", "WITH": ""
}

//show the CRUD interface | GET
router.get('/wordcloud/austin', function(req, res, next){
    //res.json({ message: 'API Initialized!'});
    var result = {}
    var counter = {}
    var ordered = []
    req.getConnection(function(err, conn){
        if (err) return next("Cannot Connect");
        var query = conn.query('SELECT text FROM tweets', function(err, rows, fields){
            if(err) {
                console.log(err);
                return next("Mysql error, check your query");
            }
            //console.log(rows[0]);
            for (var i = 0; i < rows.length; i++){
                //console.log(rows[i]);
                //console.log(rows[i]['text'].match(/(\b[^\s]+\b)/g));
                var words = rows[i]['text'].match(/(\b[^\s]+\b)|(#[^\s]+\b)/g);
                //console.log(words.length);
                
                for (var j = 0; j < words.length; j++) {
                    //console.log(words[j]);
                    //console.log(counter.mostCommon());
                    if (words[j].toUpperCase() in counter) {
                        counter[words[j].toUpperCase()] += 1;
                    } else if (!(words[j].toUpperCase() in ignore)) {
                        counter[words[j].toUpperCase()] = 1;
                    }
                    //console.log(counter[words[j]]);
                    //console.log(counter['items']());
                }
            }
            var sortedWords = sortByCount(counter);
            console.log(sortedWords);
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