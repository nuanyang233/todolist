/**
 * @Author:  chengmingyuan
 * @Date:  2020-12-24
 * @Description: TodoList Item
 **/
import React, { useState } from 'react'
import {Button, Checkbox, Input} from "antd";
import { CloseOutlined } from '@ant-design/icons'
import './index.css'

function TodoItem({ title, completed, editing, handleDelete }) {
    const [editText, setEditText] = useState(title)

    const handleChange = e => {
        const input = e.target.value
        setEditText(input.value)
    }

    return (
        <div className='todo-item'>
            <div>
                <Checkbox checked={completed} />
                {
                    editing ? <Input value={editText} onChange={handleChange} /> : <label>{title}</label>
                }
            </div>
            <CloseOutlined onClick={handleDelete} />
        </div>
    )
}

export default TodoItem
