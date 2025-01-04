
// Project- Custom Content Management System (CMS)


//Import modules

// Import the Express module
const express= require('express');
// Create instance
const cmsApp= express();
// Import the Path module from Node.js to work with file and directory paths
const path= require('node:path');
// Import check and validationResult methods from the express-validator module for input validation
const { check, validationResult} = require('express-validator');
//Import mongoose
const mongoose= require('mongoose');
//Import express-session
const session = require('express-session');
//Import express-fileupload
const fileUpload = require('express-fileupload');

//Set port number varable
const PORT = process.env.PORT || 3000;

// connect to database 
try {
    mongoose.connect('mongodb://localhost:27017/cms');
} catch (e) {
  throw new Error(e);
}

//Enable URL Encoded & Body data 
cmsApp.use(express.urlencoded({extended:false}));

//Set public folder path
cmsApp.use(express.static(__dirname+'/public'));

cmsApp.use(fileUpload());
//Session config
cmsApp.use(session({
    secret: 'mySecretPasswordCanNotRevealToYou', 
    saveUninitialized: true,
    resave: false
}));

// Set views path
cmsApp.set('views',path.join(__dirname+'/views'));

//Use EJS as the templating engine
cmsApp.set('view engine','ejs');

//Import pageInfo collection model
//const PageInfo = require('./models/pageInfo');

// Import the custom page inputs validation helper
const ValidatePageInput=require('./helpers/pageInputValidation'); 
// Import the custom login credentials validation helper
const validateuserCredentials = require('./helpers/userCredentialValidation'); 

// Import the route handlers
const initializeDB = require('./routes/initializeDB');
const handleLogin = require('./routes/handleLogin');
const handleLoginSetup = require('./routes/handleLoginSetup');
const handleLogout = require('./routes/handleLogout');
const handleAddPage = require('./routes/handleAddPage');
const handleAddPageView = require('./routes/handleAddPageView');
const handlePages = require('./routes/handlePages');
const handleDeletePage = require('./routes/handleDeletePage');
const handleEditPage = require('./routes/handleEditPage');
const handlePostEditPage = require('./routes/handlePostEditPage');
const handleDefault = require('./routes/handleDefault');
const handlePageNavigation = require('./routes/handlePageNavigation');

//Routes
// TODO : DB initialization
// 1. Insert admin username and password to DB
// Admin Credentials
// username: PageAdmin
// password: password
cmsApp.get("/initialize",initializeDB);

//TODO : Display Default view
// 1. GET all pages from DB
// 2. Send all pages and first page to create dynamic nav bar and content

cmsApp.get('/', handleDefault);

//TODO : Display particular page details

// 1. GET all pages from DB
// 2. Send all pages and selected page details back, to create dynamic nav bar and content
cmsApp.get('/page/:slug', handlePageNavigation);

// TODO : ADD Page View
// 1. If session isAdmin value is false redirect to login page
// 2. Else show add page view
cmsApp.get('/add', handleAddPageView);

// TODO : ADD Page
// 1. If session isAdmin value is false redirect to login page
// 2. Validate input values
// 3. If validation errors send it back
// 4. Else send success message
cmsApp.post('/add',ValidatePageInput(),handleAddPage);

// Display login page
cmsApp.get('/login', handleLogin);

//TODO : Login
// 1. Validate user credentials
// 2. If valid create session and send succeess message 
// 3. If not valid send error messge
cmsApp.post('/login', validateuserCredentials(), handleLoginSetup);

//  Display to all  page view to do the updation and delettion of pages
// 1. If session isAdmin value is false redirect to login page
cmsApp.get('/manage', handlePages);

// GET route to display the edit page form using id
// TODO : Update page
// 1. If session isAdmin value is false redirect to login page
// 2. Redirect to Edit page view
cmsApp.get('/edit-page/:id', ValidatePageInput(),handleEditPage);

// POST route to handle the edit page form submission using id
// TODO : Update page
// 1. If session isAdmin value is false redirect to login page
// 2. Save latest page details to DB using _id of the page
// 3. Redirect to All-pages view
cmsApp.post('/edit-page/:id', handlePostEditPage);

// TODO : Delete page
// 1. If session isAdmin value is false redirect to login page
// 2. Delete page details from DB using _id of the page
// 3. Redirect to All-pages view
cmsApp.get('/delete-page/:id', handleDeletePage);

// TODO : Logout
// 1. Clear session
// 2. Redirect to default view
cmsApp.get('/logout', handleLogout);

//Start server
cmsApp.listen(PORT, ()=> console.log(`Server is up and running on http://localhost:${PORT}`)
);