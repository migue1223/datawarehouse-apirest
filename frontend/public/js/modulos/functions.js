import renderTableUsers from './user';
import renderTableCompany from './company';
import renderTableContact from './contact';
import renderTreeRegion from './region';

const functions = {
  renderOptionSelect: async (contenedor, data, id, title) => {
    const delOption = contenedor.querySelectorAll('option');

    if (delOption.length > 0) {
      delOption.forEach((op) => op.parentElement.removeChild(op));
    }

    const optionSelect = document.createElement('option');
    const textOptionSelect = document.createTextNode(title);
    optionSelect.appendChild(textOptionSelect);
    contenedor.appendChild(optionSelect);

    data.forEach((ci) => {
      const option = document.createElement('option');
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
  },
  renderSpanError: (getData, input, text) => {
    const span = document.createElement('span');
    const textSpan = document.createTextNode(text);
    span.append(textSpan);
    span.classList = 'btn-danger';
    const br = document.createElement('br');
    if (getData) {
      if (getData.status === 200) {
        input.after(span, br);
        setTimeout(() => {
          span.remove();
          br.remove();
          input.value = '';
        }, 2000);
      }
      if (
        getData.status === 403 ||
        getData.data === 'User or email does not exist'
      ) {
        input.before(span, br);
        setTimeout(() => {
          span.remove();
          br.remove();
          input.value = '';
        }, 2000);
      }
    }
  },
  buttonsTable: [
    {
      extend: 'copyHtml5',
      text: '<i class="fas fa-copy"></i>',
      titleAttr: 'Copy to clipboard',
      className: 'btn btn-warning btnButtonsTables',
    },
    {
      extend: 'csvHtml5',
      text: '<i class="fas fa-file-csv"></i>',
      titleAttr: 'Export to CSV file',
      className: 'btn btn-dark btnButtonsTables',
    },
    {
      extend: 'excelHtml5',
      text: '<i class="fas fa-file-excel"></i>',
      titleAttr: 'Export to Excel',
      className: 'btn btn-success btnButtonsTables',
    },
    {
      extend: 'pdfHtml5',
      text: '<i class="fas fa-file-pdf"></i>',
      titleAttr: 'Export to PDF',
      className: 'btn btn-danger btnButtonsTables',
    },
    {
      extend: 'print',
      text: '<i class="fas fa-print"></i>',
      titleAttr: 'Print',
      className: 'btn btn-info btnButtonsTables',
    },
  ],
};

const url = window.location.href.split('#');
const userAdmin = JSON.parse(sessionStorage.getItem('user'));

if (url) {
  window.onload = async () => {
    if (url[1] === 'usuarios' && +userAdmin.isAdmin === 1) {
      await renderTableUsers();
    }
    if (url[1] === 'contactos') {
      await renderTableContact();
    }
    if (url[1] === 'companias') {
      await renderTableCompany();
    }
    if (url[1] === 'region-ciudad') {
      await renderTreeRegion();
    }
  };
}

export default functions;
