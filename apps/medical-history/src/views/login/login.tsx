import { ChangeEvent, useEffect, useState } from 'react';
import './login-styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { HTTP, deleteCookie, getCookie, setCookie } from '../../services';
import { User } from '@seg-apps-web/api-interfaces';

const http = new HTTP('http://localhost:3333');

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [warningMessage, setWarningMessage] = useState('');

  useEffect(() => {
    deleteCookie('user')
  }, [])

  const logIn = async () => {
    const res = await http.post<User>('/login', {
      username,
      password,
    });

    if (res.ok) {
      setCookie('user', res.payload);
      const cookie = getCookie('user');
      navigate('/home');
      return;
    } else {
      setWarningMessage(res.payload.message);
    }
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value);

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <div className="logo">
          <img src="../assets/Medicare.png" alt="Logo" />
        </div>
        <input
          type="text"
          id="username"
          className="fadeIn second"
          name="login"
          placeholder="Usuario"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="password"
          id="password"
          className="fadeIn third"
          name="login"
          placeholder="Contraseña"
          value={password}
          onChange={handlePasswordChange}
        />
        <input
          type="submit"
          onClick={logIn}
          className="fadeIn fourth"
          value="Ingresar"
        />
        {warningMessage && <div className="warning">{warningMessage}</div>}
        <div id="formFooter">
          <Link to="/forgotPassword" className="underlineHover">
            ¿Olvidaste tu Contraseña?
          </Link>
          <span className="separator">|</span>
          <Link to="/register" className="underlineHover">
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
