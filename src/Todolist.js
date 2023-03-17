import React, { useState, useEffect } from 'react'
import './asset/style.css'
import Form from './Component/Form'
import Todo from './Component/Todo';

function Todolist() {
    const [inputText, setInputText] = useState("");
    const [todos, setTodos] = useState([]);
    const [status, setStatus] = useState("all");
    const [filtered, setFiltered] = useState([]);

    //* Component mount edildiğinde local storage'dan todos çek

    useEffect(() => {
        getLocalTodos();
    }, []);

    //* sadece ekleme olması halinde saveLocaltodos çalışacak.
    //* Todos veya status değiştiğinde local storage'a kaydet
    useEffect(() => {
        saveLocalTodos();
        filterHandler();
    }, [todos, status])

    //* todosları locale ekle
    const saveLocalTodos = () => {
        localStorage.setItem("todos", JSON.stringify(todos));
    };

   

    const getLocalTodos = () => {
        const todos = localStorage.getItem("todos");
        if (todos) {
            setTodos(JSON.parse(todos));
        }
    };

    //* status değeri completed ise  todos filter et completed değeri true olanları ile dizi oluştur

    const filterHandler = () => {
        switch (status) {
            case "completed":
                setFiltered(todos.filter((todo) => todo.completed === true));
                break;
            case "uncompleted":
                setFiltered(todos.filter((todo) => todo.completed === false));
                break;
            default:
                setFiltered(todos);
                break;
        }
    }











    // //! eğer localde todoslar null ile içine boş bir array oluştur
    // //! eğer dolu ise settodos ı çalıştır

    // const getLocalTodos = () => {
    //     if (localStorage.getItem("todos") === null) {
    //         localStorage.setItem("todos", JSON.stringify([]))
    //     } else {
    //         setTodos(JSON.parse(localStorage.getItem("todos")))
    //     }
    // }


    return (
        <div>
            <div className="container-fluid">
                <div className="row main justify-content-center align-items-center">
                    <div className="col-8">
                        <h1 className='header'>Yapılacaklar Listesi</h1>
                        <Form
                            inputText={inputText}
                            setInputText={setInputText}
                            todos={todos}
                            setTodos={setTodos}
                            setStatus={setStatus}>
                        </Form>
                        <Todo
                            todos={todos}
                            setTodos={setTodos}
                            filtered={filtered}>

                        </Todo>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Todolist