var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Throw       = require("./models/throw"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_throws");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
    
seedDB();
// ROUTES
app.get("/", function(req, res) {
    res.render("landing");
});

// INDEX - shows all throws
app.get("/throws", function(req, res) {
    Throw.find({}, function(err, throws) {
        if (err) {
            console.log(err);
        } else {
            res.render("throws/index", {throws: throws});
        }
    });
});

// NEW - form to create new throw
app.get("/throws/new", function(req, res) {
    res.render("throws/new");
});


// CREATE - post route that redirects
app.post("/throws", function(req, res) {
    var name = req.body.name;
    var imageURL = req.body.image;
    var description = req.body.description;
    Throw.create({
        name: name,
        image: imageURL,
        description: description
    }, function(err, yoyo) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/throws");
        }
    });
});

// SHOW - shows more info about one throw
app.get("/throws/:id", function(req, res) {
    Throw.findById(req.params.id).populate("comments").exec(function(err, yoyo) {
        if (err) {
            console.log(err);
        } else {
            res.render("throws/show", {yoyo: yoyo});
        }
    });
});

// COMMENTS ROUTES
// ====================
app.get("/throws/:id/comments/new", function(req, res) {
    Throw.findById(req.params.id, function (err, yoyo) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { yoyo: yoyo });
        }
    });
});

app.post("/throws/:id/comments", function(req, res) {
    Throw.findById(req.params.id, function(err, yoyo) {
        if (err) {
            console.log(err);
            res.redirect("/throws");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                    res.redirect("/throws");
                } else {
                    yoyo.comments.push(comment._id);
                    yoyo.save();
                    console.log("comment added");
                    res.redirect("/throws/" + yoyo._id);
                }
            });
        }
    });
});

// START SERVER
app.listen(3000, function(req, res) {
    console.log("YelpThrows started");
});