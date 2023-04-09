import React, {FC, useState} from "react";
import styles from "./Panel.module.scss"
interface IPanel {
    addTodo: (value: string) => void
}

export const Panel: FC<IPanel> = ({addTodo }) => {
    const [value, setValue] = useState<string>('')


    const handleKeyDown  = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addTodo(value)
            setValue('')
        }
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>)  => {
        setValue(event.target.value)
    }
    const createTodo = () => {
        addTodo(value)
        setValue('')
    }
    return (
        <div className={styles.addTodo}>
            <h1>Add Item</h1>
            <input
                autoFocus
                className={styles.inputTodo}
                value={value}
                onChange={handleChange}
                onKeyDown={event => handleKeyDown(event)}
            />
            <button className={styles.btnTodo} onClick={createTodo} disabled={!value}>Add</button>
        </div>
    )
}