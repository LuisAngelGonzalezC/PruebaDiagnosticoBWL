const db = require('../helpers/db');
const User = db.user;

exports.users = (req, res) => {
    User.findAll()
    .then( users => {
        return res.status(200).send({users: users});
    }); 
}