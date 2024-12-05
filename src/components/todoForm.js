import { useState } from "react";
import { useTodo } from "../contexts/TodoContext";


function TodoForm() {
    const [todo,setTodo] = useState("")
    const {addtodo} = useTodo();
    const add = (e)=>{
        e.preventDefault();
        if(!todo) return;
        addtodo({todo,complete:false})
        setTodo("")
    }


    return (
        <form onSubmit={add}  className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo}
                onChange={(e)=>setTodo(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg bg-orange-300 hover:bg-orange-700 text-black font-bold py-2 px-4 border-b-4 border-r-4 border-orange-700 hover:border-orange-500 shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;

