/*
============================================
; Title:  Team.js
; Author: Professor Krasso
; Modified by: Tierre Green
; Date:   July 25, 2021
; Description: team model
;===========================================
*/

//mongoose require statement and schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//player schema 
let playerSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    salary: { type: Number }
})

//team schema
let teamSchema = new Schema({
    id: { type: String },
    name: { type: String },
    mascot: { type: String },
    players: [ playerSchema ]
})

//export statement
module.exports = mongoose.model('Team', teamSchema);