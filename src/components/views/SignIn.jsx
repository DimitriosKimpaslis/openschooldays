
import React, {  useState } from 'react';
import { supabase } from '../../client';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


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
            alert('Error signing in:', error.message);
            return;
        }
        window.location.href = '/';
    };


    return (
        <div>
            <div className='h-[400px] bg-black'></div>
            <div className='container mx-auto flex flex-col items-center gap-5'>
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={handleEmailChange} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={handlePasswordChange} />
                    </div>
                    <button type="submit" className='bg-newPink p-2'>Sign In</button>
                </form>
            </div>

        </div>
    );
};

export default SignIn;