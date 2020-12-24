import {Button, Radio} from "antd";
import {ACTIVE_TODOS, ALL_TODOS, COMPLETED_TODOS} from "../constants";
import './index.css'
/**
 * @Author:  chengmingyuan
 * @Date:  2020-12-25
 * @Description:
 **/


function TodoListFooter({ activeTodoCount, completedTodoCount, showState, handleChangeShowState, handleClearAllCompleted }) {

    return <div className='todo-list-footer'>
        <div>{activeTodoCount} items left</div>
        <div className='activeKey-controller'>
            <Radio.Group value={showState} onChange={handleChangeShowState}>
                <Radio.Button value={ALL_TODOS}>All</Radio.Button>
                <Radio.Button value={ACTIVE_TODOS}>Active</Radio.Button>
                <Radio.Button value={COMPLETED_TODOS}>Completed</Radio.Button>
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
