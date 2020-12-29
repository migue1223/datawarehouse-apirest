'use strict';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Swal from 'sweetalert2';
import endpoint from './api';
import functions from './functions';

let opcionRegCoCi = null;
let idRegCoCiId, nameRegCoCi, idRegion, idCountry, idCity;
const formRegCoCi = document.getElementById('formRegCoCi');
const modalRegCoCi = document.getElementById('modalRegCoCi');
const modalHeaderRegCoCi = document.querySelector('.modal-header-regcoci');
const modalTitleRegCoCi = document.querySelector('.modal-title-regcoci');
const inputNameRegCoCi = document.getElementById('regCoCiName');
const contenedorRegion = document.querySelector('.contenedor-table');
const menuRegion = document.querySelector('.menuRegion');

if (contenedorRegion) {
  contenedorRegion.addEventListener('click', (e) => {
    const tagName = e.target;
    if (
      tagName.classList.contains('btnAddRegion') ||
      tagName.classList.contains('btnAddCountry') ||
      tagName.classList.contains('btnAddCity')
    ) {
      createdRegCoCi(e);
    }
    if (
      tagName.classList.contains('btnEditCountry') ||
      tagName.classList.contains('btnEditCity')
    ) {
      editRegCoCi(e);
    }
    if (
      tagName.classList.contains('btnDeleteRegion') ||
      tagName.classList.contains('btnDeleteCountry') ||
      tagName.classList.contains('btnDeleteCity')
    ) {
      deletedCoCi(e);
    }
  });
}

if (menuRegion) {
  menuRegion.addEventListener('click', async () => {
    await renderTreeRegion();
  });
}

async function renderTreeRegion() {
  const removeContainer = document.querySelector('.contenedor-tree-region');
  if (removeContainer) {
    $('.contenedor-tree-region').remove();
  }
  $('.contenedor-table').empty();
  const container = document.querySelector('.contenedor-table');
  const containerTree = document.createElement('div');
  containerTree.classList = 'contenedor-tree-region';
  const btnAddRegion = document.createElement('button');
  btnAddRegion.classList = 'btn btn-dark btnAddRegion';
  btnAddRegion.innerHTML = 'Crear región';
  containerTree.appendChild(btnAddRegion);
  container.appendChild(containerTree);

  const region = await endpoint.getAllRegion();
  region.forEach((r) => {
    const div = document.createElement('div');
    const divButtons = document.createElement('div');
    const h2 = document.createElement('h2');
    const btnAdd = document.createElement('button');
    btnAdd.classList = 'btn btn-dark btnAddCountry';
    btnAdd.innerHTML = 'Crear país';
    h2.innerHTML = r.name;
    h2.setAttribute('data-regid', r.id);
    const icon = document.createElement('i');
    icon.classList = 'btnDeleteRegion fas fa-times';
    divButtons.appendChild(h2);
    divButtons.appendChild(icon);
    divButtons.appendChild(btnAdd);
    div.classList = 'container-region';
    div.appendChild(divButtons);
    containerTree.appendChild(div);
  });

  const idsRegions = document.querySelectorAll('.container-region h2');
  idsRegions.forEach(async (r) => {
    const data = await endpoint.getAllCountry(+r.dataset.regid);
    data.forEach((d) => {
      const div = document.createElement('div');
      div.classList = 'container-country';
      const ul = document.createElement('ul');
      ul.classList = 'ul-country';
      const h3 = document.createElement('h3');
      const span = document.createElement('span');
      const btnEdit = document.createElement('button');
      btnEdit.innerHTML = 'Editar';
      btnEdit.classList = 'btnEditCountry';
      const btnDelete = document.createElement('button');
      btnDelete.innerHTML = 'Eliminar';
      btnDelete.classList = 'btnDeleteCountry';
      h3.innerHTML = d.name;
      h3.setAttribute('data-coid', d.id);
      const btnAdd = document.createElement('button');
      btnAdd.classList = 'btn btn-dark btnAddCity';
      btnAdd.innerHTML = 'Crear ciudad';
      span.appendChild(h3);
      span.appendChild(btnEdit);
      span.append(btnDelete);
      div.appendChild(span);
      div.appendChild(btnAdd);
      div.appendChild(ul);
      if (+r.dataset.regid === +d.Region.id) {
        r.parentElement.appendChild(div);
      }
    });
  });

  setTimeout(() => {
    const idsCountrys = document.querySelectorAll('.container-country span h3');
    idsCountrys.forEach(async (c) => {
      const data = await endpoint.getAllCity(+c.dataset.coid);
      data.forEach((d) => {
        const li = document.createElement('li');
        li.classList = 'li-city';
        const btnEdit = document.createElement('button');
        btnEdit.classList = 'btn btn-info btnEditCity';
        const iconEdit = document.createElement('i');
        iconEdit.classList = 'fas fa-pencil-alt';
        btnEdit.appendChild(iconEdit);
        const btnDelete = document.createElement('button');
        btnDelete.classList = 'btn btn-danger btnDeleteCity';
        const iconDelete = document.createElement('i');
        iconDelete.classList = 'fas fa-times btnEditCity';
        btnDelete.appendChild(iconDelete);
        const span = document.createElement('span');
        span.innerHTML = d.name;
        span.setAttribute('data-citid', d.id);
        li.appendChild(span);
        li.appendChild(btnEdit);
        li.appendChild(btnDelete);
        if (+c.dataset.coid === +d.Country.id) {
          c.parentElement.parentElement.querySelector('ul').appendChild(li);
        }
      });
    });
  }, 500);
}

