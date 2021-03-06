// @flow

import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import morgan from 'morgan';
import util from 'util';
import mongoose from 'mongoose';
import cors from 'cors';
import route from './apis/routes/route'
import config from './config/config';

const app = express();
const upload = multer();

const port = config.port; // set our port
const router = express.Router();
// REGISTER OUR ROUTES -------------------------------
route.setRoutes(router);

app.use(express.static(__dirname + '/../public'))
    .use(morgan('dev'))
    .use(cors())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use('/api', router)
    .get('/hello', (req, res) => {
        res.send('world');
    })
    .listen(port, (err) => {
        if (err) throw err;
        console.log(util.format('%s %s', 'Srver is listening', port));
    });

// middleware to use for all requests
router.use((req, res, next) => {
        // do logging
        console.log('Something is happening...');
        next();
    })
    // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
    .get('/', (req, res) => {
        res.json({ message: 'hello! welcome to our api!' });
    })
    .get('/sum/:x/:y', (req, res) => {
        const x = req.params.x * 1;
        const y = req.params.y * 1;
        res.json({ result: x + y });
    });

//Connecting MongoDB using mongoose to our application 
mongoose.connect(config.db);
//This callback will be triggered once the connection is successfully established to MongoDB 
mongoose.connection.on('connected', () => {
    console.log('Mongoose default connection open to ' + config.db);
});