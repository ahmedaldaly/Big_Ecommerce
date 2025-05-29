
const express = require('express');
const dotenv = require('dotenv');
const ConnectDB = require('./config/ConnectDB');
const cors = require('cors')
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

// google
const session = require("express-session");
const passport = require("passport");
const app = express();
dotenv.config();
ConnectDB();
const generalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute 
  max:100 ,
  message: 'لقد تجاوزت الحد المسموح للطلبات، حاول لاحقًا.',
  standardHeaders: true,
  legacyHeaders: false,
});
//وضع حد للريكويست 
app.use(generalLimiter);
app.use(helmet()); //حماية السيرفر من هجمات  headers
// حماية no sql يدوي
app.use((req, res, next) => {
  const sanitize = (obj) => {
    for (let key in obj) {
      if (key.startsWith('$') || key.includes('.')) {
        delete obj[key];
      } else if (typeof obj[key] === 'object') {
        sanitize(obj[key]);
      }
    }
  };

  if (req.body) sanitize(req.body);
  if (req.query) sanitize(req.query);
  if (req.params) sanitize(req.params);

  next();
});

app.use(cors());
// google
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);


app.use(passport.initialize());
app.use(passport.session());

const PORT = 4000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express with JavaScript!');
});

app.use('/api/vl/auth', require('./router/auth'));
app.use('/api/vl/user', require('./router/user'));
app.use('/api/vl/brand', require('./router/brand'));
app.use('/api/vl/product', require('./router/product'));
app.use('/api/vl/favorite', require('./router/favorite'));
app.use('/api/vl/comment', require('./router/comment'));
app.use('/api/vl/order', require('./router/order'));
app.use('/api/vl/category', require('./router/category'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
