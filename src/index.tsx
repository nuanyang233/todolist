import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TodoApp from './App';
import {storage} from "./utils";

// Get Initial todo list data from localstorage when the application mounted
const initTodoList = storage('todolist')

ReactDOM.render(
    <TodoApp initTodoList={initTodoList} />,
  document.getElementById('root')
);

