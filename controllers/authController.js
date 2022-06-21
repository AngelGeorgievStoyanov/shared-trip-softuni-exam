const router = require('express').Router();
const { body } = require('express-validator');



router.get('/register', (req, res) => {

    res.render('register', { title: 'Register' });
});


router.post('/register', async (req, res) => {
    try {


      console.log(req.body,'---req body---')
        await req.auth.register(req.body);
        res.redirect('/trip');
    } catch (err) {
        const ctx = {
            title: 'Register',
            error: err.message,
            data: {
                email: req.body.email,
                gender: req.body.gender
            }
        }
        res.render('register', ctx);
    }
})


router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});



router.post('/login',  async (req, res) => {
    try {
        console.log(req.body,'----------------')
        await req.auth.login(req.body);
        res.redirect('/trip');
    } catch (err) {
        const ctx = {
            title: 'Login',
            error: err.message,
            data: {
                email: req.body.email,
                password: req.body.password
            }
        };
        res.render('login', ctx);
    }
});

router.get('/profile', (req, res) => {
    res.render('profile', { title: 'Profile' });
});


router.get('/logout', (req, res) => {
     req.auth.logout();
    res.redirect('/');
});


module.exports = router;