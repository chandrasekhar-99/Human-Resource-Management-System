import { useEffect, useState } from 'react';
import api from '../services/api';

const Logs = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); 
  const [logs, setLogs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);

        const response = await api.get('/logs', { withCredentials: true, params: {page, limit } });
        const data = response.data.data;
        setLogs(data.rows);
        setTotalPages(Math.ceil(data.count / limit));
      } catch (err) {
        setError('Failed to fetch logs: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [page, limit]);

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };
  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  



  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading logs...
      </div>
    );

  if (error)
    return (
      <div className="text-red-600 bg-red-50 p-4 rounded-lg border border-red-200 mt-6 mx-auto w-[90%] max-w-lg">
        {error}
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
        <h1 className="text-3xl font-bold text-gray-800">Logs</h1>
        <span className="text-gray-600 text-sm bg-gray-100 px-3 py-1 rounded-md">
          Total: {logs.length}
        </span>
      </div>

      {/* Logs List */}
      <div className="bg-white shadow-md rounded-lg p-4 max-h-[500px] overflow-y-auto">
        {logs.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No logs found.</p>
        ) : (
          <ul className="space-y-3">
            {logs.map((log) => (
              <li
                key={log.id}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <p className="text-gray-800 font-semibold">{log.action}</p>
                <p className="text-sm text-gray-600 mt-1">
                  User: <span className="font-medium">{log.user.name}</span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex justify-center items-center space-x-4 mt-6 flex-wrap gap-2">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className={`px-4 py-2 rounded-md ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Prev
        </button>

        <span className="text-gray-700">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded-md ${
            page === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Logs;
