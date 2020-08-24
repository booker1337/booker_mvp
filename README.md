# 📕 Booker 

# Contents
- [📕 Booker](#-booker)
- [Contents](#contents)
- [Contributing](#contributing)
- [Trello](#trello)
- [Documentation](#documentation)
- [Prerequisites](#prerequisites)
- [Frontend](#frontend)
	- [Commands](#commands)
		- [Starting the Server](#starting-the-server)
		- [Building the server](#building-the-server)
- [Backend](#backend)
	- [Commands](#commands-1)
		- [Starting the Server](#starting-the-server-1)
		- [Nodemon Startup](#nodemon-startup)
		- [Building & Moving Frontend](#building--moving-frontend)
		- [Pushing to Heroku](#pushing-to-heroku)
		- [Linting](#linting)
		- [Setting up Environment Variables](#setting-up-environment-variables)
			- [DB_URIs](#db_uris)
			- [JWT_SECRET](#jwt_secret)
			- [LOGGER_LEVEL](#logger_level)
	- [Initializing your Heroku app](#initializing-your-heroku-app)
		- [Logging in to Heroku](#logging-in-to-heroku)
		- [Creating a heroku app.](#creating-a-heroku-app)
		- [Real-time logs](#real-time-logs)
		- [Heroku Environment Variables](#heroku-environment-variables)
	- [Setting up Github Actions](#setting-up-github-actions)

# Contributing
[Read the CONTRIBUTING.md](./CONTRIBUTING.md)

# Trello
[Trello Link](https://trello.com/b/3iFDHmdb/booker)

# Documentation
- [API Docss](./docs/API.md)

# Prerequisites
Make sure you have Node.js installed

Make sure to change your `npm` shell to git's bash before running these commands

```
npm config set script-shell "C:\\Program Files\\git\\bin\\bash.exe"
```

# Frontend

## Commands
Make sure to be in the `/frontend` directory before running these commands

### Starting the Server
To start the webpack server in development mode
```
npm run start
```

### Building the server
To create an optimized build
```
npm run build
```

# Backend
## Commands
Make sure to be in the `/backend` directory before running these commands

### Starting the Server
This will install all node modules and run the server
```
npm run start
```

### Nodemon Startup
This will allow the server to restart upon any changes you make, useful for rapid development
```
npm run dev
```

### Building & Moving Frontend
This will build the frontend, and move it into the backend
```
npm run build:ui
```

### Pushing to Heroku
To only push the `backend` subtree to Heroku ([Read this first](#initializing-your-heroku-app))
```
npm run deploy
```

⚠ This isn't reccomended when you have many changes on the server, it's best to make two seperate commits ⚠

To build the frontend, commit, and push the `backend` subtree to Heroku
```
npm run deploy:full
```

### Linting
To check your code style
```
npm run lint
```
To check your code style and fix all errors which can be automatically fixed
```
npm run lint:fix
```

### Setting up Environment Variables
Go to [.env.example](./backend/.env.example), copy it, and rename the copy to `.env`
and fill out the .env variables
```
DB_URI="<insert your URI here>"
DB_TEST_URI="<insert your testing URI here>"
JWT_SECRET="<Insert random 64 bytes>"
```
For example:
```
DB_URI="mongodb+srv://user:pass@cluster.id.mongodb.net/dev?retryWrites=true"
DB_TEST_URI="mongodb+srv://user:pass@cluster.id.mongodb.net/test?retryWrites=true"
JWT_SECRET=<Insert random 64 bytes>
LOGGER_LEVEL="info"
```
#### DB_URIs
For the `DB_URI` and `DB_TEST_URI`, make sure they are seperate databases, signified by the end of the connection string `/dev` or `/test`.

#### JWT_SECRET
Make sure to generate 64 random bytes for the `JWT_SECRET`, or just run the server you can copy and paste the suggested `JWT_SECRET` into here.

#### LOGGER_LEVEL
All these options are case insensitive.

By default, the logger will always display `info` and `error` logs.

Setting this option to `silly` will show all logs, like requests and initial config

Setting it to `info` will make it only display vital information, like the initialization of the server, connection to the database

setting it to `error` will only display errors. This is reccomended to be set inside a testing environment.

⚠ Any other Non-empty strings will cause no logs to be displayed ⚠


## Initializing your Heroku app
If you haven't already, [Install Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli), and make a Heroku account

### Logging in to Heroku
```
heroku login
```

### Creating a heroku app.

This will add a `heroku` remote to your git remotes, which you can push to.
```
heroku create <name>
```

### Real-time logs
This will allow you to see any errors which may occur upon and after deployment
```
heroku logs -t
```

### Heroku Environment Variables
To set Environment variables in heroku,
```
heroku config:set <KEY>=<Value>
```
Example:
```
heroku config:set DATABASE_URI="mongodb+srv://username:password@cluster.id.mongodb.net/database?retryWrites=true"
```
Keep in mind that any `&` inside the command will cause it to break. 
For `&w=majority` in the `DATABASE_URI` the workaround is to set it by default upon connecting via mongoose

[Back to top](#contents)

## Setting up Github Actions
 To make Github Actions work on your fork (Highly recommended if you're changing anything big on the backend), you need to add the .env variables to the Secrets part in your repo

- Go to your fork's repo's settings
- Secrets
- Add `DB_TEST_URI`, which is your MongoDB URI, configured to use a testing database, if you need one send me or anyers a message and we'll give you it
- Add `JWT_SECRET`, run the backend without a JWT_SECRET and it'll generate 64 random bytes for you, which you can copy, but tbh you could get away with putting any string

Remember to put the secrets as plain strings without any quotation marks, else it'd break the tests. 
If you have any questions, feel free to ask Ryan.