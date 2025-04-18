# Jokebook Usage Instructions

## Installation

1. Make sure you have [Node.js](https://nodejs.org/) installed on your system.

2. Clone the repository and navigate to the project directory.

3. Install the dependencies by running:

```
npm install
```

## Running the Server

Start the server by running:

```
nodemon server.js
```

By default, the server will listen on port 3000. You should see a message like:

```
App listening at http://localhost:3000
```

## Accessing Routes in the Browser

The routes are prefixed with `/jokebook`. You can access the following GET routes in your browser:

- Get all categories:  
  `http://localhost:3000/jokebook/categories`

- Get jokes by category (replace `:category` with a category name):  
  `http://localhost:3000/jokebook/joke/:category`

- Get a random joke:  
  `http://localhost:3000/jokebook/random`

## Adding a New Joke

To add a new joke, send a POST request to:

```
http://localhost:3000/jokebook/joke/add
```
