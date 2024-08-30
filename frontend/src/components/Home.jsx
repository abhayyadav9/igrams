import React from 'react'
import Feed from './Feed'
import { Outlet } from 'react-router-dom'
import RightSidebar from './RightSidebar'
import useGetAllPost from '@/hooks/useGetAllPost'
import useGetSuggestedUsers from '@/hooks/useGetSuggestedUsers'

const Home = () => {
    useGetAllPost();
    useGetSuggestedUsers();

    return (
        <div className='flex flex-col md:flex-row md:gap-4'>
            <div className='flex-grow'>
                <Feed />
                <Outlet />
            </div>
            <RightSidebar className='hidden md:block md:w-1/3' />
        </div>
    )
}

export default Home
