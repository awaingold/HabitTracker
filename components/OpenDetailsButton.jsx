const OpenDetailsButton = ({ onOpenDetails }) => {

    return (
        <button onClick = {onOpenDetails} className="bg-sky-500 text-white px-4 py-2 rounded font-medium hover:bg-sky-600 transition duration-200">View Details</button>
    )
};

export default OpenDetailsButton;