import * as React from 'react';
import { useParams } from "react-router-dom"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {  useState } from "react";
import servicioLotes from '../../../services/lotes'
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { Paper } from '@mui/material';


export default function ClienteNuevo(props) {
  let params = useParams()
    let cuil_cuit = params.cuil_cuit
   
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = useState({zona:"Legales",tipo_dni:"DNI"})
  const [manzanas, setManzanas] = useState([])
  const handleChange = (e) =>{
    setForm({  ...form, [e.target.name]: e.target.value }) 
 }

  const handleClickOpen = () => {
    traer()
    setOpen(true);
  };
  
 const traer = async () => {
   
   
  const turnos = await servicioLotes.traermanzanas()
  console.log(turnos)
  setManzanas(turnos)

 

 }

 

  const handleDeterminar = async (event) => {
    event.preventDefault();
    try {

      const respuestas =await servicioLotes.nuevolote(form)
    alert(respuestas)
     
     } catch (error) {
       console.error(error);
       console.log('Error algo sucedio')
   
     
     }
     props.getClients()

    setOpen(false);
  };
  
  const handleClose = () => {
    setOpen(false);
   
  };

  return (
    <div>


      <Button variant="outlined" color='success' onClick={handleClickOpen}>
       Cargar un nuevo lote <AddToPhotosIcon/>
     
      </Button>
      <Dialog open={open} onClose={handleClose}>
     
        <DialogTitle>New Lote </DialogTitle>
        <Paper
        sx={{
          cursor: 'pointer',
          background: '#fafafa',
          color: '#bdbdbd',
          border: '1px dashed #ccc',
          '&:hover': { border: '1px solid #ccc' },
        }}
      >
        <DialogContent>
          <DialogContentText>
        Datos del Nuevo Lote
          </DialogContentText>
          <form  onSubmit={handleDeterminar}> 

      {/*     <InputLabel  variant="standard" htmlFor="uncontrolled-native">
                          Fraccion
                        </InputLabel>
                        <NativeSelect
                            defaultValue={30}
                            onChange={handleChange}
                            inputProps={{
                                name: 'fraccion',
                                id: 'uncontrolled-native',
                               
                            }}
                        >   <option  value={'IC3'}>Elegir</option>
                           <option   value={'ID/4'}>ID/4</option>
                            <option   value={'ID/5'}>ID/5</option>
                            <option  value={'ID/6'}>ID/6</option>
                         
                        </NativeSelect>  */}

      
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Manzana
                            </InputLabel>
                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'manzana',
                                    id: 'uncontrolled-native',

                                }}
                            
                            >  
                             <option value={'1'}> Elegir</option>
                 
                    
                 
                    {manzanas.map((row) => (
                                       
                              <option value={row.id}> {row.manzana}</option>

                    ))}
                
               
                    </NativeSelect>
                  
                        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="parcela"
            name="parcela"
            onChange={handleChange}
            fullWidth
            variant="standard"
            maxRows="13"
          />

                                        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="adrema"
            name="adrema"
            onChange={handleChange}
            fullWidth
            variant="standard"
            maxRows="13"
          />             
             <b>Podemos agregar datos como superficie, localizacion, etc</b> 
          <DialogActions>
          {form.manzana && form.parcela ? <><Button variant="contained" color="primary"  type="submit">Crear</Button></> : <><h6  style={{color: "red"}} >Completar todos los campos</h6></> } 
          <Button  variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
         
        </DialogActions>
           </form>
         

        </DialogContent>
      
        </Paper>
        
      </Dialog>
      
    </div>
  );
}
