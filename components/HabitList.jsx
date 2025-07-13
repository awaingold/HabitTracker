import React from 'react';
import DeleteButton from './DeleteButton';
import CheckInButton from './CheckInButton';

const HabitList = ({habits, onDelete, onCheckIn}) => {

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
          <li key={habit.id} className="flex items-center justify-between"><span>{habit.title}</span><DeleteButton habitId={habit.id} onDelete={onDelete} className="ml-4"/>
          <CheckInButton habitId={habit.id} onCheckIn={onCheckIn} habits={habits} className="ml-4"/>
          </li>
        ))}
      </ul>
    </div>

    )
}

export default HabitList;
// This component displays a list of habits.