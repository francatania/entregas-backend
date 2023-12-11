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
import MongoStore from 'connect-mongo';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { init as initPassportConfig } from './config/passport.config.js';



const app = express();

const COOKIE_SECRET = process.env.COOKIE_SECRET;

app.use(cookieParser(COOKIE_SECRET));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, '../public')));


app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');


initPassportConfig();
app.use(passport.initialize());

app.use('/api', productsRouter, cartRouter, sessionsRouter);
app.use('/', productsViewRouter, cartViewRouter, indexRouter)



export default app;