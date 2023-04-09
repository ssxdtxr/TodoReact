import React, {FC, useState} from "react";
import styles from "./TodoItem.module.scss";
import {ITodo} from "../../../types/data";
import deleteIcon from "../../../images/TodoItem/delete.png"
import editIcon from "../../../images/TodoItem/edit.png"
import saveIcon from "../../../images/TodoItem/save.png"
import cn from "classnames";

interface ITodoItem {
    todo: ITodo
    todos: ITodo[]
    setTodos: (todos: ITodo[]) => void
}
export const TodoItem:FC<ITodoItem> = ({todo, setTodos, todos}) => {
    const {isDone, id, title} = todo
    const [edit, setEdit] = useState(false)
    const [value, setValue] = useState<string>('')
    const editTodo = (): void => {
        setValue(title)
        setEdit(true)
    }
    const saveTodo = (): void => {
        let newTodo = [...todos].map(item => {
            if (item.id === id) {
                item.title = value
            }
            return item
        })
        localStorage.setItem("todos", JSON.stringify(newTodo))
        setTodos(JSON.parse(localStorage.getItem("todos") ?? "[]"));
        setEdit(false)
    };

    const removeTodo = (): void => {
        let newTodos = todos.filter((todo) => todo.id !== id)
        localStorage.setItem("todos", JSON.stringify(newTodos))
        setTodos(JSON.parse(localStorage.getItem("todos") ?? "[]"))
    }
    const toggleTodo = (): void => {
        let toggleTodos = todos.map(todo => todo.id !== id ? todo : {...todo, isDone: true} )
        localStorage.setItem("todos", JSON.stringify(toggleTodos))
        setTodos(JSON.parse(localStorage.getItem("todos") ?? "[]"))
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" || event.key === "click") {
            saveTodo()
        }
    }
    return (
        <div className={cn(styles.item, isDone && styles.isDone )}>
            <></>
            <label className={styles.check} >
                <input type="checkbox"
                       checked={isDone}
                       onChange={toggleTodo}
                />
                <div></div>
            </label>

            {
                edit ?
                    <>
                        <input
                            autoFocus
                            value={value}
                            onChange={handleChange}
                            className={styles.editInput}
                            onKeyDown={(event) => handleKeyDown(event)}
                        />
                        <div className={styles.btnSave} onClick={saveTodo}>
                            <img alt="Сохранение" className={styles.edit} src={saveIcon}/>
                        </div>
                    </>
                    :
                    <>
                        {
                            !isDone
                                ?
                                <div className={styles.btnEdit} onClick={editTodo}>
                                    <img alt="Редактирование" className={styles.edit} src={editIcon}/>
                                </div>
                                :
                                <></>
                        }
                        <span className={styles.name}>{title}</span>
                    </>
            }
            <div className={styles.btnRemove} onClick={removeTodo}>
                <img alt="Удаление" className={styles.delete} src={deleteIcon}/>
            </div>
        </div>)
}