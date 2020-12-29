# Data Warehouse Desktop and API

FrontEnd and Backend Project of the Full Stack Web Development course by Acámica.

## Used technology

- Node.js
- Nodemon Library
- Express Library
- Sequelize Library
- Json Web Token (JWT)
- MySQL
- Postman
- Swagger
- Html
- Css
- JS

### Step 1: Clone Project:

- Clone repository from [next link](https://github.com/migue1223/datawarehouse.git)

- Open terminal and run:
mkdir datawarehouse
`git clone https://github.com/migue1223/datawarehouse.git`

### Step 2: Install dependencies

- In the root directory backend and frontend where the project was cloned run from the terminal:

`npm install`

### Step 3: Set environment variables

- Open file `index.js` located inside the folder `config` of the cloned project backend or create the file .env
- Replace all variables by your mysql and jwt secret configuration

### Step 4: Create the database

- If you do not have XAMPP installed, please go to [this link](https://www.apachefriends.org/es/index.html)
- Open XAMPP Panel Control, start the Apache and MySQL services and check that the port on which the database is running is `3306`
- If you cannot find XAMPP Control Panel, by terminal execute:
  `sudo /opt/lampp/lampp start`
- Enter the route from the browser `http://localhost/phpmyadmin/index.php`
- Open file `database.sql` located inside the folder `store` from the cloned project backend
- the file can be imported or its content can be copied and pasted into the SQL tab
- You can run `npm run database` from the project root backend to create the whole database from the console and wait a few seconds while everything is configured
- You can use HeidiSql, MySqlWorbench, DBeaver for database administration.

### Step 5: Start the server

- From the terminal located at the root of the project backend, execute:

`npm run start`

- From the terminal located at the root of the project frontend, views:

`open index.html`

### Step 6: Query the API

- If you do not have Postman installed, please go to [this link](https://www.postman.com/downloads/)
- Open Postman, click on `File`, click on `Import`, click on `Import From Link` and paste the following `https://www.getpostman.com/collections/466bcd40bb0cd600b26c`
- Make the desired queries
- Default user: user: admin, password: admin123

## API documentation

- To view the API documentation, you can open the file `swagger.json` located in the root directory of the project or you can put in your browser [this link](http://localhost:3000/api-docs)
