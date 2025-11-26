import { useState } from 'react';
import api from '../services/api';

const EmployeeForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/employees/create', { name, email, position });
      if (response.status === 201) {
        alert('Employee created successfully!');
        setName('');
        setEmail('');
        setPosition('');
        if (onSubmit) onSubmit();
      }
    } catch (err) {
      setError('Failed to create employee: ' + err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Add Employee
      </h2>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 p-2 rounded">
          {error}
        </p>
      )}

      {/* Name */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Employee Name"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                   focus:ring-blue-500 outline-none"
        required
      />

      {/* Email */}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email Address"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                   focus:ring-blue-500 outline-none"
        required
      />

      {/* Position */}
      <input
        type="text"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        placeholder="Position (e.g. Developer, HR)"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                   focus:ring-blue-500 outline-none"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg 
                   transition font-medium"
      >
        Create Employee
      </button>
    </form>
  );
};

export default EmployeeForm;
