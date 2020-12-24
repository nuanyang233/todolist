import React, { useState, useEffect, useRef, useMemo } from 'react'
import {Button, Input, List, Radio} from "antd";
import { v4 as uuidV4 } from 'uuid'
import TodoListFooter from "./TodoListFooter";
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

  const handleDelete = (id) => {
    setTodoList(prevState => prevState.filter(todo => todo.id !== id))
  }

  const handleToggle = (id) => {
    setTodoList(prevState => prevState.map(todo => todo.id !== id ? todo : { ...todo, completed: !todo.completed }))
  }

  const handleEdit = (id) => {
    setEditing(id)
  }

  const handleCancelEdit = () => {
    setEditing(null)
  }

  const handleSave = (id, title) => {
    setTodoList(prevState => prevState.map(todo => todo.id !== id ? todo : { ...todo, title }))
    setEditing(null)
  }

  const handleChangeShowState = e => {
    setShowState(e.target.value)
  }

  const handleClearAllCompleted = () => {
    setTodoList(prevState => prevState.filter(todo => !todo.completed))
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

  const activeTodoCount = useMemo(() => {
    const count = todoList.reduce((accum, todo) => todo.completed ? accum : accum + 1, 0)
    return count
  }, [todoList])

  const completedTodoCount = todoList.length - activeTodoCount

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
              dataSource={needShowTodoList}
              footer={
                (!!activeTodoCount || !!completedTodoCount) && <TodoListFooter
                    activeTodoCount={activeTodoCount}
                    completedTodoCount={completedTodoCount}
                    handleChangeShowState={handleChangeShowState}
                    handleClearAllCompleted={handleClearAllCompleted}
                    showState={showState}
                />
              }
              renderItem={todo => <List.Item>
                <TodoItem
                    {...todo}
                    editing={editing === todo.id}
                    handleDelete={() => handleDelete(todo.id)}
                    handleToggle={() => handleToggle(todo.id)}
                    handleEdit={() => handleEdit(todo.id)}
                    handleCancelEdit={() => handleCancelEdit()}
                    handleSave={(text) => handleSave(todo.id, text)}
                />
              </List.Item>}
          />
        </div>
      </div>
  );
}

export default App;
