import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const checkInButton = ({habitId, onCheckIn, habit}) => {

    const {user} = useAuth();

    const handleCheckIn = async () => {
        try {
            
            const token = await user.getIdToken();
            const response = await fetch(`http://localhost:4000/habits/${habitId}/check-in`, {
                method: 'PATCH',
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }    
            });

            if(response.status === 404) {
                toast.error('Habit not found!');
                return;
            }
            
            if(response.status === 400) {
                toast.error('Habit already checked in today!');
                return;
            }

            if(!response.ok){
                toast.error('Unexpected error, failed to check in habit');
                return;
            }

            const updatedHabit = await response.json();
            onCheckIn(updatedHabit);

            if(updatedHabit.streakStatus === 'started') {
                toast.success(`Habit checked in! Your streak has started!`);
            } else if(updatedHabit.streakStatus === 'reset') {
                toast(`Habit checked in! ⚠️ Your streak has been reset to 1 day.`);
            }
            else {
                toast.success(`🔥 Habit checked in! Your streak is now ${updatedHabit.streakCount} days!`);
            }

            if(habit && habit.streakGoal && updatedHabit.streakCount >= habit.streakGoal) {
                toast.success(`🎉 Congratulations! You've reached your streak goal of ${habit.streakGoal} days!`);
            }


        } catch (error) {
            toast.error('Something went wrong 😬');
            console.error('Error checking in:', error);
        }
    };

    return (
        <button onClick={handleCheckIn}  className = "bg-green-500 text-white px-4 py-2 rounded font-medium hover:bg-green-600 transition duration-200">
        Check In
        </button>
    );
    
};

export default checkInButton;