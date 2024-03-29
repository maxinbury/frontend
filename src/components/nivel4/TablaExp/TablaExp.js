import { useState, useEffect } from "react";
import servicioExp from '../../../services/expedientes'
import MUIDataTable from "mui-datatables";
import CargaDeTabla from "../../CargaDeTabla"
import { useNavigate } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from '@mui/icons-material/Search';
//import overbookingData from "./overbooking";

const TablaExp = () => {
    //configuracion de Hooks
    const [expedientes, setExpedientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
   

    

    const traer = async () => {

        const exp = await servicioExp.listaexp({

        })
        setExpedientes(exp)
        setLoading(false)
    }

    useEffect(() => {
        traer()
    }, [])

    ///



    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
          <>
            <EditIcon
             onClick={() =>  navigate('/legales/detalleexp/'+expedientes[dataIndex].id)}
              style={{ marginRight: "10px", cursor: "pointer" }}
            />
             <SearchIcon
             onClick={() =>  navigate('/legales/detalleexp/'+expedientes[dataIndex].id)}
              style={{ marginRight: "10px", cursor: "pointer" }}
            />
           
          </>
        );
        
      }
    // definimos las columnas
    const columns = [
        {
            name: "Barrio",
            label:"Carpeta",
           
        },
        {
            name: "Expediente",
            label: "Exp",

        },
        {
            name: "Iniciador",
            label: "iniciador",
        },
        {
            name: "Extracto",
            label: "Extracto",

        },
        {
            name: "Cpos",
            label: "Cpos",
           
        },
        {
            name: "Fjs",
            label:"Fjs",
           
        },
        {
            name: "Actions",
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

    /*    rowsPerPage: 10,
       download: false, // hide csv download option
       onTableInit: this.handleTableInit,
       onTableChange: this.handleTableChange, */
};
// renderiza la data table
return (
    <>
    {loading ? (<CargaDeTabla/>)
        :(
    <div>
        <MUIDataTable
        
            title={"Lista de Expedientes"}
            data={expedientes}
            columns={columns}
            actions={[
                {
                    icon: 'save',
                    tooltip: 'Save User',
                    onClick: (event, rowData) => alert("You saved " + rowData.name)
                }
            ]}
          


        />
    </div>
    )}
    </>


)
}

export default TablaExp;