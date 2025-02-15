import { StepButton, Stepper, Step, Stack, Button, Box } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useState, useEffect} from "react";
import UltimosBal from "../../ingresosDeclarados/ultimosBalances/AddBalances";
import DjIva from "../../ingresosDeclarados/ultimasDeclaraciones/AddDeclaraciones";
import PagosPrev from "../../ingresosDeclarados/pagosPrevisionales/AddPrevisionales";
import AddEstatuto from "../addEstatuto/AddEstatuto";
import AddActa from "../addActa/AddActa";



const DatosPersona = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [steps, setSteps] = useState([
        {label: 'Acreditacion de ingresos', completed:false},
        {label: 'DJ IVA', completed:false},
        {label: 'Pagos Previsionales', completed:false},
        {label: 'Estatuto Social', completed:false},
        {label: 'Acta del organo decisorio', completed:false},
       
 
     
   
    ]);

    const [user, setUser] = useState([''])

    
    useEffect(() => {
        
        const preba = JSON.parse( window.localStorage.getItem('loggedNoteAppUser'))
        
        setUser(preba)
    
    }, [])
    const checkDisabled = () =>{
        if (activeStep < steps.leght -1) return false
        
    }
    
    return (
        <Container sx={{my:4}}>
            <Stepper
            alternativeLabel
            nonLinear
            activeStep={activeStep}
            sx={{mb:3}}
          >
            {steps.map((step, index) => (
                <Step key={step.label} completed={step.completed}>
                    <StepButton onClick={() => setActiveStep(index)}>
                        {step.label}
                    </StepButton>
                </Step>
            ))}
                

            </Stepper>
            <Box>
                {{
                    0: <UltimosBal 
                    cuil_cuit = {user.cuil_cuit }/>,
                    1: <DjIva
                    cuil_cuit = {user.cuil_cuit }
                  />,
                    2: <PagosPrev 
                    cuil_cuit = {user.cuil_cuit }/>,
                    3: <AddEstatuto 
                    cuil_cuit = {user.cuil_cuit }/>,
                    4: <AddActa
                    cuil_cuit = {user.cuil_cuit } />,
                   
                 
               

                }[activeStep]}
            </Box>
            <Stack
            direction="row"
            sx={{pt:2, pb:7, justifyContent:"space-around"}}
            >
                <Button
                
                disabled={!activeStep}
                onClick={()=>setActiveStep(activeStep=>activeStep -1)}
                >
                    Volver
                </Button>
                <Button
                disabled={checkDisabled()}
                onClick={()=>setActiveStep(activeStep=>activeStep +1)}
                >
                    Siguiente
                </Button>



            </Stack>
        </Container>
    );
};

export default DatosPersona;