import React from 'react';
import {AiOutlineDislike} from "react-icons/ai";
import {AiOutlineLike} from "react-icons/ai";
import {FiMoreVertical} from "react-icons/fi";

const VideoComment = ({ data }) => {
    
    data=data?.snippet?.topLevelComment?.snippet;
    
    //Destructuring the data
    
    const { authorDisplayName, authorProfileImageUrl, likeCount, publishedAt, textDisplay } = data;

    return (
        <div className='flex mb-2'>
            {/* User image */}
            <img className='w-10 h-12 mr-4 py-1 rounded-full' alt='user' src={authorProfileImageUrl}/>

            {/* Comment, Username, Likes */}
            <div className='w-full'>
                <div className='flex'>
                    <p className='mr-2 text-base font-semibold'>@{authorDisplayName.split(" ").join("")}</p>
                    <p className=''>{publishedAt.split("T")[0]}</p>
                </div>
                {/* Comment Text */}
                <p className=''>{textDisplay}</p>

                {/* Like Bar */}
                <div className='flex my-1 items-center'>
                    <AiOutlineLike className='text-xl'/>
                    <p className='text-center mx-2'>{likeCount}</p>
                    <AiOutlineDislike className='text-xl' />

                </div>
            </div>

            {/* More */}
            <div className='mr-3 mt-3 text-xl flex justify-end w-full'>
                <FiMoreVertical />
            </div>
        </div>
    )

}

export default VideoComment;