const router = require('express').Router();



router.get('/register',  (req, res) => {
    res.render('register', { title: 'Register' });
});


router.post('/register', async(req,res)=>{
    try {

        console.log(req.body,'-------------------')
        await req.auth.register(req.body);

    } catch (err) {
        const ctx = {
            title:'Register',
            error:err.message,
            data:{
                name: req.body.name
            }
        }
    }
})


router.get('/login',  (req, res) => {
    res.render('login', { title: 'Login' });
});

router.get('/profile',  (req, res) => {
    res.render('profile', { title: 'Profile' });
});


router.get('/logout',  (req, res) => {
   // req.auth.logout();
    res.redirect('/');
});


module.exports = router;