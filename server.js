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


server.get('/api/users', (req, res) => {
    projects.get()
        .then(post => {
            res.json(post);
        })
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    projects.get(id)
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            console.log(error);
        })
})

server.get('/api/users/projectModel/:id', (req, res) => {
    const { id } = req.params;
    projects.getProjectActions(id)
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            console.log(error);
        })
})

server.post('/api/users', (req, res) => {
    const { name, description, completed } = req.body;
    projects.insert({ name, description, completed })
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            console.log(error);
        })
})

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

server.put('/api/users/:id', (req, res) => {
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