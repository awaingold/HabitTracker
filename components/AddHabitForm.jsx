import React, { useState } from 'react';

const AddHabitForm = ({ onAddHabit }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.trim() === '') return;

        const newHabit = {
            title,
            description,
        };
        
        onAddHabit(newHabit);
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold">Add a New Habit</h2>
            <div>
                <label className="block text-sm font-medium text-gray-700">Habit Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter habit title"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter habit description"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
                Add Habit
            </button>
        </form>
    );
};

export default AddHabitForm;
// This component allows users to add a new habit. It includes a form with fields for the habit title and description. When the form is submitted, it calls the `onAddHabit` function passed as a prop with the new habit data. The form also resets the input fields after submission.