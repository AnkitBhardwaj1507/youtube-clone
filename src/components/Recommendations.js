import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { video_recommendations_api } from '../utils/Constant';
import { Link } from "react-router-dom";
import RecommendedVideos from './RecommendedVideos';
import ShimmerRecommendedVideo from './ShimmerRecommemdedVideo';

const Recommendations = () => {
    const channelId = useSelector((store)=> store.channelId.channelId);
    const [recVideoList, setRecVideoList] = useState(null);
    

    useEffect(()=> {
        fetchData();
    },[])

    const fetchData = async () => {
        const data = await fetch(video_recommendations_api+channelId);
        const jsondata = await data.json();
        setRecVideoList(jsondata?.items);
    }
    return recVideoList == null?<div>
        <ShimmerRecommendedVideo />
        <ShimmerRecommendedVideo />
        <ShimmerRecommendedVideo />
        <ShimmerRecommendedVideo />
        <ShimmerRecommendedVideo />
        <ShimmerRecommendedVideo />
        <ShimmerRecommendedVideo />
        <ShimmerRecommendedVideo />
        <ShimmerRecommendedVideo />
        <ShimmerRecommendedVideo />
        <ShimmerRecommendedVideo />
        <ShimmerRecommendedVideo />
        <ShimmerRecommendedVideo />
        <ShimmerRecommendedVideo />
        <ShimmerRecommendedVideo />
        <ShimmerRecommendedVideo />
        <ShimmerRecommendedVideo />
        <ShimmerRecommendedVideo />
    </div>:(
        <div>
            {
                //Recommended Video Lists
                recVideoList.map((recvideo,index)=> <Link to={"/watch?v="+recvideo?.contentDetails?.upload?.videoId} key={index}><RecommendedVideos data={recvideo}/></Link> )
            }
        </div>
    )
}

export default Recommendations;