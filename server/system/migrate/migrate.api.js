const express = require('express');
const migrate = express.Router();

const USER_COLLECTION =            "users";
const RELATIONSHIPS_COLLECTION =   "relationships";
const COMMENT_COLLECTION =         "comments";
const POST_COLLECTION =            "posts";
const COMPANY_COLLECTION =         "companies";
const SECTOR_COLLECTION =          "sectors";
const INDUSTRY_COLLECTION =        "industries";

var ObjectID = require('mongodb').ObjectID;

var request = require('request');
var cheerio = require('cheerio');


function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

////////////////////////////////////////////////////////////////////////////////
//Get user list
migrate.get("/users", function(req, res) {
    const query = {
        text: 'SELECT * FROM users'
    }

    pgClient.query(query, (err, res) => {
        if (err) {
            console.log(err.stack)
        } else {
            db.collection(USER_COLLECTION).insertMany(res.rows, function(err, doc) {
                if (err) {

                    handleError(res, err.message, "Failed to create new security.");
                } else {
                }
            });
        }
    })
});

////////////////////////////////////////////////////////////////////////////////
//Get relationships
migrate.get("/relationships", function(req, res) {
    const query = {
        text: 'SELECT * FROM relationships'
    }

    pgClient.query(query, (err, res) => {
        if (err) {
            console.log(err.stack)
        } else {
            db.collection(RELATIONSHIPS_COLLECTION).insertMany(res.rows, function(err, doc) {
                if (err) {

                    handleError(res, err.message, "Failed to create new security.");
                } else {
                }
            });
        }
    })
});

////////////////////////////////////////////////////////////////////////////////
//Get comments
migrate.get("/comments", function(req, res) {
    const query = {
        text: 'SELECT * FROM comments'
    }

    pgClient.query(query, (err, res) => {
        if (err) {
            console.log(err.stack)
        } else {
            db.collection(COMMENT_COLLECTION).insertMany(res.rows, function(err, doc) {
                if (err) {

                    handleError(res, err.message, "Failed to create new security.");
                } else {
                }
            });
        }
    })
});

////////////////////////////////////////////////////////////////////////////////
//Get posts
migrate.get("/posts", function(req, res) {
    const query = {
        text: 'SELECT * FROM post_roots'
    }

    pgClient.query(query, (err, res) => {
        if (err) {
            console.log(err.stack)
        } else {
            db.collection(POST_COLLECTION).insertMany(res.rows, function(err, doc) {
                if (err) {

                    handleError(res, err.message, "Failed to create new security.");
                } else {
                }
            });
        }
    })
});

////////////////////////////////////////////////////////////////////////////////
//Get posts
migrate.get("/companies", function(req, res) {
    const query = {
        text: 'SELECT * FROM companies'
    }

    pgClient.query(query, (err, res) => {
        if (err) {
            console.log(err.stack)
        } else {
            db.collection(COMPANY_COLLECTION).insertMany(res.rows, function(err, doc) {
                if (err) {

                    handleError(res, err.message, "Failed to create new security.");
                } else {
                }
            });
        }
    })
});

////////////////////////////////////////////////////////////////////////////////
//Get posts
migrate.get("/sectors", function(req, res) {
    
    const query = {
        text: 'SELECT * FROM sectors'
    }

    pgClient.query(query, (err, res) => {
        if (err) {
            console.log(err.stack)
        } else {
            db.collection(SECTOR_COLLECTION).insertMany(res.rows, function(err, doc) {
                if (err) {

                    handleError(res, err.message, "Failed to create new security.");
                } else {
                }
            });
        }
    })
});

////////////////////////////////////////////////////////////////////////////////
//Get posts
migrate.get("/industries", function(req, res) {
    const query = {
        text: 'SELECT * FROM industries'
    }

    pgClient.query(query, (err, res) => {
        if (err) {
            console.log(err.stack)
        } else {
            db.collection(INDUSTRY_COLLECTION).insertMany(res.rows, function(err, doc) {
                if (err) {

                    handleError(res, err.message, "Failed to create new security.");
                } else {
                }
            });
        }
    })
});


////////////////////////////////////////////////////////////////////////////////
//Get user info
migrate.get("/user-info", function(req, res) {
    var stream = db.collection(USER_COLLECTION).find().stream();

    var users = [];

    stream.on('data', function(doc) {
        console.log(doc);
        users.push(doc);
    });
    stream.on('error', function(err) {
        console.log(err);
    });
    stream.on('end', function() {
        console.log('All done!');
        getUserInfo(users,0);
    });
});

