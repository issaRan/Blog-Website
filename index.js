const express = require('express')
const mongoose = require('mongoose')
const Articel = require('./models/article')
const articelsRouter = require('./routes/articles')
const method = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/blog',{useNewUrlParser: true, useUnifiedTopology:true,useCreateIndex: true})
app.set('view engine','ejs')

app.use(express.urlencoded({extends: false}))
app.use(method('_method'))

app.get('/', async (req, res) =>{
    const articles = await Articel.find().sort({createdAt: 'desc'})
    res.render('articles/index',{ articles: articles })
})
app.use('/articles',articelsRouter)
app.listen(3000)