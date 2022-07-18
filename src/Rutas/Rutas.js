/* import NotFound from '../Paginas/Notfound'; */
import Login from '../Paginas/Login';
import DetalleCliente from '../Paginas/Usuario2/DetalleCliente';

import Clientes from '../Paginas/Usuario2/MenuUsuario2';
import Lotes from '../Paginas/Usuario2/Lotes';
import LegajosCliente from '../Paginas/Usuario2/LegajoCliente';
import EditarCliente from '../Paginas/Usuario2/ModificarCliente';

import Agregarcuotas from '../Paginas/Usuario2/AgregarCuotas';

import NAvBar from "../components/Navbar";
import Usuario1 from "../Paginas/usuario1/menuusuario1";
import Cuotas from "../Paginas/usuario1/Cuotas";
import Aprobaciones from "../Paginas/Aprobaciones"
import Legajos from "../Paginas/usuario1/Legajos"
import ingresosDeclarados from "../Paginas/usuario1/IngresosDeclarados"
import Notificaciones from "../Paginas/usuario1/Notificaciones"

import AsignarLoteAUsuario from "../Paginas/Usuario2/AsignarLoteAUsuario"
import AprobacionesPagos from "../Paginas/Usuario2/AprobacionesPagos"
import PagosNvel2 from "../Paginas/Usuario2/PagarCuota"


import Transferencias from '../Paginas/usuario1/Transferencias';


import PagosInusuales from "../Paginas/Nivel3/PagosInusuales"
import PagosInusualesMensuales from "../Paginas/Nivel3/PagosInusualesMensuales"
import Principal from "../Paginas/Nivel3/Principal"
import Icc from "../Paginas/Nivel3/Icc"



/////////// Probando usecontxt


//////////



const Rutas = [
	 <NAvBar/> ,

	 {path: '/',element: (<Login />)},
	{path: '/login',element: (<Login />)},

	
	{ path: '/usuario/menu', element: < Usuario1 /> },
	{ path: '/usuario/Legajos', element: < Legajos /> },
	{ path: '/usuario/transferencias', element: < Transferencias /> },
	{ path: '/usuario/ingresosdeclarados', element: < ingresosDeclarados /> },
	{ path: '/usuario/cuotas', element: < Cuotas /> },
	{ path: '/usuario/notificaciones', element: < Notificaciones /> },
	
	{ path: '/usuario2/clientes', element: <Clientes /> },
	{ path: '/usuario2/lotes', element: <Lotes /> },
	{ path: '/usuario2/detallecliente/:cuil_cuit', element: <DetalleCliente /> },
	{ path: '/usuario2/agregarcuotas/:id', element: <Agregarcuotas /> },
	{ path: '/usuario2/asignarloteausuario/:cuil_cuit', element: <AsignarLoteAUsuario /> },
	{ path: '/usuario2/aprobaciones', element: <Aprobaciones /> },
	{ path: '/usuario2/aprobacionesdepagos', element: <AprobacionesPagos /> },
	{ path: '/usuario2/legajoscliente/:cuil_cuit', element: <LegajosCliente /> },
	{ path: '/usuario2/modificarcliente/:cuil_cuit', element: <EditarCliente /> },
	{ path: '/usuario2/pagarcuota/:id', element: <PagosNvel2 /> },

	
	

	{ path: '/nivel3/pagosinusuales', element: <PagosInusuales /> },
	{ path: '/nivel3/', element: <Principal /> },
	{ path: '/nivel3/pagosinusuales', element: <PagosInusualesMensuales /> },
	{ path: '/nivel3/icc', element: <Icc /> },


	/*{	path: '/',	element: <NotFound />
		}, */

];

export default Rutas;