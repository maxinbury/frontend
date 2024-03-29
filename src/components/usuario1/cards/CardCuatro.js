import * as React from 'react';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import "./CardStyle.css";
import { useNavigate } from 'react-router-dom';
const CardCuatro = () => {
    const navigate=useNavigate()
    const ir = () => {
        navigate('/usuario/asociarcbu')
    }
    return (
        <div className="body__Page">
            <div className="container__article">
    
                <div onClick={ir} className="box__article">
                <i onClick={ir}>< AccountBalanceIcon fontSize="large"/> </i>
                    <h5 onClick={ir} >Asocia tu CBU</h5>
                </div>
               
                
            </div>
        </div>
    );
}

export default CardCuatro;