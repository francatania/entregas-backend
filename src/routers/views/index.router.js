import { Router } from 'express';

const router = Router();


const publicRouters = (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/products');
  }
  next();
}

router.get('/login', publicRouters, (req, res) => {
  res.render('login', { title: 'Login' });
});

router.get('/register', publicRouters, (req, res) => {
  res.render('register', { title: 'Register' });
});

export default router;