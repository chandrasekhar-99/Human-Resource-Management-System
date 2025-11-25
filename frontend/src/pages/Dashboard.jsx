import { useNavigate} from 'react-router-dom';
import api from '../services/api';
import Teams from './Teams.jsx';


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
    <div className='bg-zinc-800 h-100 '>
      <h1>Dashboard</h1>
      <Teams />


      
    <div>
      <button onClick={()=>navigate('/add-team')}>Add Team</button>
      <button onClick={()=>navigate('/add-employee')}>Add Employee</button>
    </div>

      <button onClick={handleLogout}>log out account</button>


    </div>
  );
};

export default Dashboard;