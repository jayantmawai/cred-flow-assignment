const auth = require('./auth');
const admin = require('./admin');
//const mail = require('./mail');
// const dashboard=require('./dashboard');

module.exports = () => {
  let routes = [];

  routes = routes.concat(auth);
  routes = routes.concat(admin);
  //routes = routes.concat(mail);

  routes.forEach((r) => {
    r.route = `/api${r.route}`;
  });

  return routes;
};