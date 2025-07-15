import DeleteButton from "./DeleteButton";
import CheckInButton from "./CheckInButton";
import OpenDetailsButton from "./OpenDetailsButton";


const HabitCard = ({habit, onDelete, onCheckIn, onOpenDetails}) => {

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
                <OpenDetailsButton habitId={habit.id} onOpenDetails={onOpenDetails} />
             </div>

        </div>
    );
};

export default HabitCard;