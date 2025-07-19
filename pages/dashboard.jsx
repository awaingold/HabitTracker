import { useAuth , AuthProvider } from "@/context/AuthContext";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head';
import HabitList from '../components/HabitList';
import AddHabitForm from '@/components/AddHabitForm';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import App from './_app';

export default function Dashboard() {

    const {user, loading} = useAuth();
    const router = useRouter();

    useEffect(() => {
        
        if(!loading && !user) {
            router.push('/LogIn');
        }
    }, [user, loading, router]);

    if(loading) {
        return <p className="text-white p-6">Loading...</p>;
    }

    const [habits, setHabits] = useState([]);

  useEffect(() => {
  fetch('http://localhost:4000/api/habits')
    .then(res => res.json())
    .then(data => setHabits(data))
    .catch(console.error());
}, []);


  const handleAddHabit = async (habit) => {

    try {

      const res = await fetch('http://localhost:4000/api/habits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(habit),
      });

      if (!res.ok) {
        throw new Error(savedHabit.error || 'Failed to save habit');
      }

      const savedHabit = await res.json();
      setHabits([savedHabit, ...habits]);
      

    } catch (error) {
      console.error('Error adding habit:', error);
      alert('Failed to add habit. Please try again.');
    }
    
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
      const res = await fetch(`http://localhost:4000/api/habits/${habitId}`, {
        method: 'PATCH',
        headers: {
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
      <HabitList habits = {habits} onDelete = {handleDeleteHabit} onCheckIn={handleCheckInHabit} onUpdateGoal={handleSetGoal}/>
      <AddHabitForm onAddHabit={handleAddHabit} />
    </div>
  );

}