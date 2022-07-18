import servicioNotif from '../../../services/usuario1'
import React, { useEffect, useState, Fragment } from "react";
import { Button } from '@mui/material';
import ModalPago from '../../../components/usuario1/ModalTransferencia'
import servicioUsuario from "../../../services/usuarios"
import MUIDataTable from "mui-datatables";

import { useNavigate } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from '@mui/icons-material/Search';
const TablaNotificaciones = (props) => {
    const [noti, setNoti] = useState([''])
    const [usuario, setUsuario] = useState([''])
    const navigate = useNavigate();
    useEffect(() => {
  
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        if (loggedUserJSON) {
          const usuario = JSON.parse(loggedUserJSON)
          console.log(usuario)
          setUsuario(usuario)
        
          traer()
      
     
        }
     
     
      }, [])


    const traer = async () => {
        try {
            const lotes = await servicioNotif.noticliente(usuario.cuil_cuit)
            console.log(lotes)
        } catch (error) {
            
        }
      
        setNoti(noti)




    }

    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
          <>
            <EditIcon
              onClick={() => onClick(data[dataIndex].id, dataIndex)}
              style={{ marginRight: "10px", cursor: "pointer" }}
            />
            <SearchIcon style={{ cursor: "pointer" }} 
            onClick={() =>  navigate('/usuario2/detallecliente/'+noti[dataIndex].cuil_cuit)  }//Navigate('usuario2/detallecliente'+clients[dataIndex].cuil_cuit)
            />
          </>
        );
      }
    // definimos las columnas
    const columns = [
        {
            name: "id",
            label: "ID",

        },
        {
            name: "cuil_cuit",
            label: "Cuil/cuit",
        },
        {
            name: "Nombre",
            label: "Nombre",

        },
        {
            name: "razon",
            label: "Razon",
           
        },
        {
            name: "observaciones",
            label:"Observaciones",
           
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
    <div>
        <MUIDataTable
        
            title={"Lista de Clientes"}
            data={noti}
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
)
}
export default TablaNotificaciones