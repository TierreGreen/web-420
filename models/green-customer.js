/*
============================================
; Title:  customer.js
; Author: Professor Krasso
; Modified by: Tierre Green
; Date:   July 2021
; Description: customer model
;===========================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let lineItemSchema = new Schema({
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number }
})

let invoiceSchema = new Schema({
    subtotal: { type: Number },
    tax: { type: Number },
    dateCreated: { type: String },
    dateShipped: { type: String },
    lineItems: [ lineItemSchema ]
})

let customerSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String },
    invoices: [ invoiceSchema ]
})

module.exports = mongoose('Customer', customerSchema);