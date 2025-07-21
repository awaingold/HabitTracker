const ProgressBar = ({ habit }) => {

    return (
        <div className="w-full bg-zinc-900 rounded-full h-4">
            <div
                className="bg-emerald-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((habit.streakCount || 0) * 100 / habit.streakGoal, 100)}%` }}
            ></div>

            <p className ="text-xs text-gray-400 mt-1 text-right">{habit.streakCount || 0} / {habit.streakGoal} days 🔥</p>
        </div>
    );
};

export default ProgressBar;