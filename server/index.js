const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/User');
const ArticleModel = require('./models/Article');

const app = express();
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGODB_URL)

app.post('/register', async (req, res) => {
    try {
        const user = await UserModel.create(req.body)
        res.json(user);
    } catch (err) {
        res.json(err)
    }

})

app.post('/login', async (req, res) => {

    const { email, password } = req.body
    const user = await UserModel.findOne({ email: email })
    if (user) {
        if (user.password == password) {
            res.json(user)
        } else {
            res.json("Incorrect password")
        }
    } else {
        res.json("No records found")
    }
})

app.post('/articles', async (req, res) => {
    try {
        if (!req.body.title || !req.body.minutesReading || !req.body.article || !req.body.topic || !req.body.languageLevel) {
            return res.status(400).send({ message: "Send all required fields: title, minutes of reading, article itself, topic of article and language level" })
        }
        const newArticle = {
            title: req.body.title,
            minutesReading: req.body.minutesReading,
            image: req.body.image,
            article: req.body.article,
            languageLevel: req.body.languageLevel,
            topic: req.body.topic,
        }
        const result = await ArticleModel.create(newArticle)
        return res.json(result)
    } catch (err) {
        res.json(err)
    }
})

app.get('/articles', async (req, res) => {
    try {
        const articles = await ArticleModel.find({})
        return res.status(200).json({
            articles: articles.length,
            data: articles
        })
    } catch (err) {
        res.json(err)
    }
})

app.get('/articles/:id', async (req, res) => {
    try {
        const { id } = req.params
        const article = await ArticleModel.findById(id)
        return res.status(200).json(article)
    } catch (err) {
        res.json(err)
    }
})

app.get('/users', async (req, res) => {
    try {
        const user = await UserModel.find({})
        res.json(user)
    } catch (err) {
        res.json(err)
    }


})

app.listen(process.env.PORT, (req, res) => {
    console.log("Server listening on");
})
