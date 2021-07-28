
/*
============================================
; Title:  user.js
; Author: Professor Krasso
; Modified by: Tierre Green
; Date:   June 2021
; Description: user model
;===========================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let emailSchema = new Schema({
    emailAddress: { type: String }
})

let userSchema = new Schema({
    userName: { type: String },
    Password: { type: String },
    emailAddress: [ emailSchema ]
})

module.exports = mongoose('User', userSchema);