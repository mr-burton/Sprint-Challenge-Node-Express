//  Server setUp 
const express = require('express');
const cors = require('cors');
const actions = require('./data/helpers/actionModel.js');
const mappers = require('./data/helpers/mappers.js');
const projects = require('./data/helpers/projectModel.js');
const port = 5500;

const server = express();
server.use(express.json());
server.use(cors({}));


// Error Handling
const sendUserError = (status, message, res) => {
    res.status(staus).json({ errorMessage: message });
    return;
}

// Middleware name check
const nameCheck = (req, res, next) => {
    const { name, description, completed } = req.body;
    if (!name, !description, !completed) {
        return errorMessage(404, 'please include name', res);
    } else {
        next();
    }
}

// Get all data
server.get('/api/users', (req, res) => {
    projects.get()
        .then(post => {
            res.json(post);
        })
})

// Get specific ID
server.get('/api/users/:id', nameCheck, (req, res) => {
    const { id } = req.params;
    projects.get(id)
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            console.log(error);
        })
})

// Get ID of Project Model
server.get('/api/users/projectModel/:id', nameCheck, (req, res) => {
    const { id } = req.params;
    projects.getProjectActions(id)
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            console.log(error);
        })
})

// Post Data to Database
server.post('/api/users', nameCheck, (req, res) => {
    const { name, description, completed } = req.body;
    projects.insert({ name, description, completed })
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            console.log(error);
        })
})

// Delete Data from Database
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    projects.remove(id)
        .then(response => {
            if (response === 1) {
                res.json('welcome to the party');
            } else {
                res.json('try again my friend');
            }
        })
})


server.put('/api/users/:id', nameCheck, (req, res) => {
    const { id } = req.params;
    const { name, description, completed } = req.body;
    projects.update(id, { name, description, completed })
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            console.log(error);
        })
})

// Running Server
server.listen(port, () => console.log(`Server running on port, ${port}`));