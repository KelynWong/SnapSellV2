// Name: Wong En Ting Kelyn
// Admission no.: P1935800
// Class: DIT/1B/01

var db = require('./databaseConfig.js');

var userDB = {
    getListingByUserId : function (id, callback) {
        var sql = 'select * from listing where fk_poster_id=?';
        db.query(sql, [id], function(err,result){
            if(err){
                console.log(err);
                return callback(err,null);
            }else{
                return callback(null,result);
            }
        });
    },

    getListingById : function (id, callback) {
        var sql = 'select * from listing where id=?';
        db.query(sql, [id], function(err,result){
            if(err){
                console.log(err);
                return callback(err,null);
            }else{
                return callback(null,result);
            }
        });
    },

    putListing : function (id, title, description, price, listing_pic_url, callback) {
        var sql = 'UPDATE listing SET title=?, description=?, price=?, listing_pic_url=? WHERE id = ?';
        db.query(sql, [ title, description, price, listing_pic_url, id], function(err,result){
            if(err){
                console.log(err);
                return callback(err,null);
            }else{
                return callback(null,result);
            }
        });
    },

    deleteListing : function (listing_id, callback) {
        var sql = 'delete from listing where id=?';
        db.query(sql, [listing_id], function(err,result){
            if(err){
                console.log(err);
                return callback(err,null);
            }else{
                return callback(null,result);
            }
        });
    },

    postUserListing : function (title, description, price, listing_pic_url, user_id, callback) {
        var sql = 'insert into listing (title, description, price, fk_poster_id, listing_pic_url) values (?,?,?,?,?)';
        db.query(sql, [title, description, price,user_id, listing_pic_url], function(err,result){
            if(err){
                console.log(err);
                return callback(err,null);
            }else{
                return callback(null,result);
            }
        });
    },

    getAllListingsExceptUser : function (id, callback) {
        var sql = 'select * from listing where fk_poster_id !=?';
        db.query(sql, id, function(err,result){        
            if(err){
                console.log(err);
                return callback(err,null);
            }else{
                return callback(null,result);
            }
        });
    },
    
    getListingByTitle : function (id, title, callback) {
        var sql = `select * from listing where title like "%${title}%" AND fk_poster_id NOT IN (${id})`;
        db.query(sql, function(err,result){
            if(err){
                console.log(err);
                return callback(err,null);
            }else{
                return callback(null,result);
            }
        });
    },
}

module.exports = userDB