import { Route, Routes, Navigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import LandingPage from './Components/LandinPage/LandingPage';
import './App.css';
import Home from './Components/Home/Home';
import axios from "axios";
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { setSession } from './Redux/Actions';

function ProtectedRoute({ children }) {
  const session = useSelector(state => state.session);

  if (session && Object.keys(session).length > 0) {
    return children;
  }

  return <Navigate to="/" />;
}

function LandingOrHome() {
  const session = useSelector(state => state.session);

  if (session && Object.keys(session).length > 0) {
    return <Navigate to="/home" />;
  }

  return <LandingPage />;
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSession = async (token) => {
      try {
        const response = await axios.get("http://localhost:3001/getSession", {
          withCredentials: true,
          headers: {
            "x-user-session": JSON.stringify(token),
          }
        });

        if (response.status === 200) {
          dispatch(setSession(response.data.user));
        } else {
          dispatch(setSession({}));
        }
      } catch (error) {
        console.log(error);
        dispatch(setSession({}));
      }
    };

    const token = Cookies.get('session');
    if (token) {
      fetchSession(token);
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingOrHome />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

// const deleteSession = () => {
//   Cookies.remove('session');
// };