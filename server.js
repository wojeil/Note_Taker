const express = require("express");
const fs = require("fs");


const app = express();
const PORT = 3000;

let server =http.createServer(handleRequest);

//placing the requests

function

//fs read index html
function displayIndex(res){
fs.readFile(__dirname+"/index.html",function(err, data) {
    if (err) throw err;
    // We then respond to the client with the HTML page by specifically telling the browser that we are delivering
    // an html file.
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
}
function displayNotes(res){
    fs.readFile(__dirname+"/notes.html",function(err, data) {
        if (err) throw err;
        // We then respond to the client with the HTML page by specifically telling the browser that we are delivering
        // an html file.
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
    }

//routes

app.get("/notes", function(req, res) {
    res.send()
})

//listener:
app.listen(PORT, function(){
    console.log("it's working on PORT: "+PORT);
});