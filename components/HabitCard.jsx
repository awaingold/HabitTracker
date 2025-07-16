import DeleteButton from "./DeleteButton";
import CheckInButton from "./CheckInButton";
import OpenDetailsButton from "./OpenDetailsButton";
import ProgressBar from "./ProgressBar";
import { useState }from "react";


const HabitCard = ({habit, onDelete, onCheckIn, onOpenDetails}) => {

    const [showDetails, setShowDetails] = useState(false);

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
                        <ProgressBar goal={7} habit={habit} />
                    </div>
                </div>)}

        </div>
    );
};

export default HabitCard;