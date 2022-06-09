import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Label from '../components/Label';
import Button from '../components/Button';
import DeliveryContext from '../context/DeliveryContext';
import { ValidateEmail, ValidatePassword } from '../utils';
import { requestLogin } from '../services/request';

const Login = () => {
  const navigate = useNavigate();
  const [isInvalidLogin, setIsInvalidLogin] = useState(false);

  const {
    userEmail,
    setUserEmail,
    setUserName,
    userPassword,
    setUserPassword,
    saveUserInfoLocalStorage,
    logout,
  } = React.useContext(DeliveryContext);

  const handleChange = (event) => {
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
          const { id, name, email, role, token } = response;
          setUserName(name);
          setUserPassword('');
          saveUserInfoLocalStorage({ id, name, email, role, token });
          navigate('/customer/products');
        }).catch((err) => {
          console.error(err);
          setIsInvalidLogin(true);
        });
    }
  };

  useEffect(() => {
    logout();
  }, []);

  return (
    <section>
      <h1
        className="form"
      >
        Login
      </h1>
      <form>
        <Label
          className="form__label"
          htmlFor="email"
          datatestid="common_login__label-email"
          label="E-mail"
        />
        <Input
          className="form__input"
          type="text"
          id="email"
          value={ userEmail }
          onChange={ handleChange }
          datatestid="common_login__input-email"
          placeholder="E-mail"
        />
        <Label
          className="form__label"
          htmlFor="password"
          datatestid="common_login__label-password"
          label="Senha"
        />
        <Input
          className="form__input"
          type="password"
          id="password"
          value={ userPassword }
          onChange={ handleChange }
          datatestid="common_login__input-password"
          placeholder="digite sua senha"
        />
        <Button
          className="form__btn-submit"
          id="btn-submit"
          type="submit"
          onClick={ login }
          datatestid="common_login__button-login"
          label="Login"
          disabled={ !(ValidateEmail(userEmail) && ValidatePassword(userPassword)) }
        />
        <Button
          className="form__btn-button"
          id="btn-button"
          type="button"
          onClick={ () => navigate('/register') }
          datatestid="common_login__button-register"
          label="Ainda não tenho conta"
          disabled={ false }
        />
      </form>
      {
        isInvalidLogin
        && (
          <p
            className="form__warning"
            data-testid="common_login__element-invalid-email"
          >
            Usuário ou senha inválidos.
          </p>
        )
      }
    </section>
  );
};

export default Login;
