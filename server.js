const express = require("express");
const path = require("path");
const fs = require("fs");


const app = express();
const PORT = process.env.PORT || 8000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));






//will access the page where the notes are located(html route)
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});
//will read the db and put the object within in your notes page.(api route)
app.get("/api/notes", function (req, res) {
    fs.readFile("db/db.json", function (err, data) {
        if (err) throw err;
      res.json(JSON.parse(data));
    });
})

//(api route)  Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.


//will return to main page(html rout)
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

//listener:
app.listen(PORT, function () {
    console.log("it's working on PORT: " + PORT);
});

