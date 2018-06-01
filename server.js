//  Server setUp 
const express = require('express');
const cors = require('cors');
const actionModel = require('./data/helpers/actionModel.js');
const mappers = require('./data/helpers/mappers.js');
const projectModel = require('./data/helpers/projectModel.js');
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
    projectModel.get()
        .then(response => {
            res.json(response);
        })
})


// Running Server
server.listen(port, () => console.log(`Server running on port, ${port}`));