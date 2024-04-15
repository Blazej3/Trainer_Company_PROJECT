
import * as React from 'react';

import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Customerlist from "./components/Customer/CustomerList";
import Traininglist from "./components/Training/TrainingList";
import Menu from "./components/Menu";

function App() {
  const [displayCustomers, setDisplayCustomers] = React.useState(false);

  const handleCustomerClick = () => {
    setDisplayCustomers(true);
  };

  const handleTrainingClick = () => {
    setDisplayCustomers(false);
  };

  return (
    <Container maxWidth="xl">
      <AppBar position='static'>
        <Toolbar>
          <Menu
            handleCustomerClick={handleCustomerClick}
            handleTrainingClick={handleTrainingClick}
          /> 
          <Typography variant='h6'>Personal Trainer</Typography>
        </Toolbar>
      </AppBar>
      {displayCustomers ? <Customerlist /> : <Traininglist />}
    </Container>
  )
}

export default App;
