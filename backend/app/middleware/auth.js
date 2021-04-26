const jwt = require('jsonwebtoken');
const env = require('../environments/environments');
 
verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({ message: 'No existe un token para la petición'});
    }

    jwt.verify(token, env.secret, (err, decoded) => {
        if(err) {
            return res.status(401).send({ message: 'Unauthorized' });
        }
        req.userId = decoded.id;
        next();
    });
}
const authJWT = {
    verifyToken: verifyToken
}
module.exports = authJWT;