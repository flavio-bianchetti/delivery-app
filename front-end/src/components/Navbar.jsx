import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeliveryContext from '../context/DeliveryContext';
import Button from './Button';
import navBackground from '../images/nav-background.jpg';

const Navbar = () => {
  const navigate = useNavigate();
  const {
    userName,
    setIsLogout,
  } = useContext(DeliveryContext);

  const btnProdutos = () => (
    <Grid
      item
      xs={ 3 }
    >
      <Stack
        width="100%"
      >
        <Button
          className="navbar__btn-products"
          variant="contained"
          type="button"
          onClick={ () => navigate('/customer/products') }
          datatestid="customer_products__element-navbar-link-products"
          label="Produtos"
          disabled={ false }
        />
      </Stack>
    </Grid>
  );

  const btnPedidos = () => (
    <Grid
      item
      xs={ 3 }
    >
      <Stack
        width="100%"
      >
        <Button
          className="navbar__btn-orders"
          variant="contained"
          type="button"
          onClick={ () => navigate('/customer/orders') }
          datatestid="customer_products__element-navbar-link-orders"
          label="Meus Pedidos"
          disabled={ false }
        />
      </Stack>
    </Grid>
  );

  const btnSair = () => (
    <Grid
      item
      xs={ 1 }
    >
      <Stack
        width="100%"
      >
        <Button
          className="navbar__btn-logout"
          variant="contained"
          type="button"
          onClick={ () => {
            setIsLogout(true);
            navigate('/');
          } }
          datatestid="customer_products__element-navbar-link-logout"
          label="Sair"
          disabled={ false }
        />
      </Stack>
    </Grid>
  );

  const clientBar = () => (
    <Stack
      width="100%"
      height="100%"
      alignItems="left"
      justifyContent="center"
      sx={ {
        backgroundImage: `url(${navBackground})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      } }
    >
      <Typography
        variant="h5"
        component="div"
        paddingLeft={ 2 }
        color="blue"
      >
        { userName }
      </Typography>
    </Stack>
  );

  return (
    <Box
      display="flex"
      component="form"
      autocomplete="on"
      spacing={ 1 }
      padding={ 1 }
    >
      <Stack
        sx={ { width: '100%' } }
        direction="row"
        spacing={ 1 }
        padding={ 1 }
      >
        <Grid
          container
          spacing={ 2 }
        >
          { btnProdutos() }
          { btnPedidos() }
          <Grid
            item
            xs={ 5 }
          >
            { clientBar() }
          </Grid>
          { btnSair() }
        </Grid>

      </Stack>
    </Box>
  );
};

export default Navbar;
