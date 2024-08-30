import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import CreatePost from "./CreatePost";
import { setPosts, setSelectedPost } from "@/redux/postSlice";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const { likeNotification } = useSelector(
    (store) => store.realTimeNotification
  );
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [notificationsViewed, setNotificationsViewed] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get("https://igrams.onrender.com/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const sidebarHandler = (textType) => {
    switch (textType) {
      case "Logout":
        logoutHandler();
        break;
      case "Create":
        setOpen(true);
        break;
      case "Profile":
        navigate(`/profile/${user?._id}`);
        break;
      case "Home":
        navigate("/");
        break;
      case "Messages":
        navigate("/chat");
        break;
      default:
        break;
    }
  };

  const handleNotificationClick = () => {
    setNotificationsViewed(true);
  };

  const sidebarItems = [
    { icon: <Home />, text: "Home" },
    { icon: <Search />, text: "Search" },
    { icon: <TrendingUp />, text: "Explore" },
    { icon: <MessageCircle />, text: "Messages" },
    { icon: <Heart />, text: "Notifications" },
    { icon: <PlusSquare />, text: "Create" },
    {
      icon: (
        <Avatar className="w-8 h-8">
          <AvatarImage src={user?.profilePicture} alt={user?.username} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
  ];

  return (
    <div className="fixed top-0 z-10 left-0 px-4 py-6 border-r border-gray-300 w-16 md:w-44 h-screen bg-white flex flex-col justify-between">
      <div>
        <h1 className="text-center font-bold text-xl mb-8">
          <img className="h-14 w-16 rounded-lg" src="logoi.png" />
        </h1>
        <div className="flex flex-col flex-grow">
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              onClick={() => sidebarHandler(item.text)}
              className="flex items-center gap-4 cursor-pointer mt-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="text-lg">{item.icon}</div>
              <span className="hidden md:block">{item.text}</span>

              {item.text === "Notifications" && (
                <Popover>
                  <PopoverTrigger asChild>
                    <div
                      className="relative"
                      onClick={handleNotificationClick}
                    >
                      {!notificationsViewed && likeNotification.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                          {likeNotification.length}
                        </span>
                      )}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 mt-2">
                    <div className="p-2">
                      {likeNotification.length === 0 ? (
                        <p>No new notifications</p>
                      ) : (
                        likeNotification.map((notification) => (
                          <div
                            key={notification.userId}
                            className="flex items-center gap-2 my-2"
                          >
                            <Avatar>
                              <AvatarImage
                                src={notification.userDetails?.profilePicture}
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p className="text-sm">
                              <span className="font-bold">
                                {notification.userDetails?.username}
                              </span>{" "}
                              liked your post
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          ))}
        </div>
      </div>
      <div
        onClick={() => sidebarHandler("Logout")}
        className="flex items-center gap-4 cursor-pointer mt-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <div className="text-lg">
          <LogOut />
        </div>
        <span className="hidden md:block">Logout</span>
      </div>
      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
};

export default LeftSidebar;
