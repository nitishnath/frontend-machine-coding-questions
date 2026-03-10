import React, { useState } from 'react'

const ToDoListPractice = () => {
    const [todo, addTodo] = useState('')
    const [todoList, setTodoList] = useState([])


    const handleTodos = () => {
        if (!todo.trim()) {
            addTodo('')
            return
        }

        setTodoList(prevState => [
            ...prevState,
            {
                id: Date.now(),
                todo: todo.trim(),
                isCompleted: false
            }
        ])
        addTodo('')
    }

    const handleCompleted = (id) => {
    //    const completedTodo = todoList.map(item => {
    //     if(item.id === id) {

    //         //create a new object with all existing properties but set isCompleted to true
    //         return {...item, isCompleted: true}
    //     }
        
    //     // return the unchanged items
    //     return item;
    //    })
    //     setTodoList(completedTodo)

    //Better Way
    setTodoList(prevState => 
        prevState.map(item => 
            item.id === id ?
            {...item, isCompleted: !item.isCompleted}
            : item
        )
    )
    }

    const handleDelete = (id) => {
        const filteredTodo = todoList.filter(item => item.id !==id)
        setTodoList(filteredTodo, 'qwe')
    }

    const handleTodoEdit = (todo, id) => {
        const filteredTodo = todoList.filter(item => item.id !==id)
        addTodo(todo);
        setTodoList(filteredTodo)
    }

    console.log(todoList, 'todoList')

    return (
        <>
            <h3>To Do List</h3>
            <input
                type="text"
                placeholder='Enter your todo'
                value={todo}
                autoFocus={true}
                onChange={(e) => addTodo(e.target.value)}
            />
            <button onClick={handleTodos} disabled={todo.length === 0}>Add Todo</button>
            {
                todoList.length > 0 ? (
                    <div>
                        <span>Your entered todo: </span>
                        <ul>
                            {todoList.filter(item => !item.isCompleted).map(item => (
                                <li key={item.id}>
                                    <input type="checkbox" onClick={() => handleCompleted(item.id)} />
                                    {item.todo}
                                    <button onClick={() => handleTodoEdit(item.todo, item.id)}>Edit</button>
                                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                        <span>Completed List:</span>
                        <ul>
                            {todoList.filter(item => item.isCompleted).map(el => (
                               <li key={el.id} style={{textDecoration: 'line-through' }}>{el.todo}</li>
                            ))}
                        </ul>
                    </div>
                ) :
                    (
                        <div>Your Todo List is empty!</div>
                    )
            }
        </>
    )
}

export default ToDoListPractice