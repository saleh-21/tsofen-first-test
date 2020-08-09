const express = require('express')
const app = express()


var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(express.static('public'))

const url = "mongodb+srv://saleh:saleh1996@cluster0.kpqta.mongodb.net/test1";


const mongoose = require('mongoose');
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const User = mongoose.model('User', {
    image: String,
    name: String,
    posts: [String]
});

const user = new User({
    image: "https://c402277.ssl.cf1.rackcdn.com/photos/18435/images/hero_small/Medium_WW267491.jpg?1578425217",
    name: "Saleh"
});

// user.save().then(console.log("penguin has been added"))

app.get('/login', (req, res) => {
    User.find({}).then(docs => {
        // console.log(docs)
        res.send({ user: docs })
    })
})

app.post('/homePage', (req, res) => {
    User.find({}).then(docs => {
        console.log("sending homepage")
        console.log(docs)
        res.send({ user: docs })
    })

})


app.post('/newpost', (req, res) => {

    const { text } = req.body
    console.log(text)
    User.updateOne(
        { _id: "5f2f97bfe4a6573948a7e596" },
        { $push: { posts: text } }
    ).then(console.log("post added"))
        .then(
            User.find({}).then(docs => {
                console.log("sending homepage")
                console.log(docs)
                res.send({ user: docs })
            }))

})





app.listen(3000, () => { console.log("App is Listening to 3000") })