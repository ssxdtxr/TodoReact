import React, {FC} from "react";
import {ITodo} from "../../../types/data";
import {TodoItem} from "../TodoItem/TodoItem";
import styles from "./TodoList.module.scss"
export interface ITodoList {
    todos: ITodo[]
    setTodos: (todos: ITodo[]) => void
}
export const TodoList:FC<ITodoList> = ({todos, setTodos}) => {
    const completedTodos = () => {
        return todos.filter(todo => todo.isDone).length
    }

    const allTodos = () => {
        return todos.length
    }

    return <>
        <div className={styles.todoList}>
            <h1>Todo List</h1>
            { todos.length
                ?
                todos.map(todo =>
                    <TodoItem
                        key={todo.id}
                        todos={JSON.parse(localStorage.getItem("todos") ?? "[]")}
                        setTodos={setTodos}
                        todo={todo}
                    />
                )
                :
                <h2>Todo List is empty</h2>
            }

        </div>
        {
            todos.length
                ?
                <div className={styles.todosInfo}>
                    <h3 className={styles.completed}>Completed: {completedTodos()}</h3>
                    <h3 className={styles.all}>ALL Todos: {allTodos()}</h3>
                </div>
                :
                <></>
        }
    </>
}