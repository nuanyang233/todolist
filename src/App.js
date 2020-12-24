import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Input, List } from "antd";
import { v4 as uuidV4 } from 'uuid'
import TodoItem from "./TodoItem";
import { storage } from "./utils";
import {ACTIVE_TODOS, ALL_TODOS, COMPLETED_TODOS, ENTER_KEY} from "./constants";
import './App.css';
import 'antd/dist/antd.css';

function App({ initTodoList }) {
  const newField = useRef()

  const [showState, setShowState] = useState(ALL_TODOS)
  const [editing, setEditing] = useState(null)
  const [todoList, setTodoList] = useState(initTodoList)

  const handleAddNewTodo = (e) => {
    if(e.keyCode !== ENTER_KEY) return

    e.preventDefault()

    const title = newField.current.state.value.trim()

    if(title) {
      setTodoList([...todoList, { id: uuidV4(), title, completed: false }])
      // model.addTodo(title)
      newField.current.state.value = ''
    }
  }

  const needShowTodoList = useMemo(() => {
    const showTodos = todoList.filter(todo => {
      switch(showState) {
        case ACTIVE_TODOS:
          return !todo.completed
        case COMPLETED_TODOS:
          return todo.completed
        default:
          return true
      }
    })

    return showTodos
  }, [showState, todoList])

  useEffect(() => {
    // when the state changed, persist it
    storage('todolist', todoList)
  }, [todoList])

  return (
      <div className="App">
        <div className="main">
          <h1>Todo List</h1>
          <Input
              autoFocus={true}
              ref={newField}
              placeholder="What needs to be done?"
              onKeyDown={handleAddNewTodo}
          />
          <List
              bordered
              dataSource={todoList}
              renderItem={todo => <List.Item><TodoItem {...todo} editing={editing} /></List.Item>}
          />
        </div>
      </div>
  );
}

export default App;
