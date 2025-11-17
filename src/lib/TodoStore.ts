import { create } from "zustand";
import type { Todo } from "../types/todo";
import { persist } from "zustand/middleware";


interface TodoStore{
    todos: Todo[],
    addTodo: (text: string) => void,
    deleteTodo: (id:string) => void,
    toggleTodo: (id: string) => void,
    updateTodo: (id:string, text: string) => void,
    getTodosStat: () => {total:number; active: number; completed: number};
}


export const useTodoStore = create<TodoStore>()(
    persist(
        (set, get)=>({
        todos: [],

        addTodo: (text: string) => set((state)  => ({
            todos: [
                ...state.todos,
                {
                    id: Date.now().toString(),
                    text: text.trim(),
                    completed: false,
                    createdAt: new Date()
                }
            ]
        })),

        deleteTodo: (id: string) => set((state) => ({
            todos: state.todos.filter(todo => todo.id !== id)
        })),

        toggleTodo: (id:string) => set((state) => ({
            todos: state.todos.map(todo =>
                todo.id === id 
                    ? {...todo,completed:!todo.completed} //Update Spacific todo
                    : todo //Keep other todos unchanged
            )
        })),

        updateTodo: (id:string, text: string) => set((state) => ({
            todos: state.todos.map( todo => 
                todo.id === id  
                    ? {...todo, text: text.trim()}
                    : todo
            )
        })),

        getTodosStat: () => {
            const { todos } = get()
            return {
                total: todos.length,
                active: todos.filter( todo => !todo.completed).length,
                completed: todos.filter( todo => todo.completed).length
            }
        }
    })
    
    ,{
        name:'Todo-Storage'
    }
    )
)

