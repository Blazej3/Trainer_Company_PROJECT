import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import PersonIcon from '@mui/icons-material/Person';

export default function BasicMenu({ handleCustomerClick, handleTrainingClick, handleCalendarClick }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <div>
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          color="white"
        >
          <MenuIcon /> 
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleCustomerClick}><PersonIcon/>Customers</MenuItem>
          <MenuItem onClick={handleTrainingClick}><DirectionsRunIcon/>Trainings</MenuItem>
          <MenuItem onClick={handleCalendarClick}><CalendarMonthIcon/>Calendar</MenuItem> 
        </Menu>
      </div>
    );
}
