const router = require('express').Router();



router.get('/register', (req, res) => {

    res.render('register', { title: 'Register' });
});


router.post('/register', async (req, res) => {
    try {


       
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



router.post('/login', async (req, res) => {
    try {

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

router.get('/profile', async(req, res) => {

    const user = req.user;

    const trips = await req.storage.getAllTrips(user._id)
  

    const ctx = {
        title: 'Profile',
        user,
        trips
    }
    console.log(user, '--user---')
    res.render('profile',ctx);
});


router.get('/logout', (req, res) => {
    req.auth.logout();
    res.redirect('/');
});


module.exports = router;