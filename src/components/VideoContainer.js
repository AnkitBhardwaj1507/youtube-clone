
import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEOS_API } from "../utils/Constant";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import ShimmerUI from "./ShimmerUi";
import { useDispatch } from "react-redux";
import { setChannelId } from "../utils/channelIdSlice";

//Home Page video Contianer
const VideoContainer = () => {
    const [videos, setVideos] = useState([]);
    const [scrolledDown, setScrollDown] = useState(false);
    const dispatch = useDispatch();

    //re-render on scroll
    useEffect(() => {
        getVideos();
    }, [scrolledDown]);

    //Api call
    const getVideos =async () => {
        const data =await fetch(YOUTUBE_VIDEOS_API);
        const json =await data.json();
        const updatedData = videos.concat(json.items);
    
        setVideos(updatedData);
        setScrollDown(false);
    }

    //infinite Scroll
    const handleScroll = () => {
        if(window.innerHeight + document.documentElement.scrollTop+1500 >= document.documentElement.offsetHeight) {
            setScrollDown(true);
        }
        return;
    }

    //handle infinite Scroll 
    useEffect(()=> {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])


    return (
        <div className="flex flex-wrap justify-evenly md:gap-x-2 dark:text-slate-300">
            
            {
            videos.length === 0 ? <ShimmerUI/> : videos.map((video, index) => (
                
                <Link key={video?.id + index} to = {"/watch?v=" + video?.id} 
                
                    onClick={()=>{dispatch(setChannelId(video?.snippet?.channelId))}}>
                        {/* {console.log('channelId video',video?.snippet?.channelId)} */}
                    <VideoCard info={video}/>
                </Link>
            ))
        }
            
        </div>
    )
}

export default VideoContainer;