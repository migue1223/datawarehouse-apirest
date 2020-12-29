'use strict';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Swal from 'sweetalert2';
import endpoint from './api';
import functions from './functions';

let opcionUser = null;
let idUser, nameUser, lastnameUser, emailUser, rolUser, passwordUser, filaUser;

const formUser = document.getElementById('formUser');
const modalUser = document.getElementById('modalUser');
const modalHeaderUser = document.querySelector('.modal-header-user');
const modalTitleUser = document.querySelector('.modal-title-user');
const inputIdUser = document.getElementById('userId');
const inputNameUser = document.getElementById('userName');
const inputLastNameUser = document.getElementById('userLastName');
const inputEmailUser = document.getElementById('userEmail');
const inputPasswordUser = document.getElementById('userPassword');
const inputRolUser = document.getElementById('userRol');
const menuUser = document.querySelector('.menuUser');
const contenedorTableUser = document.querySelector('.contenedor-table');
const user = JSON.parse(sessionStorage.getItem('user'));

if (user) {
  if (user.isAdmin === 1) {
    menuUser.style.display = 'block';
  }
}

if (contenedorTableUser) {
  contenedorTableUser.addEventListener('click', (e) => {
    const tagName = e.target;
    if (tagName.classList.contains('btnCrearUser')) {
      createdUserId();
    }
    if (tagName.classList.contains('btnEditarUser')) {
      editUserId(e);
    }
    if (tagName.classList.contains('btnBorrarUser')) {
      deletedUserId(e);
    }
  });
}

if (menuUser) {
  menuUser.addEventListener('click', async () => {
    await renderTableUsers();
  });
}

async function renderTableUsers() {
  $('.contenedor-table').empty();
  $('.contenedor-table').append(`
    <div class="container-fluid">
      <button id="btnCrearUser" class="btn btn-dark mt-2 btnCrearUser">Crear Usuario</button>
      <br>
      <br>
      <div class="row">
        <div class="col">
          <table id="tableUser" class="table table-striped table-bordered" style="width:100%;">
            <thead>
              <tr>
                <th><input type="checkbox"></th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>  
    </div>
  `);
  const users = await endpoint.renderDataUsers();
  $('#tableUser').DataTable({
    deferRender: true,
    retrieve: true,
    proccesing: true,
    iDisplayLength: 10,
    destroy: true,
    dom: 'Bfrtilp',
    buttons: functions.buttonsTable,
    responsive: true,
    order: [],
    data: users,
    columns: [
      {
        data: null,
      },
      { data: 'name' },
      { data: 'lastname' },
      { data: 'email' },
      { data: 'rol' },
      {
        defaultContent:
          "<div class='text-center'><div class='btn-group'><button class='btn btn-info btn-sm btnEditarUser'>Editar</button><button class='btn btn-danger btn-sm btnBorrarUser'>Borrar</button></div></div>",
      },
    ],
    columnDefs: [
      {
        targets: 0,
        data: 'id',
        render: function (data) {
          return (
            '<input type="checkbox" data-iduser="' + data.id + '"></input>'
          );
        },
      },
    ],
  });
}

//CREAR
function createdUserId() {
  opcionUser = 'crear';
  idUser = null;
  formUser.reset();
  modalHeaderUser.style.backgroundColor = '#23272b';
  modalHeaderUser.style.color = '#FFFFFF';
  modalTitleUser.innerHTML = 'Crear Usuario';
  $(modalUser).modal('show');
}

//EDITAR
function editUserId(e) {
  opcionUser = 'editar';
  filaUser = e.path[4];
  idUser = +filaUser
    .getElementsByTagName('td')[0]
    .querySelector('input')
    .dataset.iduser.trim();
  nameUser = filaUser.getElementsByTagName('td')[1].innerHTML.trim();
  lastnameUser = filaUser.getElementsByTagName('td')[2].innerHTML.trim();
  emailUser = filaUser.getElementsByTagName('td')[3].innerHTML.trim();
  rolUser = filaUser.getElementsByTagName('td')[4].innerHTML.trim();

  inputIdUser.value = idUser;
  inputNameUser.value = nameUser;
  inputLastNameUser.value = lastnameUser;
  inputEmailUser.value = emailUser;
  inputRolUser.value = rolUser;
  inputPasswordUser.value = '';

  modalHeaderUser.style.backgroundColor = '#17A2B8';
  modalHeaderUser.style.color = '#FFFFFF';
  modalTitleUser.innerHTML = 'Editar Usuario';
  $(modalUser).modal('show');
}

//BORRAR
async function deletedUserId(e) {
  filaUser = e.path[4];
  idUser = +filaUser
    .getElementsByTagName('td')[0]
    .querySelector('input')
    .dataset.iduser.trim();
  Swal.fire({
    title: '¿Confirma eliminar el registro?',
    showCancelButton: true,
    confirmButtonText: `Confirmar`,
  }).then(async (result) => {
    if (result.isConfirmed) {
      const deleteUser = await endpoint.deletedUser(idUser);
      if (deleteUser.status === 200) {
        Swal.fire('¡Registro Eliminado!', '', 'success');
        await renderTableUsers();
      } else {
        Swal.fire('!No se pudo eliminar el registro!', '', 'error');
        await renderTableUsers();
      }
    }
  });
}

//submit para el CREAR y EDITAR
formUser.addEventListener('submit', async (e) => {
  e.preventDefault();
  const user = {
    id: +inputIdUser.value.trim(),
    name: inputNameUser.value.trim(),
    lastname: inputLastNameUser.value.trim(),
    email: inputEmailUser.value.trim(),
    rol: inputRolUser.value.trim(),
    password: inputPasswordUser.value.trim(),
  };
  if (opcionUser === 'crear') {
    const userCreated = await endpoint.createdUser(user);
    if (userCreated.status === 201) {
      Swal.fire('!Registro creado!', '', 'success');
      await renderTableUsers();
    } else {
      Swal.fire('!Error', '', 'error');
      await renderTableUsers();
    }
  }
  if (opcionUser === 'editar') {
    const userUpdated = await endpoint.updatedUser(user);
    if (userUpdated.status === 200) {
      Swal.fire('!Registro actualizado!', '', 'success');
      await renderTableUsers();
    } else {
      Swal.fire('!Error', '', 'error');
      await renderTableUsers();
    }
  }
  $(modalUser).modal('hide');
});

//validar si existe EMAIL
inputEmailUser.addEventListener('blur', async () => {
  emailUser = inputEmailUser.value.trim();
  if (emailUser !== '') {
    const validEmail = await endpoint.getUserEmail(emailUser);
    functions.renderSpanError(validEmail, inputEmailUser, 'Email ya existe');
  }
});

export default renderTableUsers;
