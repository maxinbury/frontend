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
import servicioUsuario1 from '../../../services/usuario1'
import Cargando from '../../CargaDeTabla'
import "../../usuario1/Legajo1/ModificarDatosPers/profile.css";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import KeyIcon from '@mui/icons-material/Key';
import { Paper } from '@mui/material';
import logo from "../../../Assets/perfil.png";
const ModificacionC = (props) => {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState()
  const [modificaciones, setModificaciones] = useState([])
  const [pass, setPass] = useState([])

  const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;


  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    traer()


  }, [])

  const traer = async () => {
    const preba = JSON.parse(window.localStorage.getItem('loggedNoteAppUser'))



    const cliente = await servicioUsuario1.cliente2(preba.cuil_cuit)
    console.log(cliente)

    setCliente(cliente)
 

    setModificaciones({
      cuil_cuit: cliente[0].cuil_cuit,
      nombre: cliente[0].nombre,
      email: cliente[0].email,
      sueldo: cliente[0].sueldo,
      provincia: cliente[0].provincia,
      telefono: cliente[0].telefono,
      ingresos: cliente[0].ingresos,
      domicilio: cliente[0].domicilio,
      razon_social: cliente[0].razon_social
    })
    setPass({
      cuil_cuit: cliente[0].cuil_cuit,
    })

  };


  const handleChange = (e) => {
    setModificaciones({ ...modificaciones, [e.target.name]: e.target.value })
   
  }
  const handleChangePass = (e) => {
    setPass({ ...pass, [e.target.name]: e.target.value })
    
  }
  const handleDeterminar = async (event) => {

    try {

      const rta = await servicioUsuario1.modificarcli2(modificaciones)

      traer()
    } catch (error) {
  
      console.log('Error algo sucedio')

    }

  };

  const handleDeterminarPass = async (event) => {

    try {

      const rta = await servicioUsuario1.modificarpass(pass)
      alert(rta)
      
    } catch (error) {
      console.error(error);
      console.log('Error algo sucedio')

    }

  };
  const islogo = {
    width: "18%",    
    float: 'right', // Hace que la imagen se ubique a la derecha
    marginRight: '10px',              
    };
  return (<>
    {cliente ? <div>


      {cliente.map((client) => (


        <div className="profile">
          <Grid Container>

            <Paper
              sx={{
                cursor: 'pointer',
                background: '#f5f5f5',
                color: '#bdbdbd',
                border: '1px dashed #ccc',
                '&:hover': { border: '1px solid #ccc' },
              }}
            >
              {/* <Grid item xs={8} style={{ justifyContent: "center", display: "flex" }}>
                <Avatar sx={{ width: 170, height: 140 }}>{(client.Nombre).substring(0, 1)}</Avatar>
              </Grid> */}
              <Grid item xs={8} style={{ justifyContent: "center", display: "flex" }}>

                <Container>
                  <Box>
                  <img style={islogo} src={logo} alt="logo" />
                  <Box>
                    <h5>
                      Modificacion de datos personales
                    </h5>

                  </Box>
              
                  <Box>
                    <TextField
                      label="Cuil o nombre de usaurio"
                      id="cuil"
                      name="cuit_cuil"
                      // defaultValue="CUIL"
                      defaultValue={client.cuil_cuit}
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
                      name="nombre"
                      defaultValue={client.nombre}
                      onChange={handleChange}
                      variant="filled"
                      sx={{ margin: "10px" }}
                      InputProps={{
                        readOnly: false,
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
                      name="sueldo"
                      onChange={handleChange}
                      defaultValue={client.sueldo}
                      variant="filled"
                      sx={{ margin: "10px" }}
                      InputProps={{
                        readOnly: !editMode,
                        startAdornment: (
                          <InputAdornment position="start">
                            <HomeWorkIcon />
                          </InputAdornment>
                        )
                      }}
                    />
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
                            onClick={handleDeterminar}

                          >
                            Guardar
                          </Button>
                        </div>
                      )}
                    </columns>
                  </Box>
                 
                
                  </Box>
                </Container>

              </Grid>
            </Paper>
                        <br/> <br/>
                       
                         <br/>
            <Grid item xs={8} style={{ justifyContent: "center", display: "flex" }}>
              <Paper
                sx={{
                  cursor: 'pointer',
                  background: '#fafafa',
                  color: '#bdbdbd',
                  border: '1px dashed #ccc',
                  '&:hover': { border: '1px solid #ccc' },
                }}
              >
                 <h2 style={{textAlign: "center"}}>Modificar contrseña</h2>
                <TextField
                  label="Contraseña anterior"
                  type= "password"
                  name="password"
                  variant="filled"
                  sx={{ margin: "10px" }}
                  onChange={handleChangePass}
                  InputProps={{
                    readOnly: false,
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyIcon />
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  label="Nueva Contraseña"
                  id="email"
                  type= "password"
                  name="newpass"
                  variant="filled"
                  sx={{ margin: "10px" }}
                  onChange={handleChangePass}
                  InputProps={{
                    readOnly: false,
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyIcon />
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                 
                  label="Repetir conraseña"
                  type= "password"
                  id="email"
                  name="rnewpass"
                  variant="filled"
                  sx={{ margin: "10px" }}
                  onChange={handleChangePass}
                 
                  InputProps={{
                    readOnly: false,
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyIcon />
                      </InputAdornment>
                    )
                  }}
                />

              
              {pass.newpass ===pass.rnewpass ? <><Button onClick={handleDeterminarPass} variant="contained">Cambiar</Button>  </>:<><Button  variant="contained">Cambiar</Button> <p style={{ color: 'crimson' }} >Contraseña nueva no coincide </p></>}

              </Paper>
              
            </Grid>

          </Grid>
        </div>
      ))}</div> : <div><Cargando /></div>}
      
      <br/> <br/> <br/>  <br/> <br/> <br/>  <br/> <br/> <br/>
      </>
      
      
      
      );


}

export default ModificacionC;