const express = require('express')
const mongoose = require('mongoose')
const axios = require('axios')

const {PORT, HOST, db, apiUrl} = require('./configuration')
const {connectDb} = require('./helpers/db')
const app = express();

const userSchema = new mongoose.Schema({
    name: String
})
const User = mongoose.model('User', userSchema)
const addUser = () => {
    const someUser = new User({name: `Some user of date ${new Date()}`})
    console.log('someUser', someUser)
    someUser.save(function (err, some) {
        if (err) return console.error(err);
        console.log('user', some)
    });
}
const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Server auth started successfully on port ${PORT} ${HOST}:${PORT}`)
        console.log(`Our auth db ${db}`)
    })
    addUser()
}

app.get('/', (req, res) => {
    res.send('Server auth work with volumes and dev')
})
app.get('/users', (req, res) => {
    User.find(function (err, someAll) {
        if (err) return console.error(err);
        return res.send(`List users ${someAll}`)
    });
})
app.get('/api/currentUser', (req, res) => {
    res.json({
        id: '1234',
        name: 'Karl',
        email: 'karl@karl.com'
    })
})
app.get('/userPosts', (req,res)=>{
    axios.get(apiUrl+'/posts').then(response =>{
        res.json({
            user: true,
            userPost: response.data
        })
    })
})


connectDb()
    .on("error", console.log)
    .on("disconnected", connectDb)
    .once("open", startServer)








