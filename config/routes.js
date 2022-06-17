const tripController = require('../controllers/tripController')
const authController = require('../controllers/authController')
const homeController = require('../controllers/homeController');


module.exports = (app) => {
   app.use('/trip', tripController);    
   app.use('/auth', authController);    
    app.use('/', homeController);
    app.use((err, req, res, next) => {
        console.log('---', err.message);

        res.status(500).send('Something happened');
    });
};