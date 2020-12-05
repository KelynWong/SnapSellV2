// Name: Wong En Ting Kelyn
// Admission no.: P1935800
// Class: DIT/1B/01

var db = require('./databaseConfig.js');

var userDB = {
    postOffers: function (fk_listing_id, offer, fk_offeror_id, callback) {
        var sql = 'insert into offers (offer,fk_offeror_id,fk_listing_id) values (?,?,?)';
        db.query(sql, [offer, fk_offeror_id, fk_listing_id], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },

    getOffersForLoggedInUser: function (id, callback) {
        var sql = 'select l.id from listing l inner join user u on l.fk_poster_id=u.id where u.id=?;';
        db.query(sql, [id], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    },

    getDetailsForOfferedListing: function (id, callback) {
        var sql = `select u.id,u.username,l.title,o.offer from user u, offers o , listing l where l.id=${id} and u.id = o.fk_offeror_id and o.fk_listing_id=l.id ;`
        db.query(sql, function (err, result) {
            if (err) {
                return callback(err, null)
            }else {
                return callback(null,result)
            }
        })
    },

    deleteOffer: function (listing_id, offerer_id, callback) {
        var sql = `delete from offers where fk_listing_id=? and fk_offeror_id=?;`
        db.query(sql, [listing_id, offerer_id],function (err, result) {
            if (err) {
                return callback(err, null)
            }else {
                return callback(null,result)
            }
        })
    }
}

module.exports = userDB