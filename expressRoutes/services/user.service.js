var config = require('./config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var path = require('path');
var crypto = require('crypto');
var mongo = require('mongoskin');
var nodemailer = require('nodemailer');
var connectionString = process.env.DbUrl || config.connectionString;
var db = mongo.db(connectionString, { native_parser: true });
db.bind('users');
db.bind('plans');
db.bind('subscriptions');
db.bind('asset');
db.bind('stock');
var service = {};
hbs = require('nodemailer-express-handlebars'),
senderemail = process.env.MAILER_EMAIL_ID,
pass = process.env.MAILER_PASSWORD;

var smtpTransport = nodemailer.createTransport({
service: process.env.MAILER_SERVICE_PROVIDER,
auth: {
  user: senderemail,
  pass: pass
}
});

var handlebarsOptions = {
viewEngine: 'handlebars',
viewPath: path.resolve('./expressRoutes/services/templates/'),
extName: '.html'
};

smtpTransport.use('compile', hbs(handlebarsOptions));

service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;
service.forgotpassword = forgotpassword;
service.resetpassword = reset_password;
service.addPlan = addPlan;
service.updatePlan = updatePlan;
service.getAllPlans = getAllPlans;
service.addSubscription = addSubscription;
service.getAllSubscriptions = getAllSubscriptions;
service.getByIdSub = getByIdSub;
service.updateSubscription = updateSubscription;
service.deleteSubscription = deleteSubscription;
service.addAsset= addAsset;
service.updateAsset = updateAsset;
service.getAllAsset = getAllAsset;
service.getCurrentAssetVal = getCurrentAssetVal;
service.getAllUnVerified = getAllUnVerified;
service.addStock= addStock;
service.updateStock = updateStock;
service.getAllStock = getAllStock;
service.deleteStock = deleteStock;

module.exports = service;

function authenticate(email, password) {
    var deferred = Q.defer();
    var secret = process.env.Secret || config.secret;
    db.users.findOne({ email: email }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            deferred.resolve({
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                isAdmin: user.isAdmin,
                isApproved: user.isApproved,
                token: jwt.sign({ sub: user._id }, secret)
            });
        } else {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getAll() {
 var deferred = Q.defer();

    db.users.find().toArray(function (err, users) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return users (without hashed passwords)
        users = _.map(users, function (user) {
            return _.omit(user, 'hash');
        });

        deferred.resolve(users);
    });

    return deferred.promise;

}

function getAllUnVerified() {
    var deferred = Q.defer();
   
       db.users.find({ isApproved:false }).toArray(function (err, users) {
           if (err) deferred.reject(err.name + ': ' + err.message);
   
           // return users (without hashed passwords)
           users = _.map(users, function (user) {
               return _.omit(user, 'hash');
           });
   
           deferred.resolve(users);
       });
   
       return deferred.promise;
   
   }

function getById(_id) {
    var deferred = Q.defer();

    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}
function getByIdSub(_id) {
    var deferred = Q.defer();

    db.subscriptions.find({ userid: _id }).toArray(function (err, subs){
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (subs) {
            
            deferred.resolve(subs);
        } else {
            // user not found
            deferred.resolve("No Plan subscribed");
        }
    });

    return deferred.promise;
}


function create(userParam) {
    var deferred = Q.defer();
    // validation
    db.users.findOne({ $or: [ { email: userParam.email }, { phone: userParam.phone } ] },       
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
                // email already exists
                deferred.reject('email or phone number is already used.');
            } else {
                createUser();
            }
        });

    function createUser() {
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam, 'password');
        // add hashed password to user object
        user.hash = bcrypt.hashSync(userParam.password, 10);
        user.isAdmin = false;
        user.isApproved= false;
        user.isActive = true;
        user.panCard ="";   
        user.address ="";  
        db.users.insert(
            user,
            function (err, doc) {
                if (err) {
                    deferred.reject(err.name + ': ' + err.message);}

                      var data = {
                       to: user.email,
                       from: senderemail,
                       template: 'welcome-email',
                       subject: 'Welcome to Mytradnix',
                       context: {
                        
                       }
                     };       
                     smtpTransport.sendMail(data, function(err,info) {
                       if (!err) {
                        deferred.resolve();
                       } else {
                         deferred.reject(err.name + ': ' + err.message);
                       }
                     });
            });
    }

    return deferred.promise;
}

