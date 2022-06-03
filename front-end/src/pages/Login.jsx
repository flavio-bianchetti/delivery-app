import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Label from '../components/Label';
import Button from '../components/Button';
import DeliveryContext from '../context/DeliveryContext';
import { ValidateEmail, ValidatePassword } from '../utils';
import { requestLogin } from '../services/request';

const Login = () => {
  const navigate = useNavigate();
  const [ isInvalidLogin, setIsInvalidLogin ] = useState(false);

  const {
    userEmail,
    setUserEmail,
    userPassword,
    setUserPassword,
    saveUserInfoLocalStorage,
  } = React.useContext(DeliveryContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsInvalidLogin(false);
    const { id, value } = event.target;
    if (id === 'email') {
      setUserEmail(value);
    } else if (id === 'password') {
      setUserPassword(value);
    }
  };

  const login = (event) => {
    event.preventDefault();
    if (ValidateEmail(userEmail) && ValidatePassword(userPassword)) {
      requestLogin('/login', { email: userEmail, password: userPassword })
        .then((response) => {
          const { name, email, role, token } = response;
          saveUserInfoLocalStorage(name, email, role, token);
          navigate('/products');
        }).catch((err) => {
          console.error(err);
          setIsInvalidLogin(true);
        });
    }
  };

  return (
    <section>
      <h1>Login</h1>
      <form>
        <Label
          className="label-email"
          htmlFor="email"
          datatestid="common_login_label-email"
          label="E-mail"
        />
        <Input
          className="form-control"
          type="text"
          id="email"
          value={ userEmail }
          onChange={ handleSubmit }
          datatestid="common_login_input-email"
          placeholder="Username"
        />
        <Label
          className="label"
          htmlFor="password"
          datatestid="common_login_label-password"
          label="Password"
        />
        <Input
          className="form-control"
          type="password"
          id="password"
          value={ userPassword }
          onChange={ handleSubmit }
          datatestid="common_login_input-password"
          placeholder="Password"
        />
        {
          isInvalidLogin
          &&
            <p
              className="common_login__element-invalid-email"
            >
              Usuário ou senha inválidos.
            </p>
        }
        <Button
          className="btn btn-primary"
          type="submit"
          onClick={ login }
          datatestid="common_login_button-login"
          label="Login"
          disabled={ !(ValidateEmail(userEmail) && ValidatePassword(userPassword)) }
        />
        <Button
          className="btn btn-secondary"
          type="button"
          onClick={ () => console.log('Register') }
          datatestid="common_login_button-register"
          label="Cancel"
          disabled={ false }
        />
      </form>
    </section>
  );
};

export default Login;
