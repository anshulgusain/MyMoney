import React from 'react'

function InputBox({label,placeholder,onChange}) {
  return (
    <div>
      <div className='text-sm font-medium text-left py-2'>
        {label}</div>
        <input onChange ={onChange}placeholder={placeholder} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border rounded border-slate-200"></input>
    </div>
  )
}

export default InputBox
