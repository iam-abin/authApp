# UserApp

This is a user application where users can signup, verify and view their profile.
(Error catching is the async functions are done using 'express-async-errors').

## Prerequisites

Make sure you have the following installed on your system:

-   Vscode
-   Node.js
-   Mongodb

## Installation

1. Clone the repository:

```
git clone https://github.com/iam-abin/authApp.git
```

2. Navigate to the project directory:

```
cd authApp
```

3. Install the dependencies:

```
npm install 
```

4. Set up the required environment variables. Rename the `.env.example` file to `.env.development` or `.env.production` or create both and provide the necessary values for the environment.

5. Start server (Running the app):
***for development environment***
```
 npm run dev
```

or
***for production environment***
```
 npm run build
```

```
 npm start
```

6. In postman access the application by using,

```
http://localhost:5000/api/*
```


## using Makefile commands
- Here we use 'make' keyword to execute commands.

- To see all available commands:
```
make help
```
- To start the development services:
```
make up-dev
```
- To stop the development services:
```
make down-dev
```
- like this we can use other commands


## Api Doc

- swagger 

```
http://localhost:5000/api/docs
```

- postman

https://documenter.getpostman.com/view/26404406/2sAXqmAjrD



## migrations

- migration up

```
npx ts-migrate-mongoose up name_to_first_name_and_last_name --uri add_your_mongoURI
```

- migration down

```
npx ts-migrate-mongoose down name_to_first_name_and_last_name --uri add_your_mongoURI
```