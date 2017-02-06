import express from 'express'
const router = express.Router();
const Controller = require('../../controllers/item');

const controller = new Controller();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);


module.exports = router;