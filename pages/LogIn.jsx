import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

export default function LogIn() {

    const { login , resetPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogIn = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            toast.success('Logged in successfully!');
            router.push('/dashboard');
        } catch (error) {

            console.log(error.code);
            if(error.code === 'auth/user-not-found') {
                toast.error('User not found. Please sign up.');
            } else if(error.code === 'auth/wrong-password') {
                toast.error('Incorrect password. Please try again.');
            } else if (error.code === 'auth/too-many-requests') {
                toast.error('Too many attempts. Please try again later.');
            } else{
                toast.error('Failed to log in. Please try again.');
                console.error('Error logging in:', error);
            }
            
        }
    };

    const handleResetPassword = () => {
        router.push('/resetPassword');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="bg-zinc-800 p-8 rounded shadow-md w-96 text-center">
                <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
                <form onSubmit={handleLogIn} className="max-w-md mx-auto p-6 bg-zinc-600 rounded-lg text-white">
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
                </form>
                <a href="/SignUp" className="mt-4 text-center text-blue-500 hover:underline">
                Don't have an account? Sign Up</a>
                <button onClick = {handleResetPassword} className = "text-blue-500 hover:underline">Forgot Password?</button>
            </div>
            
        </div>
    );
}