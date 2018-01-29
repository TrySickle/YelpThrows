var mongoose = require("mongoose");
var Throw = require("./models/throw");
var Comment = require("./models/comment");

var data = [
    {
        name: "Parlay",
        image: "http://onedropyoyos.com/images/gallery/Thunderstorm-1.jpg",
        description: "A narrow, undersized, high walled yoyo with those shmoove rings."
    },
    {
        name: "Cabal",
        image: "http://onedropyoyos.com/images/gallery/cabal_4.jpg",
        description: "Delrin kicks ass"
    },
    {
        name: "Dang 2",
        image: "http://onedropyoyos.com/images/gallery/dang2_solid.jpg",
        description: "Dang's evolution"
    }
];

function seedDB() {
    //Remove all throws
    Throw.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("removed throws!");
        Comment.remove({}, function (err) {
            if (err) {
                console.log(err);
            }
            console.log("removed comments!");
            //add a few throws
            data.forEach(function (seed) {
                Throw.create(seed, function (err, yoyo) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("added a throw");
                        //create a comment
                        Comment.create(
                            {
                                text: "This yoyo is great, but I wish it spin gudder",
                                author: "Homer"
                            }, function (err, comment) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    yoyo.comments.push(comment._id);
                                    yoyo.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    });
    //add a few comments
}

module.exports = seedDB;