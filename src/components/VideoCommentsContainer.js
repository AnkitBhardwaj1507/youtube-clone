import React, { useEffect,useState } from 'react'
import { video_comments_details_api } from '../utils/Constant';
import VideoComment from './VideoComment';

// Comments in the Watch page
const VideoCommentsContainer = ({ videoId, commentsCount }) => {
    const [commentsList, setCommentsList] = useState(null);
    
    //function called when Video Id change
    
    useEffect(() => {
        fetchComments();
    },[videoId])

    // fetching Comments
    const fetchComments = async() => {
        const data = await fetch(video_comments_details_api+videoId);
        const jsonData = await data.json();
        setCommentsList(jsonData.items);
        
    }

    return commentsList == null?<div>Loading...</div>:(
        
        <div>
            {/* {console.log("Comments leke aaao",commentsList)} */}
            <p className='my-2'>{commentsCount} Comments</p>
            {
                    commentsList.map((comment,index)=> <VideoComment key={index} data={comment}/>)
                    
            }
        </div>
    )
}

export default VideoCommentsContainer;