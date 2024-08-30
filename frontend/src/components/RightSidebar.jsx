import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import SuggestedUsers from './SuggestedUsers';

const RightSidebar = () => {
  const { user } = useSelector(store => store.auth);

  return (
    <div className='w-full md:w-fit my-6 md:my-10 md:pr-8 lg:pr-16 xl:pr-32 bg-white p-4 rounded-lg shadow-md'>
      <div className='flex items-center gap-4 mb-6'>
        <Link to={`/profile/${user?._id}`}>
          <Avatar className='w-12 h-12'>
            <AvatarImage src={user?.profilePicture} alt="profile_image" />
            <AvatarFallback>{user?.username?.charAt(0)}</AvatarFallback>
          </Avatar>
        </Link>
        <div className='leading-tight'>
          <h1 className='font-semibold text-base text-gray-800 hover:underline'>
            <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
          </h1>
          <span className='text-gray-600 text-sm'>
            {user?.bio || 'Bio here...'}
          </span>
        </div>
      </div>
      <SuggestedUsers />
    </div>
  )
}

export default RightSidebar
