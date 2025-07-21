import { useAuth , AuthProvider } from "@/context/AuthContext";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head';
import HabitList from '../components/HabitList';
import AddHabitForm from '@/components/AddHabitForm';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

export default function Dashboard() {

    const {user, loading, logout} = useAuth();
    const router = useRouter();
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        
        if(!loading && !user) {
            router.push('/LogIn');
        }
    }, [user, loading, router]);

    if(loading) {
        return <p className="text-white p-6">Loading...</p>;
    }

    useEffect(() => {

      const fetchHabits = async () => {
    if (!user) return;

    try {
      const token = await user.getIdToken();
      const res = await fetch('http://localhost:4000/habits', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setHabits(data); // 🧠 Sync response into state
    } catch (error) {
      console.error('Error fetching habits:', error);
    }
    };

    fetchHabits();
  }, []);

  const handleAddHabit = async (newHabit) => {

    setHabits([...habits, newHabit]); 
    
  };

  const handleDeleteHabit = async (id) => {

    setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== id));
  };

  const handleCheckInHabit = async (updatedHabit) => {

    setHabits(prev =>
  prev.map(habit => habit.id === updatedHabit.id ? updatedHabit : habit)
);

  };

  const handleSetGoal = async (habitId, newGoal, habit) => {

    habit.streakGoal = newGoal;

    try {

      const token = await user.getIdToken();
      const res = await fetch(`http://localhost:4000/habits/${habitId}/update`, {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(habit),
      });

      if (!res.ok) {
        toast.error('Failed to update goal');
        return;
      }

      const updatedHabit = await res.json();

      setHabits(prevHabits =>
        prevHabits.map(habit => habit.id === updatedHabit.id ? updatedHabit : habit)
      );

      toast.success('Goal updated successfully');

    } catch (error) {
      console.error('Error updating goal:', error);
      toast.error('Failed to update goal');
    }
  };

  return (
    <div className="container mx-auto p-4 bg-zinc-900 text-gray-100 min-h-screen">
      <Head>
        <title>Habit Tracker</title>
        <meta name="description" content="Track your daily habits easily!" />
      </Head>
      <Toaster position="top-center" reverseOrder={false}/>
      <h1 className="text-3xl font-bold mb-6">Habit Tracker</h1>
      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded font-medium hover:bg-red-600 transition duration-200 fixed top-0 right-0 m-4">Log Out</button>
      <HabitList habits = {habits} onDelete = {handleDeleteHabit} onCheckIn={handleCheckInHabit} onUpdateGoal={handleSetGoal}/>
      <AddHabitForm onAddHabit={handleAddHabit} />
    </div>
  );

}