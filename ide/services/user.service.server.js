module.exports = function(app, model) {

    var facebookConfig = {
        clientID     : 1601507116825605,
        clientSecret : "0bda5e1115a18f091396d8984f779f8d",
        callbackURL  : "http://localhost:3000/auth/facebook/callback",
        profileFields: ['id', 'name', 'email']
    };

    process.env.FACEBOOK_CLIENT_ID = facebookConfig.clientID;
    process.env.FACEBOOK_CLIENT_SECRET = facebookConfig.clientSecret;
    process.env.FACEBOOK_CALLBACK_URL = facebookConfig.callbackURL;

    var bcrypt = require("bcrypt-nodejs");
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var cookieParser = require('cookie-parser');
    var session      = require('express-session');

    app.use(session({
        secret: 'this is the secret',
        resave: true,
        saveUninitialized: true
    }));

    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser(serializeUser);
    passport.use(new LocalStrategy(localStrategy));
    passport.deserializeUser(deserializeUser);

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    app.get('/api/user/bnames', findAllBusinessNames);
    app.get('/api/user/bname/:bname', findBusinessByName);
    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/isloggedin', isloggedin);
    app.post('/api/logout', logout);
    app.post ('/api/register', register);
    app.post('/api/user', createUser);
    app.get('/api/user/:uid', findUserById);
    app.get('/api/user/:uid/branches', findAllBranchesForUser);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);
    app.get ('/api/loggedin', loggedin);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/#/user',
            failureRedirect: '/'
        }));

    function findAllBranchesForUser(req, res) {
        model
            .userModel
            .findAllBranchesForUser(req.params.uid)
            .then(function (user) {
               res.json(user.branches);
            });
    }

    function findBusinessByName(req, res) {
        model
            .userModel
            .findBusinessByName(req.params.bname)
            .then(function (bname) {
                res.json(bname);
            });
    }

    function isloggedin(req, res) {
        res.send(req.isAuthenticated());
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        model
            .userModel
            .findUserByFacebookId(profile.id)
            .then(function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            facebook: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return model.userModel.createUser(newUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                })
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                });
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    function register (req, res) {
        var user = req.body;
        model
            .userModel
            .findUserByUsername(user.username)
            .then(function (nuser) {
                if(nuser != null){
                    res.status(400).send('user already exists');
                }else{
                    user.password = bcrypt.hashSync(user.password);
                    model
                        .userModel
                        .createUser(user)
                        .then(function(user){
                            if(user){
                                req.login(user, function(err) {
                                    if(err) {
                                        res.status(400).send(err);
                                    } else {
                                        res.json(user);
                                    }
                                });
                            }
                        });
                }
            });
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function localStrategy(username, password, done) {
        model
            .userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function deleteUser(req, res) {
        model
            .userModel
            .deleteUser(req.params.uid)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function updateUser(req, res) {
        var user = req.body;
        model
            .userModel
            .updateUser(req.params.uid, user)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function createUser(req, res) {
        var user = req.body;
        model
            .userModel
            .createUser(user)
            .then(
                function(newUser) {
                    res.send(newUser);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        model
            .userModel
            .findUserByUsername(username)
            .then(function (users) {
                    if(users) {
                        res.json(users[0]);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function findUserById(req, res) {
        model
            .userModel
            .findUserById(req.params.uid)
            .then(
                function (user) {
                    if(user) {
                        res.send(user);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function findAllBusinessNames(req, res) {
        model
            .userModel
            .findAllBusinessNames()
            .then(function (users) {
                if(users){
                    res.send(users);
                } else {
                    res.send('0');
                }
            });
    }
};