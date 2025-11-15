import React from 'react'
import { useTodoStore } from '../lib/TodoStore';
import {LuCircle, LuTrendingUp } from 'react-icons/lu';

const Layout = () => {

    const getTodosStats = useTodoStore((state) => state.getTodosStat);
    const stats = getTodosStats();

    const completed = stats.completed;
    const total = stats.total;
    const pending = total - completed;
    const completionPersentage = total ? Math.round((completed / total) * 100) : 0;

    interface StatCardProps {
    title : string,
    value: string | number,
    icon: React.ComponentType<{className? : string}>,
}

    const StatCard: React.FC<StatCardProps> = ({title, value}) => {
        return(
            <>
                    <div className="p-2 sm:p-3 rounded-xl bg-white shadow-sm border border-green-100 hover:shadow-md transition-all duration-300 hover:border-green-300 group">
                    <div className="flex items-center gap-2">
                        {/* <div className="p-1.5 rounded-lg bg-linear-to-br from-emerald-500/10 to-green-500/10 group-hover:from-emerald-500/20 group-hover:to-green-500/20">
                            {icon}
                        </div> */}

                        <div className="min-0 text-center">
                            <p className="text-lg  sm:text-xl font-bold text-green-700">
                                {value}
                            </p>

                            <p className="text-xs text-gray-500 font-medium"> 
                                {title}
                            </p>
                        </div>
                    </div>
                </div>
            </>
        )
       
    }
    return (
    <div className='ml-0 xl:ml-64 lg:ml-16 pt-16 p-3 sm:p-4 md:p-4 transition-all duration-300'>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div className="xl:col-span-1 space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <StatCard title="Total Todos" value={total} icon={<LuCircle className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500' />}/> 
                        <StatCard title="Pending Todos" value={pending } icon={<LuCircle className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500' />}/> 
                        <StatCard title="Complited Todos" value={completed} icon={<LuCircle className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500' />}/> 
                        <StatCard title="Complation Rate" value={`${completionPersentage} %`} icon={<LuCircle className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500' />} /> 
                    </div>
                
            </div>
        </div>
    </div>
  )
}

export default Layout