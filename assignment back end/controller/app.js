// Name: Wong En Ting Kelyn
// Admission no.: P1935800
// Class: DIT/1B/01

var express = require('express');
var app = express();
const fs = require('fs')

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(urlencodedParser);
app.use(bodyParser.json());

const cors = require('cors')
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

var user = require('../models/user.js');
var listing = require('../models/listing.js');
var offers = require('../models/offers.js');
var likes = require('../models/likes.js');

var isLoggedInMiddleWare = require("../isLoggedInMiddleWare")
const jwt = require("jsonwebtoken");
const JWT_SECRET = "dumPotato";

//login.html
//LOGIN
app.post("/login/", (req, res) => {
    user.login(
        req.body.username,
        req.body.password,
        (error, user) => {
            if (error) {
                next(error);
                return;
            }
            if (user === null) {
                res.status(401).send();
                return;
            }
            const payload = { user_id: user.id };
            jwt.sign(payload, JWT_SECRET, { algorithm: "HS256" }, (error, token) => {
                if (error) {
                    console.log(error);
                    res.status(401).send();
                    return;
                }
                res.status(200).send({
                    token: token,
                    user_id: user.id
                });
            })
        });
});

//signUp.html
//Sign up
app.post('/users/', function (req, res) {
    var username = req.body.username;
    var pic = req.body.pic;
    var password = req.body.password;

    user.addUser(username, pic, password, function (err, result) {
        if (!err) {
            res.status(200).send("{\"UserID\":\"" + result.insertId + "\"}");
        } else if (err.code === "ER_DUP_ENTRY") {
            res.status(422).send("{\"Message\":\"Duplicate entry\"}");
        } else {
            res.status(500).send("{\"Message\":\"Some error occurred\"}");
        }
    });
});

//home.html
//Get logged in user's listings
app.get('/users/:user_id/listings/', function (req, res) {
    var id = req.params.user_id;
    listing.getListingByUserId(id, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500).send("{\"Message\":\"Some error occurred\"}");
        }
    })
});

//home.html
//get amount of likes for listings
app.get('/user/:listing_id/listings/', function (req, res) {
    var id = req.params.listing_id;
    likes.getAmountOfListingLikes(id, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500).send("{\"Message\":\"Some error occurred\"}");
        }
    })
});

//home.html
//Get offers from other users for logged in user listings
app.get('/user/listings/:listing_id/offers', function (req, res) {
    var listingId = req.params.listing_id;
    offers.getOffersForLoggedInUser(listingId, function (err, result) {
        if (!err) {
            res.status(200).send(result);

        } else {
            res.status(500).send("{\"Message\":\"Some error occurred\"}");
        }
    })
});

//home.html
//Get needed details of listings for offers card
app.get('/listings/:listing_id/offers/details', function (req, res) {
    var listingId = req.params.listing_id;
    offers.getDetailsForOfferedListing(listingId, function (err, result) {
        if (!err) {
            res.status(200).send(result);

        } else {
            res.status(500).send("{\"Message\":\"Some error occurred\"}");
        }
    })
});

//home.html
//Remove logged in user's listing
app.delete('/user/:id/listings/', function (req, res) {
    var id = req.params.id;

    listing.deleteListing(id, function (err, result) {
        if (!err) {
            if (result.affectedRows == 0) {
                res.status(404).send("{\"Message\":\"User or listing not found\"}")
            } else {
                res.status(204).send("{\"Message\":\"Record deleted\"}");
            }
        } else {
            res.status(500).send("{\"Message\":\"Some error occurred\"}");
        }
    });
});

