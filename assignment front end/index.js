// Name: Wong En Ting Kelyn
// Admission no.: P1935800
// Class: DIT/1B/01

const express = require("express");
const app = express();
const fs = require('fs')

app.get("/login.html/", (req, res) => {
  res.sendFile("/public/login.html", { root: __dirname });
});

app.get("/signUp.html/", (req, res) => {
  res.sendFile("/public/signUp.html", { root: __dirname });
});

app.get("/home.html/", (req, res) => {
  res.sendFile("/public/home.html", { root: __dirname });
});

app.get("/updateListing.html/", (req, res) => {
  res.sendFile("/public/updateListing.html", { root: __dirname });
});

app.get("/search.html/", (req, res) => {
  res.sendFile("/public/search.html", { root: __dirname });
});

app.get("/makeOffer.html/", (req, res) => {
  res.sendFile("/public/makeOffer.html", { root: __dirname });
});

app.get("/postListing.html/", (req, res) => {
  res.sendFile("/public/postListing.html", { root: __dirname });
});

app.get("/profile.html/", (req, res) => {
  res.sendFile("/public/profile.html", { root: __dirname });
});

app.get(`/images/:imageFile`,function(req,res){
    var imageFile = req.params.imageFile;
    let img = fs.readFileSync("./images/"+imageFile);
    res.contentType('jpg')
    res.sendFile("./images/"+imageFile,{root:__dirname});
})


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Client server has started listening on port ${PORT}`);
});