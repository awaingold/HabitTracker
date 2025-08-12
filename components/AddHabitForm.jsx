import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const AddHabitForm = ({ onAddHabit }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [streakGoal, setStreakGoal] = useState(7);
    const { user, loading } = useAuth();

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (title.trim() === '') return;
        const token = await user.getIdToken();
        
        let newHabit = {
            title,
            streakGoal,
            description
        }

        try {
            const res = await fetch('http://localhost:4000/habits', {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, streakGoal, description })
            });

            const { id } = await res.json();
            newHabit.id = id;
            
        } catch (error) {
            console.error('Error adding habit:', error);
            alert('Failed to add habit. Please try again.');
        }
        
        onAddHabit(newHabit);
        setTitle('');
        setDescription('');
        setStreakGoal(7);
        toast.success('Habit added successfully!');
    };

    return (
        <form onSubmit={handleSubmit} className="bg-zinc-800 text-white p-6 rounded-lg shadow-md w-full mx-auto">
            <h2 className="text-xl font-semibold mb-4">Add a New Habit</h2>
            <div>
                <label className="block text-sm font-medium mb-1">Habit Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full border text-white bg-zinc-700 border-zinc-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter habit title"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Habit Streak Goal</label>
                <input
                    type="number"
                    min="1"
                    value={streakGoal}
                    onChange={(e) => setStreakGoal(e.target.value)}
                    className="mt-1 block w-full border text-white bg-zinc-700 border-zinc-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter streak goal (default is 7)"
                    />
            </div>
            <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full border text-white bg-zinc-700 border-zinc-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter habit description"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600  text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
                Add Habit
            </button>
        </form>
    );
};

export default AddHabitForm;
