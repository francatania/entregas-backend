import { Router } from 'express';
import passport from 'passport';
import UserModel from '../models/user.model.js';
import { createHash, isValidPassword } from '../utils.js';

const router = Router();

router.post('/sessions/register', passport.authenticate('register', { failureRedirect: '/register' }), (req, res) => {
  res.redirect('/login');
})


router.post('/sessions/login', passport.authenticate('login', { failureRedirect: '/login' }), (req, res) => {
  const rol = 'user';
  const {first_name, email} = req.user;
  const userWithRol = {first_name, email, rol}
  req.session.user = userWithRol;
  res.redirect('/products');
});

router.get('/sessions/github', passport.authenticate('github', {scope: ['user:email']}))

router.get('/sessions/github/callback', passport.authenticate('github', {failureRedirect: '/login'}), (req, res)=>{
  const rol = 'user';
  const {first_name, email} = req.user;
  const userWithRol = {first_name, email, rol}
  req.session.user = userWithRol;
  res.redirect('/products');
});

router.get('/sessions/logout', (req, res) => {
  req.session.destroy((error) => {
    res.redirect('/login');
  });
});

export default router;