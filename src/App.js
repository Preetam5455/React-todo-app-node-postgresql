import React, { useEffect, useState } from "react";
import {TodoContextProvider} from "./contexts/TodoContext";
import TodoForm from "./components/todoForm";
import TodoItem from "./components/todoItemsList";

function App() {
  const [todos,setTodos] = useState([]);

  const addtodo = ((todo)=>{
    let date = new Date();
    let currentDate = date.toLocaleDateString();
    let currentTime = date.toLocaleTimeString();
    // setTodos((prev)=> {return [{id:Date.now(),date:currentDate,time:currentTime,...todo},...prev]});

    fetch('http://localhost:5500/api/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id:Date.now(),date:currentDate,edited:false,time:currentTime,...todo}),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data,"data");
          setTodos((prevMessages) => [...prevMessages, data]);
          // setTodos([]); // Clear the input field
        })
        .catch((error) => console.error('Error adding todo:', error));
  })

 const deleteTodo = async (id)=>{
    // setTodos((prev) => prev.filter((todo)=> todo.id !== id ));

    try{
      const response = await fetch(`http://localhost:5500/api/list/${id}`,{
        method:'DELETE',
        headers:{
          'Content-Type' : 'application/json',
        },
      })
      if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.Status}`);
      }else{
        setTodos((prev) => prev.filter((todo)=> todo.id !== id ));
      }
    }catch(error){
      console.error('error updating record:',error)
    }

  }

  const updateTodo = async (id,todo)=>{
    // setTodos((prevtodos)=>prevtodos.map((prevtodo)=> (prevtodo.id === id ? todo:prevtodo)))

    try{
      const response = await fetch(`http://localhost:5500/api/list/${id}`,{
        method:'PUT',
        headers:{
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(todo),
      })
      if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.Status}`);
      }
    }catch(error){
      console.error('error updating record:',error)
    }
    setTodos((prevtodos)=>prevtodos.map((prevtodo)=> prevtodo.id === id ? {...todo} :prevtodo))
  }


  const toggleComplete = ((id,todo)=>{
    updateTodo(id,todo)
    setTodos((prevtodos)=>prevtodos.map((prevtodo)=> prevtodo.id === id ? {...todo} :prevtodo))
  })

  useEffect(()=>{
    // const todos  =  JSON.parse(localStorage.getItem("todos"));
    // if(todos && todos.length > 0) return;
    // setTodos(todos)

    fetch('http://localhost:5500/api/list')
      .then((response) => response.json())
      .then((data) => setTodos(data))      
      .catch((error) => console.error('Error fetching messages:', error));
  },[]);

  // useEffect(()=>{
  //   localStorage.setItem("todos",JSON.stringify(todos))
  //   console.log("todos",todos)
  // },[todos])

  return (
    <TodoContextProvider value={{todos,addtodo,deleteTodo,updateTodo,toggleComplete}}>
    <div className="bg-yellow-200 min-h-screen py-8">
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2 text-black">Manage Your Todos</h1>
        <div className="mb-4">
          {/* Todo form goes here */}
          <TodoForm />
        </div>
        <div className="flex flex-wrap gap-y-3">
          {/*Loop and Add TodoItem here */}
          {todos.map((todo)=>(
            <div key={todo.id} className='w-full'>
            <TodoItem todo={todo}/>
            </div>
          ))}
        </div>
      </div>
    </div>
    </TodoContextProvider>
  );
}

export default App;
