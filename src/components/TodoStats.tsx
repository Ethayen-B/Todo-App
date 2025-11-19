import React from 'react'
import { useTodoStore } from '../lib/TodoStore';


const TodoStats = () => {

    const getTodosStats = useTodoStore((state) => state.getTodosStat);
    const stats = getTodosStats()

    const completed = stats.completed;
    const total = stats.total;
    const pending = total - completed;
    const completionPersentage = total ? Math.round((completed / total) * 100) : 0;

    interface StatCardProps {
    className: string,
    title : string,
    value: string | number,
}

    const StatCard: React.FC<StatCardProps> = ({ title, value}) => {
        return(
            <>
                    <div className="p-2 sm:p-3 rounded-xl bg-white dark:bg-gray-500 shadow-sm border border-green-100 hover:shadow-md transition-all duration-300 hover:border-green-300 group">
                    <div className="flex items-center justify-center gap-2">
                        
                        <div className="min-0 text-center">
                            <p className="text-lg  sm:text-xl font-bold text-green-700 dark:text-white">
                                {value}
                            </p>

                            <p className="text-xs text-gray-500  dark:text-white/50 font-medium"> 
                                {title}
                            </p>
                        </div>
                    </div>
                </div>
            </>
        )
       
    }

  return (
    // <div className='mb-4 text-center'>
    //   <div className="inline-flex items-center gap-6 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600">
    //     <span>Total: {stats.total}</span>
    //     <span>Active: {stats.active}</span>
    //     <span>Completed: {stats.completed}</span>
    //   </div>
    // </div>

    <div className=''>
        <div className="grid grid-cols-1 gap-4 w-full">
                <div className=" space-y-4 sm:space-y-6">
                        <div className="grid grid-cols-4 gap-3 mb-3 ">
                            <StatCard className="max-w-2xl" title="Total Todos" value={total}/> 
                            <StatCard className="max-w-2xl" title="Pending Todos" value={pending } /> 
                            <StatCard className="max-w-2xl" title="Complited Todos" value={completed} /> 
                            <StatCard className="max-w-2xl" title="Complation Rate" value={`${completionPersentage} %`} /> 
                        </div>
                    
                </div>
            </div>
        </div>
  )
}

export default TodoStats