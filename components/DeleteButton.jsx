const DeleteButton = ({ habitId, onDelete }) => {

    const handleDelete = async () => {

        console.log('Deleting habit with ID:', habitId);

        try {
            const res = await fetch(`http://localhost:4000/api/habits/${habitId}`, {
                method: 'DELETE' });

            if (!res.ok) {
                throw new Error('Failed to delete habit');
            }
            onDelete(habitId);
        } catch (error) { 
            console.error('Error deleting habit:', error);
            alert('Failed to delete habit. Please try again.');
        }
    }

  return (
    <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded font-medium hover:bg-red-600 transition duration-200">
      Delete
    </button>
  );
}

export default DeleteButton;