const { createTodo, readTodo, updateTodo, deleteTodo } = require("../controllers/todo.controller.js")


const router = require("express").Router()

router
    .post("/create", createTodo)
    .get("/", readTodo)
    .patch("/modify/:Id", updateTodo)
    .delete("/remove/:Id", deleteTodo)

    module.exports = router