import mongoose from 'mongoose';
let Schema = mongoose.Schema;
// Defining schema for our Todo API 
let TodoSchema = Schema({
    todo: { type: String },
    name: { type: String },
    completed: { type: Boolean, default: false },
    created_by: { type: Date, default: Date.now }
});

// True since it is a parallel middleware
TodoSchema.pre('save', (next, done) => {
    if (!this.todo) {
        next(new Error("Todo should not be null"));
    }
    next();
});

//Exporting our model 
let TodoModel = mongoose.model('Todo', TodoSchema);

module.exports = TodoModel;