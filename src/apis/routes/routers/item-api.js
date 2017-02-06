import express from 'express'
const router = express.Router();
import Controller from '../../controllers/item';

const controller = new Controller();

router.get('/', controller.index)
    .get('/:id', controller.show)
    .post('/', controller.create)
    .put('/:id', controller.update)
    .delete('/:id', controller.destroy);


module.exports = router;