'use strict';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const menuRegion = document.querySelector('.menuRegion');
if (menuRegion) {
  menuRegion.addEventListener('click', async () => {
    $('.contenedor-table').empty();
    $('.contenedor-table').append(`<div id="jstree"></div>`);

    await renderTreeRegion();
  });
}

const API_REGION = localStorage.getItem('API');
const TOKEN_REGION = localStorage.getItem('token');

async function getAllRegion() {
  const data = await fetch(`${API_REGION}/region`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + TOKEN_REGION,
    },
  });
  const regions = await data.json();
  return regions.data;
}

async function getAllCountry(id) {
  const data = await fetch(`${API_REGION}/country?regionId=${id}`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + TOKEN_REGION,
    },
  });
  const countrys = await data.json();
  return countrys.data;
}

async function getAllCity(id) {
  const data = await fetch(`${API_REGION}/city?countryId=${id}`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + TOKEN_REGION,
    },
  });
  const citys = await data.json();
  return citys.data;
}

async function renderTreeRegion() {
  const container = document.querySelector('.contenedor-table');

  const region = await getAllRegion();
  region.forEach((r) => {
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    h2.innerHTML = r.name;
    h2.setAttribute('data-regid', r.id);
    div.classList = 'container-region';
    div.appendChild(h2);
    container.appendChild(div);
  });

  const idsRegions = document.querySelectorAll('.container-region h2');
  idsRegions.forEach(async (co) => {
    const data = await getAllCountry(+co.dataset.regid);
    data.forEach((d) => {
      const div = document.createElement('div')
      div.classList = 'container-country'
      const span = document.createElement('span');
      span.innerHTML = d.name;
      span.setAttribute('data-country-id', d.id);
      div.appendChild(span)
      if (+co.dataset.regid === +d.Region.id) {
        co.parentElement.appendChild(div);
      }
    });
  });

  const idsCountrys = document.querySelectorAll('.container-country span')
}
