var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) 
{
    res.render('index', { title: 'Užrašai'});
        
});

router.get('/show', function(req, res) 
{
    res.render('dataOveview', { title: 'Užrašai'});
        
});

module.exports = router;

