const Todo = require("../model/Todo.js");

// Create 
exports.createTodo = async (req , res ) => {
    try {
        await Todo.create(req.body)
        res.status(201).json({ message: "Todo Create Success", success: true})
    } catch (error) {
        console.log(error);
        res.status(500).json({message : error.message, success: false})
    }
}

// Read 
exports.readTodo = async (req , res ) => {
    try {
        const result = await Todo.find()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({message : error.message, success: false})
    }
}

// Update 
exports.updateTodo = async (req , res ) => {
    try {
        //       👇🏻 from todo.routes.js
        const { Id } = req.params
        await Todo.findByIdAndUpdate(Id, req.body)
        res.status(200).json({ message: "Todo update Success", success: true})
    } catch (error) {
        console.log(error);
        res.status(500).json({message : error.message, success: false})
    }
}

// Delete 
exports.deleteTodo = async (req , res ) => {
    try {
         //       👇🏻 from todo.routes.js
        const {Id} = req.params
        await Todo.findByIdAndDelete(Id)
        res.status(200).json({ message: "Todo delete Success", success: true})
    } catch (error) {
        console.log(error);
        res.status(500).json({message : error.message,success: false})
    }
}