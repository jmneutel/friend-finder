// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendData = require("../data/friends.js");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function(req, res) {
        res.json(friendData);
    });


    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function(req, res) {

        var potentialFriend = req.body;
        var overallDiff = [];
        var potentialMatches = [];
        // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        // It will do this by sending out the value "true" have a table
        if (friendData.length >= 1) {
            
            friendData.forEach(function(friend) {
               
                var difference = 0;

                var differenceTemp = parseInt(friend.total) - parseInt(potentialFriend.total);
                
                difference = difference + Math.abs(differenceTemp);

                overallDiff.push(difference);

            });

            var minDiff = Math.min.apply(Math, overallDiff);
            
            for (var i = 0; i < overallDiff.length; i++) {
                
                if (overallDiff[i] === minDiff) {
                 
                    potentialMatches.push(friendData[i]);
                }
            }

            res.json(potentialMatches);

        }

        friendData.push(potentialFriend);

    });
};
