const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const config = require("./");
const fetch = require("node-fetch");

// Referencia al Modelo donde vamos a autenticar
const API = config.API_REST.endpoint;

// local strategy - Login con credenciales propios (usuario y password)
passport.use(
  new LocalStrategy(
    // por default passport espera un usuario y password
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const usuario = await fetch(`${API}/login`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, password: password }),
        });
        const result = await usuario.json();
        if (result.status === 200) {
          return done(null, result);
        } else {
          return done(null, false, {
            message: "That account does not exist",
          });
        }
      } catch (error) {
        return done(null, false, {
          message: "That account does not exist",
        });
      }
    }
  )
);

// serializar el usuario
passport.serializeUser((usuario, callback) => {
  callback(null, usuario);
});

// deserializar el usuario
passport.deserializeUser((usuario, callback) => {
  callback(null, usuario);
});

// exportar
module.exports = passport;
