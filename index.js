const express = require('express');
const {join, resolve} = require('path');

const {GetAll, GetOne} = require('./config/database');
const Article = require('./model/article');
const {PORT} = require('./env');
const { rejects } = require('assert');
var methodOverride = require('method-override')

const PUBLIC_PATH = join(__dirname, 'public');

const app = express();

GetAll();

app.set('view engine', 'pug');
app.set('views', join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(express.static(PUBLIC_PATH, {
    etag: true,
    cacheControl: true,
    maxAge: 8000
}));

// Pages
app.get('/', 
// (req, res, next) => {
//     console.log("Go to middeware");
//     return res.status(400).send('Dung o day')
// },
async (req, res) => {
    const articles = await Article.find();
    return res.render('pages/home.pug', {
        articles
    });
})

app.get('/articles/new', (req, res, next) => {
    return res.render('pages/newArticle.pug');
})

app.post('/articles', async (req, res) => {
    let createSuccess = true;
    const articleExisted = await Article.findOne({title: req.body.title}).exec();

    if (articleExisted) {
        return res.render('pages/home.pug');
    }

    try {
        await Article.create(req.body);
    } catch (error) {
        console.log(error);
        createSuccess = false
    }

    return createSuccess ? res.redirect('/') : res.render('pages/error.pug');
})

app.get('/:title',async(req,res)  =>{
    var data =  await GetOne(req.params.title);
    // var title = article.title;
    res.render('pages/detailArticle.pug',
    {
        data
    });
})
var _id;
app.get('/:title/update', async( req, res)=> {
    var article =  await GetOne(req.params.title);
    var title = article.title;
    _id = article._id;
    res.render('pages/update.pug',
    {
        article,title
    });
})

app.post('/:title/update', async( req, res)=> {
    var article = req.body;
    var article = await Article.updateOne({_id},req.body);
    console.log("huhu"+article.title);
    res.send("ok");
})

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
});