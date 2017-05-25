# stockfolio-server

[![Build Status](https://travis-ci.org/leevilehtonen/stockfolio-server.svg?branch=master)](https://travis-ci.org/leevilehtonen/stockfolio-server)
[![Dependency Status](https://david-dm.org/leevilehtonen/stockfolio-server.svg)](https://david-dm.org/leevilehtonen/stockfolio-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Node web app for managing your stock portfolio (server)

- [API](docs/API.md) - REST API docs, information abouts server routes
- [Hours](https://docs.google.com/spreadsheets/d/1iS3zzA9LTFgh2s2CuXOBlqsfMP5bsVArIPT1dS3bYpY/edit?usp=sharing) - Working hours at Google Sheets

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

- [Node.js](https://nodejs.org/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [MongoDB](https://www.mongodb.com/) - MongoDB is an open-source, document database designed for ease of development and scaling.

### Installing

A step by step series of examples that tell you have to get a development env running

```sh
git clone https://github.com/leevilehtonen/stockfolio-server.git //or with ssh
cd stockfolio-server
npm install
npm run server // runs project using nodemon for easy development

```

```
npm start // creates production build and runs it
```


## Running the tests

```sh
npm install
npm test
```

## Deployment

For building production ready server:
```sh
npm install
npm run build 
```

For building and running production ready server:
```sh
npm install
npm start 
```

If you want to deliver your own copy of stockfolio, it's very easy to serve at Heroku

## Built With

### Dependencies

- [babel-cli](https://github.com/babel/babel/tree/master/packages): Babel command line.
- [babel-preset-env](https://github.com/babel/babel-preset-env): A Babel preset for each environment.
- [babel-register](https://github.com/babel/babel/tree/master/packages): babel require hook
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js): Optimized bcrypt in plain JavaScript with zero dependencies. Compatible to &#39;bcrypt&#39;.
- [bluebird](https://github.com/petkaantonov/bluebird): Full featured Promises/A+ implementation with exceptionally good performance
- [body-parser](https://github.com/expressjs/body-parser): Node.js body parsing middleware
- [cookie-parser](https://github.com/expressjs/cookie-parser): cookie parsing with signatures
- [cors](https://github.com/expressjs/cors): Node.js CORS middleware
- [csurf](https://github.com/expressjs/csurf): CSRF token middleware
- [express](https://github.com/expressjs/express): Fast, unopinionated, minimalist web framework
- [helmet](https://github.com/helmetjs/helmet): help secure Express/Connect apps with various HTTP headers
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken): JSON Web Token implementation (symmetric and asymmetric)
- [mongoose](https://github.com/Automattic/mongoose): Mongoose MongoDB ODM
- [mongoose-unique-validator](https://github.com/blakehaswell/mongoose-unique-validator): mongoose-unique-validator is a plugin which adds pre-save validation for unique fields within a Mongoose schema.
- [passport](https://github.com/jaredhanson/passport): Simple, unobtrusive authentication for Node.js.
- [passport-jwt](https://github.com/themikenicholson/passport-jwt): Passport authentication strategy using JSON Web Tokens
- [request](https://github.com/request/request): Simplified HTTP request client.
- [request-promise](https://github.com/request/request-promise): The simplified HTTP request client &#39;request&#39; with Promise support. Powered by Bluebird.
- [yahoo-finance](https://github.com/pilwon/node-yahoo-finance): Yahoo Finance historical quotes and snapshot data downloader written in Node.js

### Dev Dependencies

- [mocha](https://github.com/mochajs/mocha): simple, flexible, fun test framework
- [nodemon](https://github.com/remy/nodemon): Simple monitor script for use during development of a node.js app.
- [should](https://github.com/shouldjs/should.js): test framework agnostic BDD-style assertions
- [supertest](https://github.com/visionmedia/supertest): SuperAgent driven library for testing HTTP servers

## Contributing

Make merge ready PR or contact me with feature suggestions.

## Authors

* **Leevi Lehtonen** - *Initial work* - [LeeviLehtonen](https://github.com/leevilehtonen)

See also the list of [contributors](https://github.com/leevilehtonen/stockfolio-server/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments




