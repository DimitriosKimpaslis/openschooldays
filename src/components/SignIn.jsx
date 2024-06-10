
import React, { useContext, useState } from 'react';
import { supabase } from '../client';
import { UserContext } from '../App';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {user} = useContext(UserContext)

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform sign-in logic here
        const data = await supabase.auth.signInWithPassword({ email, password });
        console.log(data);
    };


    return (
        <div className='pt-[400px]'>
            <h1>{user ? user.email : ''}</h1>
            <button onClick={async () => await supabase.auth.signOut()}>Sign Out</button>
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
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default SignIn;