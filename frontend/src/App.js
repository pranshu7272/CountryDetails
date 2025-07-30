import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import CountryDetailPage from './pages/CountryDetailsPage';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        {/* Protect all routes except /login and /register */}
        <Route
          path="/"
          element={
            token ? <HomePage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/country/:name"
          element={
            token ? <CountryDetailPage /> : <Navigate to="/login" replace />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
