import * as React from 'react';
import  { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import servicioUsuario from '../../../services/usuarios'

import  Agregar from '../../../components/Administracion/Usuarios/AgregarUsuario'
import  TablaUsuarios from '../../../components/Administracion/Usuarios/TodosUsuarios'
import  useUser from '../../../hooks/useUser'
import BarraLAteral from '../../../components/Administracion/MenuizqAdmin'


import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const drawerWidth = 240;

export default function MenuUsuario2() {
  const navigate = useNavigate();

  const [logueado, setLogueado] = useState(false) 


useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
  
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    if (user.nivel != 10){
      window.localStorage.removeItem('loggedNoteAppUser')
   navigate('/login')

    }else{

      setLogueado(true)
    }
  
    //servicioUsuario.setToken(user.token)  
   
    
  }
 
}, [])
  


  return (
   
<div> 
  { logueado ? <div> 
    <ThemeProvider theme={darkTheme}>
    <BarraLAteral>
    < Agregar />
    < TablaUsuarios />
   
 </BarraLAteral> 
 </ThemeProvider>
 </div>   :<div></div> } </div>
  );
}