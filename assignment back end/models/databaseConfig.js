// Name: Wong En Ting Kelyn
// Admission no.: P1935800
// Class: DIT/1B/01

var mysql = require('mysql');

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "snapsell",
    dateStrings: true
});
        
conn.connect(function(err){
    if(err){
        console.error("Error connecting: " + err.stack)
        return;
    }
    console.log("Connected as id " + conn.threadId)
})

module.exports = conn