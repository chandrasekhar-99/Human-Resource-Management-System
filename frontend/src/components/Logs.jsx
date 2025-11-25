import {useEffect, useState} from 'react';
import api from '../services/api';


const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const response = await api.get('/api/logs',{ withCredentials: true });
      setLogs(response.data);
    }
    catch (err) {
      setError('Failed to fetch logs: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  if (loading) return <p>Loading logs...</p>;
  if (error) return <p>{error}</p>;

  return (
  <div>
    <h1>Logs</h1>
    <p>logs count: {logs.count}</p>
    <ul>
      {logs.data.map((log) => (
        <li key={log.id}>
          <p>{log.action}</p>
          <p>{log.user.name}</p>
        </li>
      ))}
    </ul>
  </div>
);
};

export default Logs;  