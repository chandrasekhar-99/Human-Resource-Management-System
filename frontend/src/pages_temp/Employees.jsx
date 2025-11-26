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
  <div>
    <h1>Employees</h1>
    <ul>
      {employees.map((employee) => (
        <li key={employee.id}>
          <p>{employee.name}</p>
          <p>{employee.email}</p>
          <p>{employee.position}</p>
        </li>
      ))}
    </ul>
  </div>
);

};

export default Employees;