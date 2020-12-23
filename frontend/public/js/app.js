import modal from "./funciones/modal.js";
import user from "./modulos/user.js";
import company from "./modulos/company.js";
import contact from "./modulos/contact.js";
import region from './modulos/region.js';

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpc0FkbWluIjoxLCJhY3RpdmUiOjEsImlhdCI6MTYwNzYzNTk3Nn0.Jk5ILEWv9qdohc98UIpPFjimXYewJp4xAZxsWmZcrCY";
localStorage.setItem("token", token);

const API = "http://localhost:3000";
localStorage.setItem("API", API);
