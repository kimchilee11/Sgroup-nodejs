import express from 'express'
import { ArticleModel } from './config/database'
import Article from './model/article'
import {join} from 'path';
import api from './api/index'

const PORT = 3000
// import PORT from '../.env'
var methodOverride = require('method-override')

const PUBLIC_PATH = join(__dirname, 'public');

const app = express();

ArticleModel.GetAll();

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

app.use('/', api)

// Pages
app.get('/', 
async (req, res) => {
    const articles = await Article.find();
    return res.render('pages/home.pug', {
        articles
    });
})


// app.get('/login', (req, res)=>{
//     res.render('pages/login.pug')
// })


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
    var data =  await ArticleModel.GetOne(req.params.title);
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

app.put('/:title/update', async( req, res)=> {
    var article = req.body;
    var article = await Article.updateOne({_id},req.body);
    console.log("huhu"+article.title);
    res.send("ok");
})

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
});