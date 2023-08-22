# Employee Review System Documentation

Welcome to the documentation for the **Employee Review System**, an application that enables employees to provide feedback on each other's performance. This documentation will guide you through the various features and functionalities of the application.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Usage](#usage)
7. [Authentication](#authentication)
8. [Database](#database)
9. [Sessions and Cookies](#sessions-and-cookies)
10. [Frontend](#frontend)
11. [MVC Architecture](#mvc-architecture)
12. [Contributing](#contributing)
13. [License](#license)

## 1. Introduction <a name="introduction"></a>

The **Employee Review System** is an application designed to facilitate the process of providing and managing performance feedback among employees. The system allows administrators to manage employees, performance reviews, and feedback assignments.

## 2. Features <a name="features"></a>

The Employee Review System boasts the following features:

- Admin can add, view, update, and delete employee profiles.
- Admin can add, view, and update performance reviews.
- Admin can assign performance reviews to other employees for feedback submission.

## 3. Technology Stack <a name="technology-stack"></a>

The application has been developed using the following technologies:

- Node.js: JavaScript runtime environment
- Express.js: Web application framework for Node.js
- EJS (Embedded JavaScript): Template engine for building dynamic HTML templates
- Passport.js: Authentication middleware for Node.js
- MongoDB: NoSQL database for data storage
- Express Router: Handling routes in the application
- Express Session: Middleware for creating and managing user sessions
- Cookies: Storing session-related information in the browser

## 4. Installation <a name="installation"></a>

To install and run the Employee Review System locally, follow these steps:

1. Clone the repository: `git clone https://github.com/yourusername/Employee-Review-System.git`
2. Navigate to the project directory: `cd Employee-Review-System`
3. Install dependencies: `npm install`

## 5. Configuration <a name="configuration"></a>

Before running the application, you need to configure the database connection and other settings. Create a `.env` file in the project root and add the following:
```
CONNECTION_STRING = "your_mongodb_connection_string"
SESSION_SECRET = "your_secret" //Replace your_secret with a strong secret key for session encryption.
PORT = 8000 //whichever port you wish to run the application
```

## 6. Usage <a name="usage"></a>

To start the application, run: `npm start`

The application will be accessible at: `http://localhost:PORT` PORT specified by you

## 7. Authentication <a name="authentication"></a>

The application uses Passport.js for authentication. Users can sign up and log in to access the system. Only authenticated users (admin) can manage employees and reviews.

## 8. Database <a name="database"></a>

The application utilizes MongoDB for data storage. Employee profiles, performance reviews, and user authentication data are stored in the database.

## 9. Sessions and Cookies <a name="sessions-and-cookies"></a>

Express Session and Cookies are used for managing user sessions. Sessions are created on the server, and session-related information is stored in cookies on the user's browser.


## 10. Frontend <a name="frontend"></a>

The frontend of the application is built using EJS templates. The views are designed to provide a user-friendly interface for managing employees, reviews, and assignments.

## 11. MVC Architecture <a name="mvc-architecture"></a>

The application follows the Model-View-Controller (MVC) architectural pattern. This separation of concerns ensures code modularity and maintainability.

## 12. Contributing <a name="contributing"></a>

Contributions to the project are welcome! If you'd like to contribute, please follow the guidelines outlined in the CONTRIBUTING.md file.

## 13. License <a name="license"></a>

The Employee Review System is open-source software licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

Thank you for choosing the Employee Review System! If you have any questions or need further assistance, please don't hesitate to reach out to our support team or refer to the documentation above.
