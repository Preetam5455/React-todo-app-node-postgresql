import React, { useState } from "react";
import { useTodo } from "../contexts/TodoContext";

function TodoItem({ todo }) {
    const {updateTodo,deleteTodo,toggleComplete} = useTodo()
    const [todoMsg,setTodoMsg] = useState(todo.todo);
    const [isTodoEditable , setIsTodoEditable] = useState(false);

    const editTodo =() =>{
        let date = new Date();
        let currentDate = date.toLocaleDateString();
        let currentTime = date.toLocaleTimeString();

        updateTodo(todo._id,{...todo,date:currentDate,time:currentTime,edited:true,todo:todoMsg});
        setIsTodoEditable(false)
    }

    const toggleCompleted = () =>{
        toggleComplete(todo._id,{...todo,complete:!todo.complete})
    }

    console.log(todo.complete);
    
    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                todo.complete ? "bg-gradient-to-r from-amber-800 to-yellow-500" : "bg-gradient-to-r from-orange-400 to-orange-300 to-80%"
            }`}
        >

            <label className="checkbox style-d">
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.complete}
                onChange={toggleCompleted} />
            <div className="checkbox__checkmark"></div>
            </label>
            
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.completed ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            <span className="italic flex items-center">{todo.edited ?<span>Edited:</span>:<span>Created:</span>}{todo.date}:{todo.time}</span>

            {/* Edit, Save Button */}
            <button
                className="transition duration-0 hover:duration-150 inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodo(todo._id)}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;
