import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {storage} from "./utils";

// Get Initial todo list data from localstorage when the application mounted
const initTodoList = storage('todolist')

ReactDOM.render(
  <React.StrictMode>
    <App initTodoList={initTodoList} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
