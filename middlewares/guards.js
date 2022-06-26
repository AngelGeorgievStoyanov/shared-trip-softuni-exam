function isOwner() {
    return (req, res, next) => {
        if (req.data.trip && req.user && (req.data.trip.creator._id == req.user._id)) {
            next()
        } else {
            res.redirect('/auth/login')
        }
    }
}

module.exports={
    isOwner
}