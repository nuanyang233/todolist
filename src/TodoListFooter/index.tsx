/**
 * @Author:  chengmingyuan
 * @Date:  2020-12-25
 * @Description:
 **/
import React from 'react'
import {Button, Radio} from "antd";
import {TodoStatus} from "../constants";
import './index.css'

function TodoListFooter({ activeTodoCount, completedTodoCount, showState, handleChangeShowState, handleClearAllCompleted }: ITodoListFooterProps) {

    return <div className='todo-list-footer'>
        <div>{activeTodoCount} items left</div>
        <div className='activeKey-controller'>
            <Radio.Group value={showState} onChange={handleChangeShowState}>
                <Radio.Button value={TodoStatus.ALL_TODOS}>All</Radio.Button>
                <Radio.Button value={TodoStatus.ACTIVE_TODOS}>Active</Radio.Button>
                <Radio.Button value={TodoStatus.COMPLETED_TODOS}>Completed</Radio.Button>
            </Radio.Group>
        </div>
        <div>
            {!!completedTodoCount &&
            <Button
                type="link"
                onClick={handleClearAllCompleted}
            >
                Clear completed
            </Button>}
        </div>
    </div>
}

export default TodoListFooter
