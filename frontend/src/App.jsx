import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard.js'
import Signup from './pages/SignUp.js';
import Login from './pages/Login.js';
import Teams from './pages/Teams.jsx';
import Employees from './pages/Employees.js';
import EmployeeForm from './components/EmployeeForm.jsx';
import TeamForm from './components/TeamForm.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/teams" element={<Teams />} />
        <Route path="/employees" element={<Employees />} />

        <Route path="/add-employee" element={<EmployeeForm />} />
        <Route path="/add-team" element={<TeamForm />} />
      </Routes>
    </Router>
  );
};

export default App;