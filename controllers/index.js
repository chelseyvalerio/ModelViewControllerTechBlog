const router = require('express').Router();
const apiRoutes = require('./api');
const blogRoutes = require('./api/existBlogsRoutes');
const userRoutes = require('./api/userRoutes')

router.use('/', userRoutes);
router.use('/dashboard', blogRoutes);
router.use('/api', apiRoutes);

module.exports = router;
