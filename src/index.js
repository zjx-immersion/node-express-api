// @flow

import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import morgan from 'morgan';
import util from 'util';

const app = express();
const upload = multer();

app.use(express.static(__dirname + '/../public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================

// create our router
const router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening...');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hello! welcome to our api!' });
});

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

app.get('/hello', (req, res) => {
    res.send('world');
});

router.get('/sum/:x/:y', (req, res) => {
    const x = req.params.x * 1;
    const y = req.params.y * 1;
    res.json({ result: x + y });
});

// START THE SERVER
// =============================================================================
app.listen(port, () => {
    console.log(util.format('%s %s', 'Srver is listening', port));
});
console.log('Magic happens on port ' + port)