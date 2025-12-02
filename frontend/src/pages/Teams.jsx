import {useEffect,useState} from 'react';
import api from '../services/api';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  

  const fetchTeams = async () => {
    try {
      const response = await api.get('/teams',{ withCredentials: true });
      setTeams(response.data.data);
    } catch (err) {
      setError('Failed to fetch teams: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []); 

  if (loading) return <p>Loading teams...</p>;
  if (error) return <p>{error}</p>;

  
  return (
  <div className='m-4'>
    <h1 className="text-xl font-semibold text-gray-800">Engineering Department</h1>
    <ul className='flex flex-row gap-4 flex-wrap m-5 '>
      {teams.map((team) => (
        <li key={team.id} className="border p-4 rounded-lg w-80 flex flex-col gap-2 shadow-md ">
          <div className=" flex justify-between flex-col">
            <h2 className='font-medium text-lg'>{team.name}</h2>
            <p>{team.description}</p>
          </div>
          <p>{team.employees?.length} Team members</p>
          <p>{team.employees?.map(employee => employee.name).join(', ')}</p>
        </li>
      ))}
    </ul>
  </div>
);

};

export default Teams;