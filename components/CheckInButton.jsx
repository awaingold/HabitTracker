const checkInButton = ({habitId, onCheckIn, habits}) => {

    const handleCheckIn = async () => {
        try {
            
            const response = await fetch(`http://localhost:4000/api/habits/${habitId}/check-in`, {method: 'PATCH'});
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const updatedHabit = await response.json();
            onCheckIn(updatedHabit);


        } catch (error) {
            console.error('Error checking in:', error);
        }
    };

    const habit = habits.find(h => h.id === habitId);

    const lastCheckedDate = habit.lastChecked?._seconds
  ? new Date(habit.lastChecked._seconds * 1000)
  : null;

    const alreadyCheckedIn = lastCheckedDate
  ? lastCheckedDate.toDateString() === new Date().toDateString()
  : false;

    return (
        <button onClick={handleCheckIn} disabled={alreadyCheckedIn} className = {alreadyCheckedIn?"opacity-50 cursor-not-allowed":"bg-green-500 text-white px-4 py-2 rounded font-medium hover:bg-green-600 transition duration-200"}>
        {alreadyCheckedIn ? 'Already Checked In ✅' : 'Check In'}
        </button>
    );
    
};

export default checkInButton;