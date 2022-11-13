import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';




export default function Info(props) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const info = ['name', 'phone', 'email']
    const address = ['city', 'street']
    
  return (
    <Card sx={{ maxWidth: 650 ,minHeight : 400, marginLeft : 10}}>
      <CardContent >
        {info.map((e, i) => <Typography key={i}>{`${e} : ${user[e]}`}</Typography>)}
        <Typography component={'span'} sx={{ fontSize: 20 }} >
          address : {address.map((e, i) => <Typography key={i}>{`${e} : ${user[e]}`}</Typography>)}
       </Typography>
       <Typography component={'span'} sx={{ fontSize: 20 }} >
          company : {Object.keys(user.company).map((e, i) => <Typography key={i}>{`${e} : ${user['company'][e]}`}</Typography>)}
       </Typography>
      </CardContent>
      
    </Card>
  );
}
