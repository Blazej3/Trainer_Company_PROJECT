import * as React from 'react';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Customerlist from "./components/Customer/CustomerList";
import Traininglist from "./components/Training/TrainingList";
import CalendarPage from "./components/Training/Calendar"; 
import Statistics from './components/Training/Statistics';

import Menu from "./components/Menu";

function App() {
  const [displayCustomers, setDisplayCustomers] = React.useState(false);
  const [displayCalendar, setDisplayCalendar] = React.useState(false);
  const [displayStatistics, setDisplayStatistics] = React.useState(false);

  const handleCustomerClick = () => {
    setDisplayCustomers(true);
    setDisplayCalendar(false); 
    setDisplayStatistics(false);
  };

  const handleTrainingClick = () => {
    setDisplayCustomers(false);
    setDisplayCalendar(false); 
    setDisplayStatistics(false);
  };

  const handleCalendarClick = () => {
    setDisplayCustomers(false);
    setDisplayCalendar(true); 
    setDisplayStatistics(false);
  };

  const handleStatisticsClick = () => {
    setDisplayCustomers(false);
    setDisplayCalendar(false); 
    setDisplayStatistics(true);
  }

  return (
    <Container maxWidth="xl">
      <AppBar position='static'>
        <Toolbar>
          <Menu
            handleCustomerClick={handleCustomerClick}
            handleTrainingClick={handleTrainingClick}
            handleCalendarClick={handleCalendarClick} 
            handleStatisticsClick={handleStatisticsClick}
          /> 
          <Typography variant='h6'>Personal Trainer</Typography>
        </Toolbar>
      </AppBar>
      
      {displayStatistics ? <Statistics/> : displayCustomers ? <Customerlist /> : displayCalendar ? <CalendarPage /> : <Traininglist />  }
    </Container>
  )
}

export default App;
