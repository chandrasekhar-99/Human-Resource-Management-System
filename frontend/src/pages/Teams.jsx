import {useEffect,useState} from 'react';
import api from '../services/api';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTeams = async () => {
    try {
      const response = await api.get('/api/teams',{ withCredentials: true });
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
  <div>
    <h1>Teams</h1>
    <ul>
      {teams.map((team) => (
        <li key={team.id}>
          <strong>{team.name}</strong> — {team.description}
        </li>
      ))}
    </ul>
  </div>
);

};

export default Teams;