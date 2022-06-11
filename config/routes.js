module.exports = (app) => {
   
    app.use('/', 'index.js');
    app.use((err, req, res, next) => {
        console.log('---', err.message);

        res.status(500).send('Something happened');
    });
};