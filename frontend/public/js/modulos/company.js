'use strict';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Swal from 'sweetalert2';
import endpoint from './api';
import functions from './functions';

let opcionCompany = null;
let idCompany,
  nameCompany,
  emailCompany,
  regionCompany,
  countryCompany,
  cityCompany,
  addressCompany,
  filaCompany;

const formCompany = document.getElementById('formCompany');
const modalCompany = document.getElementById('modalCompany');
const modalHeaderCompay = document.querySelector('.modal-header-company');
const modalTitleCompany = document.querySelector('.modal-title-company');
const inputIdCompany = document.getElementById('companyId');
const inputNameCompany = document.getElementById('companyName');
const selectRegionCompany = document.getElementById('companyRegion');
const selectCountryCompany = document.getElementById('companyCountry');
const selectCityCompany = document.getElementById('companyCity');
const inputEmailCompany = document.getElementById('companyEmail');
const inputAddressCompany = document.getElementById('companyAddress');
const menuCompany = document.querySelector('.menuCompany');
const contenedorTableCompany = document.querySelector('.contenedor-table');

if (contenedorTableCompany) {
  contenedorTableCompany.addEventListener('click', (e) => {
    const tagName = e.target;
    if (tagName.classList.contains('btnCrearCompany')) {
      createdCompanyId();
    }
    if (tagName.classList.contains('btnEditarCompany')) {
      editCompanyId(e);
    }
    if (tagName.classList.contains('btnBorrarCompany')) {
      deletedCompanyId(e);
    }
  });
}

if (menuCompany) {
  menuCompany.addEventListener('click', async () => {
    await renderTableCompany();
  });
}

async function renderTableCompany() {
  $('.contenedor-table').empty();
  $('.contenedor-table').append(`
    <div class="container-fluid">
      <button id="btnCrearCompany" class="btn btn-dark mt-2 btnCrearCompany">Crear Compañía</button>
      <br>
      <br>
      <div class="row">
        <div class="col">
          <table id="tableCompany" class="table table-striped table-bordered" style="width:100%;">
            <thead>
              <tr>
                <th><input type="checkbox"></th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Región</th>
                <th>País</th>
                <th>Ciudad</th>
                <th>Dirección</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>  
    </div>
  `);
  const companys = await endpoint.renderDataCompany();
  $('#tableCompany').DataTable({
    data: companys,
    deferRender: true,
    retrieve: true,
    proccesing: true,
    iDisplayLength: 10,
    destroy: true,
    dom: 'Bfrtilp',
    buttons: functions.buttonsTable,
    responsive: true,
    order: [],
    columns: [
      {
        data: null,
      },
      { data: 'name' },
      { data: 'email' },
      { data: null },
      { data: null },
      { data: null },
      { data: 'address' },
      {
        defaultContent:
          "<div class='text-center'><div class='btn-group'><button class='btn btn-info btn-sm btnEditarCompany'>Editar</button><button class='btn btn-danger btn-sm btnBorrarCompany'>Borrar</button></div></div>",
      },
    ],
    columnDefs: [
      {
        targets: 0,
        data: 'id',
        render: function (data) {
          return '<input type="checkbox" data-idcompany="' + data.id + '"/>';
        },
      },
      {
        targets: 3,
        data: 'City',
        render: function (data) {
          if (data.City) {
            return (
              '<span data-idregion="' +
              data.City.Country.Region.id +
              '">' +
              data.City.Country.Region.name +
              '</span>'
            );
          } else {
            return '<span></span>';
          }
        },
      },
      {
        targets: 4,
        data: 'City',
        render: function (data) {
          if (data.City) {
            return (
              '<span data-idcountry="' +
              data.City.Country.id +
              '">' +
              data.City.Country.name +
              '</span>'
            );
          } else {
            return '<span></span>';
          }
        },
      },
      {
        targets: 5,
        data: 'City',
        render: function (data) {
          if (data.City) {
            return (
              '<span data-idcity="' +
              data.City.id +
              '">' +
              data.City.name +
              '</span>'
            );
          } else {
            return '<span></span>';
          }
        },
      },
    ],
  });
}

//CREAR
async function createdCompanyId() {
  opcionCompany = 'crear';
  idCompany = null;
  formCompany.reset();
  modalHeaderCompay.style.backgroundColor = '#23272b';
  modalHeaderCompay.style.color = '#FFFFFF';
  modalTitleCompany.innerHTML = 'Crear Compañía';
  $(modalCompany).modal('show');
  const regions = await endpoint.getRegions();
  functions.renderOptionSelect(
    selectRegionCompany,
    regions,
    '',
    'Seleccionar región'
  );
}

if (selectRegionCompany) {
  selectRegionCompany.addEventListener('change', async () => {
    const id = selectRegionCompany.value;
    const countrys = await endpoint.getCountrysRegionId(id);
    functions.renderOptionSelect(
      selectCountryCompany,
      countrys,
      '',
      'Seleccionar país'
    );
  });
}

