import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import useGetUserProfile from '@/hooks/useGetUserProfile';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AtSign, Heart, MessageCircle } from 'lucide-react';

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
  const [activeTab, setActiveTab] = useState('posts');

  const { userProfile, user } = useSelector((store) => store.auth);

  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const isFollowing = false;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const displayedPost = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

  return (
   
    <div className='flex flex-col max-w-5xl mx-auto pl-20'>
      <div className='flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-16 p-4'>
        <section className='flex justify-center md:justify-start'>
          <Avatar className='h-24 w-24 md:h-32 md:w-32'>
            <AvatarImage src={userProfile?.profilePicture} alt="profilephoto" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </section>
        <section className='w-full md:w-auto'>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col md:flex-row items-center gap-2 md:gap-4'>
              <span className='text-2xl font-light'>{userProfile?.username}</span>
              {isLoggedInUserProfile ? (
                <div className='flex gap-2'>
                  <Link to="/account/edit">
                    <Button variant='secondary' className='hover:bg-gray-200 h-8'>Edit profile</Button>
                  </Link>
                  <Button variant='secondary' className='hover:bg-gray-200 h-8'>View archive</Button>
                  <Button variant='secondary' className='hover:bg-gray-200 h-8'>Ad tools</Button>
                </div>
              ) : (
                <div className='flex gap-2'>
                  {isFollowing ? (
                    <>
                      <Button variant='secondary' className='h-8'>Unfollow</Button>
                      <Button variant='secondary' className='h-8'>Message</Button>
                    </>
                  ) : (
                    <Button className='bg-[#0095F6] hover:bg-[#3192d2] h-8'>Follow</Button>
                  )}
                </div>
              )}
            </div>
            <div className='flex items-center gap-4 text-sm'>
              <p><span className='font-semibold'>{userProfile?.posts.length} </span>posts</p>
              <p><span className='font-semibold'>{userProfile?.followers.length} </span>followers</p>
              <p><span className='font-semibold'>{userProfile?.following.length} </span>following</p>
            </div>
            <div className='text-sm'>
              <span className='font-semibold'>{userProfile?.bio || 'bio here...'}</span>
              <Badge className='w-fit mt-1' variant='secondary'><AtSign /> <span className='pl-1'>{userProfile?.username}</span></Badge>
            
            
            </div>
          </div>
        </section>
      </div>
      <div className='border-t border-t-gray-200 mt-8'>
        <div className='flex justify-around md:justify-center gap-10 text-sm'>
          <span className={`py-3 cursor-pointer ${activeTab === 'posts' ? 'font-bold' : ''}`} onClick={() => handleTabChange('posts')}>
            POSTS
          </span>
          <span className={`py-3 cursor-pointer ${activeTab === 'saved' ? 'font-bold' : ''}`} onClick={() => handleTabChange('saved')}>
            SAVED
          </span>
          <span className='py-3 cursor-pointer'>REELS</span>
          <span className='py-3 cursor-pointer'>TAGS</span>
        </div>
        <div className='grid grid-cols-3 gap-1 mt-4'>
          {displayedPost?.map((post) => (
            <div key={post?._id} className='relative group cursor-pointer'>
              <img src={post.image} alt='postimage' className='rounded-sm w-full aspect-square object-cover' />
              <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <div className='flex items-center text-white space-x-4'>
                  <button className='flex items-center gap-2 hover:text-gray-300'>
                    <Heart />
                    <span>{post?.likes.length}</span>
                  </button>
                  <button className='flex items-center gap-2 hover:text-gray-300'>
                    <MessageCircle />
                    <span>{post?.comments.length}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
