const jsonwebtoken = require("jsonwebtoken");
const config = require('../config/jwt_config');

const jwt = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null){
            res.status(401)
            throw new Error('Not authorized')
        }
        jsonwebtoken.verify(token, config.JWT_SECRET, (err, user) => {
            if (err) {
                res.status(403)
                throw new Error('User does not have access')
                req.user = user
            }
        })
        next()
    } catch (error) {
        next(error)
    }   
}

module.exports = jwt;