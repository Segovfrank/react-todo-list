const Task = require('../models/Task');

exports.done = (req, res) => {
  let task = {};
  task.id = req.params.id;
  Task.find(task.id).then((task) => {
    if(req.xhr || req.headers.accept.indexOf('json') > -1){
      Task.markAsDone(task).then((task) => res.json(task));
    }else{
      res.redirect('/');
    }
  });
}

exports.getAll = (req, res) => {
  Task.all().then((tasks) => {
    res.json(tasks);
    
  });
}

exports.delete = (req, res) => {
  let task = {};
  task.id = req.params.id;
  Task.delete(task.id).then((task) => {
    if(req.xhr || req.headers.accept.indexOf('json') > -1){
      res.json(task);
    }else{
      res.redirect('/');
    }
  });
}

exports.store = (req, res) => {
  let task = {};
  task.description = req.body.description;
  Task.create(task).then((id) => {
    // if the request is expecting an ajax or json response
    console.log("Stored task: " + task.description);
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      Task.find(id).then((task) => res.json(task));
    } else {
      res.redirect('/');
    }
  });
}
