import * as React from 'react';
import { useEffect, useState } from "react";


import DetallesPagos from '../../../components/mapas/listayseleccion';
import { useNavigate } from "react-router-dom";
import BarraLAteral from '../../../components/nivel2/MenuIzq2'
import servicioUsuario from '../../../services/usuarios'
import Navbar from '../../../components/Navbar';



//import {makeStyles} from "@material-ui/core/styles"


const drawerWidth = 240;

export default function DetalleCliente() {
  const navigate = useNavigate();

 
  const [ingreso, setIngreso] = useState({
    ingreso: "",
   
  });
  const [logueado, setLogueado] = useState(false) 
  useEffect(() => {
    
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
      
    if (loggedUserJSON) {
      
      const user = JSON.parse(loggedUserJSON)
      if (user.nivel != 5){
        window.localStorage.removeItem('loggedNoteAppUser')
   

      }else{

        setLogueado(true)
      }
    
      //servicioUsuario.setToken(user.token)  
     
      
    }else{
        alert('Debes logearte')
      navigate('/login')
     
    }
   
  }, []) 

  


  ////////

  return (

    <div> 
  { logueado ? <div> 

    <Navbar
       />
<br/><br/><br/>
      <DetallesPagos
       />

 </div>   :<div></div> } </div>
  );
}