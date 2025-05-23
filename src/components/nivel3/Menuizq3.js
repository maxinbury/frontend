import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GroupIcon from '@mui/icons-material/Group';
import SearchIcon from '@mui/icons-material/Search';
import NfcIcon from '@mui/icons-material/Nfc';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useState, useEffect } from "react";
import useInusual from '../../hooks/useInusual'
import servicioPagos from '../../services/pagos';
import Navbar from './Navbar3';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import Badge from '@mui/material/Badge';
import PaidIcon from '@mui/icons-material/Paid';

const drawerWidth = 240;

export default function MenuIzq2({ children }) {
  const navigate = useNavigate();
  const [notificaciones, setNotificaciones] = useState(0);
  const { cantidadInusual } = useInusual();

  const handleClick = (path) => {
    navigate(path);
  };

  useEffect(() => {
    cantidadnoti();
  }, []);

  const cantidadnoti = async () => {
    const notis = await servicioPagos.cantidadpendientesadmin();
    setNotificaciones(notis[0]);
  };

  const hanleLogout = () => {
    window.localStorage.removeItem('loggedNoteAppUser');
    window.location.reload(true);
  };

  const menuItems = [
    {
      text: 'Lotes',
      icon: <NfcIcon color="primary" />,
      path: '/nivel3/lotes',
    },
    {
      text: 'Aprobación de Pagos',
      icon: <PriceCheckIcon color="primary" />,
      path: '/nivel3/aprobacionesdepagos',
    },
    {
      text: 'Pagos Inusuales',
      icon: (
        <Badge
          color="error"
          badgeContent={notificaciones > 0 ? notificaciones : null}
        >
          <PaidIcon color="primary" />
        </Badge>
      ),
      path: '/nivel3/pagosinusuales',
    },
    {
      text: 'Agregar ICC',
      icon: <QueryStatsIcon color="primary" />,
      path: '/nivel3/icc',
    },
    {
      text: 'Valor Metro Cuadrado ',
      icon: <PlagiarismIcon color="primary" />,
      path: '/nivel3/declaraciones',
    },
    {
      text: 'Extracto',
      icon: <GroupAddIcon color="primary" />,
      path: '/nivel3/extracto',
    },
    {
      text: 'Agregar usuario',
      icon: <GroupAddIcon color="primary" />,
      path: '/nivel3/agregarusuario',
    },
    {
      text: 'Pagos Inusuales Mensuales',
      icon: <MoneyOffIcon color="primary" />,
      path: '/nivel3/pagosmensualesinusuales',
    },
    {
      text: 'Todos los pagos',
      icon: <MoneyOffIcon color="primary" />,
      path: '/nivel3/pagos',
    },
    {
      text: 'Agenda de novedades',
      icon: <AccountBalanceIcon color="primary" />,
      path: '/nivel3/novedades',
    },
  ];

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Navbar logout={{ hanleLogout }} />
          <Toolbar />
          <Toolbar />
          <Divider />
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.text} onClick={() => handleClick(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </>
  );
}
