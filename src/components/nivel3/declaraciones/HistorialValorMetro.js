import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

import servicionivel3 from '../../../services/nivel3'


//import overbookingData from "./overbooking";

const Historial = () => {
    //configuracion de Hooks
    const [historial, setHistorial] = useState([]);
    const navigate = useNavigate();


    
const traer = async() => {
      
    const historial = await servicionivel3.traerhistorialvalor()
   
    setHistorial(historial)
  // 
    
    };  
    

    useEffect(() => {
        traer()
    }, [])
    ///



 
    // definimos las columnas
    const columns = [
        {
            name: "fecha",
            label: "Fecha",

        },
        {
            name: "valormetroparque",
            label: "Zona",

        },
        {
            name: "valormetrocuadrado",
            label: "Valor Metro Cuadrado",
        },
       
       
        
       
 

    ];

const options = {

    /*    rowsPerPage: 10,
       download: false, // hide csv download option
       onTableInit: this.handleTableInit,
       onTableChange: this.handleTableChange, */
};
// renderiza la data table
return (<>

        <MUIDataTable
        
            title={"Historial de ICC"}
            data={historial}
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
        </>
  
)
}

export default Historial;