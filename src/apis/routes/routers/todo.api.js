// @flow

import express from 'express';
const router = express.Router();
import controller from '../../controllers/todo.controller';

// const controller = new Controller();

router.get('/', controller.show)
    .get('/:name', controller.get)
    .post('/', controller.create)
    .put('/:id', controller.update)
    .delete('/:id', controller.delete);


module.exports = router;