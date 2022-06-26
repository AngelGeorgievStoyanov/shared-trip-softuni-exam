const { Router } = require('express');
const { preloadTrip } = require('../middlewares/preload')
const { isOwner } = require('../middlewares/guards')
const userService = require('../services/user')
const router = Router();



router.get('/', async (req, res) => {


    res.render('index')
})



router.get('/create', async (req, res) => {


    res.render('create', { title: 'Create Trip' })
})

router.post('/create', async (req, res) => {

    const trip = {
        startPoint: req.body.startPoint,
        endPoint: req.body.endPoint,
        date: req.body.date,
        time: req.body.time,
        imageUrl: req.body.imageUrl,
        brand: req.body.brand,
        seats: Number(req.body.seats),
        price: Number(req.body.price),
        description: req.body.description,
        creator: req.user._id,



    }


    try {
      
        await req.storage.create(trip);

        res.redirect('/')
    } catch (err) {
        const ctx = {
            title: 'Create Trip',
            error: err.message,
            trip
        }

        res.render('create', ctx);
    }
})



router.get('/shared', async (req, res) => {

    const trips = await req.storage.getAll(req.query)


    const ctx = {
        title: 'Trips',
        trips
    }

   
    res.render('shared', ctx)

})

router.get('/details/:id', preloadTrip(), async (req, res) => {

    const trip = req.data.trip;
    const ownerTrip = await userService.getUserById(trip.creator)
    const driver = ownerTrip.email
    const isuser = req.user;
    let isowner = false;
    if (trip == undefined) {
        res.redirect('/404');
    } else {
        let userBuddie = false;
        let buddies;

        if (req.user) {

            if (req.data.trip.creator._id == req.user._id) {
                isowner = true;
            }

            buddies = trip.buddies;

            for (const buddie of buddies) {

                if (buddie == req.user._id) {
                    userBuddie = true;
                    break;
                }

            }

        }

        let arr = trip.buddies;

        const userJoined = await Promise.all(
            arr.map(async (element) => {
             
                let a = req.storage.getUserById(element)
              
                return a;
            })
        )

      

        const allUsersJoined = userJoined.map((x) => { return x.email }).join(', ')

        const ctx = {
            title: 'Trip',
            trip,
            ownerTrip,
            driver,
            isuser,
            isowner,
            userBuddie,
            allUsersJoined
        }


        res.render('details', ctx);
    }
});


router.get('/join/:id', preloadTrip(), async (req, res) => {
    const trip = req.data.trip;

    trip.seats--;

    const userId = req.user._id;

    trip.buddies.push(userId);
    const ctx = {
        title: 'Trip',
        trip
    };

    try {
        await req.storage.joinTrip(trip._id, trip)


    } catch (err) {
        error = err.message
    }

    res.redirect(`/trip/details/${trip._id}`)
})


router.get('/edit/:id', preloadTrip(), isOwner(), async (req, res) => {
    const trip = req.data.trip;


    if (!trip) {
        res.redirect('/404')
    } else {
        const ctx = {
            title: 'Edit trip',
            trip
        }
        res.render('edit', ctx)
    }
})

router.post('/edit/:id', async (req, res) => {
    const trip = {
        startPoint: req.body.startPoint,
        endPoint: req.body.endPoint,
        date: req.body.date,
        time: req.body.time,
        imageUrl: req.body.imageUrl,
        brand: req.body.brand,
        seats: Number(req.body.seats),
        price: Number(req.body.price),
    }


    try {
        await req.storage.edit(req.params.id, trip)
        res.redirect(`/trip/details/${req.params.id}`)
    } catch (err) {
        const ctx = {
            title: 'Edit Trip',
            error: err.message,
            trip
        };
        res.render('edit', ctx)
    }
})

router.get('/delete/:id',preloadTrip(),isOwner(), async (req, res) => {
    const trip = req.data.trip;


    if (!trip) {
        res.redirect('/404')
    } else {
       await req.storage.deleteTrip(trip._id);
       res.redirect('/trip/shared')
    }
})

module.exports = router;