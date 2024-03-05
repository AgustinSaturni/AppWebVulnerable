import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HTTP } from '../../services';

const http = new HTTP('http://localhost:3333');

const ForgotPassword = () => {
  const [messageVisible, setMessageVisible] = useState(false);

  const [username, setUsername] = useState('');
  const [recuperoContraseña, setRecuperoContraseña] = useState(false);
  const [recuperoMessage, setRecuperoMessage] = useState('');
  const [warningMessage, setWarningMessage] = useState('');

  const navigate = useNavigate();

  const resetPass = () => {
    //navigate('/home');
    setMessageVisible(true);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value); // Actualiza username con el valor del campo de entrada
  };

  async function handleRecuperarPassword() {
    const res = await http.post<{ message: string }>('/recover', { username });
    setRecuperoMessage(res.payload.message);
  }

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <div className="logo">
          <img src="../assets/Medicare.png" alt="Logo" />
        </div>

        <input
          type="text"
          id="user"
          className="fadeIn second"
          name="user"
          placeholder="Ingrese su mail"
          onChange={handleUsernameChange}
          disabled={recuperoContraseña}
        />
        <input
          type="button"
          className="fadeIn third"
          value="Recuperar"
          onClick={handleRecuperarPassword}
          disabled={recuperoContraseña}
        />

        {recuperoMessage && <div className="success">{recuperoMessage}</div>}
        {warningMessage && <div className="warning">{warningMessage}</div>}
        <div id="formFooter" className="fadeIn fourth">
          <a className="underlineHover" href="./">
            Sing In
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
