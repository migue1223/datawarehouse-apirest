# Delilah Restó API

Proyecto Backend del curso de Desarrollo Web Full Stack de Acámica.

## Tecnologías utilizadas

- Node.js
- Libreria Nodemon
- Libreria Express
- Libreria Sequelize
- Json Web Token (JWT)
- MySQL
- Postman
- Swagger

### Paso 1: Clonar Proyecto:

- Clonar repositorio desde el [siguiente link](https://github.com/migue1223/delilah_resto.git)

- Abrir terminal y ejecutar

- mkdir delilah_resto
- `git clone https://github.com/KaribelBT/delilah_resto.git`

### Paso 2: Instalar dependencias

- En el directorio raiz donde se clonó el proyecto ejecutar desde la terminal:

`npm install`

### Paso 3: Configurar variables de entorno

- Abrir el archivo `index.js` ubicado dentro de la carpeta `config` del proyecto clonado o crear el archivo .env
- Reemplazar todas las variables por la configuración de tu mysql y jwt secret

### Paso 4: Crear la base de datos

- Si no tiene instalado XAMPP, por favor dirigirse a [este link](https://www.apachefriends.org/es/index.html)
- Abrir XAMPP Panel Control, iniciar los servicios de Apache y MySQL y corroborar que el puerto sobre el cual se está ejecutando la base de datos es `3306`
- Si no encuentra XAMPP Panel de Control, por terminal ejecutar:
  `sudo /opt/lampp/lampp start`
- Ingresar desde el navegador a la ruta `http://localhost/phpmyadmin/index.php`
- Abrir el archivo `database.sql` ubicado dentro de la carpeta `data_base` del proyecto clonado
- Crear la base de datos, se puede importar el archivo o se puede copiar su contenido y pegar en la solapa de SQL
- Puede ejecutar npm run database para crear toda la base de datos desde la consola y esperar unos segundos mientras se configura todo

### Paso 5: Iniciar el servidor

- Desde la terminal ubicandose en la raiz del proyecto, ejecutar:

`npm run start`

### Paso 6: Hacer consultas a la API

- Si no tiene instalado Postman, por favor dirigirse a [este link](https://www.postman.com/downloads/)
- Abrir Postman, click en `File`, click en `Import`, click en `Import From Link` y pegar lo siguiente `https://www.getpostman.com/collections/9a92f21a4b944b211278`
- Hacer las consultas deseadas

## Documentación de la API

- Para ver la documentación de la API, puede abrir el archivo `swagger.json` ubicado en el directorio raiz del proyecto o puede poner en su navegador [este link](http://localhost:3000/api-docs) despues de iniciar el servidor o [estelink](https://app.swaggerhub.com/apis/migue1223/delilah-resto/1.0.0)
