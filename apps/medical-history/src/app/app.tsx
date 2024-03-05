import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../views/login/login';
import Home from '../views/home/home';
import ForgotPassword from '../views/forgotPassword/forgotPassword';
import Register from '../views/register/Register';
import NotFound from '../views/notfound/notfound';
import { MyHistory } from '../views/myHistory/MyHistory';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/myHistory/:userId" element={<MyHistory />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
