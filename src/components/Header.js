import React, { useEffect, useState } from "react";
import hamBurgerIcon from '../assets/icons/hamBurgerIcon.png';
import youtubeIcon from '../assets/icons/youtube-logo.svg';
import user from "../assets/icons/user.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu, setMenu, closeMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/Constant";
import { cacheResult } from "../utils/searchSlice";
import { Link, useNavigate } from "react-router-dom";

import youtubelogoLightMode from "../utils/images/youtubelogoLightMode.png";
import youtubelogoDarkMode from "../utils/images/yt-logoDrakMode.png";
import {BiUserCircle} from "react-icons/bi";
import {GoSearch} from "react-icons/go";
import {IoIosMenu} from "react-icons/io";
import {MdOutlineDarkMode} from "react-icons/md";
import {MdOutlineLightMode} from "react-icons/md";
import {BsArrowLeftShort} from "react-icons/bs";

const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const [smSearch,setsmSearch]=useState(false)
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const [darkMode, setDarkMode] = useState(false);

    const searchCache = useSelector((store) => store.search);

    // setting initial theme to light Mode
    document.documentElement.classList.toggle('dark', darkMode);

    //Dark Mode toggle
    const toggleTheme = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark', darkMode);
    }

    useEffect(() => {
        //Hiding Sidebar Initially for small screen
        if(window.innerWidth<768) dispatch(closeMenu());
    }, [])


    useEffect(()=> {
        
        const timer = setTimeout(() => {
            if(searchCache[searchQuery]) {
                setSuggestions(searchCache[searchQuery]);
            }else {
                getSearchSuggestion();
            }
            
        }, 200)

        return () => {
            clearTimeout(timer);
        }
    },[searchQuery]);

    const getSearchSuggestion = async () => {
        
        const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
        const json = await data.json();
        setSuggestions(json[1]);

        dispatch(cacheResult({
            [searchQuery] : json[1]
            })
        );

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/search?q="+searchQuery,{relative: "path"})
        setShowSuggestions(false);
    }

    //Toggle Navbar
    const toggleMenuHandler = () => {
        dispatch(toggleMenu())
    }

    return (
        <div className="sticky top-0 grid grid-flow-col py-3 md:px-3 px-1 bg-white dark:bg-slate-800 w-full">
            {smSearch && 
            <div className="flex items-center px-0 mx-0"><button
            onClick={()=>{
                setsmSearch(false);
            }}><BsArrowLeftShort className='text-3xl'/></button></div>
        }
        

            {/* {Logo and HamburgerMenu} */}
            <div className={`flex col-span-2 md:col-span-1 items-center mx-4 ${smSearch?'max-sm:hidden':''}`}>
                <img onClick={() => toggleMenuHandler()} className="h-8 cursor-pointer" alt="menu" src= {hamBurgerIcon} />
                <Link to="/">
                    <img className="h-4 md:h-6 md:mx-4 mx-1" alt="youtubeLogo" src={darkMode?youtubelogoDarkMode:youtubelogoLightMode}>
                    </img>
                </Link>
            
            </div>

            {/* {Search} */}
            <div className={`${smSearch?'col-span-10':'col-span-10 max-sm:flex max-sm:justify-end'} ml-1 md:ml-24`}>
                <div className={`group flex flex-row`}>
                    <input
                    value={searchQuery}
                    className={`${smSearch?'w-full':'w-3/5 max-sm:hidden'} md:w-2/3 border border-gray-400 rounded-l-full py-1 pl-3 md:pl-5 group-focus-within:border-sky-300 dark:bg-slate-800 dark:text-white`}
                    type="text"
                    placeholder="Search"
                    onChange={(e)=> {
                        setSearchQuery(e.target.value);
                    }}
                    onFocus={()=>{
                        const screenWidth = window.innerWidth;
                        if(screenWidth<=768){
                            if(!smSearch) setsmSearch(true);
                        }
                        setShowSuggestions(true);
                    }}

                    // When not focused Suggestions are removed
                    //latency of 200s is kept to clicking suggestions so that this wont get trigeered

                    onBlur={() => {
                        setTimeout(()=>setShowSuggestions(false), 200);
                    }}

                    // checking which key is pressed
                    onKeyDown={(e) => {
                        if(e.key === 'Enter') {
                            handleSubmit(e);
                        }
                    }}
                    />

                    {/* {search button} */}
                    <button 
                    className={`border border-gray-400 ${!smSearch?'max-sm: border-none max-sm:rounded-full':''} rounded-r-full md:py-2 px-2 md:px-5 flex justify-center items-center hover:bg-gray-100`}
                    onClick={() => {
                        const screenWidth = window.innerWidth;
                        if(screenWidth<=768 && !smSearch) {
                            if(!smSearch) setsmSearch(true);
                        }
                        else navigate("/search?q="+searchQuery,{ relative: "path"})
                    }}><GoSearch className='text-xl max-sm:mt-1 dark:text-white'/></button>
                </div>

                {/* suggestions */}
                
                { showSuggestions && searchQuery!="" &&
                    <div className='fixed bg-white rounded-xl border border-gray-100 shadow-lg dark:bg-slate-800 dark:text-white'>
                        <div className=' py-2'>
                        <ul>
                            {suggestions.map((s,index)=> 
                            (<li key={"s"+index} className='hover:bg-gray-100 dark:hover:bg-slate-700'>
                            <Link to={"/search?q="+s} onClick={()=>setSearchQuery(s)} ><div className='flex lg:w-[23rem] lg:mr-[8.3rem] px-5 items-center'><GoSearch className='text-lg m-2 mr-4'/> <span className='mb-1'>{s}</span></div></Link>
                            </li>))}
                        </ul>
                        </div>
                    </div>
                }

            </div>

            {/* User Icon */}
            <div className={`flex justify-center md:col-span-1 col-span-2 items-center ${smSearch?'max-sm: hidden': ''}`}>
                <BiUserCircle className='text-3xl md:text-4xl font-normal dark:text-white'/>
            </div>


            <div className={`flex items-center col-span-2 ${smSearch?'max-sm: hidden': 'ml-2'}`}>
                {!darkMode?<MdOutlineDarkMode className="text-2xll" onClick={()=>toggleTheme()}/>: <MdOutlineLightMode className="text-2xl text-white" onClick={()=>toggleTheme()}/>}
            </div>



        </div>

        // <div className="grid grid-flow-col p-2 m-2 shadow-lg">
        //     <div className="flex col-span-1">
        //         <img onClick={() => toggleMenuHandler()} className="h-8 cursor-pointer" alt="menu" src= {hamBurgerIcon} />
        //         <img className="h-6 mx-7" alt="youtube-logo" src= {youtubeIcon}/>
        //     </div>
        //     <div className="col-span-10 ml-16">
        //         <div>
        //             <input className="w-1/2 border border-gray-400 p-2 rounded-l-full" type="text" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} 
        //             onFocus={() => setShowSuggestions(true)}
        //             onBlur={() => setShowSuggestions(false)}/>
        //             <button className="border border-gray-400 py-2 px-3 rounded-r-full bg-gray-100">Search</button>
        //         </div>
        //         {showSuggestions && <div className="fixed bd-white py-2 px-2 w-[37rem] shadow-lg rounded-lg border border-gray-100">
        //             <ul>
        //                 {suggestions.map((s) => (<li key={s} className="py-2 px-3 shadow-sm hover: bg-gray-100">{s}</li>))}
        //             </ul>
        //         </div>}
        //     </div>
        //     <div className="col-span-1">
        //         <img className="h-8" alt="user" src={user} />
        //     </div>
        // </div>
    )
}

export default Header;