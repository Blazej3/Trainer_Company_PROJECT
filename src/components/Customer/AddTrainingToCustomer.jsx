import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddTrainingToCustomer(props) {

    const [open, setOpen] = useState(false);

    const [newTraining, setNewTraining] = useState({
        date: "",
        activity: "",
        duration: "",
        customer: props.customer._links.customer.href
    });
    

    const [selectedDate, setSelectedDate] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setNewTraining({ ...newTraining, [event.target.name]: event.target.value });
    };

    const addTraining = () => {
        const trainingWithCustomer = { ...newTraining, customer: props.customer._links.customer.href};
        props.saveTraining(trainingWithCustomer);
        handleClose();
    };


    return (
        <div>
            <Button style={{ margin: 10 }} variant="outlined" onClick={handleClickOpen}>
                +
            </Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>New Training</DialogTitle>
                <DialogContent>

                    <TextField
                        required
                        margin="dense"
                        name="activity"
                        value={newTraining.activity}
                        onChange={e => handleInputChange(e)}
                        label="Activity"
                        fullWidth
                    />

                    <TextField
                        required
                        margin="dense"
                        name="duration"
                        type="number"
                        value={newTraining.duration}
                        onChange={e => handleInputChange(e)}
                        label="Duration (minutes)"
                        fullWidth
                    />


                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            onChange={(date) => {
                                setNewTraining({ ...newTraining, date: date.toISOString().split('T')[0] });
                            }}

                            label="Date"
                            value={selectedDate}

                        />
                    </LocalizationProvider>





                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addTraining}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
