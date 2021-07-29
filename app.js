/*
=====================================================
; Title: Assignment 1.2
; Author: Professor Krasso
; Date May 30, 2021
; Modified By: Tierre Green
; Description: Assignment 1.2
=====================================================
*/

const express = require("express");

const http = require("http");

const swaggerUi = require("swagger-ui-express");

const swaggerJsdoc = require("swagger-jsdoc");

const mongoose = require('mongoose');

const composerAPI = require('./routes/green-composer-routes');
const nodeShopperAPI = require('./routes/green-node-shopper-routes');
const personAPI = require('./routes/green-person-routes');
const sessionAPI = require('./routes/green-session-routes');
const teamAPI = require('./routes/green-team-routes');

let app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

const conn = "mongodb+srv://TGreen3023:uVH5Hp5Jbex90PnU@buwebdev-cluster-1.bxuwh.mongodb.net/EMS?retryWrites=true&w=majority";
mongoose.connect(conn, {
    promiseLibrary: require('bluebird'),
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log(`Connection to web420DB on MongoDB Atlas successful`);
}).catch(err => {
    console.log(`MongoDB Error: ${err.message}`);
})

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

app.use('/api', composerAPI);
app.use('/api', nodeShopperAPI);
app.use('/api', personAPI);
app.use('/api', sessionAPI);
app.use('/api', teamAPI);

http.createServer(app).listen(3000, function() {

    console.log("Application started and is listening on port 3000!");

});