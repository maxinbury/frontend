import { useParams } from "react-router-dom"
import servicioLotes from '../../services/lotes'
import servicioCuotas from '../../services/cuotas'
import servicioAdmin from '../../services/Administracion'
import AgregarIcc from '../nivel2/Icc_cuota/AgregarICCCuota'
import AgregaraCuotas from '../nivel2/Asignarcuotasalote'
import BorrarCuotas from '../nivel2/borrarcuotas/BorrarCuotas'
import ModalModificarvalortotal from '../Modalmodificarmontotoal'
import DesasignarLote from './Modaldesasignarlote'
import FormControlLabel from '@mui/material/FormControlLabel';
import React, { useEffect, useState, Fragment } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import MUIDataTable from "mui-datatables";
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Skeleton from '@mui/material/Skeleton';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Verpagos from './Modalverpagos';
import ModalPagar from'./ModalPagar'
import ModalPagar2 from'./PagarUnLote'
import ModalBorrarPago from'./borrarpago'
import { Box } from "@material-ui/core";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
//////
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const LotesCliente = (props) => {
    let params = useParams()
    let cuil_cuit = params.cuil_cuit
    const navigate = useNavigate();

    useEffect(() => {

        traer()

    }, [])

    const [lotes, setLotes] = useState([''])
    const [cuotas, setCuotas] = useState([''])
    const [open, setOpen] = React.useState(false);
    const [deudaExigible, setDeudaExigible] = useState([''])
    const [detallePendiente, setDetallePendiente] = useState([''])
    const [idlote, setIdlote] = useState(null)
    const [selectedValue, setSelectedValue] = useState("");
    const [act, setAct] = useState(false)
    const [act2, setAct2] = useState(false)
    const [vista1, setVista1] = useState(false)
    const [state, setState] = React.useState({
        gilad: true,
        jason: false,
        antoine: true,
    });
    const vercuotas = async (index) => {
console.log(index)
        const cuotas = await servicioCuotas.vercuotas4(index)
        setCuotas(cuotas)
        setIdlote(index)
        setAct(true)
        verief(index)
   


    };
    //////////servicioCuotas
    const handleChange2 = () => {
        setAct2(!act2);
    };
    const verief = async (index) => {

        const dde = await servicioCuotas.verief2(index)
        setDeudaExigible(dde[0])
        setDetallePendiente(dde[1])
        setAct2(true)
        setOpen(false)



    };

    const Vista1 = () => {
        setVista1(!vista1);
    };

 

    const traer = async () => {

        const lotes = await servicioLotes.lotesCliente(props.cuil_cuit)
        console.log(lotes)
        setLotes(lotes)




    }
    const borrar = async (id) => {

        const rta = await servicioCuotas.borrarcuota(id)

        alert(rta)

    }


    const traerlink = async (index) => {
        console.log(index)
        const dde = await servicioAdmin.traerlinkcuota(index)

        window.open(dde)


    };


    const traerlink360 = async (index) => {
        console.log(index)
        const dde = await servicioAdmin.traerlink360(index)

        window.open(dde)


    };

    function saldoReal(dataIndex, rowIndex, data, onClick) {
        return (
            <>
                {cuotas[dataIndex].parcialidad === 'Final' ? '$ ' + new Intl.NumberFormat('de-DE').format(cuotas[dataIndex].Saldo_real) : <div> No Calculado </div>}

            </>
        );
    }
    function pago(dataIndex, rowIndex, data, onClick) {
        return (
            <>
                {cuotas[dataIndex].parcialidad === 'Final' ? '$ ' + new Intl.NumberFormat('de-DE').format(cuotas[dataIndex].pago) : <div> No Calculado </div>}

            </>
        );
    }
    function saldoInicial(dataIndex, rowIndex, data, onClick) {
        return (
            <>
                {cuotas[dataIndex].parcialidad === 'Final' ? '$ ' + new Intl.NumberFormat('de-DE').format(cuotas[dataIndex].saldo_inicial) : <div> No Calculado </div>}

            </>
        );
    }
    function cuotaConAjuste(dataIndex, rowIndex, data, onClick) {
        return (
            <>
                {cuotas[dataIndex].parcialidad === 'Final' ? '$ ' + new Intl.NumberFormat('de-DE').format(cuotas[dataIndex].cuota_con_ajuste) : <div> No Calculado </div>}

            </>
        );
    }
    function fecha(dataIndex, rowIndex, data, onClick) {
        return (
            <>
                {cuotas[dataIndex].mes + '/' + cuotas[dataIndex].anio}

            </>
        );
    }
    function diferencia(dataIndex, rowIndex, data, onClick) {
        return (
            <>
                {(cuotas[dataIndex].diferencia >= 0) ? <> <p style={{ color: 'green' }} > {new Intl.NumberFormat('de-DE').format(cuotas[dataIndex].diferencia)} </p> </> : <><p style={{ color: 'red' }} > {new Intl.NumberFormat('de-DE').format(cuotas[dataIndex].diferencia)}</p></>}


            </>
        );
    }



    function PagomercadoP(dataIndex, rowIndex, data, onClick) {
        return (
            <>
                <Button onClick={() => traerlink(cuotas[dataIndex].id)} >

                    Pagar mercado Pago
                </Button>




            </>
        );
    }
    function Pago360(dataIndex, rowIndex, data, onClick) {
        return (
            <>
                <Button onClick={() => traerlink360(cuotas[dataIndex].id)} >

                    Pagar mercado Pago
                </Button>




            </>
        );
    }

    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
            <>

{cuotas[dataIndex].pago > 0 ? <> <><Verpagos
                                                                        id_cuota={cuotas[dataIndex].id} /> </>
                                                                     <ModalBorrarPago
                                                                         id_cuota={cuotas[dataIndex].id} 
                                                                       />
                                                                        </> : <><ModalPagar
                                                                           cuil_cuit={cuil_cuit}
                                                                id={cuotas[dataIndex].id}
                                                                id_lote={cuotas[dataIndex].id_lote}
                                                                
                                                                vercuotas = {async (index) => {

                                                                    const cuotas = await servicioCuotas.vercuotas4(index)
                                                                    setCuotas(cuotas)
                                                                    setIdlote(index)
                                                                    setAct(true)
                                                         
                                                                    
                                                            
                                                                }}/></>}
                                                                


            </>
        );
    }

    const columns = [

        {
            name: "Fecha",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                    fecha(
                        dataIndex,
                        rowIndex,
                        // overbookingData,
                        // handleEditOpen
                    )
            }

        },

        {
            name: "Saldo Inicial",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                    saldoInicial(
                        dataIndex,
                        rowIndex,
                        // overbookingData,
                        // handleEditOpen
                    )
            }

        },
        {
            name: "Amortizacion",
            label: "Amortizacion",

        },
     
        {
            name: "Cuota con ajuste",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                    cuotaConAjuste(
                        dataIndex,
                        rowIndex,
                        // overbookingData,
                        // handleEditOpen
                    )
            }

        },
      
        {
            name: "Pago",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                    pago(
                        dataIndex,
                        rowIndex,
                        // overbookingData,
                        // handleEditOpen
                    )
            }

        },

        {
            name: "Saldo Real",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                    saldoReal(
                        dataIndex,
                        rowIndex,
                        // overbookingData,
                        // handleEditOpen
                    )
            }

        },




        {
            name: "Acciones",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                    CutomButtonsRenderer(
                        dataIndex,
                        rowIndex,
                        // overbookingData,
                        // handleEditOpen
                    )
            }

        },

     


    ];

    const handleChangeratio = (event) => {
        setSelectedValue(event.target.value);
    };
    return (

        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/legales/asignarloteausuario/' + cuil_cuit)}
                    >
                        Asignar lote a usuario
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/legales/agregarviarias/' + cuil_cuit)}
                    >
                        Agregar cuotas a varios lotes
                    </Button>
                </Grid>
            </Grid>
            <br />
            <div>
                <FormLabel id="demo-row-radio-buttons-group-label">Lote</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={selectedValue}
                    onChange={handleChangeratio}
                >
                    {lotes ? <>
                    {lotes.map((item, index) => (
                        <FormControlLabel
                            key={index}
                            value={`Fraccion: ${item.fraccion} -  Manzana: ${item.manzana}- Parcela: ${item.parcela}`} // Utilizamos una combinación única para el valor
                            control={<Radio />}
                            label={"Fraccion: " + item.fraccion + " Manzana: " + item.manzana + " Parcela: " + item.parcela}
                            onClick={() => vercuotas(item.id)}
                        />
                    ))}</>:<></>}
                </RadioGroup>
                {act ? <>
                <b style={{ color: 'green' }}  >Valor seleccionado: {selectedValue}</b>
                <ModalPagar2 
                cuil_cuit={cuil_cuit}
                id={idlote}
                vercuotas= {async (index) => {

                    const cuotass = await servicioCuotas.vercuotas(index)
                    setCuotas(cuotass)
                    setIdlote(cuotas[0]['id_lote'])
                    setAct(true)
                    verief(index)
                    setOpen(false)
            
                }}
                
                />
                 <Button variant="contained" onClick={() => { navigate('/legales/agregarcuotas/' + idlote) }} >
                            Agregar cuotas al lote
                        </Button>
                        </>:<></> }
            </div>









            <div>

                {act ?

                    <div><ButtonGroup variant="contained" aria-label="outlined primary button group">
                              {cuotas !== '' ? <></>:<>
                        <Button variant="contained" onClick={() => { navigate('/legales/agregarcuotas/' + idlote) }} >
                            Agregar cuotas al lote
                        </Button></>}
            {/*             <ModalModificarvalortotal
                            idlote={idlote}
                        />
                        <AgregaraCuotas
                            id_origen={idlote}
                        /> */}
    {cuotas !== '' ? <>
                        <BorrarCuotas
                            id={idlote} /></>:<></>}
                        <DesasignarLote
                            id={idlote}
                        />
                    </ButtonGroup>
                        {act2 ?

                            <div>





                                {cuotas !== '' ? <>

                                    <div>
                                        
                                    </div>


                                </> : <></>}
                            </div>
                            : <div></div>}






                        {cuotas !== '' ? <>

                            <Stack spacing={2} direction="row">
                                <Fab variant="extended" onClick={() => { Vista1() }}><RemoveRedEyeIcon sx={{ mr: 1 }} /> Cambiar vista

                                </Fab>
                                {/*  <Button  key= {index} variant="contained"onClick={()=>{agregar(item['id'])}}> Agregar Cuotas</Button> */}

                                <br />

                                {/* <Button key={index} variant="contained" onClick={() => { verief(item['id']) }}> Estado financiero </Button> */}





                            </Stack>


                            {vista1 ? <>
                                <MUIDataTable
                                    title={"Lista de cuotas"}
                                    data={cuotas}
                                    columns={columns}
                                    actions={[
                                        {
                                            icon: 'save',
                                            tooltip: 'Save User',
                                            onClick: (event, rowData) => alert("You saved " + rowData.name)
                                        }
                                    ]}
                                />


                            </> : <>

                                <>
                                <Box
                                        sx={{
                                            display: 'flex'
                                        }}
                                    >
                                        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                                            <Paper
                                                sx={{
                                                    cursor: 'pointer',
                                                    background: '#eeeeee',
                                                    color: '#bdbdbd',
                                                    border: '1px dashed #ccc',
                                                    width: "40%",
                                                    '&:hover': { border: '1px solid #ccc' },
                                                    border: "1px solid black",
                                                    margin: '75px',
                                                    display: 'flex'

                                                }}
                                            >

                                                <TableContainer >
                                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Detalles de Deuda Exigible </TableCell>


                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {deudaExigible.map((row) => (
                                                                <TableRow
                                                                    key={row.name}
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                >

                                                                    <TableCell align="left">{row.datoa}</TableCell>
                                                                    <TableCell align="left">{new Intl.NumberFormat('de-DE').format(row.datob)}</TableCell>

                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Paper>


                                            <Paper
                                                sx={{
                                                    cursor: 'pointer',
                                                    background: '#eeeeee',
                                                    color: '#bdbdbd',
                                                    border: '1px dashed #ccc',
                                                    width: "40%",
                                                    '&:hover': { border: '1px solid #ccc' },
                                                    border: "1px solid black",
                                                    margin: '75px',
                                                    display: 'flex'

                                                }}
                                            >

                                                <TableContainer >
                                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Detalle de Cuotas Pendientes </TableCell>


                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {detallePendiente.map((row) => (
                                                                <TableRow
                                                                    key={row.name}
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                >

                                                                    <TableCell align="left">{row.datoa}</TableCell>
                                                                    <TableCell align="left">{new Intl.NumberFormat('de-DE').format(row.datob)}</TableCell>

                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Paper>

                                           {/*  <Fab sx={{ margin: '75px', }} variant="extended" onClick={() => { handleChange2() }}  ><VisibilityOffIcon sx={{ mr: 1 }} /> Ocultar IEF</Fab> */}
                                        </Grid>
                                    </Box>
                                    <Paper
                                        sx={{
                                            cursor: 'pointer',
                                            background: '#eeeeee',
                                            color: '#bdbdbd',
                                            border: '1px dashed #ccc',
                                            width: "90%",
                                            '&:hover': { border: '1px solid #ccc' },
                                            border: "1px solid black",
                                            margin: '75px',

                                        }}
                                    >

                                        <TableContainer>
                                            {!cuotas ? <Skeleton /> : <>
                                                <h1>CUOTAS</h1>
                                                <Table >
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell style={{ backgroundColor: "black", color: 'white' }} ><b>FECHA</b> <b /></TableCell>
                                                            <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>NRO CUOTA</b></TableCell>
                                                            <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>SALDO INICIAL</b></TableCell>
                                                            <TableCell style={{ backgroundColor: "black", color: 'white' }}><b>AMORTIZACION</b></TableCell>

                                                            <TableCell style={{ backgroundColor: "black", color: 'white' }} ><b>PAGO</b></TableCell>
                                                            <TableCell style={{ backgroundColor: "black", color: 'white' }} ><b>SALDO REAL</b></TableCell>
                                                            <TableCell style={{ backgroundColor: "black", color: 'white' }} ><b>PAGADO</b></TableCell>
                                                            <TableCell style={{ backgroundColor: "black", color: 'white' }} ><b>PAGAR/VER PAGO</b></TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>


                                                
                                                        {cuotas.map((row) => (
                                                            <StyledTableRow key={row.name}>
                                                                <StyledTableCell component="th" scope="row">{row.mes < 10 ? <>0{row.mes}</> : <>{props.mes}</>}/{row.anio} </StyledTableCell>
                                                                <StyledTableCell component="th" scope="row">{row.nro_cuota} </StyledTableCell>
                                                                <StyledTableCell component="th" scope="row">$ <b>{new Intl.NumberFormat('de-DE').format(row.saldo_inicial)}</b> </StyledTableCell>
                                                                <StyledTableCell component="th" scope="row">$ <b>{new Intl.NumberFormat('de-DE').format(row.Amortizacion)} </b></StyledTableCell>

                                                                <StyledTableCell component="th" scope="row">$  <b>{new Intl.NumberFormat('de-DE').format(row.pago)}</b> </StyledTableCell>
                                                                <StyledTableCell component="th" scope="row">$ <b>{new Intl.NumberFormat('de-DE').format(row.Saldo_real)} </b></StyledTableCell>

                                                                <StyledTableCell component="th" scope="row">  {row.pago > 0 ? <> <p style={{ color: 'green' }}>Si </p></> : <><p style={{ color: 'crimson' }}>No </p></>} </StyledTableCell>
                                                                <StyledTableCell component="th" scope="row" align="left">
                                                                {row.pago > 0 ? <> <><Verpagos
                                                                        id_cuota={row.id} /> </>
                                                                     <ModalBorrarPago
                                                                         id_cuota={row.id} 
                                                                       />
                                                                        </> : <><ModalPagar
                                                                           cuil_cuit={cuil_cuit}
                                                                id={row.id}
                                                                id_lote={row.id_lote}
                                                                
                                                                vercuotas = {async (index) => {

                                                                    const cuotas = await servicioCuotas.vercuotas4(index)
                                                                    setCuotas(cuotas)
                                                                    setIdlote(index)
                                                                    setAct(true)
                                                         
                                                                    
                                                            
                                                                }}/></>}
                                                                
                                                                   

                                                                   




                                                                </StyledTableCell>
                                                            </StyledTableRow>
                                                        ))}




                                                    </TableBody>
                                                </Table>
                                            </>}

                                        </TableContainer>
                                    </Paper>


                                </>

                            </>}
                        </> : <> Lote sin cuotas</>}


                    </div> : <div> Seleccione un Lote </div>}



            </div>

            <br /><br /><br /><br />






        </Fragment>

    )


}
export default LotesCliente
