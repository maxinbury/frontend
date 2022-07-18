import axios from "axios"




const  baseUrl = 'http://52.203.247.51:4000/cuotas/'
//const  baseUrl = 'http://localhost:4000/cuotas/'


const vercuotas= async  (id) => {
    console.log('servicio')
   console.log(id)
    const {data } = await axios.get(baseUrl+'lote2/'+id)
    console.log(data)
    
    return data 
}  
const cuotasDeUnLote = async  (id) => {
    
   console.log(id)
    const data  = await axios.get(baseUrl+'cuotasdeunlote/'+id)
    console.log(data)
    
    return data 
} 


const agregarCuotas= async  (estadoCuotas) => {
  
   console.log(estadoCuotas)
    const {data } = await axios.post(baseUrl+'addaut2/',estadoCuotas)
    console.log(data)
    
   // return data 
}  

export default {vercuotas,agregarCuotas, cuotasDeUnLote};