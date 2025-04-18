const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const routes = require('./routes');
const middlewares = require('./middlewares');


const PORT = 4000;

middlewares.setupApp(app);
routes.setup(app);

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`)
});