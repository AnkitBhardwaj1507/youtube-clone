import React from "react";
import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";
import { useDispatch } from 'react-redux';
import { setMenu } from '../utils/appSlice';

// Landing Page with Infinite Scroll
const MainContainer = () => {

    const dispatch = useDispatch();
    dispatch(setMenu());

    return (
        <div className="flex flex-col overflow-hidden dark:bg-slate-700 dark:text-slate-300">
            <ButtonList />
            <VideoContainer />
        </div>
    )
}

export default MainContainer;