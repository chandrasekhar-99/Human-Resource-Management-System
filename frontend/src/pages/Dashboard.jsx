import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Teams from '../pages/Teams.jsx';
import Employees from '../pages/Employees.jsx';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/api/auth/logout');
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition font-medium"
        >
          Logout
        </button>
      </div>

      {/* Teams Section */}
      <div className="bg-white p-5 rounded-lg shadow-md mb-6">
        <Teams />
      </div>


      <div className="bg-white p-5 rounded-lg shadow-md mb-6">
        <Employees />
      </div>

      {/* Actions Section */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate('/add-team')}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition font-medium"
        >
          Add Team
        </button>

        <button
          onClick={() => navigate('/add-employee')}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition font-medium"
        >
          Add Employee
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
