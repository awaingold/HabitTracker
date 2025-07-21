import { useAuth , logout } from '../context/AuthContext';
import { useRouter } from 'next/router';

export default function profile() {
    
    const {user, logout} = useAuth();
    const router = useRouter();

    if(!user) {
        router.push("/LogIn")
    }
    
    const handleLogout = async () => {
        await logout();
        router.push("/LogIn");
    };

    return (
        <div className="container mx-auto p-4 bg-zinc-900 text-gray-100 min-h-screen">
            <h1 className="text-3xl">Your Profile</h1>
            <p><strong>Email: </strong>{user && user.email}</p>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded font-medium hover:bg-red-600 transition duration-200 m-4"
            >
                Log Out
            </button>
        </div>
    )

}