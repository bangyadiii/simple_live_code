const router = require('express').Router();
const user = require('../controllers/user.controller');

router.delete('/all', user.deleteAllUser);

router.get('/', user.getAllUsers);

router.get('/:id', user.getOneUser);

router.post('/', user.createUser);

module.exports = router;