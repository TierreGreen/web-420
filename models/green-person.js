
/*
============================================
; Title:  student.js
; Author: Professor Krasso
; Date:   June 2021
; Description: person Model
; Business rules: a person may have many roles
;===========================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * role schema
 */
let roleSchema = new Schema({
    text: { type: String }
});

/**
 * dependent schema 
 */
let dependentSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
});

/**
 * person schema
 */
let personSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    roles: [roleSchema],
    dependents: [dependentSchema],
    birthDate: { type: String }
})

module.exports = mongoose.model('Person', personSchema);