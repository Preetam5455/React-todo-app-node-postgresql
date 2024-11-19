import {createContext,useContext} from "react";

export const TodoContext = createContext({
    // below object is the schema only
    todos:[
        {
            id: 1731950638639,
            date: "18/11/2024",
            time: "22:53:58",
            todo: "done",
            edited:false,
            complete: false // or true
          }
    ],

    addtodo: (todo)=>{},
    deleteTodo:(id)=>{},
    updateTodo:(id,todo)=>{},
    toggleComplete:(id,todo)=>{}
});

export const TodoContextProvider = TodoContext.Provider

export const useTodo = () =>{
    return useContext(TodoContext);
}
