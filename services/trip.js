const User = require('../models/User')
const Trip = require('../models/Trip')


async function create(trip) {
    const record = new Trip(trip);

    await record.save();
    return record;
}

async function getAll(query) {
    const options = {};

    if (query.search) {
        options.email = { regex: query.search, $options: 'i' }

    }

    const trips = Trip.find(options).lean()

    return await trips
}


async function getById(id) {
    const trip = await Trip.findById(id).populate('creator').lean()

    if (trip) {
        const viewModel = {
            _id: trip._id,
            startPoint: trip.startPoint,
            endPoint: trip.endPoint,
            date: trip.date,
            time: trip.time,
            imageUrl: trip.imageUrl,
            brand: trip.brand,
            seats: trip.seats,
            price: trip.price,
            description: trip.description,
            creator: trip.creator,
            buddies: trip.buddies

        }
        return viewModel;
    } else {
        return undefined;
    }
}

async function joinTrip(id, trip) {
    const exsisting = await Trip.findById(id);

    if (!exsisting) {
        throw new ReferenceError('No such ID in database');
    }

    Object.assign(exsisting, trip);
    return exsisting.save();
}

async function getUserById(id) {
    return await User.findById(id).lean()
}

async function edit(id, trip) {
    const exsisting = await Trip.findById(id);

    if (!exsisting) {
        throw new ReferenceError('No such ID in database');
    }

    Object.assign(exsisting, trip);
    return exsisting.save();

}
function deleteTrip(tripId) {
    return Trip.deleteOne({ _id: tripId })
}

async function getAllTrips(userId) {
    
    return await Trip.find({ "creator": `${userId}` }).lean();
}

module.exports = {
    create,
    getAll,
    getById,
    joinTrip,
    getUserById,
    edit,
    deleteTrip,
    getAllTrips
}