const middlewares = require('./middlewares');

const setup = (app) => {
  app.get('/', (req, res) => {
    const mensajeError = req.query.error
      ? (req.query.error === '1' ? 'Palabra incorrecta, inténtalo de nuevo.' : 'No estás logado.')
      : '';

    if (req.session.palabraSecreta) {
      return res.redirect('/profile');
    } else {
      res.send(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Página de Inicio</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, sans-serif;
            background: linear-gradient(135deg, #eef2f3, #cfd9df);
            color: #2c3e50;
            padding: 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          h1 {
            font-size: 2.5rem;
            margin-bottom: 1.5rem;
            text-transform: uppercase;
            letter-spacing: 1.5px;
          }
          p {
            color: #d93025; /* rojo error */
            font-weight: 600;
            margin-bottom: 1rem;
            min-height: 1.2rem;
          }
          form {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            width: 320px;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          label {
            font-weight: 600;
            margin-bottom: 0.3rem;
          }
          input[type="text"] {
            padding: 0.5rem;
            font-size: 1rem;
            border: 1px solid #ccc;
            border-radius: 6px;
          }
          input[type="text"]:focus {
            border-color: #3498db;
            outline: none;
            box-shadow: 0 0 6px #a3d2fd;
          }
          button {
            padding: 0.7rem;
            background-color: #3498db;
            color: white;
            font-size: 1.1rem;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          button:hover {
            background-color: #2980b9;
          }
        </style>
      </head>
      <body>
        <h1>Página de Inicio</h1>
        <p>${mensajeError}</p>
        <form method="post" action="/profile">
          <label for="palabra">Introduce la palabra:</label>
          <input type="text" id="palabra" name="palabra" required />
          <button type="submit">Enviar</button>
        </form>
      </body>
      </html>
      `);
    }
  });

  app.post('/profile', middlewares.validarPalabraMiddleware, (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Ruta del Perfil</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, sans-serif;
            background: linear-gradient(135deg, #d1e8ff, #a8cfff);
            color: #2c3e50;
            padding: 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          h1 {
            font-size: 2.5rem;
            margin-bottom: 2rem;
            text-transform: uppercase;
            letter-spacing: 1.5px;
          }
          form {
            background: white;
            padding: 1.5rem 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
          button {
            padding: 0.7rem 2rem;
            background-color: #3498db;
            color: white;
            font-size: 1.1rem;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          button:hover {
            background-color: #2980b9;
          }
        </style>
      </head>
      <body>
        <h1>Ruta del Perfil</h1>
        <form method="post" action="/logout">
          <button type="submit">Log Out</button>
        </form>
      </body>
      </html>
    `);
  });

  app.get('/profile', middlewares.verificarSesionMiddleware, (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Perfil Activo</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, sans-serif;
            background: linear-gradient(135deg, #d1e8ff, #a8cfff);
            color: #2c3e50;
            padding: 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          h1 {
            font-size: 2.5rem;
            margin-bottom: 2rem;
            text-transform: uppercase;
            letter-spacing: 1.5px;
          }
          form {
            background: white;
            padding: 1.5rem 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
          button {
            padding: 0.7rem 2rem;
            background-color: #3498db;
            color: white;
            font-size: 1.1rem;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          button:hover {
            background-color: #2980b9;
          }
        </style>
      </head>
      <body>
        <h1>Ruta del Perfil (Sesión activa)</h1>
        <form method="post" action="/logout">
          <button type="submit">Log Out</button>
        </form>
      </body>
      </html>
    `);
  });

  app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error al cerrar sesión:', err);
      }
      res.redirect('/');
    });
  });
};

module.exports = {
  setup,
};
