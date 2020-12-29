const API = sessionStorage.getItem('API');
const TOKEN = sessionStorage.getItem('token');

const endpoint = {
  userLogin: async (email, password) => {
    const data = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const result = await data.json();
    return result;
  },
  renderDataUsers: async () => {
    const getUsers = await fetch(`${API}/users`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + TOKEN,
      },
    });
    const users = await getUsers.json();
    return users.data;
  },
  createdUser: async (user) => {
    const createUser = await fetch(`${API}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        rol: user.rol,
      }),
    });
    const result = await createUser.json();
    return result;
  },
  getUserEmail: async (email) => {
    const getUser = await fetch(`${API}/users?email=${email}`, {
      headers: {
        Authorization: 'Bearer ' + TOKEN,
      },
    });
    const user = await getUser.json();
    return user;
  },
  updatedUser: async (user) => {
    const updateUser = await fetch(`${API}/users/${user.id}`, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        rol: user.rol,
      }),
    });
    const result = await updateUser.json();
    return result;
  },
  deletedUser: async (id) => {
    const deleteUser = await fetch(`${API}/users/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + TOKEN,
      },
    });
    const result = await deleteUser.json();
    return result;
  },
  getAllRegion: async () => {
    const data = await fetch(`${API}/regions`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + TOKEN,
      },
    });
    const regions = await data.json();
    return regions.data;
  },
  getAllCountry: async (id) => {
    const data = await fetch(`${API}/countries?regionId=${id}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + TOKEN,
      },
    });
    const countrys = await data.json();
    return countrys.data;
  },
  getAllCity: async (id) => {
    const data = await fetch(`${API}/cities?countryId=${id}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + TOKEN,
      },
    });
    const citys = await data.json();
    return citys.data;
  },
  getNameReCoCi: async (name, url) => {
    const data = await fetch(`${API}/${url}?name=${name}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + TOKEN,
      },
    });
    const result = await data.json();
    return result;
  },
  createdRegion: async (region) => {
    const createRegion = await fetch(`${API}/regions`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: region.name,
      }),
    });
    const result = await createRegion.json();
    return result;
  },
  createdCountry: async (country) => {
    const createCountry = await fetch(`${API}/countries`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        regionId: +country.regionId,
        name: country.name,
      }),
    });
    const result = await createCountry.json();
    return result;
  },
  createdCity: async (city) => {
    const createCity = await fetch(`${API}/cities`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        countryId: +city.countryId,
        name: city.name,
      }),
    });
    const result = await createCity.json();
    return result;
  },
  updatedCountry: async (country) => {
    const updateCountry = await fetch(`${API}/countries/${country.idCountry}`, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        regionId: +country.regionId,
        name: country.name,
      }),
    });
    const result = await updateCountry.json();
    return result;
  },
  updatedCity: async (city) => {
    const updateCity = await fetch(`${API}/cities/${city.idCity}`, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        countryId: +city.countryId,
        name: city.name,
      }),
    });
    const result = await updateCity.json();
    return result;
  },
  deletedRegion: async (id) => {
    const deleteRegion = await fetch(`${API}/regions/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + TOKEN,
      },
    });
    const result = await deleteRegion.json();
    return result;
  },
  deletedCountry: async (id) => {
    const deleteCountry = await fetch(`${API}/countries/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + TOKEN,
      },
    });
    const result = await deleteCountry.json();
    return result;
  },
  deletedCity: async (id) => {
    const deleteCity = await fetch(`${API}/cities/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + TOKEN,
      },
    });
    const result = await deleteCity.json();
    return result;
  },
  renderDataContact: async () => {
    const getContacts = await fetch(`${API}/contacts`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + TOKEN,
      },
    });
    const contacts = await getContacts.json();
    return contacts.data;
  },
  createdContact: async (contact) => {
    const createContact = await fetch(`${API}/contacts`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: contact.name,
        lastname: contact.lastname,
        position: contact.position,
        email: contact.email,
        companyId: contact.companyId,
        regionId: contact.regionId,
        countryId: contact.countryId,
        cityId: +contact.cityId,
        address: contact.address,
        interests: contact.interests,
        channelId: contact.channelId,
        useraccount: contact.useraccount,
        preferencesId: contact.preferencesId,
      }),
    });
    const result = await createContact.json();
    return result;
  },
  getContactEmail: async (email) => {
    const getContact = await fetch(`${API}/contacts?email=${email}`, {
      headers: {
        Authorization: 'Bearer ' + TOKEN,
      },
    });
    const contact = await getContact.json();
    return contact;
  },
  getCompanys: async () => {
    const getCompany = await fetch(`${API}/companies`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + TOKEN,
      },
    });
    const result = await getCompany.json();
    return result.data;
  },
  getRegions: async () => {
    const getRegion = await fetch(`${API}/regions`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + TOKEN,
      },
    });
    const result = await getRegion.json();
    return result.data;
  },
  getCountrys: async () => {
    const getCountry = await fetch(`${API}/countries`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + TOKEN,
      },
    });
    const result = await getCountry.json();
    return result.data;
  },
  getCountrysRegionId: async (id) => {
    const getCountry = await fetch(`${API}/countries?regionId=${id}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + TOKEN,
      },
    });
    const result = await getCountry.json();
    return result.data;
  },
  getCitys: async () => {
    const getCity = await fetch(`${API}/cities`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + TOKEN,
      },
    });
    const result = await getCity.json();
    return result.data;
  },
  getCitysContactCountryId: async (id) => {
    const getCity = await fetch(`${API}/cities?countryId=${id}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + TOKEN,
      },
    });
    const result = await getCity.json();
    return result.data;
  },
  getChannels: async () => {
    const getChannel = await fetch(`${API}/channels`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + TOKEN,
      },
    });
    const result = await getChannel.json();
    return result.data;
  },
  getPreferences: async () => {
    const getPreference = await fetch(`${API}/preferences`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + TOKEN,
      },
    });
    const result = await getPreference.json();
    return result.data;
  },
  updatedContact: async (contact) => {
    const updateContact = await fetch(`${API}/contacts/${contact.id}`, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: contact.name,
        lastname: contact.lastname,
        position: contact.position,
        email: contact.email,
        companyId: contact.companyId,
        regionId: contact.regionId,
        countryId: contact.countryId,
        cityId: +contact.cityId,
        address: contact.address,
        interests: contact.interests,
        channelId: contact.channelId,
        useraccount: contact.useraccount,
        preferencesId: contact.preferencesId,
      }),
    });
    const result = await updateContact.json();
    return result;
  },
  deletedContact: async (id) => {
    const deleteContact = await fetch(`${API}/contacts/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + TOKEN,
      },
    });
    const result = await deleteContact.json();
    return result;
  },
  renderDataCompany: async () => {
    const getCompanys = await fetch(`${API}/companies`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + TOKEN,
      },
    });
    const companys = await getCompanys.json();
    return companys.data;
  },
  createdCompany: async (company) => {
    const createCompany = await fetch(`${API}/companies`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: company.name,
        email: company.email,
        regionId: company.regionId,
        countryId: company.countryId,
        cityId: company.cityId,
        address: company.address,
      }),
    });
    const result = await createCompany.json();
    return result;
  },
  getCompanyName: async (name) => {
    const getCompany = await fetch(`${API}/companies?name=${name}`, {
      headers: {
        Authorization: 'Bearer ' + TOKEN,
      },
    });
    const company = await getCompany.json();
    return company;
  },
  updatedCompany: async (company) => {
    const updateCompany = await fetch(`${API}/companies/${company.id}`, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: company.name,
        email: company.email,
        regionId: company.regionId,
        countryId: company.countryId,
        cityId: company.cityId,
        address: company.address,
      }),
    });
    const result = await updateCompany.json();
    return result;
  },
  deletedCompany: async (id) => {
    const deleteCompany = await fetch(`${API}/companies/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + TOKEN,
      },
    });
    const result = await deleteCompany.json();
    return result;
  },
};

export default endpoint;
