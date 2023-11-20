import passport from 'passport';
import { createHash, isValidPassword } from '../utils.js';
import { Strategy as LocalStrategy } from 'passport-local';
import UserModel from '../models/user.model.js';
import GitHubStrategy from 'passport-github2';

const opts = {
  usernameField: 'email',
  passReqToCallback: true,
};

const githubOptions = {
    clientID : '',
    clientSecret: '',
    callbackURL: ''
}

export const init = () => {
  passport.use('register', new LocalStrategy(opts, async (req, email, password, done) => {
    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        return done(new Error('User already register 😨'));
      }
      const newUser = await UserModel.create({
        ...req.body,
        password: createHash(password),
      });
      done(null, newUser);
    } catch (error) {
      done(new Error(`Ocurrio un error durante la autenticacion ${error.message} 😨.`));
    }
  }));

  passport.use('login', new LocalStrategy(opts, async (req, email, password, done) => {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return done(new Error('Correo o contraseña invalidos 😨'));
      }
      const isPassValid = isValidPassword(password, user);
      if (!isPassValid) {
        return done(new Error('Correo o contraseña invalidos 😨'));
      }
      console.log('Here');
      done(null, user);
    } catch (error) {
      done(new Error(`Ocurrio un error durante la autenticacion ${error.message} 😨.`));
    }
  }));

  passport.use('github', new GitHubStrategy(githubOptions, async (accessToken, refreshToken, profile, done)=>{
    const email = profile._json.email;
    const user = await UserModel.findOne({email});
    if(user){
      return done(null, user);
    }
    const newUser =   {
      first_name: profile._json.name,
      last_name: '',
      email: email,
      age: 18,
      password: '',
      provider: 'Github'}

    await UserModel.create(newUser);
    done(null, newUser);
  }))

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (uid, done) => {
    const user = await UserModel.findById(uid);
    done(null, user);
  });
}