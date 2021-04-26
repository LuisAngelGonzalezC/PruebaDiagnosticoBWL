const db = require('../helpers/db');
const User = db.user;

checkExistEmail = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if(user) {
            res.status(400).send({
                message: 'El correo electrónico ya está en uso'
            });
            return;
        }
        next();
    }).catch(err => {
        res.status(404).send({ message: err.message });
    });
}
const verify = {
    checkExistEmail: checkExistEmail
}
module.exports = verify;