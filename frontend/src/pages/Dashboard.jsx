import { useNavigate } from 'react-router-dom';
import { SignOut, User } from "@phosphor-icons/react";
import api from '../services/api.js';
import Teams from './Teams.jsx'
import Employees from './Employees.jsx';
import Logs from '../components/Logs.jsx';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
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
          HRMS Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <User size={28} />
          <button
            onClick={handleLogout}
            className="px-2 py-1 border-2 border-blue-400 text-blue-400 hover:border-blue-600 hover:text-blue-600 rounded-lg transition font-medium flex items-center gap-2 cursor-pointer"
          >
            <SignOut size={28} />
            Logout
          </button>
        </div>
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

      {/* Logs Section */}
      <div className="bg-white p-5 rounded-lg shadow-md mb-6">
        <Logs />
      </div>
    </div>
  );
};

export default Dashboard;
