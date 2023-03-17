import React from 'react'
import List from './List'

function Todo({ todos, setTodos, filtered }) {
    return (

        <div className="todo-container">
            <ul className="todo-list">

                {filtered.map((todo) => (
                    <List
                        text={todo.text}
                        todo={todo}
                        key={todo.id}
                        todos={todos}
                        setTodos={setTodos}
                    ></List>
                ))}



            </ul>
        </div>
    )
}

export default Todo