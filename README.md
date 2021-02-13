# paybox

## Paybox mission – Full stack (NodeJS)

Build a Web Application with the following requirements:

1. Create express server: “Auth service”

   - Typescript
   - Add a connection to mongoDB.
   - Create Users schema (username: paybox, password: paybox).
   - Add Authentication via JWT / (any package you want to use – passport).
   - Send data & requests to “Missions service” with AES encryption.
   - Receive the data from “Missions service”, decrypt it and send to the client.
   - Add audit log schema for create, update, and delete operations.
   - Unit tests
   - README file

2. Create express “Missions service”

- Typescript - Use the same mongoDB connection from “Auth service”. - Create Missions schema: {key: String, value: JSON}.
  JSON: {“a”: {“b”: {“c”:”d”}}} – nested json. - Get the data from “Auth service” – decrypt it and save to MongoDB. - Unit tests - README file - Typescript

3. Handle 4 routes:

- Get
  - Create
  - Edit
  - Delete

4. Create React/Angular client application
   - View
   - Typescript
   - Buttons for: create, update and delete.

#### Additional information:

- ES6+
- MVC Architecture.
- Data encryption transport.
- Audit log.
- Clean code.

#### Extra (not mandatory):

- Create a cron job to remove logs older than 5 hours (every 30 minutes).

###### -------------------------------------------------------------------------------------------------------

## Requirements

You should have installed mongodb and nodejs

You can find information about installation of nodejs on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v12.18.3

    $ npm --version
    6.14.6

If you need to update `npm`, you can use `npm`!

    $ npm install npm -g

You can find information about installation of mongodb community edition on the [official Mongodb website](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)

## Deployment

Hosted on local host.

[Auth Readme](../paybox/auth/README.md)

[Mission Readme](../paybox/missions/README.md)

[Client Readme](/paybox/client/README.md)

#### Notes

- Services doesn't have req body/params validation
- In real world client, auth and mission should have their own git repositories
