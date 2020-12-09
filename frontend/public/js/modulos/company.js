"use strict";

import "core-js/stable";
import "regenerator-runtime/runtime";
import Swal from "sweetalert2";

const API = "http://localhost:3000/company";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzcsImVtYWlsIjoianRhMTIyM0BnbWFpbC5jb20iLCJpc0FkbWluIjoxLCJhY3RpdmUiOjEsImlhdCI6MTYwNzUyNzg2MX0.11Tx3qdptUjd_eVuGR2hkRY0-8Zz2Qj5XfufzrVwGUM";

let opcion = null;
let id, name, lastname, email, rol, password, fila;

const formUsers = document.getElementById("formUsuarios");
const modalUsers = document.getElementById("modalUsuarios");
const modalHeader = document.querySelector(".modal-header");
const modalTitle = document.querySelector(".modal-title");
const inputIdUser = document.getElementById("idUser");
const inputNameUser = document.getElementById("nameUser");
const inputLastNameUser = document.getElementById("lastnameUser");
const inputEmailUser = document.getElementById("emailUser");
const inputPasswordUser = document.getElementById("passwordUser");
const inputRolUser = document.getElementById("rolUser");
const menuUser = document.querySelector(".menuUser");

if (menuUser) {
  menuUser.addEventListener("click", async () => {
    await renderTableUsers();
  });
}

async function renderDataUsers() {
  const getUsers = await fetch(API, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const users = await getUsers.json();
  return users.data;
}

async function createdUser(user) {
  const createUser = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      rol: user.rol,
      password: user.password,
    }),
  });
  const result = await createUser.json();
  return result;
}

async function getUserEmail(email) {
  const getUser = await fetch(`${API}?email=${email}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const user = await getUser.json();
  return user;
}

async function updatedUser(user) {
  const updateUser = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      rol: user.rol,
    }),
  });
  const result = await updateUser.json();
  console.log(result);
  return result;
}

async function deletedUser(id) {
  const deleteUser = await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const result = await deleteUser.json();
  return result;
}

async function renderTableUsers() {
  $(".contenedor-table").empty();
  $(".contenedor-table").append(`
    <div class="container-fluid">
      <button id="btnCrear" class="btn btn-dark mt-2">Crear Usuario</button>
      <br>
      <br>
      <div class="row">
        <div class="col">
          <table id="tableUser" class="table table-striped table-bordered" style="width:100%;">
            <thead>
              <tr>
                <th><input type="checkbox"></th>
                <th>Id</th>
                <th>Name</th>
                <th>LastName</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>  
    </div>
  `);
  $("#tableUser").DataTable({
    data: await renderDataUsers(),
    columns: [
      {
        defaultContent: "<input type='checkbox'>",
      },
      { data: "id" },
      { data: "name" },
      { data: "lastname" },
      { data: "email" },
      { data: "rol" },
      {
        defaultContent:
          "<div class='text-center'><div class='btn-group'><button class='btn btn-info btn-sm btnEditar'>Editar</button><button class='btn btn-danger btn-sm btnBorrar'>Borrar</button></div></div>",
      },
    ],
  });
}

//CREAR
$(document).on("click", "#btnCrear", function () {
  opcion = "crear";
  id = null;
  formUsers.reset();
  modalHeader.style.backgroundColor = "#23272b";
  modalHeader.style.color = "#FFFFFF";
  modalTitle.innerHTML = "Crear Usuario";
  $(modalUsers).modal("show");
});

//EDITAR
$(document).on("click", ".btnEditar", function () {
  opcion = "editar";
  fila = this.closest("tr");
  id = +fila.getElementsByTagName("td")[1].innerHTML.trim();
  name = fila.getElementsByTagName("td")[2].innerHTML.trim();
  lastname = fila.getElementsByTagName("td")[3].innerHTML.trim();
  email = fila.getElementsByTagName("td")[4].innerHTML.trim();
  rol = fila.getElementsByTagName("td")[5].innerHTML.trim();

  inputIdUser.value = id;
  inputNameUser.value = name;
  inputLastNameUser.value = lastname;
  inputEmailUser.value = email;
  inputRolUser.value = rol;
  inputPasswordUser.value = "";

  modalHeader.style.backgroundColor = "#7303c0";
  modalHeader.style.color = "#FFFFFF";
  modalTitle.innerHTML = "Editar Usuario";
  $(modalUsers).modal("show");
});

//BORRAR
$(document).on("click", ".btnBorrar", async function () {
  fila = this.closest("tr");
  id = +fila.getElementsByTagName("td")[1].innerHTML.trim();
  Swal.fire({
    title: "¿Confirma eliminar el registro?",
    showCancelButton: true,
    confirmButtonText: `Confirmar`,
  }).then(async (result) => {
    if (result.isConfirmed) {
      const deleteUser = await deletedUser(id);
      if (deleteUser.status === 200) {
        Swal.fire("¡Registro Eliminado!", "", "success");
        await renderTableUsers();
      } else {
        Swal.fire("!No se pudo eliminar el registro!", "", "error");
        await renderTableUsers();
      }
    }
  });
});

//submit para el CREAR y EDITAR
formUsers.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = {
    id: +inputIdUser.value.trim(),
    name: inputNameUser.value.trim(),
    lastname: inputLastNameUser.value.trim(),
    email: inputEmailUser.value.trim(),
    rol: inputRolUser.value.trim(),
    password: inputPasswordUser.value.trim(),
  };
  if (opcion === "crear") {
    const userCreated = await createdUser(user);
    if (userCreated.status === 201) {
      Swal.fire("!Usuario creado!", "", "success");
      await renderTableUsers();
    } else {
      Swal.fire("!Error", "", "error");
      await renderTableUsers();
    }
  }
  if (opcion === "editar") {
    const userUpdated = await updatedUser(user);
    console.log(userUpdated);
    if (userUpdated.status === 200) {
      Swal.fire("!Usuario actualizado!", "", "success");
      await renderTableUsers();
    } else {
      Swal.fire("!Error", "", "error");
      await renderTableUsers();
    }
  }
  $(modalUsers).modal("hide");
});

//validar si existe EMAIL
inputEmailUser.addEventListener("blur", async () => {
  email = inputEmailUser.value.trim();
  if (email !== "") {
    const validEmail = await getUserEmail(email);
    const span = document.createElement("span");
    const textSpan = document.createTextNode("Email ya existe");
    span.append(textSpan);
    span.classList = "btn-danger";
    const br = document.createElement("br");
    if (validEmail.status === 200) {
      inputEmailUser.after(span, br);
      setTimeout(() => {
        span.remove();
        br.remove();
        inputEmailUser.value = "";
      }, 3000);
    }
  }
});
