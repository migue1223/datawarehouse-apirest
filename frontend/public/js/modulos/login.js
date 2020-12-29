import endpoint from './api';
import functions from './functions';

const formLogin = document.getElementById('formLogin');
const contenedorLogin = document.querySelector('.contenedor-login');
const contenedorApp = document.querySelector('.contenedor');
const btnSesion = document.querySelector('.cerrar-sesion');

if (sessionStorage.getItem('token')) {
  contenedorLogin.style.display = 'none';
  contenedorApp.style.display = 'flex';
} else {
  contenedorLogin.style.display = 'flex';
  contenedorApp.style.display = 'none';
}

if (btnSesion) {
  btnSesion.addEventListener('click', cerrarSesion);
}

if (formLogin) {
  formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');

    const loginUser = await endpoint.userLogin(email.value, password.value);
    if (loginUser.status === 200) {
      sessionStorage.setItem('token', loginUser.data.token);
      sessionStorage.setItem('user', JSON.stringify(loginUser.data.user));
      const API = 'http://localhost:3000';
      sessionStorage.setItem('API', API);
      window.location.reload();
      contenedorLogin.style.display = 'none';
      contenedorApp.style.display = 'flex';
    }
    if (loginUser.status === 403) {
      functions.renderSpanError(
        loginUser,
        email,
        'Usuario y/o contraseña inválidos'
      );
      password.value = ''
    }
    if (loginUser.status === 404) {
      functions.renderSpanError(loginUser, email, 'Usuario no existe');
      email.value = ''
      password.value = ''
    }
  });
}

function cerrarSesion() {
  sessionStorage.clear();
  window.location.reload();
}
