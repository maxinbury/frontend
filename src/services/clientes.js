import axios from "axios"
const  baseURL = 'http://52.203.247.51:4000/links/'
//const  baseURL = 'http://localhost:4000/links/'



const crear= async  (datos) => {
   console.log(datos)
    const {data } = await axios.post(baseURL+'add2',datos)
    
    alert(data)  
}  

const lista= async  () => {
   
    const {data } = await axios.get('http://52.203.247.51:4000/prueba')

    
    return data 
}   
//crear
const crearCliente= async  (datos) => {
   
     const data  = await axios.post(baseURL,datos)
  
     return data 
 } 
 
 const ventaLote= async  (datos) => {
   console.log(datos)
    const data  = await axios.post(baseURL+'ventalote',datos)
    alert(data.data)
    return data 
} 
const cliente= async  (cuil_cuit) => {
   console.log(cuil_cuit)
    const {data } = await axios.get(baseURL+'detalle/'+cuil_cuit)
    
    return data 
} 

const determinarIngreso= async  (datos) => {
   console.log(datos)
  const {data } = await axios.post(baseURL+'agregaringreso2/',datos)
    console.log(data)
    alert('Guardado con exito')
    return data 
}

const traerLejagos= async  (cuil_cuit) => {
   console.log(cuil_cuit)
    const {data } = await axios.get(baseURL+'legajos/'+cuil_cuit)
    
    return data 
}

export default {lista, cliente, determinarIngreso,crearCliente,ventaLote,traerLejagos,crear};