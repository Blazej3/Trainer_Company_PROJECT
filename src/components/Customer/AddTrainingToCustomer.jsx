import React, { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';

export default function AddTrainingToCustomer(props) {
    const [open, setOpen] = useState(false);
    const [newTraining, setNewTraining] = useState({
        date: "",
        activity: "",
        duration: "",
        customer: props.customer._links.customer.href
    });
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [Activities, setActivities] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, []);



    const fetchTrainings = () => {
        return fetch('https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings')
            .then(response => {
                if (!response.ok)
                    throw new Error("Error in fetch: " + response.statusText);

                return response.json();
            })
            .then(data => {
                // Extract activities from training data and make them unique
                const uniqueActivities = Array.from(new Set(data.map(training => training.activity)));
                setActivities(uniqueActivities);
            })
            .catch(err => console.error(err))
    };


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
        const trainingWithCustomer = { ...newTraining, customer: props.customer._links.customer.href, activity: selectedActivity };
        props.saveTraining(trainingWithCustomer);
        handleClose();
    };

    

    return (
        <div>
            <Button style={{ margin: 10 }} variant="outlined" onClick={handleClickOpen}>
                +
            </Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>Add Training ({props.customer.firstname} {props.customer.lastname})</DialogTitle>
                <DialogContent>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={Activities}
                        value={selectedActivity}
                        onChange={( activity) => {
                            setSelectedActivity(activity);
                        }}
                        renderInput={(params) => <TextField {...params} label="Activity" />}
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
                    <TextField
                        required
                        margin="dense"
                        name="duration"
                        type="number"
                        value={newTraining.duration}
                        onChange={handleInputChange}
                        label="Duration (minutes)"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addTraining}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
