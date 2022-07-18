import Button from '@mui/material/Button';
import { useEffect, useState, Fragment } from "react";
import servicioPagos from '../../../services/pagos'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";


export default function PagarCuota() {
  
    const navigate = useNavigate();
    let params = useParams()
    let id = params.id
    const [user, setUser] = useState(null)
    const [pago, setPagos] = useState({
   
        /////////asignar lote 0 caso que no se seleccione
    })

    

    

    const designar = async (event) => {
        event.preventDefault()
       
       
     await servicioPagos.pagarnivel2(pago)
        


    }


    useEffect(() => {

        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setPagos({ cuil_cuit: user.cuil_cuit,
             id : params.id})
   
    
    
        }
    
      }, [])
    



    const handleChange = (e) => {
        console.log(e.target.value)
        setPagos({ ...pago, [e.target.name]: e.target.value })
    }
    return (

        <Fragment>
            <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined">

                    <form onSubmit={designar}>
                          <InputLabel  variant="standard" htmlFor="uncontrolled-native">
                          Tipo de Pago
                        </InputLabel>
                        <NativeSelect
                            defaultValue={30}
                            onChange={handleChange}
                            inputProps={{
                                name: 'tipo',
                                id: 'uncontrolled-native',
                               
                            }}
                        >   <option  value={'IC3'}>Elegir</option>
                            <option   value={'Transferencia'}>Transferencia</option>
                            <option  value={'IC3'}>IC3</option>
                         
                        </NativeSelect> 
                       
                        <InputLabel  variant="standard" htmlFor="uncontrolled-native">
                           Tipo de venta 
                        </InputLabel>
                        <NativeSelect
                            defaultValue={30}
                            onChange={handleChange}
                            inputProps={{
                                name: 'estado',
                                id: 'uncontrolled-native',
                               
                            }}
                        >   <option  value={'IC3'}>Elegir</option>
                            <option   value={'Reservado'}>Reserva</option>
                            <option  value={'Vendido'}>Venta</option>
   
   
                         
                        </NativeSelect> 
                        
                        <TextField
                         /* style ={{width: '25%'}} */
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Monto"
                            name="monto"
                            onChange={handleChange}
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Lote"
                            name="lote"
                            onChange={handleChange}
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Parcela"
                            name="parcela"
                            onChange={handleChange}
                            fullWidth
                            variant="standard"
                        />
                      
                      


                        <Button type="submit">Enviar</Button>

                    </form>

                </Card>
            </Box>

            {/*  {
                                lotes.map((item, index) =>
                                    //   item['']
                                    <div>
                                        <MenuItem value={10}>{item['zona']}  </MenuItem>
                                    </div>
                                )} */}






        </Fragment>
    );
}