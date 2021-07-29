/*
============================================
; Title:  Green-composer-routes.js
; Author: Professor Richard Krasso
; Modified: Tierre Green
; Date: June, 2021
; Description: File for the composer-routes database
;===========================================
*/

const express = require('express');
const router = express.Router();
const Composer = require('../models/green-composer.js');

/**
findAllComposers
@openapi
/api/composers
  get:
    tags:
      - Composers
    description: API for returning an array of composer objects.
    summary: returns an array of composers in JSON format.
    responses:
      "200":
        description: list of composers.
      "501":
        description: will respond with 'Mongo Exception'.
      "500":
        description: will respond with 'Server Exception'.

*/
router.get('/composers', async(req, res) => {
    try {
        Composer.find({}, function(err, composers) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(composers);
                res.json(composers);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

/**
findComposerById
@openapi
  /api/composers/{id}
    get:
      tags:
        - Composers
      description: API for returning a composer document
      summary: returns a composer document
      parameters:
        - name: id
          in: path
          required: true
          description: Composer document id
          schema:
            type: string
      responses:
        "200":
          description: Composer document
        "500":
          description: Server exception
        "501":
          description: MongoDB Exception

 */
router.get('/composer/:id', async(req, res) => {
    try {
        Composer.findOne({'_id': req.params.id}, function(err, composer) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(composer);
                res.json(fruit);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

/**
createComposer
@openapi
  /api/composers
    post:
      tags:
        - Composers
      name: createComposer
      description: API for adding a new composer document to MongoDB Atlas
      summary: Creates a new composer document
      requestBody:
        description: composer information
        content:
          application/json:
            schema:
              required:
                - type
              properties:
                type:
                  type: string
      responses:
        "200":
          description: composer added
        "500":
          description: Server Exception
        "501":
          description: MongoDB Exception

 */
router.post('/composers', async(req, res) => {
    try {
        const newComposer = {
            type: req.body.type
        }

        await Composer.create(newComposer, function(err, composer) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(composer);
                res.json(composer)
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

//export router
module.exports = router;