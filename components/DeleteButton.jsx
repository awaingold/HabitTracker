import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const DeleteButton = ({ habitId, onDelete }) => {

    const {user} = useAuth();

    const handleDelete = async () => {

        const token = await user.getIdToken();

        try {
            const res = await fetch(`http://localhost:4000/habits/${habitId}/delete`, {
                method: 'DELETE',
                headers: {
                  authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                }
               });

            if (!res.ok) {
                toast.error('Failed to delete habit. Please try again.');
                throw new Error('Failed to delete habit');
            }
            onDelete(habitId);
            toast.success('Habit deleted successfully!');
            
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