import axios from "axios"

const baseUrl = 'http://52.203.247.51:4000/usuario1/'
//const  baseUrl = 'http://localhost:4000/usuario1/'
const subirprueba = async (formdata) => {
  console.log(formdata)
  const { data } = await axios.post(baseUrl + 'subirlegajoprueba', formdata)
  console.log(data)

}

const subirlegajode = async ( formdata) => {
 

  console.log(formdata)
  await axios.post('http://52.203.247.51:4000/links/subirlegajodni', formdata)

  
  



}


export default { subirprueba, subirlegajode };