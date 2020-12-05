// Name: Wong En Ting Kelyn
// Admission no.: P1935800
// Class: DIT/1B/01

var db = require('./databaseConfig.js');
const bcrypt = require('bcryptjs');

const saltRounds = 10;

var userDB = {
    login: function(username, password, callback) {
        const query = "SELECT * FROM user WHERE username = ? LIMIT 1";

        db.query(query, [username], (error, results) => {
            if (error) {
                console.log(error);
                
                callback(error, null);
                return;
            }
            if (results.length === 0) {
                callback(null, null);
                return;
            }
            const user = results[0];
            bcrypt.compare(password, user.password, (error, compareResult) => {
                if (error) {
                    callback(error, null);
                    return;
                }
                if (!compareResult) {
                    callback(null, null);
                    return;
                }
                callback(null, user);
            });
        });
    },

    addUser: function(username, profile_pic_url, password, callback) {
        const insertUserQuery =
        `
        INSERT INTO user (username, profile_pic_url, password)
        VALUES (?, ?, ?);
        `;
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
              db.query(
                insertUserQuery,
                [username, profile_pic_url, hash],
                (error, results) => {
                if (error) {
                  callback(error, null);
                  return;
                }else{}
                callback(null, results);
              });
            });
        });
    },  

    getUserName : function (id, callback) {
        var sql = 'select * from user where id=?';
        db.query(sql, [id], function(err,result){
            if(err){
                console.log(err);
                return callback(err,null);
            }else{
                return callback(null,result);
            }
        });
    },

    updateUserProfile : function (username, profile_pic_url, id, callback) {
        var sql = 'update user set username=?, profile_pic_url=? where id=?';
        db.query(sql, [username, profile_pic_url, id], function(err,result){
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