// Name: Wong En Ting Kelyn
// Admission no.: P1935800
// Class: DIT/1B/01

const app = require("./controller/app.js");

const PORT = 8081;
app.listen(PORT, function(){
    console.log('Web App Hosted at http://localhost:%s',PORT)
})