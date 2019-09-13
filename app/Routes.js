'use strict';

let express = require('express');
let todoRoutes = express.Router();
let todo = require('./Todo');

todoRoutes.route('/all').get(function (req, res, next) {
  todo.find(function (err, todos) {
    if (err) {
      return next(new Error(err));
    }
    res.json(todos);
  })
});

todoRoutes.route('/add').post(function (req, res) {
  todo.create(
  {
    name: req.body.name,
    done: false
  },
  function (error, todo) {
    if (error) {
      res.status(400).send('Unable to create todo list');
    }
    res.status(200).json(todo)
  }
  )
});

todoRoutes.route('./delete/:id').get(function (req, res, next) {
  var id = req.params.id;
  todo.findIdAndRemove(id, function (err, todo) {
    if (err) {
      return next(new Error('Todo was not found'))
    }
    res.json('Successfully removed')
  })
});

todoRoutes.route('/update/:id').post(function (req, res, next) {
  var id = req.params.id;
  todo.findById(id, function (error, todo) {
    if (error) {
      return next(new Error('Todo was not found'));
    } else {
      todo.name = req.body.name;
      todo.done = req.body.done;

      todo.save({
        function (error, todo) {
          if (error) {
            res.statuts(400).send('Unable to update todo');
          } else {
            res.status(200).json(todo);
          }
        }
      })
    }
  })
});

module.exports = todoRoutes;

