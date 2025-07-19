import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export default function SignUp() {

    const { signUp } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await signUp(email, password);
            router.push('/');
        } catch (error) {
            toast.error('Failed to sign up. Please try again.');
            console.error('Error signing up:', error);
        }
    };

    return (

        <div className = "flex items-center justify-center min-h-screen bg-gray-100">
            <div className = " p-8 rounded shadow-md w-96 bg-zinc-800 text-center">
                <h2 className = "text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <form onSubmit={handleSignUp} className = "max-w-md mx-auto p-6 bg-zinc-600 rounded-lg text-white">

                    <input type = "email"
                        className="w-full mb-4 p-2 rounded border border-gray-300"
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                        placeholder = "Email"
                        required
                        ></input>

                    <input type = "password"
                        className="w-full mb-4 p-2 rounded border border-gray-300"
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                        placeholder = "Password"
                        required
                        ></input>  

                    <button type = "submit" className = "w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600 transition duration-200">Sign Up</button>
                </form>
                <a href="/LogIn" className="mt-4 text-center text-blue-500 hover:underline">
                Already have an account? Log In
            </a>
            </div>

            

        </div>    

    );
}