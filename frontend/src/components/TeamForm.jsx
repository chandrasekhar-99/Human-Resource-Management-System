import { useState } from 'react';
import api from '../services/api';

const TeamForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/teams/createTeam', { name, description });
      if (response.status === 201) {
        alert('Team created successfully!');
        setName('');
        setDescription('');
      }
    } catch (err) {
      setError('Failed to create team: ' + err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-8 
                 flex flex-col gap-4 w-[90%] md:w-full"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Create Team
      </h2>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 p-2 rounded">
          {error}
        </p>
      )}

      {/* Team Name */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1">Team Name</label>
        <input
          type="text"
          value={name}
          placeholder="e.g. Frontend Team"
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg 
                     focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>

      {/* Description */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1">Description</label>
        <input
          type="text"
          value={description}
          placeholder="Short description"
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg 
                     focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium 
                   py-2 rounded-lg transition"
      >
        Create Team
      </button>
    </form>
  );
};

export default TeamForm;
