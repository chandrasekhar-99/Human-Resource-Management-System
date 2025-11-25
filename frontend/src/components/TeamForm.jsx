import {useState} from 'react';
import api from '../services/api';


const TeamForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/teams/createTeam', { name, description });
      if (response.status === 201) {
        alert('Team created successfully!');
        setName('');
        setDescription('');
      }
    } catch (err) {
      setError('Failed to create team: ' + err.message);
    }
  };


if (error) return <p>{error}</p>;


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Create Team</button>
    </form>
  );
};

export default TeamForm;