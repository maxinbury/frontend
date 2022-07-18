import React, { useEffect, useState, } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import HomeIcon from "@mui/icons-material/Home";
import InputAdornment from "@mui/material/InputAdornment";
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import Avatar from "@mui/material/Avatar";
import Container from '@mui/material/Container';
import servicioCliente from '../../../services/clientes'
import "../detalleclienteIngresos/profile.css";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"

const ModificacionC = (props) => {
  const navigate = useNavigate();
    const [cliente, setCliente] = useState([])
    const [modificaciones, setModificaciones] = useState([])
  const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
  let params = useParams()
    let cuil_cuit = params.cuil_cuit
   
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
      
    traer()
    
}, []) 

  const traer = async() => {
       
   
      const  cliente = await servicioCliente.cliente(cuil_cuit)
      
      setCliente(cliente)
      console.log(cliente)

      setModificaciones({cuil_cuit: cliente[0].cuil_cuit,
        Nombre: cliente[0].Nombre,
        email: cliente[0].email,
        provincia: cliente[0].provincia,
        telefono: cliente[0].telefono,
        ingresos: cliente[0].ingresos,
        domicilio: cliente[0].domicilio,
        razon_social: cliente[0].razon_social} )
      

      
     
     
  
      ;
    };  
 

    const handleChange = (e) =>{
      setModificaciones({  ...modificaciones, [e.target.name]: e.target.value })
      console.log(modificaciones)
    }
    const handleDeterminar = async (event) => {
      event.preventDefault();
      try {
  
        const rta =await servicioCliente.modificarCliente(
       modificaciones
       )
       alert(rta)
       
       } catch (error) {
         console.error(error);
         console.log('Error algo sucedio')
       
       }

    };

  return (<>    
     <form  onSubmit={handleDeterminar}>
   {cliente.map((client) =>( 
    <div className="profile">
      <Grid Container>
        <Grid item xs={8} style={{ justifyContent: "center", display: "flex" }}>
          <Avatar sx={{ width: 170, height: 140 }}>H</Avatar>
        </Grid>
        <Grid item xs={8}style={{ justifyContent: "center", display: "flex" }}>
  
            <Container>
            <Box>
            <h5>
            Datos Personales del Cliente
            </h5>
                
            </Box>
       
              <Box>
              <TextField
                  label="CUIL"
                  id="cuil"
                  name="cuit_cuil"
                 // defaultValue="CUIL"
                 defaultValue= {client.cuil_cuit}
                 onChange={handleChange}
                  variant="filled"
                  sx={{ margin: "10px" }}
                  InputProps={{
                    readOnly: !editMode,
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    )
                  }}
                />

                <TextField
                  label="Nombre"
                  id="Nombre"
                  name="Nombre"
                  defaultValue={client.Nombre}
                  onChange={handleChange}
                  variant="filled"
                  sx={{ margin: "10px" }}
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    )
                  }}
                />
              </Box>
                   

                    
              <Box>
             
                <TextField
                  label="Email"
                  id="email"
                  name="email"
                  defaultValue={client.email}
                  variant="filled"
                  sx={{ margin: "10px" }}
                  onChange={handleChange}
                  InputProps={{
                    readOnly: false,
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    )
                  }}
                />

                <TextField
                  label="Provincia"
                  id="Localidad"
                  name="provincia"
                  onChange={handleChange}
                  defaultValue={client.provincia}
                  variant="filled"
                  sx={{ margin: "10px" }}
                  InputProps={{
                    readOnly: editMode,
                    startAdornment: (
                      <InputAdornment position="start">
                        <HomeWorkIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Box>
              <Box>
                <TextField
                  label="Numero de Telefono"
                  id="numero de telefono"
                  name="telefono"
                  defaultValue={client.telefono}
                  onChange={handleChange}
                  variant="filled"
                  sx={{ margin: "10px" }}
                  InputProps={{
                    readOnly: editMode,
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalPhoneIcon />
                      </InputAdornment>
                    )
                  }}
                />

                <TextField
                  label="Ingresos Declarados"
                  id="dirección"
                  name="ingresos"
                  defaultValue={client.ingresos}
                  onChange={handleChange}
                 /*  value={client.ingresos} */
                  variant="filled"
                  sx={{ margin: "10px" }}
                  InputProps={{
                    readOnly: editMode,
                    startAdornment: (
                      <InputAdornment position="start">
                        <HomeIcon />
                      </InputAdornment>
                    )
                  }}
                >
                  
                </TextField>
              </Box>
              <Box>
                <TextField
                  label="Domicilio"
                  id="domicilio"
                  name="domicilio"
                  defaultValue={client.domicilio}
                  onChange={handleChange}
                  variant="filled"
                  sx={{ margin: "10px" }}
                  InputProps={{
                    readOnly: editMode,
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalPhoneIcon />
                      </InputAdornment>
                    )
                  }}
                />

                <TextField
                  label="Razon Social"
                  id="dirección"
                  name="razon_social"
                  defaultValue={client.razon_social}
                  onChange={handleChange}
                 /*  value={client.ingresos} */
                  variant="filled"
                  sx={{ margin: "10px" }}
                  InputProps={{
                    readOnly: editMode,
                    startAdornment: (
                      <InputAdornment position="start">
                        <HomeIcon />
                      </InputAdornment>
                    )
                  }}
                >
                  
                </TextField>
              </Box>
              

              <Box>
                <columns lg={8}>
                  {editMode ? (
                    <div className="profile-form-button">
                      <Button
                        variant="outlined"
                        sx={{ marginRight: "10px" }}
                        onClick={() => setEditMode(false)}
                      >
                        Cancelar
                      </Button>
                      <Button variant="contained">Enviar</Button>
                    </div>
                  ) : (
                    <div className="profile-edit-button">
                      <Button
                        variant="outlined"
                        type="submit"
                      >
                      Guardar
                      </Button>
                    </div>
                  )}
                </columns>
              </Box>
            </Container>
          
        </Grid>

        <Grid item xs={8} style={{ justifyContent: "center", display: "flex" }}>
         
         
        </Grid>
      </Grid>
    </div>
    ))}</form> </>);
}

export default ModificacionC;