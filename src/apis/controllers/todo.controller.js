var Todo = require('../../models/todo.model');
module.exports = {

        get: function(req, res) {
            Todo.find({ "name": req.params.name }, (err, todos) => {
                if (err) {
                    res.json({ status: false, error: "Something went wrong" });
                    return;
                }
                res.json({ status: true, todo: todos });
            })
        },
        // Get all todos from the Database
        show: function(req, res) {
            Todo.find({}, function(err, todos) {
                if (err) {
                    res.json({ status: false, error: "Something went wrong" });
                    return;
                }
                res.json({ status: true, todo: todos });
            });
        },
        //Post a todo into Database 
        create: function(req, res) {
            var todo = new Todo(req.body);
            todo.save(function(err, todo) {
                if (err) {
                    res.json({ status: false, error: "Something went wrong" });
                    return;
                }
                res.json({
                    status: true,
                    message: "Todo Saved!!"
                });
            });
        },
        //Updating a todo status based on an ID 
        update: function(req, res) {
            var newTodo = req.body;
            Todo.findById(req.params.id, function(err, todo) {
                todo.completed = newTodo.completed;
                todo.name = newTodo.name;
                todo.todo = newTodo.todo;
                todo.save(function(err, todo) {
                    if (err) {
                        res.json({
                            status: false,
                            error: "Status not updated"
                        });
                    }
                    res.json({
                        status: true,
                        message: "Status updated successfully"
                    });
                });
            });
        },
        // Deleting a todo baed on an ID 
        delete: function(req, res) {
            Todo.remove({ _id: req.params.id }, function(err, todos) {
                if (err) {
                    res.json({
                        status: false,
                        error: "Deleting todo is not successfull"
                    });
                    return;
                }
                res.json({
                    status: true,
                    message: "Todo deleted successfully!!"
                });
            });
        }
    }
    // module.exports = TodoCtrl;
    // class Item {

//     index(req, res) {
//         res.send('Success!');
//     }

//     show(req, res) {
//         res.send('Success!');
//     }

//     create(req, res) {
//         res.send('Success!');
//     }

//     update(req, res) {
//         res.send('Success!');
//     }

//     destroy(req, res) {
//         res.send('Success!');
//     }
// }

// module.exports = Item;