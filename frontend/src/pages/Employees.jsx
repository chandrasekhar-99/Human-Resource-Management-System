import {useEffect, useState} from 'react';
import api from '../services/api';


const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/employees',{ withCredentials: true });
      setEmployees(response.data.data);
    } catch (err) {
      setError('Failed to fetch employees: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p>{error}</p>;

  return (
  <div className='m-4'>
    <h1 className="text-xl font-semibold text-gray-800">Employees</h1>
    <ul className='flex flex-col gap-2'>
      {employees.map((employee) => (
        <li key={employee.id} className="border p-4 rounded-lg shadow-md ">
          <p className="font-medium text-lg">{employee.name}</p>
          <p className="text-gray-600">{employee.email}</p>
          <p className="text-gray-600">{employee.position}</p>
        </li>
      ))}
    </ul>
  </div>
);

};

export default Employees;