getUserInfo = function(users,i){
    if(i < users.length){
        var URL = 'http://www.nvest.me/' + users[i].username + '.json';
        req = request.defaults({jar: true,rejectUnauthorized: false,followAllRedirects: true});
        req.get({url: URL,headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36',
                'Cookie':'_gat=1; _ga=GA1.2.1126303594.1501302688; _gid=GA1.2.655537830.1502164880; nvest_session=dFB5aEZndHpuR1puSVdBTVdISDBlUUZkb0U5NS9Ob1BMamlRN29tK0thK1JaQWlsOFQvZjdWUFQ2b1BSbGNaWU1rOEo5dG9KbkQ4cWMwZmFVQjJidXdMSnVTSXl2VWJvNkhZbzRQeXBxdUZnZElGWmFmT1VDMGZMU05zNWNMYVQycjV3N25BQ3FyQVBKWFVHYnNkQk13PT0tLXpYSmN1b2c3S3JEVVVQeWUzcmZIa1E9PQ%3D%3D--0d7205cd5c8c8251e3e23e2eb200a4a345fbe831'
            }
        },  function (error, response, body) {
            body = JSON.parse(body);
            db.collection(USER_COLLECTION).updateOne({username:users[i].username},body, function(err, doc) {
                if (err) {
                    console.log(err);
                } else {
                    i++;
                    console.log(i);
                    getUserInfo(users,i);
                }
            });

        });
    }
}


////////////////////////////////////////////////////////////////////////////////
//Get closed posts
migrate.get("/user-closed-posts", function(req, res) {
    var stream = db.collection(USER_COLLECTION).find().stream();

    var users = [];

    stream.on('data', function(doc) {
        console.log(doc);
        users.push(doc);
    });
    stream.on('error', function(err) {
        console.log(err);
    });
    stream.on('end', function() {
        console.log('All done!');
        getUserClosedPost(users,0);
    });
});

getUserClosedPost = function(users,i){
    if(i < users.length){var URL = 'http://www.nvest.me/' + users[i].username + '/closed_posts.json';
        req = request.defaults({jar: true,rejectUnauthorized: false,followAllRedirects: true});
        req.get({url: URL,headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36',
                'Cookie':'_gat=1; _ga=GA1.2.1126303594.1501302688; _gid=GA1.2.655537830.1502164880; nvest_session=dFB5aEZndHpuR1puSVdBTVdISDBlUUZkb0U5NS9Ob1BMamlRN29tK0thK1JaQWlsOFQvZjdWUFQ2b1BSbGNaWU1rOEo5dG9KbkQ4cWMwZmFVQjJidXdMSnVTSXl2VWJvNkhZbzRQeXBxdUZnZElGWmFmT1VDMGZMU05zNWNMYVQycjV3N25BQ3FyQVBKWFVHYnNkQk13PT0tLXpYSmN1b2c3S3JEVVVQeWUzcmZIa1E9PQ%3D%3D--0d7205cd5c8c8251e3e23e2eb200a4a345fbe831'
            }
        },  function (error, response, body) {
            
            body.forEach(post => {
                post.status = "closed";
            });
            
            if(body.length > 0){
                db.collection(POST_COLLECTION).insertMany(body, function(err, doc) {
                    if (err) {
                        handleError(res, err.message, "Failed to create new security.");
                    } else {
                        i++;
                        getUserClosedPost(users,i);
                    }
                });

            }else{
                i++;
                getUserClosedPost(users,i);
            } 
        });
    }
}

////////////////////////////////////////////////////////////////////////////////
//Get opne posts(holdings)
migrate.get("/user-holdings", function(req, res) {
    var stream = db.collection(USER_COLLECTION).find().stream();

    var users = [];

    stream.on('data', function(doc) {
        users.push(doc);
    });
    stream.on('error', function(err) {
        console.log(err);
    });
    stream.on('end', function() {
        console.log('All done!');
        getUserHoldings(users,0);
    });
});

getUserHoldings = function(users,i){
    if(i < users.length){
        var j = 1;
        getUserHoldingsPaginated(users,users[i],j,i);
    }
}

getUserHoldingsPaginated = function(users,user,j,i){
    var URL = 'http://www.nvest.me/' + user.username + '/holdings/' + j +'.json';
    req = request.defaults({jar: true,rejectUnauthorized: false,followAllRedirects: true});
    req.get({url: URL,headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36',
            'Cookie':'_gat=1; _ga=GA1.2.1126303594.1501302688; _gid=GA1.2.655537830.1502164880; nvest_session=dFB5aEZndHpuR1puSVdBTVdISDBlUUZkb0U5NS9Ob1BMamlRN29tK0thK1JaQWlsOFQvZjdWUFQ2b1BSbGNaWU1rOEo5dG9KbkQ4cWMwZmFVQjJidXdMSnVTSXl2VWJvNkhZbzRQeXBxdUZnZElGWmFmT1VDMGZMU05zNWNMYVQycjV3N25BQ3FyQVBKWFVHYnNkQk13PT0tLXpYSmN1b2c3S3JEVVVQeWUzcmZIa1E9PQ%3D%3D--0d7205cd5c8c8251e3e23e2eb200a4a345fbe831'
        }
    },  function (error, response, body) {
        
        body = JSON.parse(body);
        if(body.length > 0){
            body.forEach(post => {
                post.status = "open";
            });
            db.collection(POST_COLLECTION).insertMany(body, function(err, doc) {
                if (err) {
                    handleError(res, err.message, "Failed to create new security.");
                } else {
                    j++;
                    console.log(j);
                    getUserHoldingsPaginated(users,user,j,i);
                }
            });

        }else{
            i++;
            console.log(i);
            getUserClosedPost(users,i);
        } 
    });

}


module.exports = migrate;