import DeleteButton from "./DeleteButton";
import CheckInButton from "./CheckInButton";
import OpenDetailsButton from "./OpenDetailsButton";
import ProgressBar from "./ProgressBar";
import { useState }from "react";


const HabitCard = ({habit, onDelete, onCheckIn, onUpdateGoal}) => {

    const [showDetails, setShowDetails] = useState(false);
    const [showEditingGoal, setShowEditingGoal] = useState(false);
    const [newGoal, setNewGoal] = useState(habit.streakGoal || 7);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className="bg-zinc-800 shadow-lg rounded-lg p-4 mb-4">
            
            <h2 className="text-xl font-semibold mb-2">{habit.title}</h2>
            <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
  🔥        {habit.streakCount}-day streak
            </span>
            <p className="mb-2 text-gray-400">📅 Last Checked In: {habit.lastChecked ? new Date(habit.lastChecked._seconds*1000).toLocaleDateString() : 'Never'}</p>
            
            <div className="flex justify-between items-center mt-4 gap-2">
                <CheckInButton habitId={habit.id} onCheckIn={onCheckIn} habit={habit} />
                <DeleteButton habitId={habit.id} onDelete={onDelete} />
                <OpenDetailsButton habitId={habit.id} onOpenDetails={toggleDetails} detailsOpen={showDetails}/>
             </div>

            {showDetails && (
                <div className="mt-4 p-4 bg-zinc-700 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Habit Details</h3>
                    <p className="text-gray-300">{habit.description || 'No description provided.'}</p>

                    <div className="mt-2 mb-2">
                        <ProgressBar habit={habit} />
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <button onClick={() => setShowEditingGoal(!showEditingGoal)} className="bg-purple-500 text-white px-4 py-2 rounded font-medium hover:bg-purple-600 transition duration-200">
                            {showEditingGoal ? 'Hide Editor' : 'Edit Streak Goal'}
                        </button>
                    </div>
                        
                        {showEditingGoal && (
                            <div className="mt-4 flex items-center gap-2">
                            <form onSubmit={
                                (e) => {
                                    e.preventDefault();
                                    onUpdateGoal(habit.id, newGoal, habit);
                                }
                                } className="flex items-center gap-2">
                                <input type="number"
                                min="1"
                                className="bg-zinc-900 rounded-sm"
                                placeholder="Set new goal"
                                onChange={(e) => setNewGoal(e.target.value)}/>
                                <input type="submit" value="Update Goal" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 cursor-pointer"/>
                            </form>
                            
                            </div>
                                )}
                        
                    
                </div>)}

        </div>
    );
};

export default HabitCard;