//home.html
//deletes offer
app.delete('/user/:listingid/:offerorid/offer/', function (req, res) {
    var listingid = req.params.listingid;
    var offerorid = req.params.offerorid;

    offers.deleteOffer(listingid, offerorid, function (err, result) {
        if (!err) {
            res.status(201).send("{\"Affected rows\":\"" + result.affectedRows + "\"}");
        } else if (err.code === "ER_DUP_ENTRY") {
            res.status(422).send("{\"Message\":\"Duplicate entry\"}");
        } else if (err.code === "ER_NO_REFERENCED_ROW_2") {
            res.status(422).send("{\"Message\":\"Listing does not exist\"}");
        } else {
            res.status(500).send("{\"Message\":\"Some error occurred\"}");
        }
    })
});

//updateListing.html
//get listing details of the listing that user want to update
app.get('/listings/:listing_id/', function (req, res) {
    var id = req.params.listing_id;
    listing.getListingById(id, function (err, result) {
        if (!err) {
            if (result.length == 0) {
                res.status(404).send("{\"Message\":\"Listing not found\"}")
            } else {
                res.status(200).send(result);
            }
        } else {
            res.status(500).send("{\"Message\":\"Some error occurred\"}");
        }
    })
});

//updateListing.html
//Update user's listing
app.put('/user/update/:listing_id', function (req, res) {
    var id = req.params.listing_id;
    var title = req.body.title;
    var description = req.body.description;
    var price = req.body.price;
    var listing_pic_url = req.body.listing_pic_url;

    listing.putListing(id, title, description, price, listing_pic_url, function (err, result) {
        if (!err) {
            if (result.affectedRows == 0) {
                res.status(404).send("{\"Message\":\"Listing not found\"}")
            } else {
                res.status(204).send("{\"Affected rows\":\"" + result.affectedRows + "\"}");
            }
        } else if (err.code === "ER_DUP_ENTRY") {
            res.status(422).send("{\"Message\":\"Duplicate entry\"}");
        } else {
            res.status(500).send("{\"Message\":\"Some error occurred\"}");
        }
    });
});

//search.html
//Get all listing for all users except user that logged in listing
app.get('/:user_id/listings/', function (req, res) {
    var id = req.params.user_id;

    listing.getAllListingsExceptUser(id, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500).send("{\"Message\":\"Some error occurred\"}");
        }
    })
});

//search.html
//Get specific post when user search for title of listing
app.get('/user/:user_id/specificlistings/:title/', function (req, res) {
    var title = req.params.title;
    var id = req.params.user_id;

    listing.getListingByTitle(id, title, function (err, result) {
        if (!err) {
            if (result.length == 0) {
                res.status(404).send("{\"Message\":\"Listing not found\"}")
            } else {
                res.status(200).send(result);
            }
        } else {
            res.status(500).send("{\"Message\":\"Some error occurred\"}");
        }
    })
});

//search.html
//get the likes of the user that logged in
app.get('/user/:user_id/listings/:listing_id/likes', function (req, res) {
    var listing_id = req.params.listing_id;
    var user_id = req.params.user_id

    likes.getListingLikes(listing_id, user_id, function (err, result) {
        if (!err) {
            if (result.length == 0) {
                res.status(404).send("{\"Message\":\"Listing not found\"}")
            } else {
                res.status(200).send(result);
            }
        } else {
            res.status(500).send("{\"Message\":\"Some error occurred\"}");
        }
    })
});

//search.html
//Like other ppl's listing
app.post('/listings/:listing_id/likes/:liker_id', function (req, res) {
    var listing_id = req.params.listing_id;
    var liker_id = req.params.liker_id;

    likes.postListingLikes(liker_id, listing_id, function (err, result) {
        if (!err) {
            res.status(201).send("{\"Affected rows\":\"" + result.affectedRows + "\"}");
            // res.status(201).send("{\"UserID\":\"" + result.insertId + "\"}");
        } else if (err.code === "ER_DUP_ENTRY") {
            res.status(201).send("{\"Message\":\"Duplicate entry\"}");
        } else if (err.code === "ER_NO_REFERENCED_ROW_2") {
            res.status(422).send("{\"Message\":\"User does not exist\"}");
        } else {
            res.status(500).send("{\"Message\":\"Some error occurred\"}");
        }
    });
});

