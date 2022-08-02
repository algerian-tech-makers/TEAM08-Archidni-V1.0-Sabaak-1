import { Routes, Route, Link } from 'react-router-dom';
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
import Button from '@mui/material/Button';
import Layout from './pages/Layout';
import { Stack } from '@mui/material';
import Navbar from './components/Navbar';
import Searchbar from './components/Searchbar';

function App() {
  // just a simple example to test routes
  const pages = [
    { label: 'Home', path: '/' },
    { label: 'SchoolList', path: '/schools' },
    { label: 'SchoolDetails', path: 'schools/3' },
    { label: 'Login', path: '/login' },
    { label: 'Register', path: '/register' },
    { label: 'UserList', path: '/users' },
    { label: 'UserDetails', path: 'users/3' },
    { label: 'Dashboard', path: '/admin' },
    { label: 'UserProfile', path: '/users/3/profile' },
  ];
  return (
    <>
      {/* <Stack direction="row" justifyContent="center">
        {pages.map((page, index) => (
          <Button
            key={index}
            to={page.path}
            component={Link}
            variant="outlined"
            sx={{ mx: 1 }}
          >
            {page.label}
          </Button>
        ))}
      </Stack> */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Layout />}>
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
        </Route>
      </Routes>
    </>
  );
}

export default App;
