/*
============================================
; Title:  green-composer.js
; Author: Tierre Green
; Date: june, 2021
; Description: File for the composer database
;===========================================
*/

//require statements
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//composer schema variable
let composerSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, require: true},
});

//export model named as Composer
module.exports = mongoose.model('Composer', composerSchema);