//search.html
//Unlike listing
app.delete('/likes/:likeid/', function (req, res) {
    var id = req.params.likeid

    likes.deleteListingLikes(id, function (err, result) {
        if (!err) {
            if (result.affectedRows == 0) {
                res.status(404).send("{\"Message\":\"User or listing not found\"}")
            } else {
                res.status(204).send("{\"Message\":\"Record deleted\"}");
            }
        } else {
            res.status(500).send("{\"Message\":\"Some error occurred\"}");
        }
    });
});

//makeOffer.html
//Make an offer for other ppl's listing
app.post('/users/:user_id/listings/:listing_id/offer/', function (req, res) {
    var userId = req.params.user_id;
    var listingId = req.params.listing_id
    var offer = req.body.offer;

    offers.postOffers(listingId, offer, userId, function (err, result) {
        if (!err) {
            res.status(201).send("{\"Affected rows\":\"" + result.affectedRows + "\"}");
        } else if (err.code === "ER_DUP_ENTRY") {
            res.status(422).send("{\"Message\":\"Duplicate entry\"}");
        } else if (err.code === "ER_NO_REFERENCED_ROW_2") {
            res.status(422).send("{\"Message\":\"Listing does not exist\"}");
        } else {
            res.status(500).send("{\"Message\":\"Some error occurred\"}");
        }
    })
});

//postListing.html
//post listing of user that is logged in
app.post('/user/:user_id/listings/', function (req, res) {

    var title = req.body.title;
    var description = req.body.description;
    var price = req.body.price;
    var url = req.body.listing_pic_url
    var id = req.params.user_id;

    listing.postUserListing(title, description, price, url, id, function (err, result) {
        if (!err) {
            // res.status(201).send("{\"Affected rows\":\"" + result.affectedRows + "\"}");
            // res.status(201).send("{\"UserID\":\"" + result.insertId + "\"}");
            res.status(200).send({
                title: listing.title,
                description: listing.description,
                price: listing.price,
                listing_pic_url: listing.listing_pic_url,
                listingID: listing.id
            });
        } else if (err.code === "ER_NO_REFERENCED_ROW_2") {
            console.log(err)
            res.status(404).send("{\"Message\":\"User does not exist\"}");
        } else {
            res.status(500).send("{\"Message\":\"Some error occurred\"}");
        }
    });
});

//profile.html
//Get all info from user that is logged in
app.get('/user/:user_id/', function (req, res) {
    var user_id = req.params.user_id;

    user.getUserName(user_id, function (err, result) {
        if (!err) {
            if (result.length == 0) {
                res.status(404).send("{\"Message\":\"User not found\"}")
            } else {
                res.status(200).send(result);
            }
        } else {
            res.status(500).send("{\"Message\":\"Some error occurred\"}");
        }
    })
});

//profile.html
//Update user details that is logged in
app.put('/user/:user_id/update/', function (req, res) {
    var user_id = req.params.user_id;
    var username = req.body.username;
    var profile_pic_url = req.body.profile_pic_url;

    user.updateUserProfile(username, profile_pic_url, user_id, function (err, result) {
        if (!err) {
            if (result.length == 0) {
                res.status(404).send("{\"Message\":\"User not found\"}")
            } else {
                res.status(200).send(result);
            }
        } else {
            res.status(500).send("{\"Message\":\"Some error occurred\"}");
        }
    })
});

//profile.html
//Logout
app.post('/user/:user_id/logout', function (req, res) {
    var user_id = req.params.user_id;

    user.getUserName(user_id, function (err, result) {
        if (!err) {
            if (result.length == 0) {
                res.status(404).send("{\"Message\":\"User not found\"}")
            } else {
                res.status(200).send(result);
            }
        } else {
            res.status(500).send("{\"Message\":\"Some error occurred\"}");
        }
    })
});


module.exports = app