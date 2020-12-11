"use strict";

import "core-js/stable";
import "regenerator-runtime/runtime";
import Swal from "sweetalert2";

let opcionCompany = null;
let idCompany,
  nameCompany,
  emailCompany,
  cityCompany,
  addressCompany,
  filaCompany;
const API_COMPANY = localStorage.getItem("API");
const TOKEN_COMPANY = localStorage.getItem("token");

const formCompany = document.getElementById("formCompany");
const modalCompany = document.getElementById("modalCompany");
const modalHeaderCompay = document.querySelector(".modal-header-company");
const modalTitleCompany = document.querySelector(".modal-title-company");
const inputIdCompany = document.getElementById("companyId");
const inputNameCompany = document.getElementById("companyName");
const selectCityCompany = document.getElementById("companyCity");
const inputEmailCompany = document.getElementById("companyEmail");
const inputAddressCompany = document.getElementById("companyAddress");
const menuCompany = document.querySelector(".menuCompany");

if (menuCompany) {
  menuCompany.addEventListener("click", async () => {
    await renderTableCompany();
  });
}

async function renderDataCompany() {
  const getCompanys = await fetch(`${API_COMPANY}/company`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + TOKEN_COMPANY,
    },
  });
  const companys = await getCompanys.json();
  return companys.data;
}

async function createdCompany(company) {
  const createCompany = await fetch(`${API_COMPANY}/company`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + TOKEN_COMPANY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: company.name,
      email: company.email,
      address: company.address,
      cityId: +company.cityId,
    }),
  });
  const result = await createCompany.json();
  return result;
}

async function getCompanyName(name) {
  const getCompany = await fetch(`${API_COMPANY}/company?name=${name}`, {
    headers: {
      Authorization: "Bearer " + TOKEN_COMPANY,
    },
  });
  const company = await getCompany.json();
  return company;
}

async function getCitys() {
  const getCity = await fetch(`${API_COMPANY}/city`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + TOKEN_COMPANY,
    },
  });
  const result = await getCity.json();
  return result.data;
}

async function updatedCompany(company) {
  const updateCompany = await fetch(`${API_COMPANY}/company/${company.id}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + TOKEN_COMPANY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: company.name,
      email: company.email,
      cityId: company.cityId,
      address: company.address,
    }),
  });
  const result = await updateCompany.json();
  return result;
}

async function deletedCompany(id) {
  const deleteCompany = await fetch(`${API_COMPANY}/company/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + TOKEN_COMPANY,
    },
  });
  const result = await deleteCompany.json();
  return result;
}

async function renderOptionCitys(id) {
  const city = await getCitys();
  const delOption = selectCityCompany.querySelectorAll("option");

  if (delOption.length > 0) {
    delOption.forEach((op) => op.parentElement.removeChild(op));
  }

  const optionCity = document.createElement("option");
  const textOptionCity = document.createTextNode("Seleccionar city");
  optionCity.appendChild(textOptionCity);
  selectCityCompany.appendChild(optionCity);

  city.forEach((ci) => {
    const option = document.createElement("option");
    const textOption = document.createTextNode(ci.name);
    option.value = ci.id;
    option.appendChild(textOption);
    if (id) {
      if (ci.id === id) {
        option.selected = true;
      }
    }
    selectCityCompany.appendChild(option);
  });
}

