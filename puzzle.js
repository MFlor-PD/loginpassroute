// Snippets de código para poder componer el programa

//Usado?: YES
  const middlewares = require('./middlewares');
//--- Explicación: 
// Para importar los middlewares en routes.js
// -------------------------------------------------------------------------------------

//Usado?: YES
const bodyParser = require('body-parser');
//--- Explicación:
// para importarlo en middlewares.js y poder usarlo en la configuración de la aplicación
// -------------------------------------------------------------------------------------

//Usado?: NO
const session = require('express-session');
//--- Explicación:
// DUPLICACION?
// -------------------------------------------------------------------------------------

//Usado?: YES
const express = require('express');
//--- Explicación:
// Para importar express desde json
// -------------------------------------------------------------------------------------

//Usado?: NO
const bodyParser = require('body-parser');
//--- Explicación:
// DUPLICACION?
// -------------------------------------------------------------------------------------

//Usado?: YES
const session = require('express-session');
//--- Explicación:
// importa las sesiones de usuario en los middlewares
// -------------------------------------------------------------------------------------

//Usado?: YES
const dotenv = require('dotenv');
//--- Explicación:
//Para acceder al archivo .env y obtener la palabra secreta
// -------------------------------------------------------------------------------------

//Usado?: YES
const middlewares = require('./middlewares');
//--- Explicación:
//Para importar los middlewares de la aplicación
// -------------------------------------------------------------------------------------

//Usado?: YES
const routes = require('./routes');
//--- Explicación:
//Para cargar las rutas de la aplicación
// -------------------------------------------------------------------------------------

//Usado?: YES
dotenv.config();
//--- Explicación:
//Para cargar las variables de entorno desde el archivo .env
// -------------------------------------------------------------------------------------

//Usado?: YES
const app = express();
//--- Explicación:
// llamamos a express para crear una aplicación web
// -------------------------------------------------------------------------------------

//Usado?: YES
const PORT = 4000;
//--- Explicación:
// Definimos el puerto en el que se ejecutará el servidor
// -------------------------------------------------------------------------------------

//Usado?: NO
const dotenv = require('dotenv');
//--- Explicación:
// DUPLICACION?
// -------------------------------------------------------------------------------------

//Usado?: NO
dotenv.config();
//--- Explicación:
// DUPLICACION?
// -------------------------------------------------------------------------------------

//Usado?: YES
middlewares.setupApp(app);
//--- Explicación: 
// Configuración de la aplicación para usar body-parser y express-session
// -------------------------------------------------------------------------------------

//Usado?: YES
routes.setup(app);
//--- Explicación: 
// Configuración de las rutas de la aplicación
// -------------------------------------------------------------------------------------

//Usado?: YES
const validarPalabraMiddleware = (req, res, next) => {
  const palabraCorrecta = process.env.PALABRA_SECRETA || '';

  if (req.body.palabra === palabraCorrecta) {
    req.session.palabraSecreta = req.body.palabra;
    next();
  } else {
    res.redirect('/?error=1');
  }
};
//--- Explicación: 
// MIDDLEWARE para validar la palabra secreta
// -------------------------------------------------------------------------------------

//Usado?:YES
const setup = (app) => {
  app.get('/', (req, res) => {
    const mensajeError = req.query.error
      ? (req.query.error === '1' ? 'Palabra incorrecta, inténtalo de nuevo.' : 'No estás logado.')
      : '';
    if (req.session.palabraSecreta) {
      return res.redirect('/profile');
    }
  //Aquí va código dentro
})}
//--- Explicación: 
// Configuración de la ruta de inicio
// -------------------------------------------------------------------------------------

//Usado?: YES
res.send(`
  <html>
    <body>
      <h1>Página de Inicio</h1>
      <p>${mensajeError}</p>
      <form method="post" action="/profile">
        <label for="palabra">Introduce la palabra:</label>
        <input type="text" name="palabra" required>
        <button type="submit">Enviar</button>
      </form>
    </body>
  </html>
`);
//--- Explicación: 
// Renderiza la página de inicio con un formulario para introducir la palabra secreta
// -------------------------------------------------------------------------------------

//Usado?: YES
const setupAPP = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    secret: 'secretoSuperSecreto',
    resave: false,
    saveUninitialized: true,
  }));
};
//--- Explicación:
// Configuración de la aplicación para usar body-parser y express-session 
//-------------------------------------------------------------------------------------

//Usado?: YES
app.post('/profile', middlewares.validarPalabraMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: 
// MIDDLEWARE para validar la palabra secreta y redirigir a la ruta de perfil
// -------------------------------------------------------------------------------------

//Usado?: YES
app.use(bodyParser.urlencoded({ extended: true }));

//--- Explicación: 
// Parte de la estructura de CONST setAPP, para terminar de configurar
// Transforma los datos de URL rn formato legible para el servidor
// -------------------------------------------------------------------------------------

//Usado?: YES
app.use(session({
  secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
  resave: false,
  saveUninitialized: true,
}));

//--- Explicación: 
// Parte de la estructura de CONST setAPP, para terminar de configurar
// -------------------------------------------------------------------------------------

//Usado?: YES
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
//--- Explicación: 
// Para iniciar el servidor y escuchar en el puerto definido
// -------------------------------------------------------------------------------------

//Usado?: YES
const verificarSesionMiddleware = (req, res, next) => {
  if (req.session.palabraSecreta) {
    next();
  } else {
    res.redirect('/?error=2');
  }
};
//--- Explicación: 
// MIDDLEWARE para verificar si la sesión está activa
// -------------------------------------------------------------------------------------


//Usado?: YES
app.get('/profile', middlewares.verificarSesionMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil (Sesión activa)</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: 
// MIDDLEWARE para verificar si la sesión está activa y redirigir a la ruta de perfil
// -------------------------------------------------------------------------------------


//Usado?: YES
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
    }
    res.redirect('/');
  });
});
//--- Explicación: 
// MIDDLEWARE para cerrar sesión y redirigir a la página de inicio
// -------------------------------------------------------------------------------------

//Usado?: YES
module.exports = {
  setup,
};
//--- Explicación:
// Exportamos la función setup para que pueda ser utilizada en otros módulos
// -------------------------------------------------------------------------------------

//Usado?: YES
module.exports = {
  validarPalabraMiddleware,
  verificarSesionMiddleware,
  setupAPP,
};
//--- Explicación:
// Exportamos los middlewares y la función de configuración de la aplicación para que puedan ser utilizados en otros módulos
// -------------------------------------------------------------------------------------

