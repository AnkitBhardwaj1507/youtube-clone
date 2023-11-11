import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { sideBarIconsList } from '../utils/sideBarIconsList';
import { closeMenu, setMenu } from '../utils/appSlice';

const Sidebar = () => {
    const dispatch = useDispatch();

    //subscribe to store
    const isMenuOpen = useSelector(store => store.app.isMenuOpen);

    if(!isMenuOpen) return null;

    return (

        <div className="p-5 pt-1 pr-3 shadow-lg bg-white dark:bg-slate-800 dark:text-slate-300">
            <ul>
                {
                    sideBarIconsList.map((icondata,index)=> <Link key={icondata.name+index} to={'/'+(icondata.name != "Home"?`search?q=${icondata.name}`:"")}><li className="flex font-normal items-center py-2 rounded-lg hover:bg-slate-100 px-4 text-base my-2 dark:hover:bg-slate-600">{icondata.key}<span className="px-4">{icondata.name}</span></li></Link>)
                }
            </ul>
        </div>
        // <div className="p-5 shadow-lg w-60">
        //     <ul>
        //         <li><Link to="/">Home</Link></li>
        //         <li>Shorts</li>
        //         <li>Videos</li>
        //         <li>Live</li>
        //     </ul>
        //     <h1 className="pt-5 font-bold">Subscription</h1>
        //     <ul>
        //         <li>Music</li>
        //         <li>Sports</li>
        //         <li>Gaming</li>
        //         <li>Movies</li>
        //     </ul>

        //     <h1 className="pt-5 font-bold">Watch later</h1>
        //     <ul>
        //         <li>Music</li>
        //         <li>Sports</li>
        //         <li>Gaming</li>
        //         <li>Movies</li>
        //     </ul>
        // </div>
    )
}

export default Sidebar;