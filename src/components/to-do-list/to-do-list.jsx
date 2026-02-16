import React, { useState } from 'react'
import './todo-list.css'

const ToDoList = () => {

    const [todoList, setTodoList] = useState([])
    const [todo, addTodo] = useState('')

    const handleTodo = () => {
        if(todoList.find(el => el.todo === 'qwerty')?.todo === todo) {
            alert('Already Added!')
            return;
        }
        if(!todo.trim()) {
            addTodo('')
            return;
        }
        setTodoList(prevState => [
            ...prevState,
            {
            ['id']: Date.now(),
            ['todo']: todo.trim(),
            ['isCompleted']: false
        }
        ])
       addTodo('')
    }

    const handleDelete = (id) => {
        const updatedList = todoList?.filter(el => el.id !== id)
        setTodoList(updatedList);
    }

    const handleCompletedList = (id) => {
        const completedTodo = todoList.map(el => {
            if (el.id === id) {
                return {...el, isCompleted: !el.isCompleted}
            }
            return el
        })
        console.log(completedTodo, 'completedTodo')
        setTodoList(completedTodo)

    }

    console.log(todoList, 'list');
    

  return (
   <main className='main-section'>
     <h4>ToDoList</h4>
     <input name='todo' type="text" placeholder='Enter ToDo' autoFocus value={todo} onChange={(e) => addTodo(e.target.value)}  style={{ width: '150px', height: '20px' }}/>
     <button style={{ marginLeft: '10px', height: '25px' }} onClick={handleTodo} disabled={todo === ''}>Add Todo</button>
     {todoList.length > 0 &&
     <div className='todo-list'>
        <span>Your entered todo list: </span>
        <ul style={{ margin: '0', width: '' }}>
            {todoList.filter(el => !el.isCompleted ).map(el =>
            (<li key={el.id}>
                    <input type="checkbox" onClick={() => handleCompletedList(el.id)} />
                    <span>{el.todo}</span>
                    <button onClick={()=>handleDelete(el.id)}>Delete</button>
                </li>
            ))}
        </ul>
        <span>Completed List: </span>
        <ul style={{ margin: '0', width: '' }}>
            {todoList.filter(el => el.isCompleted).map(el => (
                <li key={el.id}>
                    <span style={{ textDecoration: 'line-through' }}>{el.todo}</span>
                </li>
            ))}
        </ul>
     </div>}
   </main>
  )
}

export default ToDoList