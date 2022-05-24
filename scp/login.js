const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
router.get('/', async (req, res) => {
    try {
    if (req.query.username == undefined) {
        console.log('No Username')
        return res.status(400).json({"message": "Invalid username or password"});
    }
    if (req.cookies.auth != undefined) {
        var username = Buffer.from(req.cookies.auth, 'base64').toString('ascii').split('.').shift();
        if (username == req.query.username.toUpperCase() && require.main.exports.CheckAuth(req.cookies.auth)) 
            return res.status(200).json({"message": "Successfully logged in"});
    }
    var file = fs.readFileSync(await path.join(process.env.PWD, 'users.json'))
    var data = JSON.parse(file);
    var USER = data[req.query.username.toUpperCase()];
    if (USER == undefined || !(USER.PASSWORD == undefined || USER.PASSWORD == '' || (req.query.password != undefined && bcrypt.compareSync(req.query.password, USER.PASSWORD)))) {
        console.log('Invalid username or password')
        return res.status(400).json({"message": "Invalid username or password"});
    }
    console.log('Logged in')
    res.status(200).cookie('auth', require.main.exports.GenerateAuth(req.query.username.toUpperCase(), req.query.password)).json({"message": "Successfully logged in"})
    } catch (error) {
	console.log(error)
        return res.status(500).json({"message": error.message});
    }
});
router.get('/check', (req, res) => {
    if (req.cookies.auth != undefined && require.main.exports.CheckAuth(req.cookies.auth))
        return res.status(200).json({"message": "Logged In"});
    
    res.status(400).json({"message": "Not Logged In"});
});
router.get('/generate', async (req, res) => {
    if (req.query.password == undefined)
        return res.status(400).json({"message": "Please provide a password"});
    res.status(200).json({"message": bcrypt.hashSync(req.query.password, saltRounds)})
});
module.exports = router;
