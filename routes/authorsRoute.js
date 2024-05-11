const router = require('express').Router();
const {getAllAuthors} = require('../controllers/authorsController')

router.get('/', getAllAuthors)

module.exports = router;