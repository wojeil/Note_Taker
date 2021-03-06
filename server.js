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

app.post("/api/notes", function (req, res) {
    //the notes that are being inputed
    var newNotes = req.body;

    fs.readFile("db/db.json", function (err, data) {
        if (err) throw err;
        var notes = JSON.parse(data);
        req.body.id = notes.length + 1;
        //logout to see if id has been included in array
        notes.push(newNotes);
        console.log(notes);

        fs.writeFile("db/db.json", JSON.stringify(notes, null, "\t"), function (err) {
            if (err) throw err;
            return res.json(notes);
        })
    })
});
//API route for Delete through id
app.delete("/api/notes/:id", function (req, res) {
    //the chosen id:
    var chosenOne = req.params.id;
    fs.readFile("db/db.json", function (err, data) {
        if (err) throw err;
        //the Array of objects in DB
        var notes = JSON.parse(data);
        //function that will create a new array with the the selected option (index from previous array of objects)to be deleted
        var newArray = function () {
            for (var i = 0; i < notes.length; i++) {
                if (chosenOne == notes[i].id) {
                    var addedArray = notes.splice(i, 1);
                    return addedArray;
                }
                // console.log(addedArray);
                // console.log(chosenOne);
            }
        }
        //call back function for loop to activate and splice to work
        newArray();

        // console.log(notes);
        fs.writeFile("db/db.json", JSON.stringify(notes, null, "\t"), function (err) {
            if (err) throw err;

            return res.json(notes);
        })
    })
})
//will return to main page(html rout)
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

//listener:
app.listen(PORT, function () {
    console.log("it's working on PORT: " + PORT);
});

