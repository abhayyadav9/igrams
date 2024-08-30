

import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const signupHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post('https://igrams.onrender.com/api/v1/user/login', input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
                setInput({
                    email: "",
                    password: ""
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className='flex items-center justify-center w-screen h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500'>
            <form onSubmit={signupHandler} className='bg-white p-8 rounded-lg shadow-lg w-full max-w-sm mx-4 md:mx-0 transform transition-transform duration-300 hover:scale-105'>
                <div className='text-center flex flex-col items-center mb-6'>
                    <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                    <img className='h-20 w-20 rounded-lg' src='logoi.png'/>
                    </h1>
                    <p className='text-sm text-gray-600'>Login to see photos & videos from your friends</p>
                </div>
                <div className='mb-4'>
                    <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email</label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}
                        className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Password</label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={changeEventHandler}
                        className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    />
                </div>
                <div className='mb-4'>
                    {loading ? (
                        <Button className="w-full bg-blue-500 hover:bg-blue-600">
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Please wait
                        </Button>
                    ) : (
                        <Button type='submit' className="w-full bg-blue-500 hover:bg-blue-600">Login</Button>
                    )}
                </div>
                <div className='text-center'>
                    <p className='text-sm text-gray-600'>
                        Don't have an account? <Link to="/signup" className='text-blue-600 font-semibold hover:underline'>Signup</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;
