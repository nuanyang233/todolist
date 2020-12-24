/**
 * @Author:  chengmingyuan
 * @Date:  2020-12-24
 * @Description: TodoList Item
 **/
import React, { useState, useRef, useEffect } from 'react'
import { Checkbox, Input } from "antd";
import { CloseOutlined } from '@ant-design/icons'
import {ENTER_KEY, ESCAPE_KEY} from "../constants";
import './index.css'

function TodoItem({
  title,
  completed,
  editing,
  handleDelete,
  handleToggle,
  handleEdit,
  handleCancelEdit,
  handleSave
}) {
    const inputRef = useRef()

    const [editText, setEditText] = useState(title)

    const handleChange = e => {
        const input = e.target
        setEditText(input.value)
    }

    const handleSubmit = () => {
        console.log(editText)
        const value = editText.trim()

        if(value) {
            handleSave(value)
            setEditText(value)
        } else {
            handleDelete()
        }

    }

    const handleKeyDown = e => {
        // If user enter Escape, cancel the editing state
        if(e.keyCode === ESCAPE_KEY) {
            setEditText(title)
            handleCancelEdit()
        } else if (e.keyCode === ENTER_KEY) {
            handleSubmit()
        }
    }

    // autoFocus
    useEffect(() => {
        if(!!editing) {
            inputRef.current.focus()
        }
    }, [editing])

    return (
        <div className='todo-item'>
            <div className={`todo-item-main ${editing ? 'editing' : ''}`}>
                <Checkbox checked={completed} onChange={handleToggle} />
                <Input
                    ref={inputRef}
                    value={editText}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onBlur={handleSubmit}
                />
                <label
                    className='todo-item-label'
                    onDoubleClick={handleEdit}
                >
                    {title}
                </label>

            </div>
            <CloseOutlined onClick={handleDelete} />
        </div>
    )
}

export default TodoItem
