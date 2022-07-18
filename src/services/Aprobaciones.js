
import axios from "axios"

const  baseUrl = 'http://52.203.247.51:4000/aprobaciones/'
//const  baseUrl = 'http://localhost:4000/aprobaciones/'

const lista= async  () => {
   
    const {data } = await axios.get(baseUrl+'pendientestodas')
    console.log(data)
    return data 
}   

const cantidad= async  () => {
   
  const {data } = await axios.get(baseUrl+'pendientestodas')
  console.log(data)
  return data 
} 

const aprobacion= async  (id) => {
   console.log(id)
  const {data } = await axios.get(baseUrl+'aprobar/'+id)
    console.log(data)
 
}   

const rechazo= async  (form) => {

  console.log(form)
  const data  = await axios.post(baseUrl+'rechazarr/',form)
  console.log(data)
 
} 

export default {lista, aprobacion,rechazo};