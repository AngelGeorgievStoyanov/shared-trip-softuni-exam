const User = require('../models/User');


async function createUser(email,hashedPassword,gender){

   
    const user= new User({
        email,
        hashedPassword,
        gender
    })

    await user.save();
    return user;
}

async function getUserByEmail(email) {
    return await User.findOne({ "email":`${email}` });
   
}

async function getUserById(id){
    return await User.findById(id).lean()
}


module.exports={
    createUser,
    getUserByEmail,
    getUserById
}