const express = require('express');

const server = express();
server.use(express.json());

const projects = [];

// Middlewares
server.use((req, res, next) => {
    console.count('Número de requisições');
    return next();
});

function checkProjectExist(req, res, next){
    const {id} = req.params;

    const project = projects.find(p => p.id == id);

    if(!project){
        return res.status(400).json({ error: 'Project does not exists'});
    }

    return next();
}

// List all products
server.get('/projects', (req, res) => {
    return res.json(projects);
});

// Post projects
server.post('/projects', (req, res) => {
    const {id} = req.body;
    const {title} = req.body;
    const project = { 
        id,
        title,
        tasks:[]
    };

    projects.push(project);
    return res.json(projects);
});

// Update projects
server.put('/projects/:id', checkProjectExist, (req, res) => {
    const {id} = req.params;
    const {title} = req.body;

    const project  = projects.find(p => p.id == id);
    project.title = title;

    return res.json(project);
});

// Delete projects
server.delete('/projects/:id', checkProjectExist, (req, res) => {
    const {id} = req.params;
    
    const project = projects.findIndex(p => p.id == id);
    projects.splice(project, 1);

    return res.json(projects);
});

// Add tasks
server.post('/projects/:id/tasks', checkProjectExist, (req, res) => {
    const {id} = req.params;
    const {title} = req.body;

    const project = projects.find(p => p.id == id);
    project.tasks.push(title);

    return res.json(project);
})

server.listen(3000);