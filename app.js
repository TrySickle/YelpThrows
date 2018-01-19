var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

// mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_throws");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// schema setup
var throwSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Throw = mongoose.model("Throw", throwSchema);

// image urls
// http://onedropyoyos.com/images/gallery/Thunderstorm-1.jpg
// http://onedropyoyos.com/images/gallery/dang2_solid.jpg
// http://onedropyoyos.com/images/gallery/cabal_4.jpg
// http://onedropyoyos.com/images/gallery/kuntosh_5000qv_1.jpg

// Throw.create(
//     {
//         name: "Parlay", 
//         image: "http://onedropyoyos.com/images/gallery/Thunderstorm-1.jpg",
//         description: "A throwback high walled, undersized, narrow yoyo."
//     }, function(err, yoyo) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("New yoyo");
//             console.log(yoyo);
//         }
//     });

// ROUTES
app.get("/", function(req, res) {
    res.render("home");
});

// INDEX - shows all throws
app.get("/throws", function(req, res) {
    Throw.find({}, function(err, throws) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {throws: throws});
        }
    });
});

// NEW - form to create new throw
app.get("/throws/new", function(req, res) {
    res.render("new");
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
    Throw.findById(req.params.id, function(err, yoyo) {
        if (err) {
            console.log(err);
        } else {
            res.render("show", {yoyo: yoyo});
        }
    });
});

// START SERVER
app.listen(3000, function(req, res) {
    console.log("YelpThrows started");
});