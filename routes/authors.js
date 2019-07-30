const express = require('express');
const router = express.Router();
const Author = require('../models/author');

//All authors
router.get('/', async (req, res) => {
    let searchOptions = {};
    if (req.query.name !== null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i');
    }
    try {
        const authors = await Author.find(searchOptions);
        res.render('authors/index', {
            authors: authors,
            searchOptions: req.query
        });
    } catch {
        res.render('/');
    }
});

//new Author
router.get('/new', (req, res) => {
    res.render('authors/new', {
        author: new Author()
    });
});


router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    });
    try {
        const newAuthor = await author.save();
        // res.render('authors/' + newAuthor.id);
        res.redirect('authors');
    } catch {
        res.render('authors/new', {
            author: author,
            errorMsg: 'Error creating Author'
        })
    }
});

module.exports = router;