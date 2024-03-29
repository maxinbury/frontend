import * as React from 'react';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import{ useEffect, useState, } from "react";
import servicioUsuario1 from '../../services/usuario1'
import  useUser from '../../hooks/useUser'
import { useNavigate } from "react-router-dom";

const Notificaciones = (props) =>   {
    const [cantidad, setCantidad] = useState(null);
    const usuario  = useUser().userContext
    const navigate = useNavigate();
    useEffect(() => {
   
        traer()
        
    }, []) 
    const traer = async() => {
             
        const  cantidad = await servicioUsuario1.cantidad(usuario.cuil_cuit)
        
        setCantidad(cantidad)
    
    
      }; 
  return (
    <Badge badgeContent={4} color="primary" onClick={() =>  navigate('/usuario/notificaciones')}>
      <MailIcon color="action" />
    </Badge>
  );
}
export default Notificaciones