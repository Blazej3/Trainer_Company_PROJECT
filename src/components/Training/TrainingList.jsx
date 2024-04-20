import { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the grid


import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import dayjs from 'dayjs';


function Traininglist() {

    const [training, setTraining] = useState([]);




    const [colDefs] = useState([
        {
            headerName: "Date",
            valueGetter: (params) => dayjs(params.data.date).format("DD.MM.YYYY HH:mm"),
            filter: true, width: 150
        },
        { field: "duration", filter: true, width: 150 },
        { field: "activity", filter: true, width: 150 },
        {
            headerName: "Customer",
            valueGetter: (params) =>
                params.data.customer.firstname + " " + params.data.customer.lastname,
            filter: true, width: 150
        },
        {
            width: 100,
            cellRenderer: params =>
                <IconButton size="small" color="error" onClick={() => deleteTraining(params.data.id)}>
                    < DeleteIcon />
                </IconButton>
        },

    ]);



    useEffect(() => {
        fetchTrainings();
    }, []);



    const fetchTrainings = () => {
        return fetch('https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings')
            .then(response => {
                if (!response.ok)
                    throw new Error("Error in fetch: " + response.statusText);

                return response.json();
            }).then(data => setTraining(data))
            .catch(err => console.error(err))
    };

    const deleteTraining = (id) => {
        if (window.confirm("Are you sure you want to delete this training?")) {
            fetch(`https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings/${id}`, { method: 'DELETE' })
                .then(response => {
                    if (!response.ok)
                        throw new Error("Error in deletion: " + response.statusText);

                    return response.json();
                })
                .then(() => fetchTrainings())
                .catch(err => console.error(err))
        }
    };


    return (

        <div className="ag-theme-material" style={{ height: 600 }}>

            <AgGridReact
                rowData={training}
                columnDefs={colDefs}
                pagination={true}
                paginationAutoPageSize={true}
            />
        </div>
    )



}

export default Traininglist;