const {model} = require('mongoose');

const ArticleModel = model('articles', {
    title: String,
    content: String
});

export default ArticleModel;