const router = require('express').Router();
const apiRoutes = require('./api');
const BlogRoutes = require('./api/existBlogsRoutes');
const UserRoutes = require('./api/userRoutes')

router.use('/', UserRoutes);
router.use('/dashboard', BlogRoutes);
router.use('/api', apiRoutes);

module.exports = router;
