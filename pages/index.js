import Head from 'next/head';
import HabitList from '../components/HabitList';
import AddHabitForm from '@/components/AddHabitForm';
import { useState , useEffect } from 'react';

export default function Home() {

  const [habits, setHabits] = useState([]);

  useEffect(() => {
  fetch('http://localhost:4000/api/habits')
    .then(res => res.json())
    .then(data => setHabits(data))
    .catch(console.error);
}, []);


  const handleAddHabit = (habit) => {
    setHabits([habit, ...habits]);
  };


  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Habit Tracker</title>
        <meta name="description" content="Track your daily habits easily!" />
      </Head>
      <h1 className="text-3xl font-bold mb-6">Habit Tracker</h1>
      <HabitList habits = {habits}/>
      <AddHabitForm onAddHabit={handleAddHabit} />
    </div>
  );
}
