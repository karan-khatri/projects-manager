import './App.css';
import LoginUserPage from './pages/LoginFormPage';
import SharedLayout from './pages/SharedLayout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import RegisterUserPage from './pages/RegisterUserPage';
import ProjectsSection from './components/ProjectsSection';
import AddNewProject from './pages/AddNewProject';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route path='dashboard/projects' element={<Dashboard />}>
            <Route index path=':status' element={<ProjectsSection />} />
            <Route path='new' element={<AddNewProject />} />
          </Route>
          <Route path='auth'>
            <Route path='login' element={<LoginUserPage />} />
            <Route path='register' element={<RegisterUserPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