function update(_id, userParam) {
    var deferred = Q.defer();

    // validation
    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user.email !== userParam.email) {
            // email has changed so check if the new email is already taken
            db.users.findOne(
                { email: userParam.email },
                function (err, user) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (user) {
                        // email already exists
                        deferred.reject('email "' + req.body.email + '" is already taken')
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        }
    });

    function updateUser() {
        // fields to update
        var set = {
            panCard: userParam.panCard,
            address: userParam.address,
            isApproved: userParam.isApproved,
        };

        // update password if it was entered
        if (userParam.password) {
            set.hash = bcrypt.hashSync(userParam.password, 10);
        }

        db.users.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.users.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

function forgotpassword(email) {
  var deferred = Q.defer();

  // validation
   db.users.findOne( { email: email } , function (err, user) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      if (user) { 
      crypto.randomBytes(20, function(err, buffer) {
        var token = buffer.toString('hex');
        setTokenToUser(user,token);
      });
    }
    else{
      deferred.reject('This email is not registered with us');
    }
  });

  function setTokenToUser(user,token) {

    var set = {
      reset_password_token: token,
      reset_password_expires:  Date.now() + 86400000
  };

    db.users.update(
      { _id: mongo.helper.toObjectID( user._id ) },
      { $set: set }
      ,function (err, new_user) {
          if (err) deferred.reject(err.name + ': ' + err.message);

          if(new_user){
            var data = {
             to: email,
             from: senderemail,
             template: 'forgot-password-email',
             subject: 'MyTradnix- Reset Password',
             context: {
               url: 'http://www.mytradnix.com/resetpassword?token=' + token,
               name: new_user.firstname
             }
           };
     
           smtpTransport.sendMail(data, function(err,info) {
             if (!err) {
              deferred.resolve();
             } else {
               deferred.reject(err.name + ': ' + err.message);
             }
           });
            }
      });
  }
  return deferred.promise;
}

function reset_password(req,res) {
  var deferred = Q.defer();

    db.users.findOne({
      reset_password_token:req.body.token,
      reset_password_expires: {
        $gt: Date.now()
      }
    },function (err,user){
      if (err){
        deferred.reject(err.name + ': ' + err.message);
        return res.status(422).send({
          message: err.name + ': ' + err.message
        });
      } 
     
      if (user) { 
        updatePassword(user);
      }
    else{

      deferred.reject('Password reset token is invalid or has expired.');
      return res.status(422).send({
        message: "Password reset token is invalid or has expired."
      });
    }
    });

  function updatePassword(user) {
    if (req.body.password === req.body.cpassword) {
        var set = {
          hash : bcrypt.hashSync(req.body.password, 10),
          reset_password_token : undefined,
          reset_password_expires : undefined
        };
    db.users.update(
      { _id: mongo.helper.toObjectID( user._id ) },
      { $set: set }
      ,function (err, new_user) {

          if (err) deferred.reject(err.name + ': ' + err.message);

          if(new_user){
            var data = {
             to: user.email,
             from: senderemail,
             template: 'reset-password-email',
             subject: 'MyTradnix- Password Changed',
             context: {
              name: user.firstname
             }
           };
     
           smtpTransport.sendMail(data, function(err,info) {
             if (!err) {
              deferred.resolve();
             } else {
               deferred.reject(err.name + ': ' + err.message);
               return res.status(422).send({
                message: err.name + ': ' + err.message
              });
             }
           });
          }
      });
        } else {
          deferred.reject("Password do not match");
          return res.status(422).send({
            message: "Password do not match"
          });
        }
  }
  return deferred.promise;
}

function addPlan(planParam) {
    var deferred = Q.defer();
    console.log(planParam);
    // validation
    db.plans.findOne({ $or: [ { name: planParam.name }] },       
        function (err, plan) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (plan) {
                // planname already exists
                deferred.reject('plan name already exists.');
            } else {
                addNewPlan();
            }
        });

    function addNewPlan() {
        // set user object to userParam without the cleartext password
        db.plans.insert(
            planParam,
            function (err, doc) {
                if (err) {
                    deferred.reject(err.name + ': ' + err.message);
                }
                else{
                    deferred.resolve("plan added successfully!");
                }
            });
    }
    return deferred.promise;
}

