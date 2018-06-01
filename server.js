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
    const { name } = req.body;
    projects.insert({ name })
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            console.log(error);
        })
})

// server.put('/api/users', (req, res) => {
//     const { id } = req.params;
//     const { name } = req.body;
//     projectModel.update(id, { name })
//         .then(response => {
//             res.json(response);
//         })
//         .catch(error => {
//             console.log(error);
//     })
// })

// Running Server
server.listen(port, () => console.log(`Server running on port, ${port}`));