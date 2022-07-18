import { useParams } from "react-router-dom"
import servicioLotes from '../services/lotes'
import servicioCuotas from '../services/cuotas'
import React, { useEffect, useState, Fragment } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import MUIDataTable from "mui-datatables";
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";


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
    const [estadoCuotas, setestadoCuotas] = useState({
        anticipo: "",
        monto: "",
        cantidad_cuotas: "",


    })



    const vercuotas = async (index) => {
        console.log('ver cuotas')
        const cuotas = await servicioCuotas.vercuotas(index)
        if (cuotas !== '') { setCuotas(cuotas) }

    };
    //////////servicioCuotas





    const traer = async () => {

        const lotes = await servicioLotes.lotesCliente(props.cuil_cuit)
        console.log(lotes)
        setLotes(lotes)




    }


    function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
        return (
          <>
            <CurrencyExchangeIcon 
             onClick={() =>  navigate('/usuario2/pagarcuota/'+cuotas[dataIndex].id)}
              style={{ marginRight: "10px", cursor: "pointer" }}
            />
            <SearchIcon style={{ cursor: "pointer" }} 
            onClick={() =>  navigate('')  }//Navigate('usuario2/detallecliente'+clients[dataIndex].cuil_cuit)
            />
          </>
        );
      }

    const columns = [
        {
            name: "mes",
            label: "Mes",

        },
        {
            name: "anio",
            label: "Año",

        },

        {
            name: "saldo_inicial",
            label: "Saldo Inicial",
        },
        {
            name: "ICC",
            label: "ICC",

        },
        {
            name: "cuota_con_ajuste",
            label: "Cuota con ajuste",

        },
        {
            name: "Saldo_real",
            label: "Saldo Real",

        },
        {
            name: "Ajuste_ICC",
            label: "Ajuste ICC",

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


    return (

        <Fragment>
            <Button  onClick={() => { navigate('/usuario2/asignarloteausuario/' +cuil_cuit)}} variant="contained" color="success">
              Vender un lote 
            </Button>
            {
                lotes.map((item, index) =>
                    <div>
                        <Button key={index} variant="contained" onClick={() => { vercuotas(item['id']) }}>{item['zona']}F{item['fraccion']}M{item['manzana']}L{item['lote']}</Button>
                        {/*  <Button  key= {index} variant="contained"onClick={()=>{agregar(item['id'])}}> Agregar Cuotas</Button> */}

                        <Button /* variant="outlined"  */ key={index} variant="contained" onClick={() => { navigate('/usuario2/agregarcuotas/' + item['id']) }} >
                            Agregar cuotas al lote
                        </Button>


                    </div>
                )
            }


            <div>
                <div>

                    <MUIDataTable
                        title={"Lista de Clientes"}
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
                </div>
            </div>
        </Fragment>

    )


}
export default LotesCliente