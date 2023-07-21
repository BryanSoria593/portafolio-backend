const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const projectRoutes = require('./routes/project');
const cors = require('cors');


//CREAR SERVIDOR DE EXPRESS
const app = express();

// Base de datos
dbConnection();

//MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// CORS

app.use(cors());
// Configurar cabeceras y cors
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//     next();
// });




// rutas
app.use('/api', projectRoutes);




app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
})



