const express = require('express')
const mongoose = require('mongoose')
const axios = require('axios')

const {PORT, HOST, db, authApiUrl} = require('./configuration')
const {connectDb} = require('./helpers/db')
const app = express();

const postSchema = new mongoose.Schema({
    title: String
})
const Post = mongoose.model('Post', postSchema)
const addPost = () => {
    const someIntresting = new Post({title: `Some post of date ${new Date()}`})
    console.log('someIntresting', someIntresting)
    someIntresting.save(function (err, some) {
        if (err) return console.error(err);
        console.log('some', some)
    });

}
const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Server api started successfully on port ${PORT} ${HOST}:${PORT}`)
        console.log(`Our db ${db}`)
    })
    addPost()
}

app.get('/', (req, res) => {
    res.send('Server api work with volumes and dev')
})
app.get('/api/posts', (req, res) => {
    Post.find(function (err, someAll) {
        if (err) return console.error(err);
        return res.send(`List posts ${someAll}`)
    });
})
app.get('/userauth', (req, res)=>{
    axios.get(authApiUrl+'/currentUser').then(response => {
        res.json({
            userAuth: true,
            currentUserFromAuth: response.data
        })
    })

})


connectDb()
    .on("error", console.log)
    .on("disconnected", connectDb)
    .once("open", startServer)








