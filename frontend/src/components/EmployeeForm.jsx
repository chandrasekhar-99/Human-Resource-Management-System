import {useState} from 'react';
import api from '../services/api';

const EmployeeForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      const response = await api.post('/api/employees/create', { name, email, position });
      if(response.status === 201){
        alert('Employee created successfully!');
        setName('');
        setEmail('');
        setPosition('');
        if(onSubmit) onSubmit();
      }
    } catch (err) {
      setError('Failed to create employee: ' + err.message);
    }
  } ;
  if (error) return <p>{error}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="text"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        placeholder="Position"
        required
      />
      <button type="submit">Create Employee</button>
    </form>
  );
};

export default EmployeeForm;