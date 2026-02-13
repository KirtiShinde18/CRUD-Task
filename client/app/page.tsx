"use client"

import { useAddTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from '@/redux/apis/todo.api'
import { Todo } from '@/types/Todo'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'

const Home = () => {
  const {data} = useGetTodosQuery()
  const [todoData, setTodoData] = useState<Todo>({ task: "", desc: "", priority: ""})

  const [addTodo] = useAddTodoMutation()
  const [updateTodo] = useUpdateTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()

  const todoSchema = z.object({
    task: z.string().min(1),
    desc: z.string().min(1),
    priority: z.string().min(1),
  })

  type todoType = z.infer<typeof todoSchema>

  const {reset, register, handleSubmit, formState: {errors}} = useForm({
    defaultValues:{
      task: "",
      desc: "",
      priority: "",
    },
    resolver: zodResolver(todoSchema)
  })

  const handleCreate = (values: todoType) => {
    handleAdd(values);
    reset()
    
  }

  const handleAdd = async(data: todoType)=> {
    try {
      await addTodo(data).unwrap()
      // console.log("todo create success");
      toast.success("Todo created success")
      
    } catch (error) {
      console.log(error);
      toast.error("unable to create todo")
    }
  }
  
  //update
  const handleUpdate = async(todoData: Todo)=> {
    try {
      await updateTodo(todoData).unwrap()
      // console.log("todo update success");
      toast.success("Todo update success")
      
    } catch (error) {
      console.log(error);
      toast.error("unable to update Todo")
    }
  }

  //delete
  const handleDelete = async(_id: string)=> {
    try {
      await deleteTodo(_id).unwrap()
      toast.success("Todo delete success")
      
    } catch (error) {
      console.log(error);
      toast.error("unable to delete Todo")
    }
  }

  return <>
  
  <div className="container my-5">
    <div className="row">
        <div className="col-sm-6 offset-sm-3">
            <div className="card">
              <div className="card-header alert alert-warning">
                <h1>TODO CRUD TASK 📚</h1>
              </div>
              <div className="card-body">

                <form onSubmit={handleSubmit(handleCreate)}>

                  <div className="row">
                    <div className="col-sm-6">
                      <input {...register("task")} className='form-control my-3' type="text" placeholder='task'/>
                    </div>
  
                    <div className="col-sm-6">
                      <input {...register("desc")} className='form-control my-3' type="text" placeholder='desc'/>
                    </div>
                  </div>

                  <select {...register("priority")} className='form-control mb-3'>
                    <option value="">Choose Priority</option>
                    <option value="high">High</option>
                    <option value="medium">medium</option>
                    <option value="low">low</option>
                  </select>

                   <button type="submit" className="btn btn-primary w-full">Create Task</button>

                </form>

              </div>
            </div>
        </div>
    </div>
    </div>

  <div className="container my-3">
    <table className="table table-light table-striped table-hover">
    <thead>
      <tr>
        <th>id</th>
        <th>title</th>
        <th>desc</th>
        <th>priority</th>
        <th>complete</th>
        <th>actions</th>
      </tr>
    </thead>
    <tbody>
      {
        data && data.map(item => <tr key={item._id}>
          <td>{item._id}</td>
          <td>{item.task}</td>
          <td>{item.desc}</td>
          <td>{item.priority}</td>
          <td>
            {item.complete ? "Completed" : "Incompleted"}
          </td>
          <td>
            {
              item.complete
              ? <Button onClick={e => handleUpdate({...item, complete: false})} variant='warning' >Mark Incompleted</Button>
              : <Button onClick={e => handleUpdate({...item, complete: true})} variant='success' >completed</Button>
            }
            <Button onClick={e => handleDelete(item._id as string)} variant='danger'  className="m-3" >Delete</Button>
          </td>
        </tr> )
      }
    </tbody>
  </table>
  </div>

  </>
}

export default Home