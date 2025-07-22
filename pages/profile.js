import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import {useState} from 'react';
import LogInForm from '../components/LogInForm';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';


export default function profile() {
    
    const {user, logout, setNewPassword, login, setNewEmail, deleteAccount} = useAuth();
    const router = useRouter();
    const [needReAuth, setNeedReAuth] = useState(false);
    const [resettingEmail, setResettingEmail] = useState(false);
    const [resettingPassword, setResettingPassword] = useState(false);
    const [deletingAccount, setDeletingAccount] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPass, setNewPass]  = useState('');
    const [newMail, setNewMail] = useState('');

    const handleLogIn = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            toast.success('Logged in successfully!');
        } catch (error) {

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

    if(!user) {
        router.push("/LogIn")
    }
    
    const handleLogout = async () => {
        await logout();
        router.push("/LogIn");
    };

    const showResetPassword = () => {
        setResettingEmail(false);
        setResettingPassword(true);
        setDeletingAccount(false);
    };

    const showChangeEmail = () => {
        setResettingEmail(true);
        setResettingPassword(false);
        setDeletingAccount(false);
    };

    const showAccountDeletion = () => {
        setDeletingAccount(true);
        setResettingPassword(false);
        setResettingEmail(false);
    }
    
    const handleDeleteAccount = async () => {

        try{
            await deleteAccount(newMail);
            toast.success("Deleted account successfully!");
        } catch(error) {
            if(error.code==='auth/requires-recent-login') {
                toast.error("Your session has expired. Please log in again.");
                setNeedReAuth(true);

            } else{
                    toast.error("An unexpected error occured. Please retry.");
                    console.error(`code: ${error.code}`);
            }
        }

    };

    const handleChangeEmail = async (e) => {

        e.preventDefault();
        try{
            await setNewEmail(newMail);
            toast.success("Password changed successfully!");
            setResettingEmail(false);
        } catch(error) {
            if(error.code==='auth/requires-recent-login') {
                toast.error("Your session has expired. Please log in again.");
                setNeedReAuth(true);

            } else{
                    toast.error("An unexpected error occured. Please retry.");
                    console.error(`code: ${error.code}`);
            }
        }

    };

    const handleResetPassword = async (e) => {

        e.preventDefault();
        try{
            await setNewPassword(newPass);
            toast.success("Password changed successfully!");
            setResettingPassword(false);
        } catch(error) {
            if(error.code==='auth/requires-recent-login') {
                toast.error("Your session has expired. Please log in again.");
                setNeedReAuth(true);

            } else{
                    toast.error("An unexpected error occured. Please retry.");
                    console.error(`code: ${error.code}`);
            }
        }

    };

    const returnToDashboard = () => {
        router.push('/dashboard');
    }

    return (
        <div className="container mx-auto p-4 bg-zinc-900 text-gray-100 min-h-screen">
        <Toaster position="top-center" reverseOrder={false} />
            <div className="mt-4 p-4 bg-zinc-700 rounded-lg">
            <h1 className="text-3xl m-4">Your Profile</h1>
            <button className = "absolute right-6 top-10 bg-purple-500 text-white px-4 py-2 rounded font-medium hover:bg-purple-600 transition duration-200 m-4" onClick ={returnToDashboard}>Dashboard</button>
            <p className="m-4"><strong>Email: </strong>{user && user.email}</p>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded font-medium hover:bg-red-600 transition duration-200 m-4"
            >
                Log Out
            </button>
            <button
                onClick={showChangeEmail}
                className="bg-emerald-500 text-white px-4 py-2 rounded font-medium hover:bg-emerald-600 transition duration-200 m-4"
            >
                Change Email
            </button>
            <button
                onClick={showResetPassword}
                className="bg-blue-500 text-white px-4 py-2 rounded font-medium hover:bg-blue-600 transition duration-200 m-4"
            >
                Reset Password
            </button>
            <button
                onClick={showAccountDeletion}
                className="bg-zinc-400 text-white px-4 py-2 rounded font-medium hover:bg-zinc-500 transition duration-200 m-4"
            >
                Delete My Account
            </button>
            {needReAuth && (
                <LogInForm onLogIn={handleLogIn} email={email} password={password} setEmail={setEmail} setPassword={setPassword}></LogInForm>
            )}
            <div className="mt-4 p-4 bg-zinc-800 rounded-lg">
            {resettingEmail && (

                <form onSubmit={handleChangeEmail}>
                    <input type="email" placeholder="New Email" className = "border border-gray-300 p-2 rounded w-xl mb-4" onChange = {(e) => setNewMail(e.target.value)}></input>
                    <br></br>
                    <input type="submit" className="bg-blue-500 rounded w-xl h-xl hover:bg-blue-600 transition duration-200"></input>
                </form>

            )}

            {resettingPassword && (
                <form onSubmit={handleResetPassword}>
                    <input type="password" placeholder="New Password" className = "border border-gray-300 p-2 rounded w-xl mb-4" onChange = {(e) => setNewPass(e.target.value)}></input>
                    <br></br>
                    <input type="submit" className="bg-blue-500 rounded w-xl h-xl hover:bg-blue-600 transition duration-200"></input>
                </form>
            )}

            {deletingAccount && (
                <>
                <h2 className="text-xl">Are you sure you want to delete your account? This cannot be undone.</h2>
                    <button onClick={handleDeleteAccount} className="bg-red-500 text-white px-4 py-2 rounded font-medium hover:bg-red-600 transition duration-200 m-4">Yes, delete my account</button>
                    <button onClick={() => setDeletingAccount(false)} className="bg-blue-500 text-white px-4 py-2 rounded font-medium hover:bg-blue-600 transition duration-200 m-4">No, go back</button>
                </>
            )}
            </div>
            </div>
        </div>
    )

}