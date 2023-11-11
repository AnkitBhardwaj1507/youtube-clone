import React, { useState, useEffect } from "react";
import { channelImage_api } from '../utils/Constant';
import { useSelector } from 'react-redux';

const VideoCard = ({ info }) => {
    const [channelImage, setChannelImage] = useState("")
    const { snippet, statistics } = info;
    const { channelTitle, channelId, title, thumbnails } = snippet;

    //Subscribe to Store
    const isMenuOpen = useSelector((store)=>store.app.isMenuOpen);

    useEffect(() => {
        getChannelImage();
    },[])

    //Getting Channel Image using ChannelId
    const getChannelImage = async() => {
        const data = await fetch(channelImage_api+"&id="+channelId);
        const json = await data.json();
        const url = json?.items[0]?.snippet?.thumbnails?.high?.url;
        setChannelImage(url);
    }

    return (
        <div className="flex flex-col m-2 w-[312px] h-[300px] hover:bg-slate-500 rounded-lg dark:hover-slate-800">
            {/* main Image - thumbnails */}
            <img className="rounded-lg mb-2" alt="thumbnail" src={thumbnails?.medium?.url} />

            <div>
                {/* image and title container */}
                <div className="flex flex-row items-center">
                    <img className="w-10 h-10 mr-1 rounded-full" src={channelImage}/>
                    <p className="font-semibold line-clamp-2 text-base font-sans">{title}</p>
                </div>

                {/* Channel name and Views Count */}
                <div className="pl-10 text-sm">
                    <p className="my-[0.15rem]">{channelTitle}</p>
                    {/* <p className="font-semibold line-clamp-2 text-base font-sans"></p> */}
                </div>
                
            </div>

        </div>
    );
};

export default VideoCard;