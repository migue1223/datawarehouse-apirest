"use strict";

import "core-js/stable";
import "regenerator-runtime/runtime";
import Swal from "sweetalert2";

let opcionContact = null;
let idContact,
  nameContact,
  emailContact,
  cityContact,
  addressContact,
  filaContact;
const API_CONTACT = localStorage.getItem("API");
const TOKEN_CONTACT = localStorage.getItem("token");

const formContact = document.getElementById("formContact");
const modalContact = document.getElementById("modalContact");
const modalHeaderContact = document.querySelector(".modal-header-contact");
const modalTitleContact = document.querySelector(".modal-title-contact");
const inputIdContact = document.getElementById("contactId");
const inputNameContact = document.getElementById("contactName");
const selectCityContact = document.getElementById("contactCity");
const inputEmailContact = document.getElementById("contactEmail");
const inputAddressContact = document.getElementById("contactAddress");
const menuContact = document.querySelector(".menuContact");

if (menuContact) {
  menuContact.addEventListener("click", async () => {
    await renderTableContact();
  });
}

async function renderDataContact() {
  const getContacts = await fetch(`${API_CONTACT}/contact`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + TOKEN_CONTACT,
    },
  });
  const contacts = await getContacts.json();
  return contacts.data;
}

async function createdContact(contact) {
  const createContact = await fetch(`${API_CONTACT}/contact`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + TOKEN_CONTACT,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: contact.name,
      email: contact.email,
      address: contact.address,
      cityId: +contact.cityId,
    }),
  });
  const result = await createContact.json();
  return result;
}

async function getContactName(name) {
  const getContact = await fetch(`${API_CONTACT}/contact?name=${name}`, {
    headers: {
      Authorization: "Bearer " + TOKEN_CONTACT,
    },
  });
  const contact = await getContact.json();
  return contact;
}

async function getRegions() {
  const getRegion = await fetch(`${API_CONTACT}/region`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + TOKEN_CONTACT,
    },
  });
  const result = await getRegion.json();
  return result.data;
}

async function getCountry() {
  const getCountry = await fetch(`${API_CONTACT}/country`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + TOKEN_CONTACT,
    },
  });
  const result = await getCountry.json();
  return result.data;
}

async function getCitysContact() {
  const getCity = await fetch(`${API_CONTACT}/city`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + TOKEN_CONTACT,
    },
  });
  const result = await getCity.json();
  return result.data;
}

async function updatedContact(contact) {
  const updateContact = await fetch(`${API_CONTACT}/contact/${contact.id}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + TOKEN_CONTACT,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: contact.name,
      email: contact.email,
      cityId: contact.cityId,
      address: contact.address,
    }),
  });
  const result = await updateContact.json();
  return result;
}

async function deletedContact(id) {
  const deleteContact = await fetch(`${API_CONTACT}/contact/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + TOKEN_CONTACT,
    },
  });
  const result = await deleteContact.json();
  return result;
}

async function renderOptionSelectContact(contenedor, data, id, title) {
  const delOption = contenedor.querySelectorAll("option");

  if (delOption.length > 0) {
    delOption.forEach((op) => op.parentElement.removeChild(op));
  }

  const optionSelect = document.createElement("option");
  const textOptionSelect = document.createTextNode(title);
  optionSelect.appendChild(textOptionSelect);
  contenedor.appendChild(optionSelect);

  data.forEach((ci) => {
    const option = document.createElement("option");
    const textOption = document.createTextNode(ci.name);
    option.value = ci.id;
    option.appendChild(textOption);
    if (id) {
      if (ci.id === id) {
        option.selected = true;
      }
    }
    contenedor.appendChild(option);
  });
}

async function renderTableContact() {
  $(".contenedor-table").empty();
  $(".contenedor-table").append(`
    <div class="container-fluid">
      <button id="btnCrearContact" class="btn btn-dark mt-2">Crear Contact</button>
      <br>
      <br>
      <div class="row">
        <div class="col">
          <table id="tableContact" class="table table-striped table-bordered" style="width:100%;">
            <thead>
              <tr>
                <th><input type="checkbox"></th>
                <th>Name</th>
                <th>Email</th>
                <th>City</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>  
    </div>
  `);
  const contacts = await renderDataContact();
  $("#tableContact").DataTable({
    data: contacts,
    columns: [
      {
        data: null,
      },
      { data: "name" },
      { data: "email" },
      { data: null },
      { data: "address" },
      {
        defaultContent:
          "<div class='text-center'><div class='btn-group'><button class='btn btn-info btn-sm btnEditarContact'>Editar</button><button class='btn btn-danger btn-sm btnBorrarContact'>Borrar</button></div></div>",
      },
    ],
    columnDefs: [
      {
        targets: 0,
        data: "id",
        render: function (data) {
          return '<input type="checkbox" data-idcontact="' + data.id + '"/>';
        },
      },
      {
        targets: 3,
        data: "City",
        render: function (data) {
          return (
            '<span type="checkbox" data-idcity="' +
            data.City.id +
            '">' +
            data.City.name +
            "</span>"
          );
        },
      },
    ],
  });
}

