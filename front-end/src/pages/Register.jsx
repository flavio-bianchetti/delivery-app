import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Input from '../components/Input';
import Button from '../components/Button';
import DeliveryContext from '../context/DeliveryContext';
import { ValidateEmail, ValidatePassword, ValidateName } from '../utils';
import { requestLogin } from '../services/request';
import nameApp from '../images/delivery-name.png';
import registerLogo from '../images/register-logo.gif';

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
    setIsLogout,
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
          setUserPassword('');
          navigate('/customer/products');
        }
      }).catch((err) => {
        console.log(err);
        setIsInvalidRegister(true);
      });
    }
  };

  useEffect(() => {
    setIsLogout(true);
  }, [setIsLogout]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      component="form"
      autocomplete="off"
    >
      <Stack
        sx={ { width: '300px' } }
        direction="column"
        alignItems="center"
        spacing={ 2 }
        padding={ 2 }
      >
        <Stack
          spacing={ 0 }
          alignItems="center"
        >
          <img src={ registerLogo } width="200px" alt="delivery app" />
          <img src={ nameApp } width="220px" alt="delivery app" />
        </Stack>
        <Stack
          width="100%"
        >
          <Input
            className="form__input"
            variant="outlined"
            label="Nome"
            type="text"
            id="name"
            value={ userName }
            onChange={ handleChange }
            datatestid="common_register__input-name"
            placeholder="no mínimo, 12 caracteres"
          />
        </Stack>
        <Stack
          width="100%"
        >
          <Input
            className="form__input"
            variant="outlined"
            label="E-mail"
            type="text"
            id="email"
            value={ userEmail }
            onChange={ handleChange }
            datatestid="common_register__input-email"
            placeholder="formato: usuario@email.com"
          />
        </Stack>
        <Stack
          width="100%"
        >
          <Input
            className="form__input"
            variant="outlined"
            label="Senha"
            type="password"
            id="password"
            value={ userPassword }
            onChange={ handleChange }
            datatestid="common_register__input-password"
            placeholder="no mínimo, 6 caracteres"
          />
        </Stack>
        <Stack
          width="100%"
        >
          <Button
            className="form__btn-submit"
            variant="contained"
            id="btn-submit"
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
        </Stack>
      </Stack>
      <Snackbar
        sx={ {
          width: 400,
          color: 'secondary',
          '& .MuiSnackbarContent-root': { backgroundColor: 'red' },
        } }
        open={ isInvalidRegister }
        anchorOrigin={ { vertical: 'bottom', horizontal: 'center' } }
        autoHideDuration={ 1000 }
        transitionDuration={ { enter: 1000, exit: 1000 } }
        severity="error"
        message="Usuário já cadastrado."
      />
    </Box>
  );
};

export default Register;
