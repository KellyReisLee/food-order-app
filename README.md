<H1 align ="center" > 
FoodReact - Small food order MERN project </h1>
<h5  align ="center"> 
Project developed to exercise the use of Context API and useReducer, and also to train the deployment of a fullstack project. </h5>
<br/>

<h3>Description: </h3>
<h5  align ="center">Small food order website</h5>

- [Configuration and Setup](#configuration-and-setup)
- [Key Features](#key-features)
- [Technologies used](#technologies-used)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Database](#database)
- [📸 Screenshots](#screenshots)
- [Author](#author)

## Configuration and Setup

In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine.

- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)
- Split your terminal into two (run the Frontend on one terminal and the Backend on the other terminal)

In the first terminal

```
$ cd Frontend
$ npm install (to install frontend-side dependencies)
$ npm run start (to start the frontend) or npm run dev for vite projects.
```

In the second terminal

- cd Backend and Set environment variables in config.env under ./config
- Create your mongoDB connection url, which you'll use as your MONGO_URI
- Supply the following credentials

```
#  ---  Config.env  ---

NODE_ENV = development
PORT =3000
MONGO_URI = your own key from MongoDB


# --- Terminal ---

$ npm install (to install backend-side dependencies)
$ npm start (to start the backend)
```

## Key Features

- CRUD operations (GET Meals from database and POST Orders into database )
- Creating orders;
- Responsive Design

<br/>

## Technologies used

This project was created using the following technologies.

#### Frontend

- [React js ](https://www.npmjs.com/package/react) - JavaScript library that is used for building user interfaces specifically for single-page applications
- [React Hooks ](https://reactjs.org/docs/hooks-intro.html) - For managing and centralizing application state

#### Backend

- [Node js](https://nodejs.org/en/) -A runtime environment to help build fast server applications using JS
- [Express js](https://www.npmjs.com/package/express) -The server for handling and routing HTTP requests
- [Mongoose](https://mongoosejs.com/) - For modeling and mapping MongoDB data to JavaScript
- [Dotenv](https://www.npmjs.com/package/dotenv) - Zero Dependency module that loads environment variables
- [cors](https://www.npmjs.com/package/cors) - Provides a Connect/Express middleware

#### Database

- [MongoDB ](https://www.mongodb.com/) - It provides a free cloud service to store MongoDB collections.

## Screenshots

<h3>Main - Page</h3>
<a href="https://freeimage.host/"><img src="https://iili.io/JUMqbWl.png" alt="JUMqbWl.png" border="0" /></a>

---

<h3>Add meals into cart - Component</h3>
<a href="https://freeimage.host/"><img src="https://iili.io/JUMBNB2.png" alt="JUMBNB2.png" border="0" /></a>

---

<h3>Cart modal component</h3>
<a href="https://freeimage.host/"><img src="https://iili.io/JUMnEDG.png" alt="JUMnEDG.png" border="0" /></a>

---

<h3>Address modal component</h3>
<a href="https://freeimage.host/"><img src="https://iili.io/JUMnSxj.png" alt="JUMnSxj.png" border="0" /></a>

---

<h3>Checkout modal component</h3>
<a href="https://freeimage.host/"><img src="https://iili.io/JUMoxgS.png" alt="JUMoxgS.png" border="0" /></a>

---

---

## Author

- Portfolio: [kellywebdeveloper](https://kellydeveloper.vercel.app)
- Github: [KellyReisLee](https://github.com/KellyReisLee)
- Linkedin: [kellyreis-webdev](https://www.linkedin.com/in/kellyreis-webdev/)
