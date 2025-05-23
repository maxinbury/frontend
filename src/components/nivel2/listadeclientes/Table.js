import { useState, useEffect } from "react";
import servicioClientes from '../../../services/clientes'
import MUIDataTable from "mui-datatables";
import Nuevo from './ClienteNuevo'
import CargaDeTabla from "../../CargaDeTabla"
import { useNavigate } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from '@mui/icons-material/Search';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
//import overbookingData from "./overbooking";
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
const Lotes = () => {
    //configuracion de Hooks
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


        useEffect(() => {
        getClients()
    }, [])

    const getClients = async () => {
        
        const clients = await servicioClientes.lista({}) //////  api/links/infocantidad
        setClients(clients)
        setLoading(false);
    }



    ///
//opcionde click en el nombre
    function CutomButtonsRenderere(dataIndex, rowIndex, data, onClick) {
        return (
          <>
          
       {clients[dataIndex].zona =='IC3' ? <>
        <p  onClick={() =>  navigate('/usuario2/detalleclic3/'+clients[dataIndex].cuil_cuit)} style={{ marginRight: "10px", cursor: "pointer" }}>{clients[dataIndex].Nombre}</p>

       </>:<>
       <p  onClick={() =>  navigate('/usuario2/detallecliente/'+clients[dataIndex].cuil_cuit)} style={{ marginRight: "10px", cursor: "pointer" }}>{clients[dataIndex].Nombre}</p>

       </>}
          
          </>
        );
      }
      //

      function CutomButtonsRendercuil(dataIndex, rowIndex, data, onClick) {
        return (
          <>
          
       
          {clients[dataIndex].zona =='IC3' ? <>
        <p  onClick={() =>  navigate('/usuario2/detalleclic3/'+clients[dataIndex].cuil_cuit)} style={{ marginRight: "10px", cursor: "pointer" }}>{clients[dataIndex].cuil_cuit}</p>

       </>:<>
       <p  onClick={() =>  navigate('/usuario2/detallecliente/'+clients[dataIndex].cuil_cuit)} style={{ marginRight: "10px", cursor: "pointer" }}>{clients[dataIndex].cuil_cuit}</p>

       </>}          
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

      function CustomProgressRenderer(dataIndex, rowIndex) {
        const value = clients[dataIndex]?.porcentaje || 0; // Suponemos que 'observaciones' es el campo con el porcentaje
        return (
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <LinearProgress
              variant="determinate"
              value={value}
              style={{ width: "100%", marginRight: 8 }}
            />
            <span>{`${value}%`}</span>
          </Box>
        );
      }
    // definimos las columnas de la tabla mui de clientes
    const columns = [
      {
        name: "porcentaje",
        label:"Riesgo",
       
    },
 /*      {
        name: "observaciones",
        label: "Riesgo",
        options: {
          customBodyRenderLite: (dataIndex) => {
            const value = clients[dataIndex]?.porcentaje || 0;
            let color = "gray";
            let emoji = "⚪"; // Sin completar
      
            if (value > 0 && value <= 58) {
              color = "green";
              emoji = "🟢";
            } else if (value > 59 && value <= 70) {
              color = "orange";
              emoji = "🟡";
            } else if (value > 70) {
              color = "red";
              emoji = "🔴";
            }
      
            return (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <span>{emoji}</span>
                <span>{`${value}%`}</span>
              </Box>
            );
          },
          sortCompare: (order) => (a, b) => (a - b) * (order === "asc" ? 1 : -1),
        },
      }, */
      
       
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
        {name: "observaciones",
        label: "Riesgo",
        options: {
          customBodyRenderLite: (dataIndex) => {
            const value = clients[dataIndex]?.porcentaje || 0;
            let color = "gray";
            let emoji = "⚪"; // Sin completar
      
            if (value > 0 && value <= 58) {
              color = "green";
              emoji = "🟢";
            } else if (value > 59 && value <= 70) {
              color = "orange";
              emoji = "🟡";
            } else if (value > 70) {
              color = "red";
              emoji = "🔴";
            }
      
            return (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <span>{emoji}</span>
                <span>{`${value}%`}</span>
              </Box>
            );
          },
          sortCompare: (order) => (a, b) => (a - b) * (order === "asc" ? 1 : -1),
        },
      },
    
        {
            name: "razon",
            label:"razon",
           
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
      sortOrder: {
        name: "porcentaje",
        direction: "desc"
      },
    
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
    {loading ? (<CargaDeTabla/>) 
        :(
    <div>
            <Stack spacing={2} sx={{ width: '100%' }}>
 
 <Alert severity="info">Cantidad de clientes: {clients.length}</Alert>
    </Stack>
    <br/>
{/* componente de cliente nuevo, envio de funcion para actualizar de inmediato */}
    <Nuevo  
    getClients =  { async () => {
        const clients = await servicioClientes.lista({
        })
        setClients(clients)
    }}
    />



        <MUIDataTable
        
            title={"Lista de Clientes"}
            data={clients}
            columns={columns}
            actions={[
                {
                    icon: 'save',
                    tooltip: 'Save User',
                    onClick: (event, rowData) => alert("You saved " + rowData.name)
                }
            ]}
            options={options}


        />
    </div>
    )}
    </>


)
}

export default Lotes;