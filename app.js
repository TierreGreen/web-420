const express = require("express");

const http = require("http");

const swaggerUi = require("swagger-ui-express");

const swaggerJsdoc = ("swagger-jsdoc");

const mongoose = require('mongoose');

let app = express();

app.set('port', process.env.PORT || 3001);

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "WEB 420 RESTful APIs",
            version: "1.0.0",
        },
    },
    apis: ['./routes/*.js'] // files that contain annotations for Opening API specifications.
};

const openapiSpecification = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

http.createServer(app).listen(3000, function() {

    console.log("Application started and is listening on port 3000!");

});

