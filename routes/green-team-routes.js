/**
============================================
; Title:  green-team-routes.js
; Author: Professor Krasso
; Modified by: Tierre Green
; Date:   July 2021
; Description: customer model
;===========================================
*/

const { compareSync } = require('bcryptjs');
var express = require('express');
var http = require('http');

var router = express.Router();

var Team = require('../models/green-team.js');

/**
 * findAllTeams
 * @openapi
 * /api/teams
 *   get:
 *     tags:
 *       - Teams
 *     name: findAllTeams
 *     description: Displays list of teams.
 *     summary: Displays list of team documents.
 *     responses:
 *       '200':
 *         description: Team document
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

 router.get('/teams', async(req,res) => {
    try{
        Team.find({}, function(error, teams) {
            if (error) {
                console.log(error);
                res.status(501).send({
                    'message': `MongoDB Exception ${error}`
                })
            } else {
                console.log(teams);
                res.json(teams);
            }
        })
    } catch (e){
        console.log(e);
        res.status(500).send({
            'message': `Server Exception ${e.message}`
        })
    }
})

/**
 * assignPlayerToTeam
 * @openapi
 * /api/teams/:
 *   post:
 *     tags:
 *       - Teams
 *     name: createNewTeam
 *     description: Creates a new team
 *     summary: Creates new team document.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: find team by Id 
 *         schema: 
 *           type: string
 *     requestBody:
 *       description: Team
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - id
 *               - name
 *               - mascot
 *             properties:
 *              id:
 *                 type: string
 *              name:
 *                 type: string
 *              mascot:
 *                 type: number
 * 
 *     responses:
 *       '200':
 *         description: Player document
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

 router.post('/teams', async(req, res) => {
    try {
        const newTeam = {
            id: req.body.id,
            name: req.body.name,
            mascot: req.body.name,

        };

        await Team.create(newTeam, function(err, team) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(team);
                res.json(team);
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
 * assignPlayersToTeam
 * @openapi
 * /api/teams/{id}/players:
 *   post:
 *     tags:
 *       - Teams
 *     name: assignPlayerToTeam
 *     description: Adding players to team document.
 *     summary: Adds player to team.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Find team document by Id. 
 *         schema: 
 *           type: string
 *     requestBody:
 *       description: Team document
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - salary
 *             properties:
 *              firstName:
 *                 type: string
 *              lastName:
 *                 type: string
 *              salary:
 *                 type: number
 * 
 *     responses:
 *       '200':
 *         description: Team document
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

 router.post('/teams/:id/players', async(req,res) =>{
    try{
        const newPlayer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            salary: req.body.salary
        }
        Team.findOne({id:req.params.id}, function (err, teams){
            if (err){
                console.log(err);
                res.status(501).send({
                    'message': 'MongoDB Exception'
                })

            }
            if (!teams){
                console.log(err);
                res.status(401).send({
                    'message': 'Invalid teamID'
                })
            } else {
                console.log(teams);
                Team.create(newPlayer);
                teams.players.push(newPlayer);
                teams.save(newPlayer);

                res.status(200).send({
                    'message': 'Player Document'
                })
            }
        })
    } catch (e){
        console.log(e);
        res.status(500);
    }
})

/**
 * findAllPlayersByTeamId
 * @openapi
 * /api/teams/{id}/players:
 *   get:
 *     tags:
 *       - Teams
 *     name: findAllPlayersByTeamId
 *     description: Team document shown by ID,
 *     summary: Show team document.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: teamId
 *         schema: 
 *           type: string
 *     responses:
 *       '200':
 *         description: Team document
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

 router.get('/teams/:id/players', async(req,res) => {
    try{
        Team.findOne({'id': req.params.id}, function(err, teams){
            if (error) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception ${error}`
                })
            }
            if (!teams){
                console.log(err);
                res.status(401).send({
                    'message': 'Invalid teamID'
                })
            
            } else {
                console.log(teams);
                res.json(teams)
            }
        })
    }catch (e){
        console.log(e);
        res.status(500).send({
            'message': `Server Exception ${e.message}`
        })
    }
})
/**
 * deleteTeamById
 * @openapi
 * /api/teams/{id}:
 *   delete:
 *     tags:
 *       - Teams
 *     name: deleteTeam
 *     description: API for deleting a document from MongoDB.
 *     summary: Removes document from MongoDB.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id of the document to remove. 
 *         schema: 
 *           type: string
 *     responses:
 *       '200':
 *         description: Team document
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.delete('/teams/:id', async(req,res) => {
try{
    Team.findOneAndDelete({'id': req.params.id}, function(err,teams){
        if(err){
            console.log(err);
            res.status(501).send({
                'message': `MongoDB Exception ${err}`
            })
        }
        if (!teams){
            console.log(err);
            res.status(401).send({
                'message': 'Invalid teamID'
            })
        } else {
            console.log(teams);
            res.status(200).send({
                'message': 'Team deleted'
            });
        }
    })
} catch (e) {
    console.log(e);
    res.status(500).send({
        'message': `Server Exception ${e.message}`
    })
  }
})
//Export
module.exports = router;


