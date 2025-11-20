import React, { useState } from 'react'

const Filters = ({setFilter, setIsSorted}) => {
    
    const btnData = [
        {id: 'btn1', text:'All'},
        {id: 'btn2', text:'Pending'},
        {id: 'btn3', text:'Completed'},
    ]

    const [activeBtn, setActiveBtn] = useState('btn1')
 

  return (
    <div className='flex gap-2'>
        {btnData.map((btn) => (
            <button 
                key={btn.id}
                onClick={() => {setFilter(btn.text); setActiveBtn(btn.id); setIsSorted(false)}}
                className={`${ activeBtn === btn.id ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'} hover:bg-blue-300  py-1 px-4 rounded text-sm`} >
                {btn.text}
            </button>
        ))}
        
    </div>
  )
}

export default Filters