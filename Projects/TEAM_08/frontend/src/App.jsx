import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SchoolList from './pages/SchoolList';
import SchoolDetails from './pages/ScholDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import UserList from './pages/UserList';
import UserDetails from './pages/UserDetails';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/schools" element={<SchoolList />} />
        <Route path="/schools/:id" element={<SchoolDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* protected routes */}
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id/profile" element={<UserProfile />} />

        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/admin" element={<Dashboard />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
