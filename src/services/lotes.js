import axios from "axios"

const  baseUrl ='http://52.203.247.51:4000/lotes/'
//const  baseUrl ='http://localhost:4000/lotes/'

const lista= async  () => {
   
    const {data } = await axios.get(baseUrl+'listadetodos')
    
    return data 
}  
const prueba= async  (s) => {
    await axios.post(baseUrl+'prueba',s)
  console.log(s)
    
   
}  
const listalotes= async  () => {
   
    const {data } = await axios.get(baseUrl+'listadelotes')
    
    return data 
}  

const lotesCliente= async  (cuil_cuit) => {
 //  console.log(cuil_cuit)
    let {data}  = await axios.get(baseUrl+'lotescliente/'+cuil_cuit)

    const lotes=(data[0])

   
   
    return data
}  

const lotesClienteUsuario1= async  (cuil_cuit) => {
    //  console.log(cuil_cuit) hacer la separacion
    cuil_cuit =  (cuil_cuit).slice(0, 2) + "-" + (cuil_cuit).slice(2);
    
     
    cuil_cuit =  (cuil_cuit).slice(0, 11) + "-" + (cuil_cuit).slice(11);
   

       let {data}  = await axios.get(baseUrl+'lotescliente/'+cuil_cuit)
   
       const lotes=(data[0])
   
      
      
       return data
   } 

const lotesCliente2= async  (cuil_cuit) => {
    //  console.log(cuil_cuit)
       let {data}  = await axios.get(baseUrl+'lotescliente2/'+cuil_cuit)
       console.log(cuil_cuit)
       const lotes=(data[0])
       console.log(data)
      
      
       return data
   }  
export default {lista, lotesCliente,lotesCliente2,listalotes,prueba, lotesClienteUsuario1};