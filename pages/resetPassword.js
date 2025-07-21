import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function resetPassword() {

    const [email, setEmail] = useState('');
    const router = useRouter();
    const { resetPassword } = useAuth();

    const handlePasswordReset = async (e) => {

        e.preventDefault();
        
        try{
            await resetPassword(email);
            toast.success("Password reset email sent successfully");
        } catch (error) {
            toast.error("Something went wrong. Please try again.")
            console.error(error);
        }
        
    };

    const pushToLogin = () => {
       router.push('/LogIn');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="bg-zinc-800 p-8 rounded shadow-md w-96 text-center">
                <h2 className="text-2xl font-bold mb-6 text-center">Password Reset</h2>
                <form onSubmit={handlePasswordReset} className="max-w-md mx-auto p-6 bg-zinc-600 rounded-lg text-white">
                    <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        className="border border-gray-300 p-2 rounded w-full mb-4"
                        
                    />
                    <button type="submit" className="w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600 transition duration-200">Request Password Reset</button>
                </form>
                <button onClick = {pushToLogin} className = "text-blue-500 hover:underline">Return to Login</button>
            </div>
            
        </div>
    )
}