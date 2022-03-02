const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randombytes, randomBytes } = require('crypto');
const axios = require('axios')


const app = express();
app.use(bodyParser.json());
app.use(cors());


const commentsByPostID = {}


app.post("/posts/:id/comments", async(req, res) => {
    const commentID = randomBytes(4).toString('hex');

    const { content } = req.body;

    const comments = commentsByPostID[req.params.id] || [];
    comments.push({
        id : commentID,
        content
    })

    commentsByPostID[req.params.id] = comments;

    await axios.post("http://localhost:4005/events", {
        type: 'CommentCreated',
        data: {
            id: commentID,
            content,
            postId: req.params.id
        },


    });
    res.status(201).send(comments);
})


app.get("/posts/:id/comments", (req, res) => {
    res.send(commentsByPostID[req.params.id] || []);
    
})

app.post("/events", (req, res) =>{
    console.log("Event received ", req.body.type);

    res.send({});
});

app.listen(4001, () =>{
    console.log("listening on port 4001");
    

})