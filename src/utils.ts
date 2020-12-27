/**
 * @Author:  chengmingyuan
 * @Date:  2020-12-24
 * @Description: tool functions
 **/
import {ITodoItem} from "./App";

export const storage = (namespace:string, data?:any) => {
    try {
        if (data) {
            return localStorage.setItem(namespace, JSON.stringify(data))
        }

        const store = localStorage.getItem(namespace)
        return (store && JSON.parse(store)) || []
    } catch(e) {
        console.log(e.message)
        return []
    }
}
