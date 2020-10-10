const path = require('path');
const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const csrf = require('csurf');
const flash = require('connect-flash');
const kue = require('kue');
const cors = require('cors');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Customer = require('./models/customer');
const User = require('./models/user');
const UserEmail = require('./models/user_email');
const {isCelebrate} = require('celebrate');
const app = express();
const util = require('util');
require('./middleware/passport');

const AppError = require('./errors').app;
const ServerError = require('./errors').server;

//const csrfProtection = csrf();
var $ = require('jquery');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false	
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(flash());

const registerAllRoutes = require('./route');

const getErrorResponse = (httpStatus, message) => ({
  error: {
    httpStatus: httpStatus,
    message: message,
  },
});

app.use(express.static(path.join(__dirname, 'public')));


Customer.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Customer);

UserEmail.belongsTo(Customer, { constraints: true, onDelete: 'CASCADE' });
Customer.hasMany(UserEmail);


registerAllRoutes(app);
app.use(errorController.get404);

app.use((err, req, res, next) => {
  console.log(err);
  console.log(util.inspect(err));
  console.log(err.stack);
  if (isCelebrate(err)) {
    if (err.joi.details && err.joi.details.length > 0) {
      res.status(400).send(createError(400, err.joi.details[0].message));
    } else {
      res.status(400).send(createError(400, 'Input validation error'));
    }
  } else if (err.name === 'UnauthorizedError') {
    res.status(401).send(createError(
        401,
        'Unauthorized. Missing or invalid token',
    ));
  } else if (err instanceof AppError) {
    if (err instanceof ServerError) {
      res.status(err.httpStatus).send(createError(
          err.httpStatus,
          'Looks like something went wrong.' +
                ' Please wait and try again in a few minutes.',
      ));
    } else {
      // All HTTP requests must have a response,
      // so let's send back an error with its httpStatus and message
      res.status(err.httpStatus).send(getErrorResponse(
          err.httpStatus,
          err.message,
      ));
    }
  } else {
    // If it is an uncaught exception, pass it back as an Internal Server Error
    res.status(500).send(
        createError(
            500,
            'Looks like something went wrong.' +
                ' Please wait and try again in a few minutes.',
        ));
  }
});


sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
