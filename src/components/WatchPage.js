import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";
import Recommendations from './Recommendations';
import WatchPageVideoDetails from "./WatchPageVideoDetails";
import LiveChat from "./LiveChat";


// Watch Page - opens when a video is clicked
const WatchPage = () => {
    
    const [showChat, setShowChat] = useState(false);
    const [searchParams] = useSearchParams();
    const videoId = searchParams.get("v");

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(closeMenu());
    }, [])

    return (
        <div className="p-2 w-full pl-10 grid grid-cols-12 dark:bg-slate-800 dark:text-white">
            <div className="flex flex-col col-span-12 md:col-span-8 overflow-x-hidden mr-2">
                <div className="">
                    {/* <h1>hgfdrtyukmnbvftyhj</h1> */}
                    <iframe width="1000" 
                    height="450" 
                    src= {"https://www.youtube.com/embed/" + videoId + "?autoplay=1&mute=0"} 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen className="rounded-xl dark:bg-white"></iframe>

                </div>

                <WatchPageVideoDetails videoId={videoId}/>
            </div>

            {<div className="p-1 md:black w-full flex flex-col col-span-4">
                <div className="w-full">
                    {showChat && <LiveChat />}
                    <div className="w-full flex justify-center rounded-3xl">
                        <button data-testid="show-chat" onClick={setShowChat(!showChat)} className="w-full py-2 border rounded-3xl my-2 hover:bg-gray-200 dark:hover:bg-slat-600">{showChat ? "Hide Chat": "Show Chat"}</button>
                    </div>
                </div>
                <Recommendations />
            </div>}
         
        </div>
    )
}

export default WatchPage;