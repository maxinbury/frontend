import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import servicioClientes from '../../../services/clientes'
import serviciousuario1 from '../../../services/usuario1'
import servicioaprobaciones from '../../../services/Aprobaciones'
import { useNavigate } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import CheckIcon from '@mui/icons-material/Check';
import BotonRechazo from './Rechazocbu'
import CargaDeTabla from "../../CargaDeTabla"
//import overbookingData from "./overbooking";
import Tooltip from '@mui/material/Tooltip';
import Button from "@mui/material/Button"
//import ModalVer from "./Modal"



const TablaAprobaciones = () => {
    //configuracion de Hooks
    const [pendientes, setPendientes] = useState([]);
    const [act, setAct] = useState(false)
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();




    const getPendientes = async () => {

        const pendientes = await servicioClientes.listacbupendientes({

        })
        setPendientes(pendientes)
        setLoading(false);
    }

    const aprobar = async (id) => {
        console.log(id)
        await servicioaprobaciones.aprobacioncbu(id)
        getPendientes()
    }

    useEffect(() => {
        getPendientes()
    }, [])

    ///

    async function download(index, rowIndex, data) {
        const filename = (pendientes[index].ubicacion)


        const link = await serviciousuario1.obtenerurl(filename)

        console.log(link.data)
        window.open(link.data)


    }
    async function veronline(index, rowIndex, data) {
        const filename = (pendientes[index].ubicacion)


        const link = await serviciousuario1.obtenerurlonline(filename)
        console.log(link.data)
        window.open(link.data)
        
       // var nueva_ventana = window.open('', '_blank');
       // nueva_ventana.document.write('<html><head><title>Imagen de AWS</title></head><body style="text-align:center;"><img src="' + link.data + '" /></body></html>');
    }


    function downloadFile(index, rowIndex, data) {

        /* const filename = (products[index].key)
        console.log(filename)
        const link = await axios.get(`http://localhost:4000/usuario1/get-object-url/` + filename)
        console.log(link.data)
        setAct(true) */
        return (
            <>

                <Button
                    onClick={() => download(index)}
                >Descargar</Button>


            </>
        );
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

    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {

        return (
            <>

                <BotonRechazo
                    id={pendientes[dataIndex].id}
                />
                   <Tooltip title="Aprobar">
                <CheckIcon style={{ cursor: "pointer" }}
                    onClick={() => {
                        aprobar(pendientes[dataIndex].id)
                    }}
                />
                </Tooltip>
            </>
        )
    }
    // definimos las columnas
    const columns = [
        {
            name: "numero",
            label: "CBU",

        },
        {
            name: "cuil_cuit",
            label: "Cuil/cuit Cliente",
        },
        {
            name: "cuil_cuit_lazo",
            label: "Cuil/cuit titular CBU",
        },
        {
            name: "ubicacion",
            label: "Descripcion",

        },
        {
            name: "estado",
            label: "Estado",
            actions: { onClick: (event, rowData) => alert(rowData) }
        },
        {
            name: "Descarga",
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
            name: "ve online",
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
                noMatch: "No se encontraron registros",
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

            {loading ? <CargaDeTabla /> : <>

                <MUIDataTable
                    title={"Lista de aprobaciones de CBU"}
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
