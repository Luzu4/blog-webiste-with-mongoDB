const express = require("express");
const app = express();
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
let path = require ('path');
app.use(express.static(path.join(__dirname + '/public')));

const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://luz:1234@cluster0.zwcnyqt.mongodb.net/blogWebsiteDB", {useNewUrlParser:true});



const postSchema = mongoose.Schema({
    name: String,
    text: String
});

const Post = mongoose.model("Post", postSchema);

const home = new Post({
    name: "Home",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has " +
        "been the industry's standard dummy text ever since the 1500s, when an unknown printer took a " +
        "galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, " +
        "but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the " +
        "1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop " +
        "publishing software like Aldus PageMaker including versions of Lorem Ipsum"
});

const post1 = new Post({
    name: "Day 0",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has " +
        "been the industry's standard dummy text ever since the 1500s, when an unknown printer took a " +
        "galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, " +
        "but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the " +
        "1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop " +
        "publishing software like Aldus PageMaker including versions of Lorem Ipsum"
});

const post2 = new Post({
    name: "Day 1",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has " +
        "been the industry's standard dummy text ever since the 1500s, when an unknown printer took a " +
        "galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, " +
        "but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the " +
        "1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop " +
        "publishing software like Aldus PageMaker including versions of Lorem Ipsum"
});

const post3 = new Post({
    name: "Day 2",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has " +
        "been the industry's standard dummy text ever since the 1500s, when an unknown printer took a " +
        "galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, " +
        "but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the " +
        "1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop " +
        "publishing software like Aldus PageMaker including versions of Lorem Ipsum"
});

const defaultPosts = [post1, post2, post3];


app.get("/", function (req, res) {

    Post.find(function(err, foundPosts){
        if(foundPosts.length === 0){
            Post.insertMany(defaultPosts, function(err){
                if(err){
                    console.log("Smth went wrong with insertMany");
                }else{
                    console.log("Successfully added posts to DB");
                }
            });
        }else{
            res.render("index",{posts:foundPosts, home:home});
        }
    });

});




app.get('/posts/:id', function (req, res) {
    Post.findOne({_id: req.params.id},function(err,foundPost){
        if(err){
            console.log("couldn't find post wit this id")
        }else{
            res.render("posts", {post: foundPost});

        }
    });
});


app.get("/about", function (req, res) {
    res.render("about");
});

app.get("/contact", function (req, res) {
    res.render("contact");
});

app.get("/compose", function (req, res) {
    res.render("compose");
});

app.post("/compose", function (req, res) {
    const newPost = new Post({
        name: req.body.title,
        text: req.body.wypociny
});
    newPost.save();
    res.redirect("/");
})


const PORT = process.env.port || 3000;
app.listen(PORT, function () {
    console.log("Server Started at port " + PORT);
});
