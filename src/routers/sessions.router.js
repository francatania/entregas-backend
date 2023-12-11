import { Router } from 'express';
import AuthController from '../controller/auth.controller.js';

const router = Router();

router.post('/auth/register', async (req, res)=>{
  const {
      first_name,
      last_name,
      password,
      email, 
  } = req.body

  const newUser = {
    first_name,
    last_name,
    password,
    email, 
  }

  try {
    await AuthController.register(newUser);
    res.status(201).json({message: 'Usuario creado.'});
  } catch (error) {
    res.status(400).json({message: error.message});
  }

});

router.post('/auth/login', async (req, res)=>{
  const user = req.body;

  try {
    const token = await AuthController.login(user);
    res
      .cookie('access_token',token, {maxAge: '60000', httpOnly:true, signed:true})
      .redirect('/products')
  } catch (error) {
    res.status(401).json({message: error.message});
  }
  
})

// router.get('/sessions/github', passport.authenticate('github', {scope: ['user:email']}))

// router.get('/sessions/github/callback', passport.authenticate('github', {failureRedirect: '/login'}), (req, res)=>{
//   const rol = 'user';
//   const {first_name, email} = req.user;
//   const userWithRol = {first_name, email, rol}
//   req.session.user = userWithRol;
//   res.redirect('/products');
// });

// router.get('/sessions/logout', (req, res) => {
//   req.session.destroy((error) => {
//     res.redirect('/login');
//   });
// });

router.get('/sessions/logout', (req, res) => {
  res.clearCookie('access_token'); 
  res.redirect('/login');
});

export default router;