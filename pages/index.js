import {useRouter} from 'next/router';


export default function Home() {

  const router = useRouter();

  const goToLogIn = () => router.push("/LogIn");
  const goToSignUp = () => router.push("/SignUp");

  return (
    
    <div className="bg-white flex justify-center min-h-screen items-center">
      <div className = "rounded bg-zinc-800 flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-white p-8">Your Personal Habit Tracker Awaits</h2>
        <div className="p-4 justify-center items-center flex">
          <button className="bg-green-500 text-white px-4 py-2 rounded font-medium hover:bg-green-600 transition duration-200 p-4 m-4" onClick={goToLogIn}>Log In</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded font-medium hover:bg-blue-600 transition duration-200 p-4 m-4" onClick={goToSignUp}>Sign Up</button>
        </div>
        <div className="p-4 justify-center items-center flex">
          <p className="text-m">Create Habits. Set Goals. Track Streaks.</p>
        </div>
      </div>
    </div>
  );

  
}
