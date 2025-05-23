import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import servicioAprobacionesPagos from '../../../services/pagos'
import serviciousuario1 from '../../../services/usuario1'
import { useNavigate } from "react-router-dom";
import VerConstancias from './VerConstancias'
import Inconscistencia from './Inconscistencia'
import CargaDeTabla from "../../CargaDeTabla"
import BotonRechazo from './RechazoPago'
import BotonAprobacion from './AprobacionPago'
import Tooltip from '@material-ui/core/Tooltip';
//import overbookingData from "./overbooking";
import Button from "@mui/material/Button";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const TablaAprobaciones = () => {
    //configuracion de Hooks
    const [pendientes, setPendientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const id = open ? 'simple-popover' : undefined;



    const getPendientes = async () => {

        const pendientes = await servicioAprobacionesPagos.aprobaciones({

        })
        setPendientes(pendientes)
        setLoading(false);
    }

    const aprobar = async (id) => {

        await servicioAprobacionesPagos.aprobarpago(id)
        window.location.reload(true)
    }

    useEffect(() => {
        getPendientes()
    }, [])


    //// Descarga
    async function download(index, rowIndex, data) {
        const filename = (pendientes[index].ubicacion)


        const link = await serviciousuario1.obtenerurl(filename)
        console.log(link)
        console.log(link.data)
        window.open(link.data)

    }

    function verFile(index, rowIndex, data) {

        /* const filename = (products[index].key)
        console.log(filename)
        const link = await axios.get(`http://localhost:4000/usuario1/get-object-url/` + filename)
        console.log(link.data)
        setAct(true) */
        return (
            <>

                <Button
                    onClick={() => veronline(index)}
                >Ver online</Button>


            </>
        );
    }


    async function veronline(index, rowIndex, data) {
        const filename = (pendientes[index].ubicacion)


        const link = await serviciousuario1.obtenerurl(filename)
        console.log(link.data)
        var nueva_ventana = window.open('', '_blank');
        nueva_ventana.document.write('<html><head><title>Imagen de AWS</title></head><body style="text-align:center;"><img src="' + link.data + '" /></body></html>');
    }
    function downloadFile(dataIndex, rowIndex, data) {

        /* const filename = (products[index].key)
        console.log(filename)
        const link = await axios.get(`http://localhost:4000/usuario1/get-object-url/` + filename)
        console.log(link.data)
        setAct(true) */
        return (
            <>
                <  VerConstancias
                    id={pendientes[dataIndex].id} />



            </>
        );
    }
    function CutomButtonsRendererr(dataIndex, rowIndex, data, onClick) {

        return (
            <>
                <p> ${pendientes[dataIndex].monto}  </p>


            </>
        );
    }
    ///inconsistencia
    function Inconsistencia(dataIndex, rowIndex, data, onClick) {

        return (
            <>
                <Inconscistencia
                    monto_distinto={pendientes[dataIndex].monto_distinto}
                    cuil_cuit_distinto={pendientes[dataIndex].cuil_cuit_distinto}
                    monto_inusual={pendientes[dataIndex].monto_inusual}
                    id={pendientes[dataIndex].id}
                    yarealizado={pendientes[dataIndex].yarealizado}
                />


            </>
        );
    }
    function fechacuota(dataIndex, rowIndex, data, onClick) {

        return (
            <>
            {pendientes[dataIndex].mes}/ {pendientes[dataIndex].anio}


            </>
        );
    }    ///Descarga
    function cuilCuit_nav(dataIndex, rowIndex, data, onClick) {

        return (
            <>
           
            
            <Tooltip title="Ver detalle"arrow>
      
      <p  onClick={() => navigate("/usuario2/detallecliente/"+pendientes[dataIndex].cuil_cuit)}  >{ pendientes[dataIndex].cuil_cuit } </p>
      
      </Tooltip>
            </>
        );
    } 
    
    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {

        return (
            <>

                <BotonRechazo
                    id={pendientes[dataIndex].id}

                />

                <Tooltip title="Aprobar" arrow>
                    <BotonAprobacion
                        id={pendientes[dataIndex].id}
                        monto={pendientes[dataIndex].monto}
                    />
                </Tooltip>
            </>
        );
    }
    // definimos las columnas
    const columns = [



        
    
        {
            name: "Fecha cuota",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                    fechacuota(
                        dataIndex,
                        rowIndex,
                        // overbookingData,
                        // handleEditOpen
                    )
            }

        },
        {
            name: "fecha",
            label: "Fecha pago",

        },
        {
            name: "Cuil_cuit",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                    cuilCuit_nav(
                        dataIndex,
                        rowIndex,
                        // overbookingData,
                        // handleEditOpen
                    )
            }

        },
       

        {
            name: "descripcion",
            label: "Estado",
        },


        {
            name: "monto_inusual",
            label: "Monto Inusual",
        },
        {
            name: "Inconsistencia",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                    Inconsistencia(
                        dataIndex,
                        rowIndex,
                        // overbookingData,
                        // handleEditOpen
                    )
            }

        },
        {
            name: "Monto",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                    CutomButtonsRendererr(
                        dataIndex,
                        rowIndex,
                        // overbookingData,
                        // handleEditOpen
                    )
            }

        },
        {
            name: "Ver online",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                verFile(
                        dataIndex,
                        rowIndex,
                        // overbookingData,
                        // handleEditOpen
                    )
            }

        },
        {
            name: "Ver Constancias",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) =>
                    downloadFile(
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
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 15],
        downloadOptions: { filename: 'tableDownload.csv', separator: ',' },
        print: true,
        filter: true,
        viewColumns: true,
        pagination: true,

        textLabels: {
          body: {
            noMatch: "No se encontraron registros de pagos pendientes de aprobacion",
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
        <div>
            <>
                <Stack spacing={2} sx={{ width: '100%' }}>

                    <Alert severity="info">Cantidad pendientes: {pendientes.length}</Alert>
                </Stack>
            </>

            {loading ? <CargaDeTabla /> : <>
                <MUIDataTable
                    title={"Lista de aprobaciones pendientes"}
                    data={pendientes}
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
            </>}
        </div>
    )
}

export default TablaAprobaciones;