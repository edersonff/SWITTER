const jwt = require("jsonwebtoken");
const User = require("../Models/User");
module.exports = async function getUser(req){
    const token = req.headers.authorization.split(' ')[1];
    const { email, password } = jwt.decode(token);
    return await User.findOne({
        where: { email, password }
    });
}