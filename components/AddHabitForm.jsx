import React, { useState } from 'react';

const AddHabitForm = ({ onAddHabit }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [streakGoal, setStreakGoal] = useState(7);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.trim() === '') return;

        const newHabit = {
            title,
            description,
            streakGoal: parseInt(streakGoal, 10) || 7, 
            streakCount: 0,
            lastChecked: null
        };
        
        onAddHabit(newHabit);
        setTitle('');
        setDescription('');
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
// This component allows users to add a new habit. It includes a form with fields for the habit title and description. When the form is submitted, it calls the `onAddHabit` function passed as a prop with the new habit data. The form also resets the input fields after submission.