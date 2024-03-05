import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HTTP, setCookie } from '../../services';
import { User, UserNotCreated } from '@seg-apps-web/api-interfaces';

const http = new HTTP('http://localhost:3333')

const Register = () => {
  const [user, setUser] = useState<UserNotCreated>({ name: '', lastName: '', username: '', password: '', age: '', gender:''})
  const [contraseñaRepetida, setContraseñaRepetida] = useState("")
  const [warningMessage, setWarningMessage] = useState('');
  const [recuperoMessage, setRecuperoMessage] = useState('');

  const navigate = useNavigate();

  const logIn = async (username: string, password: string) => {
    const res = await http.post<User>('/login', {
      username,
      password,
    });

    if (res.ok) {
      setCookie('user', res.payload);
      navigate('/home');
      return;
    } else {
      setWarningMessage(res.payload.message);
    }
  };

  const signUp = async () => {
    //pegamos a la base guardamos nuevo usuario.
    if (user.name === '' || user.lastName === '' || user.username === '' || user.password === '' || contraseñaRepetida === '') {
      setWarningMessage("Falta completar campos");
      return;
    }

    if (user.password !== contraseñaRepetida) {
      setWarningMessage("Las contraseñas no coinciden");
      return;
    } else {
      await http.post<{ user: User }>('/register', user).then(async (data) => {
        if (data.ok) {
          console.log(data)
          setWarningMessage("");
          setRecuperoMessage("Usuario creado correctamente")
          await logIn(data.payload.user.username, data.payload.user.password)
        } else {
          console.error('LRPM')
        }
      })
    }
  };

  const handleChange = (key: keyof UserNotCreated, value: unknown) => setUser(prev => ({
    ...prev,
    [key]: value
  }))

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <div className="logo">
          <img src="../assets/Medicare.png" alt="Logo" />
        </div>
        <input type="text" id="name" className="fadeIn second" name="register" placeholder="Nombre" onChange={(e) => handleChange('name', e.target.value)} />
        <input type="text" id="lastname" className="fadeIn third" name="register" placeholder="Apellido" onChange={(event) => handleChange('lastName', event.target.value)} />
        <input type="text" id="mail" className="fadeIn fourth" name="register" placeholder="Mail" onChange={(event) => handleChange('username', event.target.value)} />
        <input type="password" id="password" className="fadeIn fifth" name="register" placeholder="Contraseña" onChange={(event) => handleChange('password', event.target.value)} />
        <input type="password" id="repeatPassword" className="fadeIn sixth" name="register" placeholder="Repetir Contraseña" onChange={(event) => setContraseñaRepetida(event.target.value)} />
        {warningMessage && <div className="warning">{warningMessage}</div>}
        <input type="submit" onClick={signUp} className="fadeIn seventh" value="Registrarme" />
        {recuperoMessage && <div className="success">{recuperoMessage}</div>}

        <div id="formFooter" className="fadeIn eighth">
          <a className="underlineHover" href="./">Ingresar</a>
        </div>
      </div>
    </div>
  );
};

export default Register;



