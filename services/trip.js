const User = require('../models/User')
const Trip = require('../models/Trip')


async function create(trip){
    const record = new Trip(trip);

    await record.save();
    return record;
}

async function getAll(query){
    const options= {};

    if(query.search){
        options.email = {regex: query.search, $options: 'i'}
        
    }

    const trips = Trip.find(options).lean()

    return await trips
}


module.exports={
    create,
    getAll
}