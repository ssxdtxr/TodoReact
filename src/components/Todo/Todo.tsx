import React, { useState} from 'react';
import {ITodo} from "../../types/data";
import {Container} from "../../UI/Container/Container";
import {Panel} from "./Panel/Panel";
import {TodoList} from "./TodoList/TodoList";

export const Todo = () => {
    const [todos, setTodos] = useState<ITodo[]>(JSON.parse(localStorage.getItem("todos") ?? "[]"))
    const addTodo = (value: string) => {
        if (value) {
            let todo =  {
                id: Date.now(),
                title: value,
                isDone: false
            }
            todos.push(todo)
            localStorage.setItem("todos", JSON.stringify(todos))
            setTodos(JSON.parse(localStorage.getItem("todos") ?? "[]"))
        }
    }
    return (
        <div>
            <Container>
                <Panel
                    addTodo={addTodo}
                />
                <TodoList
                    todos={todos}
                    setTodos={setTodos}
                />
            </Container>
        </div>
    )
}
