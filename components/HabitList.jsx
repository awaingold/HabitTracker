import React from 'react';
import DeleteButton from './DeleteButton';
import CheckInButton from './CheckInButton';
import HabitCard from './HabitCard';

const HabitList = ({habits, onDelete, onCheckIn, onUpdateGoal}) => {

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
          <div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {habits.map((habit) => (
            <HabitCard 
                habit={habit} 
                onDelete={onDelete} 
                onCheckIn={onCheckIn}
                onUpdateGoal={onUpdateGoal}
            />
      ))}
          </div>
        </div>

    )
}

export default HabitList;
