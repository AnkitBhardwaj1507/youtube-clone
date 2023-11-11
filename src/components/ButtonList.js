import React from "react";
import Button from "./Button";

const list = ["All","Gaming","Music","Live","Soccer","Cricket","Comedy","Action","Movie","Software"];

const ButtonList = () => {
    return (
        <div className="flex flex-row ml-1 dark:bg-slate-800 dark:text-slate-300">
            {
                list.map((item,index)=> <Button key={index} name={item}/>)
            }
        </div>
    )
}

export default ButtonList;