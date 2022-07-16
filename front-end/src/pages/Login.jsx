import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Input from '../components/Input';
import { requestLogin } from '../services/request';
import Button from '../components/Button';
import DeliveryContext from '../context/DeliveryContext';
import { ValidateEmail, ValidatePassword } from '../utils';
import delivery from '../images/delivery-logo.gif';

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
          if (role === 'seller') return navigate('/seller/orders');
          navigate('/customer/products');
        }).catch((err) => {
          console.error(err);
          setIsInvalidLogin(true);
        });
    }
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('user'))) {
      navigate('/customer/products');
    }
  }, [navigate]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      component="form"
      autocomplete="on"
    >
      <Stack
        sx={ { width: '300px' } }
        direction="column"
        alignItems="center"
        spacing={ 2 }
        padding={ 2 }
      >
        <img src={ delivery } alt="logo" />
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
            datatestid="common_login__input-email"
            placeholder="insira seu e-mail"
          />
        </Stack>
        <Stack
          width="100%"
        >
          <Input
            className="form__input"
            variant="outlined"
            label="E-mail"
            type="password"
            id="password"
            value={ userPassword }
            onChange={ handleChange }
            datatestid="common_login__input-password"
            placeholder="insira sua senha"
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
            onClick={ login }
            datatestid="common_login__button-login"
            label="Login"
            disabled={ !(ValidateEmail(userEmail) && ValidatePassword(userPassword)) }
          />
        </Stack>
        <Stack
          width="100%"
        >
          <Button
            className="form__btn-button"
            variant="text"
            id="btn-button"
            type="button"
            onClick={ () => navigate('/register') }
            datatestid="common_login__button-register"
            label="Ainda não tenho conta"
            disabled={ false }
          />
        </Stack>
      </Stack>
      <Snackbar
        sx={ {
          width: 400,
          color: 'secondary',
          '& .MuiSnackbarContent-root': { backgroundColor: 'red' },
        } }
        open={ isInvalidLogin }
        anchorOrigin={ { vertical: 'bottom', horizontal: 'center' } }
        autoHideDuration={ 1000 }
        transitionDuration={ { enter: 1000, exit: 1000 } }
        severity="error"
        message="Usuário ou senha inválidos."
      />
    </Box>
  );
};

export default Login;
