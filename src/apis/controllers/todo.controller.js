import Todo from '../../models/todo.model';
module.exports = {

        get: (req, res) => {
            Todo.find({ "name": req.params.name }, (err, todos) => {
                if (err) {
                    res.json({
                        status: false,
                        error: "Something went wrong"
                    });
                    return;
                }
                res.json({ status: true, todo: todos });
            })
        },
        // Get all todos from the Database
        show: (req, res) => {
            Todo.find({}, (err, todos) => {
                if (err) {
                    res.json({ status: false, error: "Something went wrong" });
                    return;
                }
                res.json({ status: true, todo: todos });
            });
        },
        //Post a todo into Database 
        create: (req, res) => {
            var todo = new Todo(req.body);
            todo.save((err, todo) => {
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
        update: (req, res) => {
            let newTodo = req.body;
            Todo.findById(req.params.id, (err, todo) => {
                todo.completed = newTodo.completed;
                todo.name = newTodo.name;
                todo.todo = newTodo.todo;
                todo.save((err, todo) => {
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
        delete: (req, res) => {
            Todo.remove({ _id: req.params.id }, (err, todos) => {
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