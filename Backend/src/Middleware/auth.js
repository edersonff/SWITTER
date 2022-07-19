const jwt = require('jsonwebtoken')
const User = require('../Models/User')
module.exports = async ( req, res, next ) => {
    if(!req.headers.authorization) return res.sendStatus(401);
    const user = await User.count({
        where:{
            _token: req.headers.authorization.split(' ')[1]
        }
    })
    if(user == 0) return res.sendStatus(401);

    req.headers.token = req.headers.authorization.split(' ')[1];

    next();
}