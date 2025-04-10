import { useState, useEffect } from "react";
import servicioCuotas from '../../../services/cuotas'
import CancelarLote from "./cancelarLote";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useNavigate } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from '@mui/icons-material/Search';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { Paper,Button} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';
import Pagorapido from './pagaric3'
//import overbookingData from "./overbooking";
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
const Lotes = (props) => {
    //configuracion de Hooks
    const [clients, setClients] = useState();
    const [loading, setLoading] = useState(true);
    const [cuotas, setCuotas] = useState()
    const [filteredCuotas, setFilteredCuotas] = useState([]);
    const [uniqueClients, setUniqueClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [showCuotas, setShowCuotas] = useState(false);
    const navigate = useNavigate();


        useEffect(() => {
        getClients()
    }, [])
/*     useEffect(() => {
      const interval = setInterval(() => {
        getClients()
      }, 50000); // Consulta cada 50 segundos
  
      return () => clearInterval(interval);
  }, []); */
    const getClients = async () => {
      const response = await servicioCuotas.traercuotasic3(props.cuil_cuit);
      console.log(response)
      setCuotas(response);
      setFilteredCuotas(response);
      const clients = [...new Set(response.map((cuota) => cuota.id_cliente))];
      setUniqueClients(clients);
      setLoading(false);
    };
  
    const handleClientFilter = (id_cliente) => {
      console.log("Filtrando por id_cliente:", id_cliente);
      setShowCuotas(true);
      setSelectedClient(id_cliente);
    
      if (id_cliente === null) {
        setFilteredCuotas(cuotas);
      } else {
        console.log("Cuotas antes del filtro:", cuotas);
        const nuevasCuotas = cuotas.filter((cuota) => cuota.id_cliente === id_cliente);
        console.log("Cuotas después del filtro:", nuevasCuotas);
        setFilteredCuotas(nuevasCuotas);
      }
    };
  

    const handleShowCuotas = () => {
      setShowCuotas(true);
    };
  
    const handleCancelarLote = (id_cliente) => {
      console.log("Cancelar lote para cliente:", id_cliente);
    };

    ///
//opcionde click en el nombre
    function CutomButtonsRenderere(dataIndex, rowIndex, data, onClick) {
        return (
          <>
          
       
           <p  onClick={() =>  navigate('/usuario2/detallecliente/'+clients[dataIndex].cuil_cuit)} style={{ marginRight: "10px", cursor: "pointer" }}>{clients[dataIndex].Nombre}</p>
          
          </>
        );
      }
      //

      function CutomButtonsRendercuil(dataIndex, rowIndex, data, onClick) {
        return (
          <>
          
       
           <p  onClick={() =>  navigate('/usuario2/detallecliente/'+clients[dataIndex].cuil_cuit)} style={{ marginRight: "10px", cursor: "pointer" }}>{clients[dataIndex].cuil_cuit}</p>
          
          </>
        );
      }

    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
          <>
              <Tooltip title="Editar">
            <EditIcon
             onClick={() =>  navigate('/usuario2/modificarcliente/'+clients[dataIndex].cuil_cuit)}
              style={{ marginRight: "10px", cursor: "pointer" }}
            /></Tooltip>
             <Tooltip title="Ver">
             <SearchIcon
             onClick={() =>  navigate('/usuario2/detallecliente/'+clients[dataIndex].cuil_cuit)}
              style={{ marginRight: "10px", cursor: "pointer" }}
            />
           </Tooltip>
          </>
        );
      }


    // definimos las columnas de la tabla mui de clientes
    const columns = [
        {
            name: "id",
            label: "ID",

        },
       
           {
            name: "cuil_cuit",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                  CutomButtonsRendercuil(
                        dataIndex,
                        rowIndex,
                       // overbookingData,
                       // handleEditOpen
                    )
            }
        
        },   
       
         {
            name: "Nombre",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                    CutomButtonsRenderere(
                        dataIndex,
                        rowIndex,
                       // overbookingData,
                       // handleEditOpen
                    )
            }
        
        },   
    
        {
            name: "observaciones",
            label:"Observaciones",
           
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

    const options = {
    
        setTableProps: () => {
            return {
              style: {
                backgroundColor: "#e3f2fd", // Cambia el color de fondo de la tabla
              },
            };
          },
          customHeadRender: (columnMeta, handleToggleColumn) => ({
            TableCell: {
              style: {
                backgroundColor: '#1565c0', // Cambia el color de fondo del encabezado
                color: 'white', // Cambia el color del texto del encabezado
              },
            },
          }),
        selectableRows: false, // Desactivar la selección de filas
        stickyHeader: true,
        selectableRowsHeader: false,
        selectableRowsOnClick: true,
        responsive: 'scroll',
        rowsPerPage: 10,
        rowsPerPageOptions: [5, 10, 15],
        downloadOptions: { filename: 'tableDownload.csv', separator: ',' },
        print: true,
        filter: true,
        viewColumns: true,
        pagination: true,

        textLabels: {
          body: {
            noMatch: "No se encontraron registros de debito automatico",
            toolTip: "Ordenar",
          },
          pagination: {
            next: "Siguiente",
            previous: "Anterior",
            rowsPerPage: "Filas por página:",
            displayRows: "de",
          },
          toolbar: {
            search: "Buscar",
            downloadCsv: "Descargar CSV",
            print: "Imprimir",
            viewColumns: "Ver columnas",
            filterTable: "Filtrar tabla",
          },
          filter: {
            all: "Todos",
            title: "FILTROS",
            reset: "RESETEAR",
          },
          viewColumns: {
            title: "Mostrar columnas",
            titleAria: "Mostrar/ocultar columnas de la tabla",
          },
          selectedRows: {
            text: "fila(s) seleccionada(s)",
            delete: "Eliminar",
            deleteAria: "Eliminar filas seleccionadas",
          },
        },
    
  };
// renderiza la data table
return (
    <>
       <TableContainer component={Paper} style={{ height: '80vh' }}>
      {!cuotas ? (
        <Skeleton />
      ) : (
        <>
          <h1>CUOTAS</h1>
          <div>
        <Button
          variant="contained"
          onClick={() => handleClientFilter(null)}
          style={{ marginRight: '10px', marginBottom: '20px' }}
        >
          Todos
        </Button>
        {uniqueClients.map((id_cliente) => (
          <Button
            key={id_cliente}
            variant="contained"
            onClick={() => handleClientFilter(id_cliente)}
            style={{ marginRight: '10px', marginBottom: '20px' }}
          >
            Cliente {id_cliente}
          </Button>
        ))}
     
      </div>
      {showCuotas ? <>
      <CancelarLote
      id_cliente={selectedClient}
      cuotas={filteredCuotas}/>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
              <TableCell style={{ backgroundColor: "black", color: 'white', width: '7%' }}><b>ID cli</b></TableCell>
                <TableCell style={{ backgroundColor: "black", color: 'white', width: '7%' }}><b>CUOTA</b></TableCell>
                <TableCell style={{ backgroundColor: "black", color: 'white', width: '7%' }}><b>FECHA</b></TableCell>
                <TableCell style={{ backgroundColor: "black", color: 'white', width: '10%' }}><b>SALDO INICIAL</b></TableCell>
                <TableCell style={{ backgroundColor: "black", color: 'white', width: '8%' }}><b> ICC</b></TableCell>
                <TableCell style={{ backgroundColor: "black", color: 'white', width: '8%' }}><b>AJUSTE</b></TableCell>
                <TableCell style={{ backgroundColor: "black", color: 'white', width: '10%' }}><b>CUOTA CON AJUSTE</b></TableCell>
                <TableCell style={{ backgroundColor: "black", color: 'white', width: '10%' }}><b>PAGO</b></TableCell>
                <TableCell style={{ backgroundColor: "black", color: 'white', width: '10%' }}><b>SALDO FINAL</b></TableCell>
                <TableCell style={{ backgroundColor: "black", color: 'white', width: '10%' }}><b>SALDO REAL</b></TableCell>
                <TableCell style={{ backgroundColor: "black", color: 'white', width: '10%' }}><b>DIFERENCIA</b></TableCell>
                <TableCell style={{ backgroundColor: "black", color: 'white', width: '10%' }}><b>PAGAR/VER PAGO</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCuotas.map((row) => (
                <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">{row.id_cliente}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{row.cuota}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{row.mes < 10 ? <>0{row.mes}</> : <>{row.mes}</>}/{row.anio}</StyledTableCell>
                  <StyledTableCell component="th" scope="row"><span style={{ whiteSpace: 'nowrap' }}>$ <b>{new Intl.NumberFormat('de-DE').format(row.saldo_inicial)}</b></span></StyledTableCell>
                  <StyledTableCell component="th" scope="row">{parseFloat(row.ajuste_icc).toFixed(3)}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{row.ajuste}</StyledTableCell>
                  <StyledTableCell component="th" scope="row"><span style={{ whiteSpace: 'nowrap' }}>$ <b>{new Intl.NumberFormat('de-DE').format(row.cuota_con_ajuste)}</b></span></StyledTableCell>
                  <StyledTableCell component="th" scope="row"><span style={{ whiteSpace: 'nowrap' }}>$ <b>{new Intl.NumberFormat('de-DE').format(row.pago)}</b></span></StyledTableCell>
                  <StyledTableCell component="th" scope="row"><span style={{ whiteSpace: 'nowrap' }}>$ <b>{new Intl.NumberFormat('de-DE').format(row.saldo_final)}</b></span></StyledTableCell>
                  <StyledTableCell component="th" scope="row"><span style={{ whiteSpace: 'nowrap' }}>$ <b>{new Intl.NumberFormat('de-DE').format(row.saldo_real)}</b></span></StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.excedente < 0 ?
                      <p style={{ color: 'crimson', whiteSpace: 'nowrap' }}>{new Intl.NumberFormat('de-DE').format(row.excedente)}</p> :
                      <p style={{ color: 'green', whiteSpace: 'nowrap' }}>{new Intl.NumberFormat('de-DE').format(row.excedente)}</p>}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" align="center">
                  <Pagorapido
                      id_cuota={row.id}
                      cuota_con_ajuste={row.cuota_con_ajuste}
                      traer={async () => {
        
                        const clients = await servicioCuotas.traercuotasic3(props.cuil_cuit) //////  api/links/infocantidad
                        setCuotas(clients)
                        setLoading(false);
                        if (selectedClient === null) {
                          setFilteredCuotas(clients);
                        } else {
                          console.log("Cuotas antes del filtro:", clients);
                          const nuevasCuotas = clients.filter((cuota) => cuota.id_cliente === selectedClient);
                          console.log("Cuotas después del filtro:", nuevasCuotas);
                          setFilteredCuotas(nuevasCuotas);
                        }
                    }}
                    /> 
                    <SearchIcon style={{ cursor: "pointer" }}
                      onClick={() => navigate('/usuario2/pagoscuotasic3/' + row.id)}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          </>:<>Seleccionar id del cliente</>}
        </>
      )}
    </TableContainer>
    </>


)
}

export default Lotes;