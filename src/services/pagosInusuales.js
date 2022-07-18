import axios from "axios"

const  baseUrl = 'http://52.203.247.51:4000/pagos/'
//const  baseUrl ='http://localhost:4000/pagos/'

const buscar= async  (form) => {
   console.log(form)

 const {data} = await axios.post(baseUrl+'mensualesinusuales',form)
 console.log(data)

  return data
}
const cantidad= async  () => {
 

const cantidad = await axios.get(baseUrl+'cantidadinusuales')
console.log(cantidad)

 return cantidad
}   





export default { buscar, cantidad};