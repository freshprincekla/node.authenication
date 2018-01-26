module.exports = function(app){

    var users = require('../controllers/controller');
    //create new user
    app.post('/register', users.register);

    //test user
    app.get('/register-test', users.test);

    //user login
    app.post('/login', users.login);
}