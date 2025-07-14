import Head from 'next/head';
import HabitList from '../components/HabitList';
import AddHabitForm from '@/components/AddHabitForm';
import { useState , useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

export default function Home() {

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


  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Habit Tracker</title>
        <meta name="description" content="Track your daily habits easily!" />
      </Head>
      <Toaster position="top-center" reverseOrder={false}/>
      <h1 className="text-3xl font-bold mb-6">Habit Tracker</h1>
      <HabitList habits = {habits} onDelete = {handleDeleteHabit} onCheckIn={handleCheckInHabit}/>
      <AddHabitForm onAddHabit={handleAddHabit} />
    </div>
  );
}
