const OpenDetailsButton = ({ habitId, onOpenDetails, detailsOpen}) => {

    const handleOpenDetails = (habitId) => {
        onOpenDetails(habitId);
    };

    return (
        <button onClick = {handleOpenDetails} className="bg-sky-500 text-white px-4 py-2 rounded font-medium hover:bg-sky-600 transition duration-200">{detailsOpen ? "Close Details" : "Open Details"}</button>
    )
};

export default OpenDetailsButton;