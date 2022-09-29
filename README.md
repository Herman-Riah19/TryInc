# Adonis Try-inc: Artist Shared application

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [All About Adonis](#about_adonis)

## About <a name = "about"></a>

This project is the start creating a project on Adonis, is just an example how to use this technologie and it's use to create a similar project like as Laravel framework of PHP but just use Typescript Langage to creata the project

## Getting Started <a name = "getting_started"></a>

AdonisJS is a backend framework for Node.js. The framework is written in TypeScript, and the application you will create using AdonisJS is also going to be in Typescript.

We are very particular about how we leverage TypeScript and maintain a good balance between the static type safety and the visual noise.

We also expect you to be familiar with the Node.js ecosystem and asynchronous programming in general. Suppose you are coming from a threaded language like PHP or Ruby. In that case, we recommend educating yourself with the Node.js event loop and understand how it is different from a threaded environment.

## Prerequisites

AdonisJS is a Node.js framework, and hence it requires Node.js to be installed on your computer. To be precise, we need at least the latest release of Node.js v14.

You can check the Node.js and npm versions by running the following commands.

```
# check node.js version
node -v
```

### Installing

Before to launch this project, make sur if you install all dependency in this project via this commande line

```
# install with npm or yarn
npm i
```

And launch this commande to configure some fonctionnality in the project as the ORM

```
# to configure the database in the project
node ace configure @adonisjs/lucid
# to configure the Edge view template
node ace configure @adonisjs/view
```
## Usage <a name = "usage"></a>

And now you can run the project with this commande line

```
node ace serve --watch
```
 - The [serve]() command starts the HTTP server and performs an in-memory compilation of Typescript to JavaScript.
 - The [--watch]() flag is meant to watch the file system for changes and restart the server automatically.

By default, the server starts on port 3333 (defined inside the .env file). You can view the welcome page by visiting: [http://localhost:3333]() .

### Compiling for production
You must always deploy the compiled JavaScript on your production server. You can create the production build by running the following command:

```
node ace build --production
```

The compiled output is written to the build folder. You can cd into this folder and start the server by directly running the server.js file. Learn more about the Typescript build process

```
cd build
node server.js
```

# All about of Adonis Framework <a name="about_adonis"> </a>

following this link: [Adonis.com](https://docs.adonisjs.com)
