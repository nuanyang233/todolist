/**
 * @Author:  chengmingyuan
 * @Date:  2020-12-24
 * @Description: tool functions
 **/

export const storage = (namespace, data) => {
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