if (selectCountryCompany) {
  selectCountryCompany.addEventListener('change', async () => {
    const id = selectCountryCompany.value;
    const citys = await endpoint.getCitysContactCountryId(id);
    functions.renderOptionSelect(
      selectCityCompany,
      citys,
      '',
      'Seleccionar ciudad'
    );
  });
}

//EDITAR
async function editCompanyId(e) {
  opcionCompany = 'editar';
  filaCompany = e.path[4];
  idCompany = +filaCompany
    .getElementsByTagName('td')[0]
    .querySelector('input')
    .dataset.idcompany.trim();
  nameCompany = filaCompany.getElementsByTagName('td')[1].innerHTML.trim();
  emailCompany = filaCompany.getElementsByTagName('td')[2].innerHTML.trim();
  regionCompany = +filaCompany
    .getElementsByTagName('td')[3]
    .querySelector('span').dataset.idregion;
  countryCompany = +filaCompany
    .getElementsByTagName('td')[4]
    .querySelector('span').dataset.idcountry;
  cityCompany = +filaCompany.getElementsByTagName('td')[5].querySelector('span')
    .dataset.idcity;
  addressCompany = filaCompany.getElementsByTagName('td')[6].innerHTML.trim();

  inputIdCompany.value = idCompany;
  inputNameCompany.value = nameCompany;
  selectRegionCompany.value = regionCompany;
  selectCountryCompany.value = countryCompany;
  selectCityCompany.value = cityCompany;
  inputEmailCompany.value = emailCompany;
  inputAddressCompany.value = addressCompany;

  modalHeaderCompay.style.backgroundColor = '#17A2B8';
  modalHeaderCompay.style.color = '#FFFFFF';
  modalTitleCompany.innerHTML = 'Editar Compañía';

  const regions = await endpoint.getRegions();
  functions.renderOptionSelect(
    selectRegionCompany,
    regions,
    regionCompany,
    'Seleccionar región'
  );
  const countrys = await endpoint.getCountrys();
  functions.renderOptionSelect(
    selectCountryCompany,
    countrys,
    countryCompany,
    'Seleccionar país'
  );
  const citys = await endpoint.getCitys();
  functions.renderOptionSelect(
    selectCityCompany,
    citys,
    cityCompany,
    'Seleccionar ciudad'
  );

  $(modalCompany).modal('show');
}

//BORRAR
async function deletedCompanyId(e) {
  filaCompany = e.path[4];
  idCompany = +filaCompany
    .getElementsByTagName('td')[0]
    .querySelector('input')
    .dataset.idcompany.trim();
  Swal.fire({
    title: '¿Confirma eliminar el registro?',
    showCancelButton: true,
    confirmButtonText: `Confirmar`,
  }).then(async (result) => {
    if (result.isConfirmed) {
      const deleteCompany = await endpoint.deletedCompany(idCompany);
      if (deleteCompany.status === 200) {
        Swal.fire('¡Registro Eliminado!', '', 'success');
        await renderTableCompany();
      } else {
        Swal.fire('!No se pudo eliminar el registro!', '', 'error');
        await renderTableCompany();
      }
    }
  });
}

//submit para el CREAR y EDITAR
formCompany.addEventListener('submit', async (e) => {
  e.preventDefault();
  const company = {
    id: +inputIdCompany.value.trim(),
    name: inputNameCompany.value.trim(),
    email: inputEmailCompany.value.trim(),
    regionId: +selectRegionCompany.value.trim(),
    countryId: +selectCountryCompany.value.trim(),
    cityId: +selectCityCompany.value.trim(),
    address: inputAddressCompany.value.trim(),
  };
  if (opcionCompany === 'crear') {
    const companyCreated = await endpoint.createdCompany(company);
    if (companyCreated.status === 201) {
      Swal.fire('!Registro creado!', '', 'success');
      await renderTableCompany();
    } else {
      Swal.fire('!Error', '', 'error');
      await renderTableCompany();
    }
  }
  if (opcionCompany === 'editar') {
    const companyUpdated = await endpoint.updatedCompany(company);
    if (companyUpdated.status === 200) {
      Swal.fire('!Registro actualizado!', '', 'success');
      await renderTableCompany();
    } else {
      Swal.fire('!Error', '', 'error');
      await renderTableCompany();
    }
  }
  $(modalCompany).modal('hide');
});

//validar si existe EMAIL
inputNameCompany.addEventListener('blur', async () => {
  nameCompany = inputNameCompany.value.trim();
  if (nameCompany !== '') {
    const validNameCompany = await endpoint.getCompanyName(nameCompany);
    functions.renderSpanError(
      validNameCompany,
      inputNameCompany,
      'Compañía ya existe'
    );
  }
});

export default renderTableCompany;
