const express = require('express');
const developer = express.Router();
var DEVELOPER_COLLECTION = "developers";
var ObjectID = require('mongodb').ObjectID;

var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

developer.get("", function(req, res) {
  db.collection(DEVELOPER_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get developers.");
    } else {
      res.status(200).json(docs);
    }
  });
});

developer.post("", function(req, res) {
  var newdeveloper = req.body;
  newdeveloper.created_at = new Date();

  db.collection(DEVELOPER_COLLECTION).insertOne(newdeveloper, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new developer.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

developer.get("/:uid", function(req, res) {
  db.collection(DEVELOPER_COLLECTION).findOne({ uid: req.params.uid }, { password: 0}, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get developer");
    } else {
      res.status(200).json(doc);
    }
  });
});

developer.put("/initialize/:id", function(req, res) {
  var updateDoc = req.body;
  
  db.collection(DEVELOPER_COLLECTION).findOne({_id: new ObjectID(req.params.id)}, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to find developer");
    } else {
              
      bcrypt.genSalt(saltRounds, function(err, salt) {
        
        bcrypt.hash(updateDoc.password, salt, function(err, hash) {
          updateDoc.password = hash;
          updateDoc.enabled = true;
          db.collection(DEVELOPER_COLLECTION).update({_id: new ObjectID(req.params.id)}, {$set:{username:updateDoc.username,password:hash,enabled:true}}, function(err, doc) {
            if (err) {
              handleError(res, err.message, "Failed to update developer");
            } else {
              res.status(200).json(doc);
            }
          });
        });

      });
    }
  });



});
developer.put("/:_id", function(req, res) {
  var updateDoc = req.body;
        
  bcrypt.genSalt(saltRounds, function(err, salt) {

    db.collection(DEVELOPER_COLLECTION).findOne({_id: updateDoc._id}, function(err, doc) {

      if (err) {
        handleError(res, err.message, "Unable to find the developer info");
      } else {

        bcrypt.compare(updateDoc.oldPassword, updateDoc.password, function(err, res) {
            if(res === true){
              bcrypt.genSalt(saltRounds, function(err, salt) {
                  bcrypt.hash(updateDoc.password, salt, function(err, hash) {
                    updateDoc.password = hash;
                    db.collection(DEVELOPER_COLLECTION).updateOne({_id: updateDoc._id}, updateDoc, function(err, doc) {
                      if (err) {
                        handleError(res, err.message, "Failed to update developer");
                      } else {
                        res.status(200).json(updateDoc);
                      }
                    });
                  });
              });
            }else{
              console.log(err);
            }
        });
                  
      }
    });
      
  });


});
developer.put("/:_id", function(req, res) {
  var updateDoc = req.body;
        
  bcrypt.genSalt(saltRounds, function(err, salt) {

    db.collection(DEVELOPER_COLLECTION).findOne({_id: updateDoc._id}, function(err, doc) {

      if (err) {
        handleError(res, err.message, "Unable to find the developer info");
      } else {

        bcrypt.compare(updateDoc.oldPassword, updateDoc.password, function(err, res) {
            if(res === true){
              bcrypt.genSalt(saltRounds, function(err, salt) {
                  bcrypt.hash(updateDoc.password, salt, function(err, hash) {
                    updateDoc.password = hash;
                    db.collection(DEVELOPER_COLLECTION).updateOne({_id: updateDoc._id}, updateDoc, function(err, doc) {
                      if (err) {
                        handleError(res, err.message, "Failed to update developer");
                      } else {
                        res.status(200).json(updateDoc);
                      }
                    });
                  });
              });
            }else{
              console.log(err);
            }
        });
                  
      }
    });
      
  });


});

developer.delete("/:uid", function(req, res) {
  db.collection(DEVELOPER_COLLECTION).deleteOne({uid: req.params.uid}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete developer");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

module.exports = developer;