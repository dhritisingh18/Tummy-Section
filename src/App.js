import logo from './logo.svg';
import './App.css';
import { Navbar } from './components/Navbar';
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from './Theme/DarkTheme';
import { CssBaseline } from '@mui/material';
import { Home } from './components/Home/Home';
import { RestaurantDetails } from './components/Restaurant/RestaurantDetails';
import { Cart } from './components/Cart/Cart';
import { Profile } from './components/ProfileComp/Profile';
import { CustomerRouter } from './components/Routers/CustomerRouter';
import { useDispatch, useSelector } from 'react-redux';
import { store } from './components/State/store';
import { useEffect } from 'react';
import { getUser } from './components/State/Authentication/Action';
import { findCart } from './components/State/Cart/Action';

function App() {

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {auth} = useSelector((store)=> store);

  useEffect(()=>{

    dispatch(getUser( auth.jwt || jwt))
    dispatch(findCart(jwt))
  },[auth.jwt])


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <CustomerRouter />
      
   </ThemeProvider>
  );
}

export default App;
