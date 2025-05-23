import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Asociarcbu from './360/modaladhesiondebito'
import AsociarTarjeta from './360/modalcrearadhesiontarjeta'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function RowAndColumnSpacing() {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Item><Asociarcbu/></Item>
        </Grid>
        <Grid item xs={6}>
          <Item><AsociarTarjeta/></Item>
        </Grid>
   
      </Grid>
    </Box>
  );
}