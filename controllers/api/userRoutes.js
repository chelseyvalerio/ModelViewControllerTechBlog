const router = require('express').Router();
const { User, Blog } = require('../../models');
const withAuth = require('../../utils/auth')

router.get('/', async (req,res)=>{
  const blogs = await Blog.findAll();
  const existingBlog = blogs.map((b)=>b.get({plain: true}));
  console.log(existingBlog)
  res.render('homePage', {existingBlog})
})

router.get('/login', async (req,res)=>{
  res.render('login')
})

router.get('/profile', withAuth, async(req, res)=>{
  const blogs = await Blog.findAll();
  const existingBlog = blogs.map((b)=>b.get({plain: true}));
  console.log(existingBlog)
  res.render('dashboard', {existingBlog, name: req.session.user_name})
})

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_name = userData.name
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_name = userData.name;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
