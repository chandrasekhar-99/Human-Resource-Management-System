import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from './pages_temp/Dashboard.jsx'
import Signup from './pages_temp/SignUp.jsx';
import Login from './pages_temp/Login.jsx';
import Teams from './pages_temp/Teams.jsx';
import Employees from './pages_temp/Employees.jsx';
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