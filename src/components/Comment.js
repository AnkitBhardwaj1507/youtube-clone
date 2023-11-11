import React from "react";

const Comment = ({ data }) => {
    const { name, text, replies } = data;

    return (
        <div className="flex shadow-sm bg-gray-100 p-2 rounded-lg">
            <div className='m-3'>
                <img className='h-8 rounded-full' alt='user' src='https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png' />
            </div>
            <div className="flex flex-col item-center">
                <p className="font-bold text-sm">{name}</p>
                <p className="text-sm">{text}</p>
            </div>
        </div>
    )
}

export default Comment;