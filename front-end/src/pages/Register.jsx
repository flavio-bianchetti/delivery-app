import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Label from '../components/Label';
import Button from '../components/Button';
import DeliveryContext from '../context/DeliveryContext';
import { ValidateEmail, ValidatePassword, ValidateName } from '../utils';
import { requestLogin } from '../services/request';

const Register = () => {
  const navigate = useNavigate();
  const [isInvalidRegister, setIsInvalidRegister] = useState(false);

  const {
    userEmail,
    setUserEmail,
    userPassword,
    setUserPassword,
    userName,
    setUserName,
    saveUserInfoLocalStorage,
  } = React.useContext(DeliveryContext);

  const handleChange = (event) => {
    event.preventDefault();
    setIsInvalidRegister(false);
    const { id, value } = event.target;
    if (id === 'email') {
      setUserEmail(value);
    }
    if (id === 'password') {
      setUserPassword(value);
    }
    if (id === 'name') {
      setUserName(value);
    }
  };

  const register = (event) => {
    event.preventDefault();
    if (
      ValidateEmail(userEmail)
      && ValidatePassword(userPassword)
      && ValidateName(userName)) {
      requestLogin('/register', {
        name: userName,
        email: userEmail,
        password: userPassword,
        role: 'customer',
      }).then((response) => {
        const { id, name, email, role } = response.user;
        const { token } = response;
        if (name !== userName || email !== userEmail) {
          setIsInvalidRegister(true);
        } else {
          saveUserInfoLocalStorage({ id, name, email, role, token });
          navigate('/customer/products');
        }
      }).catch((err) => {
        console.log(err);
        setIsInvalidRegister(true);
      });
    }
  };

  return (
    <section>
      <h1>Cadastro</h1>
      <form
        className="form"
      >
        <Label
          className="form__label"
          htmlFor="name"
          datatestid="common_register__label-name"
          label="Nome"
        />
        <Input
          className="form__input"
          type="text"
          id="name"
          value={ userName }
          onChange={ handleChange }
          datatestid="common_register__input-name"
          placeholder="Seu nome"
        />
        <Label
          className="form__label"
          htmlFor="email"
          datatestid="common_register__label-email"
          label="Email"
        />
        <Input
          className="form__input"
          type="text"
          id="email"
          value={ userEmail }
          onChange={ handleChange }
          datatestid="common_register__input-email"
          placeholder="E-mail"
        />
        <Label
          className="form__label"
          htmlFor="password"
          datatestid="common_register__label-password"
          label="Senha"
        />
        <Input
          className="form__input"
          type="password"
          id="password"
          value={ userPassword }
          onChange={ handleChange }
          datatestid="common_register__input-password"
          placeholder="digite sua senha"
        />
        <Button
          className="form__btn-submit"
          type="submit"
          onClick={ register }
          datatestid="common_register__button-register"
          label="Cadastro"
          disabled={ !(
            ValidateEmail(userEmail)
            && ValidatePassword(userPassword)
            && ValidateName(userName)
          ) }
        />
      </form>
      {
        isInvalidRegister
        && (
          <p
            className="form__warning"
            data-testid="common_register__element-invalid_register"
          >
            Usuário já cadastrado.
          </p>
        )
      }
    </section>
  );
};

export default Register;
