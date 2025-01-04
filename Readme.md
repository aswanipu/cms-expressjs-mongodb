# CMS (Content Management System) - Express.js, Node.js, and MongoDB

A powerful and scalable Content Management System (CMS) built using JavaScript, HTML, CSS, Express.js, Node.js, and MongoDB. This application enables seamless content creation, editing, and management, with robust user authentication and role-based access control.

## Features

- **Content Management**: Create, edit, and manage content with an intuitive interface.
- **User Authentication**: Secure login system with encrypted passwords.
- **Role-Based Access Control**: Define user roles with specific permissions.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.
- **Performance Optimizations**: Scalable backend architecture for high performance.
- **Security Enhancements**: Implements best practices to ensure data protection.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Express.js, Node.js
- **Database**: MongoDB

## Installation

Follow these steps to set up the project locally:

 **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/cms-expressjs-mongodb.git
   cd cms-expressjs-mongodb

1. To Run : npm start server
2. To do DB set up : http://localhost:3000/initialize
3. To go to admin panel : http://localhost:3000/login

        username: PageAdmin
        password: password


## Project structure 

1. helper folder - is used to save custom validation functions.
2. models folder - is used to save mongodb collection schemas.
3. public folder - is used to save static contents(css,images).
4. views folder-  is used to save ejs files and partial views. 
5. server.js - Entry point of the application. Used to save information of routing, path info and so on.

