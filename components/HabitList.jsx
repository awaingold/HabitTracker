import React from 'react';
import DeleteButton from './DeleteButton';

const HabitList = ({habits, onDelete}) => {

    if(habits.length === 0) {
        return (
            <div className="text-center text-gray-500">
                <p>No habits found. Start adding some!</p>
            </div>
        );
    }


    return (
        <div className="space-y-4">
      <h2 className="text-xl font-semibold">Your Habits</h2>
      <ul className="list-disc pl-6">
        {habits.map((habit) => (
          <li key={habit.id} className="text-lg">{habit.title}<DeleteButton habitId={habit.id} onDelete={onDelete} className="mr-2" />
            
          </li>
        ))}
      </ul>
    </div>

    )
}

export default HabitList;
// This component displays a list of habits.