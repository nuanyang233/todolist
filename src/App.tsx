import React, {useState, useEffect, useRef, useMemo, KeyboardEvent, ChangeEvent} from 'react'
import { Input, List } from "antd";
import { v4 as uuidV4 } from 'uuid'
import TodoListFooter from "./TodoListFooter";
import TodoItem from "./TodoItem";
import { storage } from "./utils";
import {TodoStatus, ENTER_KEY} from "./constants";
import './App.css';
import 'antd/dist/antd.css';

type AppProps = { initTodoList: Array<ITodo> }

function App({ initTodoList }: AppProps) {
  const newField = useRef<Input | null>()

  const [showState, setShowState] = useState<string>(TodoStatus.ALL_TODOS)
  const [editing, setEditing] = useState<string | null>(null)
  const [todoList, setTodoList] = useState<Array<ITodo>>(initTodoList || [])

  const handleAddNewTodo = (e:KeyboardEvent) => {
    if(e.code !== ENTER_KEY) return

    e.preventDefault()

    const title = newField.current?.state.value.trim()

    if(title) {
      setTodoList([...todoList, { id: uuidV4(), title, completed: false }])
      if(newField.current && newField.current.state) {
        // Antd design Input ref can't set value by `ref.current.value`
        // the current.state be readonly property
        // @ts-ignore
        newField.current.state.value = ''
      }
    }
  }

  const handleDelete = (id:string) => {
    setTodoList(prevState => prevState.filter(todo => todo.id !== id))
  }

  const handleToggle = (id:string) => {
    setTodoList(prevState => prevState.map(todo => todo.id !== id ? todo : { ...todo, completed: !todo.completed }))
  }

  const handleEdit = (id:string) => {
    setEditing(id)
  }

  const handleCancelEdit = () => {
    setEditing(null)
  }

  const handleSave = (id:string, title:string) => {
    setTodoList(prevState => prevState.map(todo => todo.id !== id ? todo : { ...todo, title }))
    setEditing(null)
  }

  const handleChangeShowState = (e: ChangeEvent<HTMLInputElement>) => {
    setShowState(e.target.value)
  }

  const handleClearAllCompleted = () => {
    setTodoList(prevState => prevState.filter(todo => !todo.completed))
  }

  const needShowTodoList = useMemo(() => {
    return todoList.filter(todo => {
      switch(showState) {
        case TodoStatus.ACTIVE_TODOS:
          return !todo.completed
        case TodoStatus.COMPLETED_TODOS:
          return todo.completed
        default:
          return true
      }
    })


  }, [showState, todoList])

  const activeTodoCount = useMemo(() => {
    return todoList.reduce((accum, todo) => todo.completed ? accum : accum + 1, 0)
  }, [todoList])

  const completedTodoCount = todoList.length - activeTodoCount

  useEffect(() => {
    // when the state changed, persist it
    storage('todolist', todoList)
  }, [todoList])

  return (
      <div className="App">
        <div className="main">
          <h1>Todos List</h1>
          <Input
              autoFocus={true}
              ref={ref => newField.current = ref}
              placeholder="What needs to be done?"
              onKeyDown={handleAddNewTodo}
          />
          <List
              bordered
              split
              dataSource={needShowTodoList}
              renderItem={todo => <List.Item>
                <TodoItem
                    {...todo}
                    editing={editing === todo.id}
                    handleDelete={() => handleDelete(todo.id)}
                    handleToggle={() => handleToggle(todo.id)}
                    handleEdit={() => handleEdit(todo.id)}
                    handleCancelEdit={() => handleCancelEdit()}
                    handleSave={(text:string) => handleSave(todo.id, text)}
                />
              </List.Item>}
              footer={
                (!!activeTodoCount || !!completedTodoCount) && <TodoListFooter
                    activeTodoCount={activeTodoCount}
                    completedTodoCount={completedTodoCount}
                    handleChangeShowState={handleChangeShowState}
                    handleClearAllCompleted={handleClearAllCompleted}
                    showState={showState}
                />
              }

          />
        </div>
      </div>
  );
}

export default App;
