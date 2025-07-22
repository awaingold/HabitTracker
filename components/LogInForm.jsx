import { useState } from 'react';

const LogInForm = ({onLogIn, email, setEmail, password, setPassword}) => {

    return (
    <form onSubmit={onLogIn} className="max-w-md mx-auto p-6 bg-zinc-600 rounded-lg text-white">
                    <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        className="border border-gray-300 p-2 rounded w-full mb-4"
                        
                    />
                    <input type="password"

                        className = "border border-gray-300 p-2 rounded w-full mb-4"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        
                    />
                    <button type="submit" className="w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600 transition duration-200">Log In</button>
    </form> );
};

export default LogInForm;