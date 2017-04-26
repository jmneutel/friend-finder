// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var applicants = [];

//Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "survey.html"));
});

app.post("/api/new", function(req, res) {
    var newSurvey = req.body;

    console.log(newSurvey);

    applicants.push(newSurvey);

    res.json(newSurvey);

});

app.get("/api/:applicants?", function(req, res) {
    var chosen = req.params.applicants;

    if (chosen) {
        console.log(chosen);

        for (var i = 0; i < applicants.length; i++) {
            if (chosen === applicants[i].routeName) {
                return res.json(applicants[i]);
            }
        }
        return res.json(false);
    }
    return res.json(applicants);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
