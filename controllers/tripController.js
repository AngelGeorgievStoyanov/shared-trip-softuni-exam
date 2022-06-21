const { Router } = require('express');


const router = Router();



router.get('/', async (req, res) => {

    const trips = await req.storage.getAll(req.query)

    console.log(trips, '----trips----')
    res.render('index', trips)
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
        console.log(trip, '---trip-----')
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


    const ctx ={
        title:'Trips',
        trips
    }

    console.log(trips, '----trips----')
    res.render('shared', ctx)




})

module.exports = router;