//CREAR
async function createdRegCoCi(e) {
  const title = e.target.innerHTML;
  opcionRegCoCi = title;
  if (title === 'Crear país') {
    idRegCoCiId = +e.path[1].querySelector('h2').dataset.regid;
  }
  if (title === 'Crear ciudad') {
    idCountry = +e.path[1].querySelector('span h3').dataset.coid;
  }
  formRegCoCi.reset();
  modalHeaderRegCoCi.style.backgroundColor = '#23272b';
  modalHeaderRegCoCi.style.color = '#FFFFFF';
  modalTitleRegCoCi.innerHTML = title;
  $(modalRegCoCi).modal('show');
}

//EDITAR
function editRegCoCi(e) {
  let title;
  if (e.target.classList.contains('btnEditCountry')) {
    title = 'Editar país';
    idRegCoCiId = +e.path[3].querySelector('h3').dataset.regid;
    idCountry = +e.path[1].querySelector('h3').dataset.coid;
    nameRegCoCi = e.path[1].querySelector('h3').innerHTML;
  }
  if (e.target.classList.contains('btnEditCity')) {
    title = 'Editar ciudad';
    idCity = +e.path[1].querySelector('span').dataset.citid;
    idCountry = +e.path[3].querySelector('span h3').dataset.coid;
    nameRegCoCi = e.path[1].querySelector('span').innerHTML;
  }

  inputNameRegCoCi.value = nameRegCoCi;
  opcionRegCoCi = title;
  modalHeaderRegCoCi.style.backgroundColor = '#17A2B8';
  modalHeaderRegCoCi.style.color = '#FFFFFF';
  modalTitleRegCoCi.innerHTML = title;
  $(modalRegCoCi).modal('show');
}

//BORRAR
async function deletedCoCi(e) {
  let title;
  if (e.target.classList.contains('btnDeleteRegion')) {
    idRegion = +e.path[1].querySelector('h2').dataset.regid;
    title = 'Eliminar región';
  }
  if (e.target.classList.contains('btnDeleteCountry')) {
    idCountry = +e.path[1].querySelector('h3').dataset.coid;
    title = 'Eliminar país';
  }
  if (e.target.classList.contains('btnDeleteCity')) {
    idCity = +e.path[1].querySelector('span').dataset.citid;
    title = 'Eliminar ciudad';
  }
  Swal.fire({
    title: '¿Confirma eliminar el registro?',
    showCancelButton: true,
    confirmButtonText: `Confirmar`,
  }).then(async (result) => {
    if (result.isConfirmed) {
      let deleteElement;
      if (title === 'Eliminar región') {
        deleteElement = await endpoint.deletedRegion(idRegion);
      }
      if (title === 'Eliminar país') {
        deleteElement = await endpoint.deletedCountry(idCountry);
      }
      if (title === 'Eliminar ciudad') {
        deleteElement = await endpoint.deletedCity(idCity);
      }
      if (deleteElement.status === 200) {
        Swal.fire('¡Registro Eliminado!', '', 'success');
        await renderTreeRegion();
      } else {
        Swal.fire('!No se pudo eliminar el registro!', '', 'error');
        await renderTreeRegion();
      }
    }
  });
}

//submit para el CREAR y EDITAR
formRegCoCi.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    regionId: +idRegCoCiId,
    countryId: +idCountry,
    cityId: +idCity,
    name: inputNameRegCoCi.value.trim(),
  };

  let createdUpdatedOpcion;
  if (opcionRegCoCi === 'Crear región') {
    createdUpdatedOpcion = await endpoint.createdRegion(data);
  }
  if (opcionRegCoCi === 'Crear país') {
    createdUpdatedOpcion = await endpoint.createdCountry(data);
  }
  if (opcionRegCoCi === 'Crear ciudad') {
    createdUpdatedOpcion = await endpoint.createdCity(data);
  }
  if (opcionRegCoCi === 'Editar país') {
    createdUpdatedOpcion = await endpoint.updatedCountry(data);
  }
  if (opcionRegCoCi === 'Editar ciudad') {
    createdUpdatedOpcion = await endpoint.updatedCity(data);
  }
  const status = +createdUpdatedOpcion.status;
  if (status === 201) {
    Swal.fire('!Registro creado!', '', 'success');
    $(modalRegCoCi).modal('hide');
    return await renderTreeRegion();
  }
  if (status === 200) {
    Swal.fire('!Registro actualizado!', '', 'success');
    $(modalRegCoCi).modal('hide');
    return await renderTreeRegion();
  }
  if (status !== 201 || status !== 200) {
    Swal.fire('!Error', '', 'error');
    await renderTreeRegion();
  }
  $(modalRegCoCi).modal('hide');
});

//validar si existe name Region, Country, City
inputNameRegCoCi.addEventListener('keyup', async () => {
  const name = inputNameRegCoCi.value.trim();
  let getName, title;
  if (name !== '') {
    if (opcionRegCoCi === 'Crear región') {
      getName = await endpoint.getNameReCoCi(name, 'regions');
      title = 'Región ya existe';
    }

    if (opcionRegCoCi === 'Crear país' || opcionRegCoCi === 'Editar país') {
      getName = await endpoint.getNameReCoCi(name, 'countries');
      title = 'País ya existe';
    }

    if (opcionRegCoCi === 'Crear ciudad' || opcionRegCoCi === 'Editar ciudad') {
      getName = await endpoint.getNameReCoCi(name, 'cities');
      title = 'Ciudad ya existe';
    }
  }

  functions.renderSpanError(getName, inputNameRegCoCi, title);
});

export default renderTreeRegion;
