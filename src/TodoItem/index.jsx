/**
 * @Author:  chengmingyuan
 * @Date:  2020-12-24
 * @Description: TodoList Item
 **/
import React, { useState } from 'react'
import { Checkbox, Input } from "antd";

function TodoItem({ title, completed, editing }) {
    const [editText, setEditText] = useState(title)


    const handleChange = e => {
        const input = e.target.value
        setEditText(input.value)
    }

    return (
        <div>
            <Checkbox checked={completed} />
            {
                editing ? <Input value={editText} onChange={handleChange} /> : <label>{title}</label>
            }
        </div>
    )
}

export default TodoItem