//CREAR
$(document).on("click", "#btnCrearContact", async function () {
  opcionContact = "crear";
  idContact = null;
  formContact.reset();
  modalHeaderContact.style.backgroundColor = "#23272b";
  modalHeaderContact.style.color = "#FFFFFF";
  modalTitleContact.innerHTML = "Crear Compañía";
  $(modalContact).modal("show");
});

//EDITAR
$(document).on("click", ".btnEditarContact", function () {
  opcionContact = "editar";
  filaContact = this.closest("tr");
  idContact = +filaContact
    .getElementsByTagName("td")[0]
    .querySelector("input")
    .dataset.idcontact.trim();
  nameContact = filaContact.getElementsByTagName("td")[1].innerHTML.trim();
  emailContact = filaContact.getElementsByTagName("td")[2].innerHTML.trim();
  cityContact = +filaContact.getElementsByTagName("td")[3].querySelector("span")
    .dataset.idcity;
  addressContact = filaContact.getElementsByTagName("td")[4].innerHTML.trim();

  inputIdContact.value = idContact;
  inputNameContact.value = nameContact;
  selectCityContact.value = cityContact;
  inputEmailContact.value = emailContact;
  inputAddressContact.value = addressContact;

  modalHeaderContact.style.backgroundColor = "#7303c0";
  modalHeaderContact.style.color = "#FFFFFF";
  modalTitleContact.innerHTML = "Editar Company";
  renderOptionCitys(cityContact);
  $(modalContact).modal("show");
});

//BORRAR
$(document).on("click", ".btnBorrarContact", async function () {
  filaContact = this.closest("tr");
  idContact = +filaContact
    .getElementsByTagName("td")[0]
    .querySelector("input")
    .dataset.idcontact.trim();
  Swal.fire({
    title: "¿Confirma eliminar el registro?",
    showCancelButton: true,
    confirmButtonText: `Confirmar`,
  }).then(async (result) => {
    if (result.isConfirmed) {
      const deleteCompany = await deletedContact(idContact);
      if (deleteCompany.status === 200) {
        Swal.fire("¡Registro Eliminado!", "", "success");
        await renderTableContact();
      } else {
        Swal.fire("!No se pudo eliminar el registro!", "", "error");
        await renderTableContact();
      }
    }
  });
});

//submit para el CREAR y EDITAR
formContact.addEventListener("submit", async (e) => {
  e.preventDefault();
  const contact = {
    id: +inputIdContact.value.trim(),
    name: inputNameContact.value.trim(),
    cityId: +selectCityContact.value.trim(),
    email: inputEmailContact.value.trim(),
    address: inputAddressContact.value.trim(),
  };
  if (opcionContact === "crear") {
    const contactCreated = await createdContact(contact);
    if (contactCreated.status === 201) {
      Swal.fire("!Registro creado!", "", "success");
      await renderTableContact();
    } else {
      Swal.fire("!Error", "", "error");
      await renderTableContact();
    }
  }
  if (opcionContact === "editar") {
    const contactUpdated = await updatedContact(contact);
    if (contactUpdated.status === 200) {
      Swal.fire("!Registro actualizado!", "", "success");
      await renderTableContact();
    } else {
      Swal.fire("!Error", "", "error");
      await renderTableContact();
    }
  }
  $(modalContact).modal("hide");
});

//validar si existe EMAIL
inputNameContact.addEventListener("blur", async () => {
  nameContact = inputNameContact.value.trim();
  if (nameContact !== "") {
    const validNameContact = await getContactName(nameContact);
    const span = document.createElement("span");
    const textSpan = document.createTextNode("Contact ya existe");
    span.append(textSpan);
    span.classList = "btn-danger";
    const br = document.createElement("br");
    if (validNameContact.status === 200) {
      inputNameContact.after(span, br);
      setTimeout(() => {
        span.remove();
        br.remove();
        inputNameContact.value = "";
      }, 3000);
    }
  }
});
