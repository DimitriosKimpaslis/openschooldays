
import React, { useState } from 'react';
import { supabase } from '../../client';
import { useNavigate } from 'react-router-dom';
import logo from '../../media/images/bird.png';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform sign-in logic here
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            setError(error.message);
            return;
        }
        navigate('/')
        window.location.reload();
    };

    return (
        <section className="bg-gray-50 ">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto sm:h-screen lg:py-0 sm:mt-0 mt-12">
                <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                    <img
                        className="w-8 h-8 mr-2"
                        src={logo}
                        alt="logo"
                    />
                    Open School Days
                </div>
                <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Your Email
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                                    placeholder="email@provider.gr"
                                    required=""
                                    value={email}
                                    onChange={(e) => handleEmailChange(e)}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                                    required=""
                                    value={password}
                                    onChange={(e) => handlePasswordChange(e)}
                                />
                            </div>
                            <div className='flex justify-center'>
                                <button
                                    type="submit"
                                    className="bg-newSomon px-12 py-2 text-xl w-full h-fit hover:bg-newPurple text-newPurple hover:text-newSomon transition-colors duration-400"
                                >
                                    Sign in
                                </button>
                            </div>
                            <p className="text-red-500 text-xs italic">{error}</p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};



export default SignIn;