function updatePlan(_id, planParam) {
    var deferred = Q.defer();

    // validation
    db.plans.findById(_id, function (err, plan) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (plan.name !== planParam.name) {
            // email has changed so check if the new email is already taken
            db.plans.findOne(
                { name: planParam.name },
                function (err, plan) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (plan) {
                        // email already exists
                        deferred.reject('planName already exists!')
                    } else {
                        updatemyPlan();
                    }
                });
        } else {
            updatemyPlan();
        }
    });

    function updatemyPlan() {
        // fields to update
        var set = {
            name: planParam.name,
            description: planParam.description
        };


        db.plans.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function getAllPlans() {
    var deferred = Q.defer();

    db.plans.find().toArray(function (err, plans) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        deferred.resolve(plans);
    });

    return deferred.promise;
}
function addSubscription(planParam) {
    var deferred = Q.defer();
    // validation
   
        // set user object to userParam without the cleartext password
        db.subscriptions.insert(
            planParam,
            function (err, doc) {
                if (err) {
                    deferred.reject(err.name + ': ' + err.message);
                }
                else{
                    deferred.resolve("Plan assigned to user successfully!");
                }
            });
    return deferred.promise;
}

function getAllSubscriptions() {
    var deferred = Q.defer();

    db.subscriptions.find().toArray(function (err, subs) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        deferred.resolve(subs);
    });

    return deferred.promise;
}

function updateSubscription(_id, subParam) {
    var deferred = Q.defer();
        // fields to update
        var set = {
            assetQuantity: subParam.assetQuantity,
            amount: subParam.amount,
            subscriptionDate: subParam.subscriptionDate
        };

        db.subscriptions.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
                deferred.resolve();
            });
    return deferred.promise;
}


function deleteSubscription(_id) {
    var deferred = Q.defer();

    db.subscriptions.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

function addAsset(assetParam) {
    var deferred = Q.defer();
    // validation
    if(assetParam.iscapital==true){
        query = {iscurrent:true, iscapital:true}
    }
    else{
        query ={iscurrent:true, isliquid:true}
    }
    var set = {
        iscurrent: false,
    };

    db.asset.update(
        query,
        { $set: set },
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);
            insertAsset();
        });

        function insertAsset(){
        // set user object to userParam without the cleartext password
        db.asset.insert(
            assetParam,
            function (err, doc) {
                if (err) {
                    deferred.reject(err.name + ': ' + err.message);
                }
                else{
                    deferred.resolve("Asset added successfully!");
                }
            });
            }

    return deferred.promise;
}

function updateAsset(_id, assetParam) {
    var deferred = Q.defer();

        // fields to update
        var set = {
            quantity: assetParam.quantity,
            date: assetParam.date
        };

        db.asset.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
                deferred.resolve();
            });
    return deferred.promise;
}

function getAllAsset() {
    var deferred = Q.defer();

    db.asset.find().toArray(function (err, asset) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        deferred.resolve(asset);
    });

    return deferred.promise;
}
function getCurrentAssetVal() {
    var deferred = Q.defer();

    db.asset.find({iscurrent:true}).toArray(function (err, asset) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        deferred.resolve(asset);
    });

    return deferred.promise;
}

function addStock(stockParam) {
    var deferred = Q.defer();
    // validation
        db.stock.insert(
            stockParam,
            function (err, doc) {
                if (err) {
                    deferred.reject(err.name + ': ' + err.message);
                }
                else{
                    deferred.resolve("Stock added successfully!");
                }
            });      
                return deferred.promise;
    }

    function updateStock(_id, stockParam) {
        var deferred = Q.defer();
            // fields to update
            var set = {
                quantity: stockParam.quantity,
                price: stockParam.price,
                date: stockParam.date
            };
    
            db.stock.update(
                { _id: mongo.helper.toObjectID(_id) },
                { $set: set },
                function (err, doc) {
                    if (err) deferred.reject(err.name + ': ' + err.message);
                    deferred.resolve();
                });
        return deferred.promise;
    }
    
    function getAllStock() {
        var deferred = Q.defer();
    
        db.stock.find().toArray(function (err, stock) {
            if (err) deferred.reject(err.name + ': ' + err.message);
            deferred.resolve(stock);
        });
    
        return deferred.promise;
    }

    function deleteStock(_id) {
        var deferred = Q.defer();
    
        db.stock.remove(
            { _id: mongo.helper.toObjectID(_id) },
            function (err) {
                if (err) deferred.reject(err.name + ': ' + err.message);
    
                deferred.resolve();
            });
    
        return deferred.promise;
    }

