import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import LogInForm from '../components/LogInForm';

export default function LogIn() {

    const { login } = useAuth();
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

            switch(error.code) {
                
                case 'auth/user-not-found':
                    toast.error('User not found. Please sign up.');
                    break;
                case 'auth/wrong-password':
                    toast.error('Incorrect password. Please try again.');
                    break;
                case 'auth/too-many-requests':
                    toast.error('Too many attempts. Please try again later');
                    break;
                case 'auth/invalid-credential':
                    toast.error('Incorrect email or password. Please try again.');
                    break;
                default:
                    toast.error('Something went wrong. Please try again.');
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
                <LogInForm onLogIn={handleLogIn} setEmail={setEmail} setPassword={setPassword} email={email} password={password}></LogInForm>
                <a href="/SignUp" className="mt-4 text-center text-blue-500 hover:underline">
                Don't have an account? Sign Up</a>
                <button onClick = {handleResetPassword} className = "text-blue-500 hover:underline">Forgot Password?</button>
            </div>
            
        </div>
    );
}