import React from "react";

const Button = ({ name }) => {
    return (
        <div className="">
            <button 
                className={`px-3 py-1 my-2 mx-1 items-center border border-gray-100 rounded-lg   ${name==="All"?"bg-black text-white dark:bg-white dark:text-slate-800":'bg-gray-100 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600 hover:bg-gray-200'} dark:border-none `}>
                {name}
            </button>
        </div>
    )
}

export default Button;