async function renderTableCompany() {
  $(".contenedor-table").empty();
  $(".contenedor-table").append(`
    <div class="container-fluid">
      <button id="btnCrearCompany" class="btn btn-dark mt-2">Crear Company</button>
      <br>
      <br>
      <div class="row">
        <div class="col">
          <table id="tableCompany" class="table table-striped table-bordered" style="width:100%;">
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
  const companys = await renderDataCompany();
  $("#tableCompany").DataTable({
    data: companys,
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
          "<div class='text-center'><div class='btn-group'><button class='btn btn-info btn-sm btnEditarCompany'>Editar</button><button class='btn btn-danger btn-sm btnBorrarCompany'>Borrar</button></div></div>",
      },
    ],
    columnDefs: [
      {
        targets: 0,
        data: "id",
        render: function (data) {
          return '<input type="checkbox" data-idcompany="' + data.id + '"/>';
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
$(document).on("click", "#btnCrearCompany", async function () {
  opcionCompany = "crear";
  idCompany = null;
  formCompany.reset();
  modalHeaderCompay.style.backgroundColor = "#23272b";
  modalHeaderCompay.style.color = "#FFFFFF";
  modalTitleCompany.innerHTML = "Crear Compañía";
  $(modalCompany).modal("show");
  await renderOptionCitys();
});

//EDITAR
$(document).on("click", ".btnEditarCompany", function () {
  opcionCompany = "editar";
  filaCompany = this.closest("tr");
  idCompany = +filaCompany
    .getElementsByTagName("td")[0]
    .querySelector("input")
    .dataset.idcompany.trim();
  nameCompany = filaCompany.getElementsByTagName("td")[1].innerHTML.trim();
  emailCompany = filaCompany.getElementsByTagName("td")[2].innerHTML.trim();
  cityCompany = +filaCompany.getElementsByTagName("td")[3].querySelector("span")
    .dataset.idcity;
  addressCompany = filaCompany.getElementsByTagName("td")[4].innerHTML.trim();

  inputIdCompany.value = idCompany;
  inputNameCompany.value = nameCompany;
  selectCityCompany.value = cityCompany;
  inputEmailCompany.value = emailCompany;
  inputAddressCompany.value = addressCompany;

  modalHeaderCompay.style.backgroundColor = "#7303c0";
  modalHeaderCompay.style.color = "#FFFFFF";
  modalTitleCompany.innerHTML = "Editar Company";
  renderOptionCitys(cityCompany);
  $(modalCompany).modal("show");
});

//BORRAR
$(document).on("click", ".btnBorrarCompany", async function () {
  filaCompany = this.closest("tr");
  idCompany = +filaCompany
    .getElementsByTagName("td")[0]
    .querySelector("input")
    .dataset.idcompany.trim();
  Swal.fire({
    title: "¿Confirma eliminar el registro?",
    showCancelButton: true,
    confirmButtonText: `Confirmar`,
  }).then(async (result) => {
    if (result.isConfirmed) {
      const deleteCompany = await deletedCompany(idCompany);
      if (deleteCompany.status === 200) {
        Swal.fire("¡Registro Eliminado!", "", "success");
        await renderTableCompany();
      } else {
        Swal.fire("!No se pudo eliminar el registro!", "", "error");
        await renderTableCompany();
      }
    }
  });
});

//submit para el CREAR y EDITAR
formCompany.addEventListener("submit", async (e) => {
  e.preventDefault();
  const company = {
    id: +inputIdCompany.value.trim(),
    name: inputNameCompany.value.trim(),
    cityId: +selectCityCompany.value.trim(),
    email: inputEmailCompany.value.trim(),
    address: inputAddressCompany.value.trim(),
  };
  if (opcionCompany === "crear") {
    const companyCreated = await createdCompany(company);
    if (companyCreated.status === 201) {
      Swal.fire("!Registro creado!", "", "success");
      await renderTableCompany();
    } else {
      Swal.fire("!Error", "", "error");
      await renderTableCompany();
    }
  }
  if (opcionCompany === "editar") {
    const companyUpdated = await updatedCompany(company);
    if (companyUpdated.status === 200) {
      Swal.fire("!Registro actualizado!", "", "success");
      await renderTableCompany();
    } else {
      Swal.fire("!Error", "", "error");
      await renderTableCompany();
    }
  }
  $(modalCompany).modal("hide");
});

//validar si existe EMAIL
inputNameCompany.addEventListener("blur", async () => {
  nameCompany = inputNameCompany.value.trim();
  if (nameCompany !== "") {
    const validNameCompany = await getCompanyName(nameCompany);
    const span = document.createElement("span");
    const textSpan = document.createTextNode("Company ya existe");
    span.append(textSpan);
    span.classList = "btn-danger";
    const br = document.createElement("br");
    if (validNameCompany.status === 200) {
      inputNameCompany.after(span, br);
      setTimeout(() => {
        span.remove();
        br.remove();
        inputNameCompany.value = "";
      }, 3000);
    }
  }
});
