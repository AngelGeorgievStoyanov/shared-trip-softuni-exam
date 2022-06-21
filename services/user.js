const User = require('../models/User');


async function createUser(email,hashedPassword,gender){

    console.log(email,hashedPassword,gender,'-----------000000000-----------')
    const user= new User({
        email,
        hashedPassword,
        gender
    })

    await user.save();
    return user;
}

async function getUserByEmail(email) {
    return await User.findOne({ email: { $regex: email, $options: 'i' } });
}


module.exports={
    createUser,
    getUserByEmail
}