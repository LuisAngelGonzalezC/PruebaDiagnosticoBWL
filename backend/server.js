const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./app/helpers/db');

var corsPaths = {
    origin: 'http://localhost:4200'
};

app.use(cors(corsPaths));
//Analizar los request content-type - application/json
app.use(express.json());
//                                    application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

//
db.sequelize.sync(
    //Descomentar abajo si es necesario para crear la tabla en la base de datos
    {force: true}
);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

const PORT = 8080;
app.listen(PORT, () => {
    console.log('Server is running in port: ', PORT);
});