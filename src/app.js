import express from 'express';
import productsRouter from './routers/products.router.js';
import handlebars from 'express-handlebars';
import cartRouter from './routers/cart.router.js'
import productsViewRouter from './routers/views/products.router.js'
import cartViewRouter from './routers/views/cart.router.js'
import indexRouter from './routers/views/index.router.js'
import sessionsRouter from './routers/sessions.router.js'
import path from 'path';
import { __dirname } from './utils.js';
import expressSession from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import { init as initPassportConfig } from './config/passport.config.js';
import {URI} from './db/mongodb.js'





const app = express();

const SESSION_SECRET = 'qBvPkU2X;J1,51Z!~2p[JW.DT|g:4l@';


app.use(expressSession({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: URI,
    mongoOptions: {},
    ttl: 120,
  }), 
}));


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, '../public')));



app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

initPassportConfig();
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', productsRouter, cartRouter, sessionsRouter);
app.use('/', productsViewRouter, cartViewRouter, indexRouter)



export default app;