// srtapi 

import { APP_URL } from "@/constants/config"
import { Todo } from "@/types/Todo"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const todoApi = createApi({
    reducerPath: "todoApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${APP_URL}/api/todo` ,
        credentials: "include" // very imp for cookies to work
    }),
    tagTypes: ["Todo"],
    endpoints: (builder) => {
        return {
            // get
            getTodos: builder.query<Todo[], void>({
                query: () => {
                    return {
                        url: "/",
                        method: "GET"
                    }
                },
                providesTags: ["Todo"]
            }),

            // create
            addTodo: builder.mutation<void, Todo>({
                query: todoData => {
                    return {
                        url: "/create",
                        method: "POST",
                        body: todoData
                    }
                },
                invalidatesTags: ["Todo"]
            }),

            // update
            updateTodo: builder.mutation<void, Todo>({
                query: todoData => {
                    return {
                        url: "/modify/" + todoData._id as string,
                        method: "PATCH",
                        body: todoData
                    }
                },
                invalidatesTags: ["Todo"]
            }),

            // delete
            deleteTodo: builder.mutation<void, string>({
                query: _id => {
                    return {
                        url: "/remove/" + _id as string,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["Todo"]
            }),
        
        }
    }
})

export const { 
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation
} = todoApi
