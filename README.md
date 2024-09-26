# Betting App Project

This project is a Node.js HTTP server built with Express and TypeScript, following Hexagonal Architecture and using Awilix for Dependency Injection. It employs RabbitMQ as a message broker for asynchronous communication with a WebSocket service, uses Mongoose for database operations, and Jest for unit testing.

## Features

- **Hexagonal Architecture**: Organized code into distinct layers for better maintainability and scalability.
- **Awilix**: Dependency Injection container for managing application dependencies.
- **Redis(BullMQ)**: Message broker for asynchronous communication with a WebSocket service.
- **Jest**: Testing framework for unit testing.
- **Winston & Morgan**: Extensive Logging


## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [Testing](#testing)
- [Postman Documentation](#postman-documentation)

## Installation

To get started with this project, follow these steps:

1. **Clone the Repository**

```
git clone https://github.com/petlight45/task-management-backend-http.git
```
2. **Change directory 
```
gcd task-management-backend-http
```
## Configuration
   
1. **Set up environmental variables**

   ```
   cp .env.example .env
   ```
 Update the .env file with your local configuration values.
 
 EXPRESS_APP_DATABASE_URL = The connection uri to the mongo db database to be used by this app
 
 EXPRESS_APP_SECRET_KEY = The secret key of this server for password hashing
 
 EXPRESS_APP_API_VERSION= The api version of all endpoints on this server
 
 EXPRESS_APP_SERVER_PORT=The target port to run this server on
 
 EXPRESS_APP_PRIVATE_ENDPOINT_SECRET_KEY=The private secret key of this server for synchronous inter-service communication from the Websocket server

 EXPRESS_APP_REDIS_URL= The connection uri to the message queue(Rabbit MQ) used by this server for asynchronous inter-service communication with the Websocket server 
 
 EXPRESS_APP_MESSAGE_QUEUE_NAME_WEBSOCKET_SERVICE=The queue name that binds this server and the websocket server together, this server sends to this queue, while the WS server consumes from it
 
 EXPRESS_APP_ACTIVE_GAMES_COUNT = The no of active games to show on the dashboard
 
 ## Running the Server
 
 To run the server:
 
 Install docker and docker compose on your operating environment
 
 For linux, Windows or Old Mac run
 
    ```
    docker-compose up --build
    ```
    
For newer Mac

      ```
      docker compose up --build
      ```

## Testing
 
 To run the unit tests and integration tests:
 
 Configure the environmental variables because of the integration tests
 
 Run this
 
    ```
    npm install
    npm test
    
    
## Postman Documentation
 
 Link to postman documentation:
 
https://documenter.getpostman.com/view/16065705/2sAXqmAQbS
