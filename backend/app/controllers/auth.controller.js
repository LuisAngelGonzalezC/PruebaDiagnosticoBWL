const db = require('../helpers/db');
const env = require('../environments/environments');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const User = db.user;
const Op = db.Sequelize.Op;

exports.register = (req, res) => {
    //Registrar usuario
    User.create({
        fullname: req.body.fullname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        created_at: new Date()
    })
    .then(user => {
        return res.status(200).send({ message: "El usuario ha sido agregado exitosamente" });
    })
    .catch(err => {
        return res.status(500).send({message: err.message});
    });
}

exports.login = (req, res) => {
    //Validar usuario
    User.findOne({
        where: {
            email: req.body.email,
        }
    })
    .then(user => {
        if(!user) {
            return res.status(404).send({ message: "El correo electrónico es invalido" });
        }
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if(!passwordIsValid){
            return res.status(401).send({
                accessToken: null,
                message: 'La contraseña es incorrecta'
            });
        }

        var token = jwt.sign({ id: user.id }, env.secret, {
            expiresIn: 86400
        });
        
        user.update({
            last_login: new Date
        });

        return res.status(200).send({
            user: {
                id: user.id,
                fullname: user.fullname,
                email: user.email,
            },
            accessToken: token
        })
    })
    .catch(err => {
        res.status(500).send({message: err.message});
    });
}