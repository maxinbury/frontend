import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import servicioPagos from '../../../services/pagos';
import { useNavigate } from "react-router-dom";
import BotonRechazo from './RechazoPagoInusual';
//import BotonAprobado from './AprobacionPagoInusual';
import Button from "@mui/material/Button";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#326B6B',
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        color: '#000000',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#E6F2F2',
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const PagosInusuales = () => {
    const [pagos, setPagos] = useState([]);
    const [vista, setVista] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getPagosi();
    }, []);

    const getPagosi = async () => {
        const pagos = await servicioPagos.pagosinusuales2();
        setPagos(pagos);
    };

    const StyledTable = () =>
        createTheme({
            overrides: {
                MUIDataTableBodyRow: {
                    root: {
                        backgroundColor: "#f5f5f5",
                    }
                }
            }
        });

    const columns = [
        { name: "cuil_cuit", label: "Cuil/cuit" },
        {
            name: "Nombre",
            options: {
                customBodyRenderLite: (dataIndex) => (
                    <p onClick={() => navigate('/usuario2/detallecliente/' + pagos[dataIndex].cuil_cuit)}
                        style={{ marginRight: "10px", cursor: "pointer" }}>
                        {pagos[dataIndex].Nombre}
                    </p>
                )
            }
        },
        { name: "monto", label: "Monto" },
        { name: "fechanotificacion", label: "Fecha Notificacion" },
        { name: "fechavencimiento", label: "Fecha Vencimiento" },
        { name: "riesgo", label: "riesgo" },
        {
            name: "Actions",
            options: {
                customBodyRenderLite: (dataIndex) => (
                    <>
                        <BotonRechazo id={pagos[dataIndex].id} getPagosi={getPagosi} />
                        {/*     <BotonAprobado id={pagos[dataIndex].id} monto={pagos[dataIndex].monto} getPagosi={getPagosi} /> */}
                    </>
                )
            }
        },
        {
            name: "Descarga",
            options: {
                customBodyRenderLite: (dataIndex) => (
                    <Button onClick={() => navigate('/nivel3/cuota/' + pagos[dataIndex].id_cuota)}>Ver pagos de cuota</Button>
                )
            }
        },
    ];

    return (
        <div>
            <Button variant="contained" onClick={() => setVista(!vista)}>
                Cambiar Vista
            </Button>
            {vista ? (
                <Paper sx={{ width: "90%", margin: '20px auto', padding: '10px' }}>
                    <TableContainer>
                        {pagos.length === 0 ? (
                            <p style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>No hay elementos</p>
                        ) : (
                            <Table>
                                <TableHead>
                                    <TableRow>
                                    <StyledTableCell>Id</StyledTableCell>
                                    <StyledTableCell>Nombre y Apellido/Razon Social</StyledTableCell>
                                    <StyledTableCell>Cuil/Cuit</StyledTableCell>
                                    <StyledTableCell>Tipologia</StyledTableCell>

                                    <StyledTableCell>Fecha Notificacion</StyledTableCell>
                                        <StyledTableCell>Fecha Vencimiento</StyledTableCell>
                                        <StyledTableCell>Importe(Pesos)</StyledTableCell>
                                        <StyledTableCell>Riesgo</StyledTableCell>
                              
                                        <StyledTableCell>Estado</StyledTableCell>
                                        <StyledTableCell>Fecha</StyledTableCell>
                                   
                                     
                                     
                                        <StyledTableCell>Acciones</StyledTableCell>
                                        <StyledTableCell>Descarga</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {pagos.map((row, index) => (
                                        <StyledTableRow key={index}>
                                              <StyledTableCell>{row.id}</StyledTableCell>
                                              <StyledTableCell>{row.Nombre}</StyledTableCell>
                                              <StyledTableCell onClick={() => navigate('/usuario2/detallecliente/' + row.cuil_cuitc)}>{row.cuil_cuitc}</StyledTableCell>
                                              <StyledTableCell>{row.tipologia}</StyledTableCell>
                                              <StyledTableCell>{row.fechanotificacion}</StyledTableCell>
                                              <StyledTableCell>{row.fechavencimiento}</StyledTableCell>
                                              <StyledTableCell>
  {isNaN(Number(row.monto))
    ? `$${row.monto}`
    : `$${Number(row.monto).toFixed(2)}`}
</StyledTableCell>  <StyledTableCell>{row.riesgo}%</StyledTableCell>
<StyledTableCell>
  {row.proceso == 'averificarnivel2' && 'Pendiente carga de documentación'}
  {row.proceso == 'averificarnivel3' && 'Pendiente clasificación de Gerencia'}
  {row.proceso == 'Inusual' && 'Cerrado (Sin alerta)'}
  {row.proceso == 'Sospechoso' && 'Cerrado (Con Alerta)'}
</StyledTableCell>
                                            <StyledTableCell>Pago({row.fecha}) Cuota({row.mesc}/{row.anioc})</StyledTableCell>
                                            
                                         
                                          
                                        

                                            <StyledTableCell>
                                                <BotonRechazo id={row.id} getPagosi={getPagosi} />
                                                {/*  <BotonAprobado id={row.id} monto={row.monto} getPagosi={getPagosi} /> */}
                                            </StyledTableCell>
                                            <StyledTableCell onClick={() => navigate(row.zona === "IC3" ? `/usuario2/cuotaic3/${row.id_cuota}` : `/usuario2/pagoscuotas/${row.id_cuota}`)}>
                                                <Button>Ver pagos de cuota</Button>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </TableContainer>
                </Paper>
            ) : (
                <ThemeProvider theme={StyledTable()}>
                    <MUIDataTable
                        title={"Lista de pagos inusuales"}
                        data={pagos}
                        columns={columns}
                        options={{ selectableRows: "none" }}
                    />
                </ThemeProvider>
            )}
        </div>
    );
};

export default PagosInusuales;
