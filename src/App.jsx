import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Home from './Pages/Home/Home';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import SignUp from './Pages/Auth/SignUp/SignUp';
import Navbar from './Components/Navbar/Navbar';
import LoginIn from './Pages/Auth/LoginIn/LoginIn';
import AddMovies from './Pages/Movies/AddMovies';
import AddScreens from './Pages/Screens/AddScreens';
import AddSchedules from './Pages/Schedules/AddSchedules';
import AddCelebs from './Pages/Movies/Celebs/AddCelebs';


function App() {

  return (
    <div className="app">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<LoginIn />} />
            <Route path="/movies" element={<AddMovies />} />
            <Route path="/screens" element={<AddScreens />} />
            <Route path="/schedules" element={<AddSchedules />} />
            <Route path="/celebs" element={<AddCelebs />} />


            {/* <Route path="/profile/:username" element={<Profile />} /> */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
    </div>
  )
}

export default App
